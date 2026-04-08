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
    <section className="section news-section">
      <div className="container">
        <div className="split-section-heading">
          <div>
            <p className="home-section-kicker">Outside the archive</p>
            <h2 className="home-section-title">Recent poetry and culture signals.</h2>
          </div>
          <p className="home-section-copy news-section-copy">
            Strong editorial homepages mix timeless content with fresh context. This stream keeps the site
            from feeling static.
          </p>
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
            {articles.slice(0, 3).map((article) => (
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
