import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import PoetCard from '../components/PoetCard';
import ShayariCard from '../components/ShayariCard';
import CommunityPost from '../components/CommunityPost';
import LatestNewsSection from '../components/LatestNewsSection';
import { poets, getAllWorks } from '../data/poets';
import { categories } from '../data/shayaris';

export default function Home({ communityPosts, onLikePost, onBookmarkPost, onSaveToNotebook }) {
  const [newsArticles, setNewsArticles] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');
  const allWorks = getAllWorks();
  const featuredWork = allWorks[0];
  const featuredPoet = poets.find((poet) => poet.id === featuredWork?.poetId);
  const poetryOfDayWorks = allWorks.slice(0, 5);
  const trendingShayaris = allWorks.slice(0, 6);

  useEffect(() => {
    let active = true;

    async function loadNews() {
      try {
        setNewsLoading(true);
        setNewsError('');

        const response = await fetch('/api/news');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to fetch poetry news.');
        }

        if (active) {
          setNewsArticles(data.articles || []);
        }
      } catch (error) {
        if (active) {
          setNewsError(error instanceof Error ? error.message : 'Unable to fetch poetry news.');
        }
      } finally {
        if (active) {
          setNewsLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <HeroSection
        featuredWork={featuredWork}
        featuredPoet={featuredPoet}
        poetryOfDayWorks={poetryOfDayWorks}
      />

      <LatestNewsSection
        articles={newsArticles}
        loading={newsLoading}
        error={newsError}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Legendary Poets</h2>
            <Link to="/poets" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="poets-scroll">
            {poets.map((poet, i) => (
              <div key={poet.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <PoetCard poet={poet} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <Sparkles size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', color: 'var(--gold)' }} />
              Trending Shayaris
            </h2>
            <Link to="/explore" className="section-link">
              Explore All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="shayari-grid">
            {trendingShayaris.map((work, i) => (
              <div key={work.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <ShayariCard
                  shayari={work}
                  poetName={work.poetName}
                  poetId={work.poetId}
                  onSaveToNotebook={onSaveToNotebook}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore by Mood</h2>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link to={`/explore?tag=${cat.name}`} key={cat.id}>
                <div
                  className="card category-card animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="category-icon">{cat.icon}</div>
                  <div className="category-name">{cat.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                    {cat.nameHi}
                  </div>
                  <div className="category-count">{cat.count} shayaris</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">From the Community</h2>
            <Link to="/community" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="community-feed">
            {communityPosts.slice(0, 3).map((post, i) => (
              <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CommunityPost
                  post={post}
                  onLike={onLikePost}
                  onBookmark={onBookmarkPost}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/community" className="btn btn-outline">
              See More from Community <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
