const fs = require('fs');
const data = require('./qt_backup.json');

let sqlUpdates = '';
let updateCount = 0;

for (const post of data) {
  if (post.title === '제목 없음' || post.title === '없음') {
    if (post.content) {
      const lines = post.content.split('\n').map(l => l.trim());
      const subjectIndex = lines.findIndex(l => l.match(/^(?:\d+\.)?\s*(주제|제목)/i));
      
      if (subjectIndex >= 0) {
        let extractedTitle = '';
        const lineStr = lines[subjectIndex];
        // Strip out '주제:', '제목:', '주제 만들기:', etc.
        const afterSubject = lineStr.replace(/^(?:\d+\.)?\s*(주제|제목)\s*(만들기)?\s*[:\]\-]*\s*/i, '').trim();
        
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
          let newTitle = extractedTitle.replace(/&nbsp;/gi, ' ').trim();
          newTitle = newTitle.replace(/^(주제|제목)\s*[:\]]*\s*/i, '').trim();
          newTitle = newTitle.replace(/^-\s*/, '').trim();
          
          post.title = newTitle;
          const escapedTitle = newTitle.replace(/'/g, "''");
          sqlUpdates += `UPDATE qts SET title = '${escapedTitle}' WHERE id = '${post.id}';\n`;
          updateCount++;
        }
      }
    }
  }
}

console.log('Total fixed:', updateCount);

fs.writeFileSync('fix_titles_final.sql', sqlUpdates, 'utf8');
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
