import { dictionaryEntries } from '../data/dictionary';
import { repairMojibake } from './text';

export function normalizeDictionaryKey(value = '') {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}

function buildCandidates(token = '') {
  const normalized = normalizeDictionaryKey(token);
  const candidates = [normalized];

  if (normalized.endsWith('ein') && normalized.length > 4) {
    candidates.push(normalized.slice(0, -3));
  }

  if (normalized.endsWith('en') && normalized.length > 4) {
    candidates.push(normalized.slice(0, -2));
  }

  if (normalized.endsWith('on') && normalized.length > 4) {
    candidates.push(normalized.slice(0, -2));
  }

  return [...new Set(candidates.filter(Boolean))];
}

export const preparedDictionaryEntries = dictionaryEntries.map((entry) => ({
  ...entry,
  hindiMeaning: repairMojibake(entry.hindiMeaning),
}));

const dictionaryLookup = new Map();

preparedDictionaryEntries.forEach((entry) => {
  [entry.word, entry.transliteration].forEach((value) => {
    const key = normalizeDictionaryKey(value);
    if (key && !dictionaryLookup.has(key)) {
      dictionaryLookup.set(key, entry);
    }
  });
});

export function findDictionaryEntry(token = '') {
  for (const candidate of buildCandidates(token)) {
    const entry = dictionaryLookup.get(candidate);
    if (entry) {
      return entry;
    }
  }

  return null;
}
