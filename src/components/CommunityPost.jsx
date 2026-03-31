import { useState } from 'react';
import { Heart, Bookmark, MessageCircle, Share2 } from 'lucide-react';

function timeAgo(ts) {
  if (typeof ts === 'string') return ts;
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function CommunityPost({ post, onLike, onBookmark }) {
  const handleLike = () => {
    if (onLike) onLike(post.id);
  };

  const handleBookmark = () => {
    if (onBookmark) onBookmark(post.id);
  };

  return (
    <div className="card community-post">
      <div className="community-post-header">
        <div className="community-post-avatar">{post.avatar}</div>
        <div className="community-post-user">
          <div className="community-post-username">{post.displayName}</div>
          <div className="community-post-time">@{post.username} · {timeAgo(post.timestamp)}</div>
        </div>
      </div>

      <div className="community-post-body">
        {post.title && post.title !== 'Untitled' && (
          <div className="community-post-title">{post.title}</div>
        )}
        <p className="community-post-text">{post.text}</p>
        {post.roman && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginTop: '0.75rem',
            lineHeight: 1.7,
            fontStyle: 'normal',
            whiteSpace: 'pre-line',
          }}>
            {post.roman}
          </p>
        )}
        {post.tags && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {post.tags.map(tag => (
              <span key={tag} className="tag" style={{ cursor: 'default' }}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="community-post-footer">
        <button
          className={`shayari-action-btn ${post.liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
        <button className="shayari-action-btn">
          <MessageCircle size={16} />
          <span>{post.comments}</span>
        </button>
        <button
          className={`shayari-action-btn ${post.bookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmark}
        >
          <Bookmark size={16} fill={post.bookmarked ? 'currentColor' : 'none'} />
        </button>
        <button className="shayari-action-btn">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}
