import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Flame, TrendingUp } from 'lucide-react';
import { getCleanText } from '../utils/text';
import InteractivePoetryText from './InteractivePoetryText';

function formatCompactLikes(value = 0) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }

  return `${value}`;
}

export default function HeroSection({ featuredWork, featuredPoet, poetryOfDayWorks = [] }) {
  if (!featuredWork || !featuredPoet) {
    return null;
  }

  const displayText = getCleanText(featuredWork.roman, featuredWork.text);

  return (
    <section className="hero-poster-shell">
      <div className="container">
        <div className="hero-poster animate-fade-in-up">
          <div className="hero-poster-panel">
            <span className="hero-poster-meta">Featured Poet</span>
            <strong>{featuredPoet.name}</strong>
            <span className="hero-poster-date">{featuredPoet.era}</span>
          </div>

          <div className="hero-poster-copy">
            <div className="hero-poster-badge">
              <Flame size={16} />
              <span>Most Read On Solace</span>
            </div>

            <p className="hero-poster-kicker">Poetry of the Day</p>
            <h1 className="hero-poster-title">{featuredWork.title}</h1>

            <InteractivePoetryText text={displayText} className="hero-poster-text" />

            <div className="hero-poster-author">
              <span>{featuredPoet.name}</span>
              <span>{featuredWork.type}</span>
              <span>{formatCompactLikes(featuredWork.likes)} likes</span>
            </div>

            <div className="hero-poster-actions">
              <Link to={`/poets/${featuredPoet.id}`} className="btn btn-primary">
                <BookOpen size={18} />
                Read Poet
              </Link>
              <Link to="/explore" className="btn hero-poster-outline">
                Explore Poetry
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-poster-image-wrap">
            <div className="hero-poster-brand">solace</div>
            {featuredPoet.image ? (
              <img
                src={featuredPoet.image}
                alt={featuredPoet.name}
                className="hero-poster-image"
              />
            ) : (
              <div className="hero-poster-fallback">{featuredPoet.name.charAt(0)}</div>
            )}
          </div>
        </div>

        <div className="hero-day-strip animate-fade-in-up">
          <div className="hero-day-heading">
            <div>
              <p className="hero-day-label">Today&apos;s Top 5</p>
              <h2>Poetry of the Day</h2>
            </div>
            <TrendingUp size={22} />
          </div>

          <div className="hero-day-grid">
            {poetryOfDayWorks.map((work, index) => (
              <Link
                key={work.id}
                to={`/poets/${work.poetId}`}
                className="hero-day-card"
              >
                <span className="hero-day-rank">0{index + 1}</span>
                <p className="hero-day-line">{getCleanText(work.roman, work.text)}</p>
                <div className="hero-day-footer">
                  <span>{work.poetName}</span>
                  <span>{formatCompactLikes(work.likes)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
