import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://emdljtjlqwvfmuwdaaqo.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_gEY-BN0RJNf5LfDQBQYHJg__Q6ddiDg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fixTitles() {
  // We need to fetch all '제목 없음' - using pagination to be safe.
  let allData = [];
  let from = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('qts')
      .select('id, title, content')
      .eq('title', '제목 없음')
      .range(from, from + limit - 1);
      
    if (error || !data || data.length === 0) {
      hasMore = false;
    } else {
      allData = allData.concat(data);
      from += limit;
      if (data.length < limit) hasMore = false;
    }
  }
  
  console.log(`Found ${allData.length} posts with '제목 없음'.`);
  
  let updateCount = 0;
  for (const post of allData) {
    if (!post.content) continue;
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
        // console.log(`Updating ID ${post.id} to: ${newTitle}`);
        const { error } = await supabase.from('qts').update({ title: newTitle }).eq('id', post.id);
        if(!error) updateCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updateCount} titles.`);
}

fixTitles();
