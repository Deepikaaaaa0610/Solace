import { Link } from 'react-router-dom';

export default function PoetCard({ poet }) {
  return (
    <Link to={`/poets/${poet.id}`} className="poet-card">
      <div className="poet-avatar">
        {poet.image ? (
          <img
            src={poet.image}
            alt={poet.name}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <span className="poet-avatar-fallback" style={poet.image ? { display: 'none' } : {}}>{poet.avatar}</span>
      </div>
      <h3 className="poet-name">{poet.name}</h3>
      <p className="poet-era">{poet.era}</p>
      <p className="poet-short-bio">{poet.shortBio}</p>
    </Link>
  );
}
