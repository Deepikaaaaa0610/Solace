import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ShayariCard from '../components/ShayariCard';
import { getAllWorks } from '../data/poets';
import { categories } from '../data/shayaris';

export default function Explore({ searchQuery }) {
  const [activeTag, setActiveTag] = useState('All');
  const allWorks = getAllWorks();

  const filteredWorks = useMemo(() => {
    let results = allWorks;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(w =>
        w.text.toLowerCase().includes(q) ||
        (w.roman && w.roman.toLowerCase().includes(q)) ||
        w.poetName.toLowerCase().includes(q) ||
        w.title.toLowerCase().includes(q) ||
        (w.tags && w.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (activeTag !== 'All') {
      results = results.filter(w => w.tags && w.tags.includes(activeTag));
    }

    return results;
  }, [allWorks, activeTag, searchQuery]);

  const allTags = ['All', ...new Set(allWorks.flatMap(w => w.tags || []))];

  return (
    <div>
      <div className="page-header">
        <h1>Explore Poetry</h1>
        <p>Discover ghazals, nazms, and shayaris from the greatest poets</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-xl)' }}>
        {/* Filter tags */}
        <div className="explore-filters">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
          {filteredWorks.length} {filteredWorks.length === 1 ? 'result' : 'results'}
          {activeTag !== 'All' ? ` in "${activeTag}"` : ''}
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </p>

        {/* Grid */}
        {filteredWorks.length > 0 ? (
          <div className="shayari-grid">
            {filteredWorks.map((work, i) => (
              <div key={work.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <ShayariCard shayari={work} poetName={work.poetName} poetId={work.poetId} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No poems found</h3>
            <p>Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
