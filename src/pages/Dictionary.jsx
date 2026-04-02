import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Languages } from 'lucide-react';
import { preparedDictionaryEntries } from '../utils/dictionary';

export default function Dictionary() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('query') || '');

  const filteredEntries = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return preparedDictionaryEntries;

    return preparedDictionaryEntries.filter((entry) =>
      entry.word.toLowerCase().includes(value) ||
      entry.transliteration.toLowerCase().includes(value) ||
      entry.englishMeaning.toLowerCase().includes(value) ||
      entry.hindiMeaning.toLowerCase().includes(value) ||
      entry.simpleExplanation.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <div>
      <div className="page-header">
        <h1>Poetry Dictionary</h1>
        <p>Understand difficult Urdu poetry words with simple Hindi and English meanings</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-lg)' }}>
        <div className="dictionary-toolbar card">
          <div>
            <p className="dictionary-kicker">Built for readers</p>
            <h2>Search difficult words quickly</h2>
          </div>

          <div className="dictionary-search">
            <Search size={18} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a word, meaning, or transliteration..."
            />
          </div>
        </div>

        <p className="dictionary-count">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'word' : 'words'}
          {query ? ` for "${query}"` : ' in the dictionary'}
        </p>

        {filteredEntries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Languages size={48} />
            </div>
            <h3>No matching word found</h3>
            <p>Try another spelling or search using an English meaning.</p>
          </div>
        ) : (
          <div className="dictionary-grid">
            {filteredEntries.map((entry) => (
              <article key={entry.id} className="card dictionary-card">
                <div className="dictionary-card-header">
                  <div>
                    <p className="dictionary-word">{entry.word}</p>
                    <p className="dictionary-transliteration">{entry.transliteration}</p>
                  </div>
                  <span className="dictionary-badge">Meaning</span>
                </div>

                <div className="dictionary-meaning-block">
                  <span>English</span>
                  <p>{entry.englishMeaning}</p>
                </div>

                <div className="dictionary-meaning-block">
                  <span>Hindi</span>
                  <p>{entry.hindiMeaning}</p>
                </div>

                <div className="dictionary-meaning-block">
                  <span>Simple Explanation</span>
                  <p>{entry.simpleExplanation}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
