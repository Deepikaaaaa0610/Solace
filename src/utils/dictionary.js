import { dictionaryEntries } from '../data/dictionary';
import { repairMojibake } from './text';

const commonWordEntries = [
  {
    id: 'common-hi',
    word: 'Hi',
    transliteration: 'hi',
    englishMeaning: 'only, exactly, indeed',
    hindiMeaning: 'ही, केवल, ठीक इसी तरह',
    simpleExplanation: 'Used for emphasis, like saying only or exactly.',
  },
  {
    id: 'common-bhi',
    word: 'Bhi',
    transliteration: 'bhi',
    englishMeaning: 'also, too, even',
    hindiMeaning: 'भी, साथ ही, यहाँ तक कि',
    simpleExplanation: 'Adds the meaning of also, too, or even.',
  },
  {
    id: 'common-ke',
    word: 'Ke',
    transliteration: 'ke',
    englishMeaning: 'of, for, to',
    hindiMeaning: 'के, का संबंध, के लिए',
    simpleExplanation: 'A linking word often used for relation, possession, or purpose.',
  },
  {
    id: 'common-ki',
    word: 'Ki',
    transliteration: 'ki',
    englishMeaning: 'of, that',
    hindiMeaning: 'की, कि',
    simpleExplanation: 'Used as a connector, often for possession or to introduce a clause.',
  },
  {
    id: 'common-ka',
    word: 'Ka',
    transliteration: 'ka',
    englishMeaning: 'of',
    hindiMeaning: 'का',
    simpleExplanation: 'Shows possession or relation.',
  },
  {
    id: 'common-ko',
    word: 'Ko',
    transliteration: 'ko',
    englishMeaning: 'to, toward',
    hindiMeaning: 'को, की ओर',
    simpleExplanation: 'Marks the object or direction in a sentence.',
  },
  {
    id: 'common-se',
    word: 'Se',
    transliteration: 'se',
    englishMeaning: 'from, with, by',
    hindiMeaning: 'से, के साथ, द्वारा',
    simpleExplanation: 'Used for source, means, or companionship.',
  },
  {
    id: 'common-to',
    word: 'To',
    transliteration: 'to',
    englishMeaning: 'then, so, after all',
    hindiMeaning: 'तो, तब, आखिर',
    simpleExplanation: 'Adds emphasis or marks a contrast or conclusion.',
  },
  {
    id: 'common-hai',
    word: 'Hai',
    transliteration: 'hai',
    englishMeaning: 'is',
    hindiMeaning: 'है',
    simpleExplanation: 'The present tense form of to be.',
  },
  {
    id: 'common-hain',
    word: 'Hain',
    transliteration: 'hain',
    englishMeaning: 'are',
    hindiMeaning: 'हैं',
    simpleExplanation: 'Plural or respectful form of to be.',
  },
  {
    id: 'common-ho',
    word: 'Ho',
    transliteration: 'ho',
    englishMeaning: 'be, are',
    hindiMeaning: 'हो',
    simpleExplanation: 'A form of the verb to be, often used for you or as a wish.',
  },
  {
    id: 'common-hoon',
    word: 'Hoon',
    transliteration: 'hoon',
    englishMeaning: 'am',
    hindiMeaning: 'हूँ',
    simpleExplanation: 'First person form of to be.',
  },
  {
    id: 'common-na',
    word: 'Na',
    transliteration: 'na',
    englishMeaning: 'not, please, isn’t it',
    hindiMeaning: 'ना, मत, है न',
    simpleExplanation: 'Can negate, soften a request, or add conversational emphasis.',
  },
  {
    id: 'common-nahin',
    word: 'Nahin',
    transliteration: 'nahin',
    englishMeaning: 'not, no',
    hindiMeaning: 'नहीं',
    simpleExplanation: 'The common word for no or not.',
  },
  {
    id: 'common-main',
    word: 'Main',
    transliteration: 'main',
    englishMeaning: 'I',
    hindiMeaning: 'मैं',
    simpleExplanation: 'First-person pronoun.',
  },
  {
    id: 'common-hum',
    word: 'Hum',
    transliteration: 'hum',
    englishMeaning: 'we, I',
    hindiMeaning: 'हम',
    simpleExplanation: 'Means we, and in poetry can also be used for I.',
  },
  {
    id: 'common-tum',
    word: 'Tum',
    transliteration: 'tum',
    englishMeaning: 'you',
    hindiMeaning: 'तुम',
    simpleExplanation: 'Informal or intimate form of you.',
  },
  {
    id: 'common-tu',
    word: 'Tu',
    transliteration: 'tu',
    englishMeaning: 'you',
    hindiMeaning: 'तू',
    simpleExplanation: 'Very intimate or direct form of you.',
  },
  {
    id: 'common-mujhe',
    word: 'Mujhe',
    transliteration: 'mujhe',
    englishMeaning: 'to me, me',
    hindiMeaning: 'मुझे, मुझको',
    simpleExplanation: 'Used when something happens to or for me.',
  },
  {
    id: 'common-mujh',
    word: 'Mujh',
    transliteration: 'mujh',
    englishMeaning: 'me',
    hindiMeaning: 'मुझ',
    simpleExplanation: 'A root form of me used with other linking words.',
  },
  {
    id: 'common-aap',
    word: 'Aap',
    transliteration: 'aap',
    englishMeaning: 'you',
    hindiMeaning: 'आप',
    simpleExplanation: 'Respectful form of you.',
  },
  {
    id: 'common-apna',
    word: 'Apna',
    transliteration: 'apna',
    englishMeaning: 'one’s own',
    hindiMeaning: 'अपना',
    simpleExplanation: 'Refers to something belonging to oneself.',
  },
  {
    id: 'common-apni',
    word: 'Apni',
    transliteration: 'apni',
    englishMeaning: 'one’s own',
    hindiMeaning: 'अपनी',
    simpleExplanation: 'A gender/number form of one’s own.',
  },
  {
    id: 'common-apne',
    word: 'Apne',
    transliteration: 'apne',
    englishMeaning: 'one’s own',
    hindiMeaning: 'अपने',
    simpleExplanation: 'A plural or oblique form of one’s own.',
  },
  {
    id: 'common-liye',
    word: 'Liye',
    transliteration: 'liye',
    englishMeaning: 'for, in order to',
    hindiMeaning: 'लिए, हेतु',
    simpleExplanation: 'Used to indicate purpose or intention.',
  },
  {
    id: 'common-phir',
    word: 'Phir',
    transliteration: 'phir',
    englishMeaning: 'again, then',
    hindiMeaning: 'फिर, दोबारा',
    simpleExplanation: 'Used for repetition or the next step.',
  },
  {
    id: 'common-kabhi',
    word: 'Kabhi',
    transliteration: 'kabhi',
    englishMeaning: 'sometimes, ever',
    hindiMeaning: 'कभी',
    simpleExplanation: 'Refers to some time, ever, or at times.',
  },
  {
    id: 'common-har',
    word: 'Har',
    transliteration: 'har',
    englishMeaning: 'every, each',
    hindiMeaning: 'हर, प्रत्येक',
    simpleExplanation: 'Used for all items one by one.',
  },
  {
    id: 'common-ek',
    word: 'Ek',
    transliteration: 'ek',
    englishMeaning: 'one, a',
    hindiMeaning: 'एक',
    simpleExplanation: 'The number one, often also meaning a.',
  },
  {
    id: 'common-aur',
    word: 'Aur',
    transliteration: 'aur',
    englishMeaning: 'and, more, another',
    hindiMeaning: 'और, अधिक, दूसरा',
    simpleExplanation: 'A common connector meaning and or more.',
  },
  {
    id: 'common-jab',
    word: 'Jab',
    transliteration: 'jab',
    englishMeaning: 'when',
    hindiMeaning: 'जब',
    simpleExplanation: 'Refers to a point in time.',
  },
  {
    id: 'common-kya',
    word: 'Kya',
    transliteration: 'kya',
    englishMeaning: 'what',
    hindiMeaning: 'क्या',
    simpleExplanation: 'Used in questions or for emphasis.',
  },
  {
    id: 'common-kyun',
    word: 'Kyun',
    transliteration: 'kyun',
    englishMeaning: 'why',
    hindiMeaning: 'क्यों',
    simpleExplanation: 'Asks the reason for something.',
  },
  {
    id: 'common-aa',
    word: 'Aa',
    transliteration: 'aa',
    englishMeaning: 'come',
    hindiMeaning: 'आ',
    simpleExplanation: 'An imperative form meaning come.',
  },
  {
    id: 'common-aao',
    word: 'Aao',
    transliteration: 'aao',
    englishMeaning: 'come',
    hindiMeaning: 'आओ',
    simpleExplanation: 'An inviting form of come.',
  },
  {
    id: 'common-ja',
    word: 'Ja',
    transliteration: 'ja',
    englishMeaning: 'go',
    hindiMeaning: 'जा',
    simpleExplanation: 'An imperative form meaning go.',
  },
  {
    id: 'common-dil',
    word: 'Dil',
    transliteration: 'dil',
    englishMeaning: 'heart',
    hindiMeaning: 'दिल, हृदय',
    simpleExplanation: 'The heart, often used for emotions in poetry.',
  },
  {
    id: 'common-sahi',
    word: 'Sahi',
    transliteration: 'sahi',
    englishMeaning: 'right, correct, even if it is so',
    hindiMeaning: 'सही, ठीक, चाहे ऐसा ही हो',
    simpleExplanation: 'Can mean correct, or in poetry it can mean even if that is the case.',
  },
  {
    id: 'common-ranjish',
    word: 'Ranjish',
    transliteration: 'ranjish',
    englishMeaning: 'resentment, grievance, hurt feeling',
    hindiMeaning: 'रंजिश, शिकायत, मनमुटाव',
    simpleExplanation: 'A feeling of hurt, complaint, or emotional distance.',
  },
  {
    id: 'common-zamane',
    word: 'Zamane',
    transliteration: 'zamane',
    englishMeaning: 'the world, the times, society',
    hindiMeaning: 'ज़माने, दुनिया, समाज',
    simpleExplanation: 'Refers to the world, society, or the times people live in.',
  },
  {
    id: 'common-khafa',
    word: 'Khafa',
    transliteration: 'khafa',
    englishMeaning: 'angry, upset, displeased',
    hindiMeaning: 'ख़फ़ा, नाराज़',
    simpleExplanation: 'Used when someone is upset or offended.',
  },
  {
    id: 'common-liyeaa',
    word: 'Liye',
    transliteration: 'liye',
    englishMeaning: 'for, in order to',
    hindiMeaning: 'लिए, हेतु',
    simpleExplanation: 'Indicates purpose or intention.',
  },
];

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

  if (normalized.endsWith('e') && normalized.length > 3) {
    candidates.push(normalized.slice(0, -1));
  }

  if (normalized.endsWith('i') && normalized.length > 3) {
    candidates.push(normalized.slice(0, -1));
  }

  if (normalized.endsWith('a') && normalized.length > 3) {
    candidates.push(normalized.slice(0, -1));
  }

  const deDoubledVowel = normalized.replace(/([aeiou])\1+$/u, '$1');
  if (deDoubledVowel !== normalized) {
    candidates.push(deDoubledVowel);
  }

  return [...new Set(candidates.filter(Boolean))];
}

function titleCase(value = '') {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function createFallbackEntry(token = '') {
  const cleaned = token.replace(/[^A-Za-z']/g, '');
  const transliteration = cleaned.toLowerCase();

  return {
    id: `fallback-${normalizeDictionaryKey(cleaned)}`,
    word: titleCase(cleaned),
    transliteration,
    englishMeaning: 'local meaning not added yet',
    hindiMeaning: 'इस शब्द का स्थानीय अर्थ अभी जोड़ा नहीं गया है',
    simpleExplanation:
      'This word is now clickable everywhere. A detailed built-in meaning for it has not been added yet.',
  };
}

export const preparedDictionaryEntries = [...dictionaryEntries, ...commonWordEntries].map((entry) => ({
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

  const normalized = normalizeDictionaryKey(token);
  if (!normalized) {
    return null;
  }

  return createFallbackEntry(token);
}
