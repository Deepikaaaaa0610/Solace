import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Flame,
  Library,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { getCleanText } from '../utils/text';
import InteractivePoetryText from './InteractivePoetryText';

function formatCompactLikes(value = 0) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }

  return `${value}`;
}

export default function HeroSection({
  featuredWork,
  featuredPoet,
  poetryOfDayWorks = [],
  archiveStats = [],
  featuredMoods = [],
}) {
  if (!featuredWork || !featuredPoet) {
    return null;
  }

  const displayText = getCleanText(featuredWork.roman, featuredWork.text);

  return (
    <section className="hero-shell">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy-panel animate-fade-in-up">
            <div className="hero-copy-topline">
              <span className="hero-eyebrow">A more modern literary homepage</span>
              <span className="hero-status">
                <Sparkles size={14} />
                Curated daily
              </span>
            </div>

            <h1 className="hero-headline">Find the line that matches the hour you are in.</h1>
            <p className="hero-description">
              Solace is structured like a polished reading product now: a featured editorial pick, quick
              signals from the archive, and clear paths into poets, moods, and community writing.
            </p>

            <div className="hero-action-row">
              <Link to="/explore" className="btn btn-primary">
                Explore the archive
                <ArrowRight size={16} />
              </Link>
              <Link to={`/poets/${featuredPoet.id}`} className="hero-secondary-link">
                Read {featuredPoet.name}
                <BookOpen size={16} />
              </Link>
            </div>

            <div className="hero-stats-grid">
              {archiveStats.map((stat) => (
                <div key={stat.label} className="hero-stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-feature-stack animate-fade-in-up">
            <article className="hero-feature-card">
              <div className="hero-feature-header">
                <div>
                  <p className="hero-feature-label">Featured reading</p>
                  <h2>{featuredWork.title}</h2>
                </div>
                <span className="hero-feature-badge">
                  <Flame size={14} />
                  Most read
                </span>
              </div>

              <InteractivePoetryText text={displayText} className="hero-feature-text" />

              <div className="hero-feature-meta">
                <span>{featuredPoet.name}</span>
                <span>{featuredWork.type}</span>
                <span>{formatCompactLikes(featuredWork.likes)} likes</span>
              </div>
            </article>

            <div className="hero-secondary-grid">
              <div className="hero-secondary-card">
                <div className="hero-secondary-title">
                  <Library size={18} />
                  <span>Featured moods</span>
                </div>
                <div className="hero-mood-list">
                  {featuredMoods.map((mood) => (
                    <Link key={mood.id} to={`/explore?tag=${mood.name}`} className="hero-mood-pill">
                      <span>{mood.icon}</span>
                      {mood.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hero-secondary-card">
                <div className="hero-secondary-title">
                  <TrendingUp size={18} />
                  <span>Top three today</span>
                </div>
                <div className="hero-mini-list">
                  {poetryOfDayWorks.slice(0, 3).map((work, index) => (
                    <Link key={work.id} to={`/poets/${work.poetId}`} className="hero-mini-item">
                      <span className="hero-mini-rank">0{index + 1}</span>
                      <div>
                        <strong>{work.title}</strong>
                        <p>{work.poetName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
