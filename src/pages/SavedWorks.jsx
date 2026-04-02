import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import InteractivePoetryText from '../components/InteractivePoetryText';

export default function SavedWorks({ savedWorks, onRemoveWork }) {
  const works = savedWorks || [];

  return (
    <div>
      <div className="page-header">
        <h1>Saved Works</h1>
        <p>Your bookmarked poetry lives here separately from your notebook drafts.</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="saved-works-toolbar card">
          <div>
            <p className="saved-works-kicker">Your Collection</p>
            <h2>Poems you wanted to keep</h2>
          </div>
          <span className="saved-works-count">
            {works.length} {works.length === 1 ? 'work' : 'works'}
          </span>
        </div>

        {works.length === 0 ? (
          <div className="empty-state card saved-works-empty">
            <div className="empty-state-icon">
              <Bookmark size={48} />
            </div>
            <h3>No saved works yet</h3>
            <p>Use the bookmark button on any poem card and it will appear here.</p>
          </div>
        ) : (
          <div className="saved-works-grid">
            {works.map((work) => (
              <article key={work.id} className="card saved-work-card">
                <div className="saved-work-header">
                  <div>
                    <p className="saved-work-type">{work.type}</p>
                    <h3 className="saved-work-title">{work.title}</h3>
                  </div>
                  <button
                    className="btn-icon saved-work-remove"
                    onClick={() => onRemoveWork(work.id)}
                    aria-label={`Remove ${work.title}`}
                    title="Remove from saved works"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <InteractivePoetryText text={work.text} className="saved-work-text" />

                {work.roman && (
                  <p className="saved-work-roman">{work.roman}</p>
                )}

                <div className="saved-work-tags">
                  {(work.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="tag" style={{ cursor: 'default' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="saved-work-footer">
                  <Link to={`/poets/${work.poetId}`} className="saved-work-link">
                    {work.poetName}
                  </Link>
                  <span>{work.likes} likes</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
