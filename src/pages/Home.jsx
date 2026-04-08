import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Notebook,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import PoetCard from '../components/PoetCard';
import ShayariCard from '../components/ShayariCard';
import CommunityPost from '../components/CommunityPost';
import LatestNewsSection from '../components/LatestNewsSection';
import { poets, getAllWorks } from '../data/poets';
import { categories } from '../data/shayaris';

export default function Home({ communityPosts, onLikePost, onBookmarkPost, onSaveWork }) {
  const [newsArticles, setNewsArticles] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');
  const allWorks = getAllWorks();
  const featuredWork = allWorks[0];
  const featuredPoet = poets.find((poet) => poet.id === featuredWork?.poetId);
  const poetryOfDayWorks = allWorks.slice(0, 5);
  const trendingShayaris = allWorks.slice(0, 4);
  const featuredPoets = poets.slice(0, 4);
  const featuredMoods = categories.slice(0, 5);
  const communityLead = communityPosts[0];
  const communityPreview = communityPosts.slice(1, 3);
  const totalLikes = allWorks.reduce((sum, work) => sum + (work.likes ?? 0), 0);

  const archiveStats = [
    { value: `${poets.length}+`, label: 'featured poets' },
    { value: `${allWorks.length}+`, label: 'readable works' },
    { value: `${Math.round(totalLikes / 1000)}k`, label: 'reader appreciations' },
    { value: `${communityPosts.length}`, label: 'community voices' },
  ];

  const browseDestinations = [
    {
      title: 'Explore the archive',
      description: 'Jump straight into ghazals, nazms, sher, and topic-led discovery.',
      icon: Compass,
      to: '/explore',
    },
    {
      title: 'Study the masters',
      description: 'Move through poet profiles with context, biography, and their most-read work.',
      icon: BookOpen,
      to: '/poets',
    },
    {
      title: 'Keep your own notebook',
      description: 'Save pieces, draft notes, and build a personal reading practice.',
      icon: Notebook,
      to: '/notebook',
    },
  ];

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
    <div className="home-shell">
      <HeroSection
        featuredWork={featuredWork}
        featuredPoet={featuredPoet}
        poetryOfDayWorks={poetryOfDayWorks}
        archiveStats={archiveStats}
        featuredMoods={featuredMoods}
      />

      <LatestNewsSection
        articles={newsArticles}
        loading={newsLoading}
        error={newsError}
      />

      <section className="section home-discovery-section">
        <div className="container">
          <div className="home-section-intro">
            <div>
              <p className="home-section-kicker">Browse with intent</p>
              <h2 className="home-section-title">A cleaner entry point into a large archive.</h2>
            </div>
            <p className="home-section-copy">
              The strongest literary products feel less like a feed and more like a guided reading room.
              These routes give the site that structure.
            </p>
          </div>

          <div className="discover-grid">
            {browseDestinations.map(({ title, description, icon: Icon, to }) => (
              <Link key={title} to={to} className="discover-card">
                <span className="discover-icon">
                  <Icon size={20} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="discover-link">
                  Open
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-poets-section">
        <div className="container">
          <div className="split-section-heading">
            <div>
              <p className="home-section-kicker">Editorial pick</p>
              <h2 className="home-section-title">Start with poets who define the canon.</h2>
            </div>
            <Link to="/poets" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="poet-spotlight-grid">
            <div className="poet-spotlight-card">
              <p className="poet-spotlight-label">Why this works</p>
              <h3>{featuredPoet?.name}</h3>
              <p>
                Lead with one authoritative voice, then let the user fan outward. That mirrors the better
                product-led archive sites: one strong entry point, then a clear grid of adjacent paths.
              </p>
              <div className="poet-spotlight-metrics">
                <span>{featuredPoet?.era}</span>
                <span>{featuredPoet?.birthPlace}</span>
              </div>
            </div>

            <div className="poet-showcase-grid">
              {featuredPoets.map((poet) => (
                <PoetCard key={poet.id} poet={poet} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section home-trending-section">
        <div className="container">
          <div className="split-section-heading">
            <div>
              <p className="home-section-kicker">High-signal reading</p>
              <h2 className="home-section-title">Trending works, but presented with more restraint.</h2>
            </div>
            <div className="home-heading-chip">
              <TrendingUp size={16} />
              Reader momentum
            </div>
          </div>

          <div className="curated-work-grid">
            {trendingShayaris.map((work, index) => (
              <div
                key={work.id}
                className={`curated-work-card ${index === 0 ? 'is-featured' : ''}`}
              >
                <ShayariCard
                  shayari={work}
                  poetName={work.poetName}
                  poetId={work.poetId}
                  onSaveWork={onSaveWork}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-community-section">
        <div className="container">
          <div className="split-section-heading">
            <div>
              <p className="home-section-kicker">Live voices</p>
              <h2 className="home-section-title">Community writing deserves a stronger stage.</h2>
            </div>
            <Link to="/community" className="section-link">
              Visit Community <ArrowRight size={16} />
            </Link>
          </div>

          <div className="community-showcase">
            <div className="community-lead-panel">
              <div className="community-lead-header">
                <span className="home-heading-chip">
                  <Users size={16} />
                  New writing
                </span>
                <span className="community-lead-count">{communityPosts.length} active posts</span>
              </div>
              <h3>{communityLead?.title || 'Community spotlight'}</h3>
              <p>
                The homepage now treats user submissions like a cultural signal, not an afterthought.
                That is closer to the stronger creator and editorial platforms on the web right now.
              </p>
              <Link to="/community" className="btn btn-primary">
                Join the conversation
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="community-preview-grid">
              {communityPreview.map((post) => (
                <CommunityPost
                  key={post.id}
                  post={post}
                  onLike={onLikePost}
                  onBookmark={onBookmarkPost}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section home-moods-section">
        <div className="container">
          <div className="split-section-heading">
            <div>
              <p className="home-section-kicker">Fast discovery</p>
              <h2 className="home-section-title">Browse by mood without dropping into a generic card wall.</h2>
            </div>
            <span className="home-heading-chip">
              <Sparkles size={16} />
              Curated moods
            </span>
          </div>

          <div className="mood-grid">
            {categories.map((category) => (
              <Link to={`/explore?tag=${category.name}`} key={category.id} className="mood-card">
                <span className="mood-icon">{category.icon}</span>
                <strong>{category.name}</strong>
                <span>{category.nameHi}</span>
                <em>{category.count} works</em>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
