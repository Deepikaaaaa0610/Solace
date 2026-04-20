import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock3, MessageCircleMore } from 'lucide-react';
import ShayariCard from '../components/ShayariCard';
import { useWhatsappFeature } from '../context/WhatsappFeatureContext';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-IN', {
    dateStyle: 'medium',
  });
}

export default function AuthorProfile({ onSaveWork }) {
  const { slug } = useParams();
  const { getAuthorBySlug, getPublishedSubmissionsByAuthorId, maskPhoneNumber } = useWhatsappFeature();
  const author = getAuthorBySlug(slug);

  if (!author) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <BookOpen size={48} />
          </div>
          <h3>Author not found</h3>
          <p style={{ marginBottom: '1.5rem' }}>This WhatsApp-linked author page does not exist yet.</p>
          <Link to="/poets" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Poets
          </Link>
        </div>
      </div>
    );
  }

  const publishedWorks = getPublishedSubmissionsByAuthorId(author.id);

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="container">
        <Link
          to="/poets"
          className="btn btn-ghost"
          style={{ marginTop: 'var(--space-lg)', display: 'inline-flex' }}
        >
          <ArrowLeft size={16} /> All Poets
        </Link>

        <div className="poet-profile-hero animate-fade-in-up">
          <div className="poet-profile-avatar">
            {author.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="poet-profile-info">
            <h1>{author.displayName}</h1>
            <div className="poet-profile-era">
              <MessageCircleMore size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              WhatsApp linked writer
              <span style={{ margin: '0 12px', color: 'var(--border-hover)' }}>|</span>
              <Clock3 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Joined {formatDate(author.createdAt)}
            </div>
            <p className="poet-profile-bio">{author.bio}</p>

            <div className="poet-profile-stats">
              <div className="poet-stat">
                <div className="poet-stat-value">{author.publishedCount}</div>
                <div className="poet-stat-label">Published</div>
              </div>
              <div className="poet-stat">
                <div className="poet-stat-value">{author.pendingCount}</div>
                <div className="poet-stat-label">Pending</div>
              </div>
              <div className="poet-stat">
                <div className="poet-stat-value">{author.linkedPhones.length}</div>
                <div className="poet-stat-label">Linked Phones</div>
              </div>
              <div className="poet-stat">
                <div className="poet-stat-value">{maskPhoneNumber(author.linkedPhoneNumber)}</div>
                <div className="poet-stat-label">WhatsApp</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section" style={{ paddingTop: 'var(--space-lg)' }}>
          <div className="section-header">
            <h2 className="section-title">Published from WhatsApp</h2>
            <span className="tag">Source: WhatsApp</span>
          </div>

          <div className="shayari-grid">
            {publishedWorks.map((work, index) => (
              <div key={work.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                <ShayariCard
                  shayari={{
                    id: work.id,
                    title: work.title,
                    text: work.normalizedContent,
                    roman: '',
                    type: work.poemType,
                    likes: 0,
                    tags: ['WhatsApp', 'User Submission'],
                  }}
                  poetName={author.displayName}
                  poetId={author.slug}
                  poetPath={`/authors/${author.slug}`}
                  onSaveWork={onSaveWork}
                  showRoman={false}
                />
              </div>
            ))}

            {publishedWorks.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <BookOpen size={48} />
                </div>
                <h3>No published poems yet</h3>
                <p>The author is linked, but nothing has passed moderation yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
