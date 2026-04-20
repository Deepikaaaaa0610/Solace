import { Link } from 'react-router-dom';
import { BookOpen, MessageCircleMore } from 'lucide-react';

export default function AuthorCard({ author }) {
  return (
    <Link to={`/authors/${author.slug}`} className="card author-card">
      <div className="author-card-top">
        <div className="author-card-avatar">
          {author.displayName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h3>{author.displayName}</h3>
          <p>{author.hometown}</p>
        </div>
      </div>

      <p className="author-card-bio">{author.bio}</p>

      <div className="author-card-meta">
        <span className="tag">
          <MessageCircleMore size={12} style={{ marginRight: 4 }} />
          WhatsApp linked
        </span>
        <span className="tag">
          <BookOpen size={12} style={{ marginRight: 4 }} />
          {author.publishedCount} published
        </span>
      </div>
    </Link>
  );
}
