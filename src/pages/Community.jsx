import { useState } from 'react';
import { Plus, TrendingUp, Clock, Heart } from 'lucide-react';
import CommunityPost from '../components/CommunityPost';
import CreatePost from '../components/CreatePost';

export default function Community({ posts, onAddPost, onLikePost, onBookmarkPost }) {
  const [showCreate, setShowCreate] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'trending') return b.likes - a.likes;
    if (sortBy === 'most-liked') return b.likes - a.likes;
    return 0;
  });

  return (
    <div>
      <div className="page-header">
        <h1>Community</h1>
        <p>Where new voices rise - share your poetry with the world</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-lg)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '620px',
          margin: '0 auto var(--space-xl)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
        >
          <div className="community-sort">
            <button
              className={`tag ${sortBy === 'latest' ? 'active' : ''}`}
              onClick={() => setSortBy('latest')}
            >
              <Clock size={12} style={{ marginRight: '4px' }} /> Latest
            </button>
            <button
              className={`tag ${sortBy === 'trending' ? 'active' : ''}`}
              onClick={() => setSortBy('trending')}
            >
              <TrendingUp size={12} style={{ marginRight: '4px' }} /> Trending
            </button>
            <button
              className={`tag ${sortBy === 'most-liked' ? 'active' : ''}`}
              onClick={() => setSortBy('most-liked')}
            >
              <Heart size={12} style={{ marginRight: '4px' }} /> Most Liked
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Write Poetry
          </button>
        </div>

        <div className="community-feed">
          {sortedPosts.map((post, i) => (
            <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <CommunityPost
                post={post}
                onLike={onLikePost}
                onBookmark={onBookmarkPost}
              />
            </div>
          ))}

          {sortedPosts.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Plus size={48} />
              </div>
              <h3>No poems yet</h3>
              <p style={{ marginBottom: '1rem' }}>Be the first to share your poetry!</p>
              <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                <Plus size={18} /> Write Poetry
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        className="fab"
        onClick={() => setShowCreate(true)}
        aria-label="Write poetry"
        title="Write poetry"
      >
        <Plus size={28} />
      </button>

      <CreatePost
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={onAddPost}
      />
    </div>
  );
}
