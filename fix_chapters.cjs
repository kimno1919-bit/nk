const fs = require('fs');
const data = require('./qt_backup.json');

let sqlUpdates = '';
let updateCount = 0;

for (const post of data) {
  let originalChapter = post.chapter || '';
  
  if (!originalChapter) continue;
  
  let normalized = originalChapter;
  
  // 1. Replace hyphens with tildes between numbers (e.g. 1-10 -> 1~10)
  normalized = normalized.replace(/(\d+)\s*[-]\s*(\d+)/g, '$1~$2');
  
  // 2. Remove '절' right before tilde (e.g. 1절 ~ 10절 -> 1 ~ 10절)
  normalized = normalized.replace(/절\s*~/g, '~');
  
  // 3. Remove spaces around tilde (e.g. 1 ~ 10절 -> 1~10절)
  normalized = normalized.replace(/\s*~\s*/g, '~');
  
  // 4. Ensure there is a space after '장' (e.g. 1장1~10절 -> 1장 1~10절)
  normalized = normalized.replace(/장(\d)/g, '장 $1');
  
  // If changed, add to SQL
  if (normalized !== originalChapter) {
    post.chapter = normalized;
    const escapedChapter = normalized.replace(/'/g, "''");
    sqlUpdates += `UPDATE qts SET chapter = '${escapedChapter}' WHERE id = '${post.id}';\n`;
    updateCount++;
  }
}

console.log('Total chapters fixed:', updateCount);

fs.writeFileSync('fix_chapters.sql', sqlUpdates, 'utf8');
fs.writeFileSync('qt_backup.json', JSON.stringify(data, null, 2), 'utf8');
