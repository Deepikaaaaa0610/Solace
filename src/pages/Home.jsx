import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import PoetCard from '../components/PoetCard';
import ShayariCard from '../components/ShayariCard';
import CommunityPost from '../components/CommunityPost';
import { poets, getAllWorks } from '../data/poets';
import { categories } from '../data/shayaris';

export default function Home({ communityPosts, onLikePost, onBookmarkPost }) {
  const allWorks = getAllWorks();
  const trendingShayaris = allWorks.slice(0, 6);

  return (
    <div>
      <HeroSection />

      {/* Legendary Poets Section */}
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

      {/* Trending Shayaris */}
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
                <ShayariCard shayari={work} poetName={work.poetName} poetId={work.poetId} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore by Mood</h2>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link to="/explore" key={cat.id}>
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

      {/* From the Community */}
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
