import { Fragment, useMemo, useState } from 'react';
import WordMeaningModal from './WordMeaningModal';
import { findDictionaryEntry } from '../utils/dictionary';

function tokenizePoetry(text = '') {
  return text.match(/([A-Za-z]+(?:'[A-Za-z]+)?|[^A-Za-z]+)/g) || [text];
}

export default function InteractivePoetryText({ text = '', className = '', as = 'p' }) {
  const [activeLookup, setActiveLookup] = useState(null);
  const Component = as;
  const tokens = useMemo(() => tokenizePoetry(text), [text]);

  return (
    <>
      <Component className={`${className} interactive-poetry`.trim()}>
        {tokens.map((token, index) => {
          const entry = findDictionaryEntry(token);

          if (!entry) {
            return <Fragment key={`${token}-${index}`}>{token}</Fragment>;
          }

          return (
            <button
              key={`${token}-${index}`}
              type="button"
              className={`interactive-word ${activeLookup?.tokenIndex === index ? 'active' : ''}`}
              onClick={(event) => {
                event.stopPropagation();
                setActiveLookup({ entry, tokenIndex: index });
              }}
              title={`See meaning of ${token}`}
            >
              {token}
            </button>
          );
        })}
      </Component>

      {activeLookup?.entry && (
        <WordMeaningModal
          entry={activeLookup.entry}
          onClose={() => setActiveLookup(null)}
        />
      )}
    </>
  );
}
