import { Link } from 'react-router-dom';

export default function PoetCard({ poet }) {
  const fallbackLabel = poet.avatar || poet.name?.charAt(0) || '?';

  return (
    <Link to={`/poets/${poet.id}`} className="poet-card">
      <div className="poet-avatar">
        {poet.image ? (
          <img
            src={poet.image}
            alt={poet.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.poet-avatar-fallback');
              if (fallback) {
                fallback.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <span className="poet-avatar-fallback" style={poet.image ? { display: 'none' } : {}}>{fallbackLabel}</span>
      </div>
      <h3 className="poet-name">{poet.name}</h3>
      <p className="poet-era">{poet.era}</p>
      <p className="poet-short-bio">{poet.shortBio}</p>
    </Link>
  );
}
