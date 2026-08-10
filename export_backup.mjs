import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://emdljtjlqwvfmuwdaaqo.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_gEY-BN0RJNf5LfDQBQYHJg__Q6ddiDg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function exportData() {
  console.log("Fetching all QT posts from Supabase...");
  let allData = [];
  let hasMore = true;
  let from = 0;
  const limit = 1000;

  while (hasMore) {
    const { data, error } = await supabase
      .from('qts')
      .select('*')
      .order('date', { ascending: false })
      .range(from, from + limit - 1);

    if (error) {
      console.error("Error fetching data:", error);
      break;
    }

    if (data.length > 0) {
      allData = allData.concat(data);
      from += limit;
      if (data.length < limit) hasMore = false;
    } else {
      hasMore = false;
    }
  }

  console.log(`Fetched ${allData.length} posts.`);

  // Write JSON
  fs.writeFileSync('qt_backup.json', JSON.stringify(allData, null, 2), 'utf8');
  console.log("Saved qt_backup.json");

  // Write CSV
  if (allData.length > 0) {
    const headers = Object.keys(allData[0]);
    
    // Helper to escape CSV strings
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
      ...allData.map(row => headers.map(header => escapeCSV(row[header])).join(','))
    ].join('\n');

    fs.writeFileSync('qt_backup.csv', csvContent, 'utf8');
    console.log("Saved qt_backup.csv");
  }

  console.log("Backup complete!");
}

exportData();
