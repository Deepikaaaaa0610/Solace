// This script reads the corrupted poets.js, extracts all works, 
// and reassembles them correctly inside each poet's works array.
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'poets.js');
const content = fs.readFileSync(filePath, 'utf8');

// Extract the clean poet objects (first 694 lines) and the misplaced works (after line 694)
const lines = content.split('\n');

// Find where the original poets array ended (the `}` closing Gulzar before the misplaced comma)
// Line 694 has `  }` closing Gulzar, then line 695 has `,` then the misplaced works start
// We need to find the original end and the misplaced works

// Strategy: Find the misplaced works section and group them by author
const misplacedStart = content.indexOf("\n,\n      {\n         id: 'gh-4'");
if (misplacedStart === -1) {
  console.log('No misplaced works found or already fixed.');
  process.exit(0);
}

// Get the clean part (original poets array up to Gulzar's closing)
const cleanPart = content.substring(0, misplacedStart);

// Get the misplaced works text
const afterClean = content.substring(misplacedStart);
// Find where the export functions start
const exportIdx = afterClean.indexOf('\nexport const getAllWorks');
const misplacedWorksText = afterClean.substring(0, exportIdx);
const exportFunctions = afterClean.substring(exportIdx);

// Parse misplaced works by author
const workBlocks = misplacedWorksText.split(/\n      \{/g).filter(b => b.includes("id:"));

// Group by author
const worksByAuthor = {};
for (const block of workBlocks) {
  const authorMatch = block.match(/author: '([^']+)'/);
  if (authorMatch) {
    const author = authorMatch[1];
    if (!worksByAuthor[author]) worksByAuthor[author] = [];
    worksByAuthor[author].push('      {' + block.replace(/^,?\n?/, '').replace(/,\s*$/, ''));
  }
}

console.log('Found misplaced works by author:');
for (const [author, works] of Object.entries(worksByAuthor)) {
  console.log(`  ${author}: ${works.length} works`);
}

// Now insert them into the correct position in the clean part
let result = cleanPart;

// For each author, find their works array closing bracket and insert works before it
const authorToId = {
  'Mirza Ghalib': 'mirza-ghalib',
  'Mir Taqi Mir': 'mir-taqi-mir', 
  'Faiz Ahmad Faiz': 'faiz-ahmad-faiz',
  'Allama Iqbal': 'allama-iqbal',
  'Jaun Elia': 'jaun-elia',
  'Ahmad Faraz': 'ahmad-faraz',
  'Parveen Shakir': 'parveen-shakir',
  'Gulzar': 'gulzar'
};

for (const [author, works] of Object.entries(worksByAuthor)) {
  const poetId = authorToId[author];
  if (!poetId) { console.log('Unknown author:', author); continue; }
  
  const poetIdIdx = result.indexOf(`id: '${poetId}'`);
  if (poetIdIdx === -1) { console.log('Poet not found:', poetId); continue; }
  
  const worksIdx = result.indexOf('works: [', poetIdIdx);
  if (worksIdx === -1) { console.log('Works not found for:', poetId); continue; }
  
  // Find matching closing bracket using bracket counting, skipping template literals
  let depth = 0;
  let inTemplate = false;
  let bracketIdx = -1;
  for (let i = worksIdx + 7; i < result.length; i++) {
    const ch = result[i];
    if (ch === '`') inTemplate = !inTemplate;
    if (inTemplate) continue;
    if (ch === '[') depth++;
    if (ch === ']') {
      if (depth === 0) { bracketIdx = i; break; }
      depth--;
    }
  }
  
  if (bracketIdx === -1) { console.log('Bracket not found for:', poetId); continue; }
  
  const worksStr = works.join(',\n');
  result = result.slice(0, bracketIdx) + ',\n' + worksStr + '\n    ' + result.slice(bracketIdx);
  console.log(`Inserted ${works.length} works for ${author}`);
}

// Close the poets array and add export functions
result = result + '\n];\n' + exportFunctions.trim() + '\n';

fs.writeFileSync(filePath, result, 'utf8');
console.log('\nDone! File fixed. Size:', (result.length / 1024).toFixed(1), 'KB');
