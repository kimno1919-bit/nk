const fs = require('fs');
const data = require('./qt_backup.json');

let sqlUpdates = '';
let updateCount = 0;

for (const post of data) {
  if (post.title === '제목 없음' && post.content) {
    const lines = post.content.split('\n').map(l => l.trim());
    const subjectIndex = lines.findIndex(l => l.includes('주제') && l.includes('만들기'));
    
    if (subjectIndex >= 0) {
      const sameLineMatch = lines[subjectIndex].match(/주제\s*만들기\s*[:\.\]]*\s*(.+)/);
      let newTitle = '';
      
      if (sameLineMatch && sameLineMatch[1].trim().length > 0) {
        newTitle = sameLineMatch[1].trim();
      } else {
        for (let i = subjectIndex + 1; i < lines.length; i++) {
          if (lines[i].length > 0 && !lines[i].match(/^\d+\./)) { 
            newTitle = lines[i];
            break;
          }
        }
      }
      
      if (newTitle) {
        post.title = newTitle;
        const escapedTitle = newTitle.replace(/'/g, "''");
        sqlUpdates += `UPDATE qts SET title = '${escapedTitle}' WHERE id = '${post.id}';\n`;
        updateCount++;
      }
    }
  }
}

console.log('Total fixed:', updateCount);

fs.writeFileSync('fix_titles.sql', sqlUpdates, 'utf8');
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
