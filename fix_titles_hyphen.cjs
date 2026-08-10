const fs = require('fs');
const data = require('./qt_backup.json');

let sqlUpdates = '';
let updateCount = 0;

for (const post of data) {
  let originalTitle = post.title || '';
  
  // Clean up existing title
  let cleanTitle = originalTitle.replace(/&nbsp;/gi, ' ').trim();
  
  // Strip '주제:', '제목:', or '-' from the beginning
  cleanTitle = cleanTitle.replace(/^(주제|제목)\s*[:\]]*\s*/i, '').trim();
  cleanTitle = cleanTitle.replace(/^-\s*/, '').trim();
  
  if (cleanTitle === '제목없음') cleanTitle = '제목 없음';

  let newTitle = cleanTitle;
  
  // If the title is effectively empty, try to extract from content
  if (cleanTitle === '' || cleanTitle === '제목 없음') {
    if (post.content) {
      const lines = post.content.split('\n').map(l => l.trim());
      const subjectIndex = lines.findIndex(l => l.includes('주제') && l.includes('만들기'));
      
      if (subjectIndex >= 0) {
        let extractedTitle = '';
        const lineStr = lines[subjectIndex];
        const afterSubject = lineStr.substring(lineStr.indexOf('만들기') + 3).replace(/^[\s:\.\]\-]+/, '').trim();
        
        if (afterSubject.length > 0) {
          extractedTitle = afterSubject;
        } else {
          for (let i = subjectIndex + 1; i < lines.length; i++) {
            const nextLine = lines[i];
            if (nextLine.length > 0 && !nextLine.match(/^\d+\./)) { 
              extractedTitle = nextLine;
              break;
            }
          }
        }
        if (extractedTitle) {
          newTitle = extractedTitle.replace(/&nbsp;/gi, ' ').trim();
          newTitle = newTitle.replace(/^(주제|제목)\s*[:\]]*\s*/i, '').trim();
          newTitle = newTitle.replace(/^-\s*/, '').trim();
        }
      }
    }
  }

  // If the title changed from the original
  if (newTitle !== originalTitle) {
    if (newTitle === '') newTitle = '제목 없음'; // fallback if we still couldn't find one
    
    post.title = newTitle;
    const escapedTitle = newTitle.replace(/'/g, "''");
    sqlUpdates += `UPDATE qts SET title = '${escapedTitle}' WHERE id = '${post.id}';\n`;
    updateCount++;
  }
}

console.log('Total fixed:', updateCount);

fs.writeFileSync('fix_titles_hyphen.sql', sqlUpdates, 'utf8');
fs.writeFileSync('qt_backup.json', JSON.stringify(data, null, 2), 'utf8');

if (data.length > 0) {
  const headers = Object.keys(data[0]);
  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const strVal = String(str);
    if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
      return `"${strVal.replace(/"/g, '""')}"`;
    }
    return strVal;
  };
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => escapeCSV(row[header])).join(','))
  ].join('\n');
  fs.writeFileSync('qt_backup.csv', csvContent, 'utf8');
}
