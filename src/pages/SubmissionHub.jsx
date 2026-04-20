import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock3, Link2, MessageCircleMore, Send, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWhatsappFeature } from '../context/WhatsappFeatureContext';

function formatDate(value) {
  return new Date(value).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function getStatusTone(status) {
  if (status === 'published') return 'success';
  if (status === 'rejected') return 'danger';
  if (status === 'awaiting_link') return 'warning';
  return 'neutral';
}

export default function SubmissionHub() {
  const { user } = useAuth();
  const {
    currentAuthor,
    featureConfig,
    submissions,
    unmatchedSubmissions,
    linkWhatsappNumber,
    submitWhatsappPoem,
    maskPhoneNumber,
  } = useWhatsappFeature();

  const [phoneNumber, setPhoneNumber] = useState(user?.contactType === 'phone' ? user.contact : '');
  const [poemText, setPoemText] = useState(`Chand ne raat ki teh mein jo rakha tha ek raaz\nSubah tak mere qalam ne usay misra kar diya`);
  const [feedback, setFeedback] = useState('');
  const [feedbackTone, setFeedbackTone] = useState('neutral');

  const authorSubmissions = useMemo(() => {
    if (!currentAuthor) return [];
    return submissions.filter((submission) => submission.authorId === currentAuthor.id);
  }, [currentAuthor, submissions]);

  const authorUnmatched = useMemo(() => {
    if (!currentAuthor?.linkedPhoneNumber) return [];
    return unmatchedSubmissions.filter(
      (submission) => submission.phoneNumber === currentAuthor.linkedPhoneNumber
    );
  }, [currentAuthor?.linkedPhoneNumber, unmatchedSubmissions]);

  const handleLinkPhone = (event) => {
    event.preventDefault();
    const result = linkWhatsappNumber(user, phoneNumber);
    setFeedback(
      result.ok
        ? `WhatsApp linked to ${result.phoneNumber}. ${result.migratedCount} queued submission(s) reconciled.`
        : result.error
    );
    setFeedbackTone(result.ok ? 'success' : 'danger');
  };

  const handleSimulateWebhook = (event) => {
    event.preventDefault();
    const result = submitWhatsappPoem({ phoneNumber, messageText: poemText });
    setFeedback(
      result.ok
        ? result.type === 'matched'
          ? `Inbound message stored and marked ${result.status.replace(/_/g, ' ')}.`
          : 'Inbound message stored in unmatched submissions until account linking is completed.'
        : result.error
    );
    setFeedbackTone(result.ok ? 'success' : 'danger');
  };

  return (
    <div>
      <div className="page-header">
        <h1>WhatsApp Submission Hub</h1>
        <p>Link your number, receive poems from WhatsApp, and track what reaches your public author page.</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-lg)' }}>
        <div className="feature-grid">
          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Author identity</p>
                <h2>{currentAuthor?.displayName || user?.name}</h2>
              </div>
              <span className="tag">
                <ShieldCheck size={12} style={{ marginRight: 4 }} />
                {featureConfig.autoPublishKnownAuthors ? 'Auto-publish enabled' : 'Moderated flow'}
              </span>
            </div>

            <div className="feature-stats-grid">
              <div className="feature-stat-card">
                <span>Linked WhatsApp</span>
                <strong>{currentAuthor?.linkedPhoneNumber ? maskPhoneNumber(currentAuthor.linkedPhoneNumber) : 'Not linked'}</strong>
              </div>
              <div className="feature-stat-card">
                <span>Published poems</span>
                <strong>{currentAuthor?.publishedCount || 0}</strong>
              </div>
              <div className="feature-stat-card">
                <span>Pending review</span>
                <strong>{currentAuthor?.pendingCount || 0}</strong>
              </div>
              <div className="feature-stat-card">
                <span>Source</span>
                <strong>WhatsApp</strong>
              </div>
            </div>

            {currentAuthor && (
              <div className="feature-inline-note">
                <CheckCircle2 size={16} />
                <span>
                  Public author page:
                  {' '}
                  <Link to={`/authors/${currentAuthor.slug}`}>{currentAuthor.displayName}</Link>
                </span>
              </div>
            )}
          </div>

          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Linking</p>
                <h2>Connect your WhatsApp number</h2>
              </div>
              <Link2 size={18} />
            </div>

            <form className="feature-form" onSubmit={handleLinkPhone}>
              <label htmlFor="whatsapp-number">WhatsApp number</label>
              <input
                id="whatsapp-number"
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="+91 98765 43210"
              />
              <button className="btn btn-primary" type="submit">
                <Link2 size={16} />
                Link number
              </button>
            </form>
          </div>
        </div>

        <div className="feature-grid" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Webhook simulator</p>
                <h2>Simulate an inbound WhatsApp poem</h2>
              </div>
              <MessageCircleMore size={18} />
            </div>

            <form className="feature-form" onSubmit={handleSimulateWebhook}>
              <label htmlFor="poem-message">Poem text</label>
              <textarea
                id="poem-message"
                rows={8}
                value={poemText}
                onChange={(event) => setPoemText(event.target.value)}
                placeholder="Paste the exact text received from WhatsApp"
              />
              <button className="btn btn-primary" type="submit">
                <Send size={16} />
                Simulate inbound message
              </button>
            </form>

            {feedback && (
              <p className={`feature-feedback ${feedbackTone}`}>
                {feedback}
              </p>
            )}
          </div>

          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Current flow</p>
                <h2>What happens next</h2>
              </div>
              <Clock3 size={18} />
            </div>

            <div className="feature-timeline">
              <div className="feature-timeline-item">
                <strong>1. Inbound capture</strong>
                <p>WhatsApp webhook receives the sender number and message text.</p>
              </div>
              <div className="feature-timeline-item">
                <strong>2. Identity match</strong>
                <p>Phone number is matched against linked accounts. Unknown numbers remain in the unmatched queue.</p>
              </div>
              <div className="feature-timeline-item">
                <strong>3. Moderation</strong>
                <p>Known authors are queued or auto-published based on moderation mode.</p>
              </div>
              <div className="feature-timeline-item">
                <strong>4. Public visibility</strong>
                <p>Published poems appear on the author profile and can be featured elsewhere on the site.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-grid" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Recent submissions</p>
                <h2>Your WhatsApp queue</h2>
              </div>
            </div>

            <div className="feature-list">
              {authorSubmissions.length === 0 ? (
                <p className="text-muted">No submissions have been matched to your author record yet.</p>
              ) : (
                authorSubmissions.map((submission) => (
                  <div key={submission.id} className="feature-list-item">
                    <div>
                      <strong>{submission.title}</strong>
                      <p>{submission.normalizedContent.slice(0, 120)}{submission.normalizedContent.length > 120 ? '...' : ''}</p>
                    </div>
                    <div className="feature-list-side">
                      <span className={`status-pill ${getStatusTone(submission.status)}`}>
                        {submission.status.replace(/_/g, ' ')}
                      </span>
                      <small>{formatDate(submission.createdAt)}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Reconciliation queue</p>
                <h2>Waiting for account linkage</h2>
              </div>
            </div>

            <div className="feature-list">
              {authorUnmatched.length === 0 ? (
                <p className="text-muted">No unmatched items are waiting on your linked number.</p>
              ) : (
                authorUnmatched.map((submission) => (
                  <div key={submission.id} className="feature-list-item">
                    <div>
                      <strong>{submission.title}</strong>
                      <p>{submission.normalizedContent.slice(0, 120)}{submission.normalizedContent.length > 120 ? '...' : ''}</p>
                    </div>
                    <div className="feature-list-side">
                      <span className={`status-pill ${getStatusTone(submission.status)}`}>
                        awaiting link
                      </span>
                      <small>{formatDate(submission.createdAt)}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
