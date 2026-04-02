import { ExternalLink, Newspaper } from 'lucide-react';

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function LatestNewsSection({ articles, loading, error }) {
  return (
    <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest Poetry News</h2>
        </div>

        {loading && (
          <div className="news-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="news-card skeleton" style={{ minHeight: '320px' }} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Newspaper size={48} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Poetry news is unavailable</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="news-grid">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="news-card"
              >
                {article.image ? (
                  <img src={article.image} alt={article.title} className="news-card-image" />
                ) : (
                  <div className="news-card-placeholder">
                    <Newspaper size={38} />
                  </div>
                )}

                <div className="news-card-body">
                  <div className="news-card-meta">
                    <span>{article.source}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="news-card-title">{article.title}</h3>
                  <p className="news-card-description">{article.description}</p>
                  <span className="news-card-link">
                    Read story <ExternalLink size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
