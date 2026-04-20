import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock3, ShieldCheck, UserRoundSearch } from 'lucide-react';
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

export default function AdminModeration() {
  const { user } = useAuth();
  const {
    featureConfig,
    submissions,
    unmatchedSubmissions,
    moderationLogs,
    setModerationMode,
    moderateSubmission,
    authors,
    maskPhoneNumber,
  } = useWhatsappFeature();

  const [moderationNote, setModerationNote] = useState('Reviewed from dashboard.');
  const queue = useMemo(
    () => submissions.filter((submission) => submission.status === 'pending_review'),
    [submissions]
  );

  if (!user?.isAdmin) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: 'var(--space-4xl)' }}>
        <div className="protected-gate-content animate-fade-in-up">
          <div className="protected-gate-icon">
            <ShieldCheck size={32} />
          </div>
          <h2>Admin access required</h2>
          <p>Use `admin@solace.com` in the demo login flow to access moderation controls.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>WhatsApp Moderation</h1>
        <p>Review matched submissions, reconcile unknown numbers, and control publishing mode.</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-lg)' }}>
        <div className="feature-stats-grid">
          <div className="feature-stat-card">
            <span>Pending review</span>
            <strong>{queue.length}</strong>
          </div>
          <div className="feature-stat-card">
            <span>Unmatched queue</span>
            <strong>{unmatchedSubmissions.length}</strong>
          </div>
          <div className="feature-stat-card">
            <span>Published</span>
            <strong>{submissions.filter((submission) => submission.status === 'published').length}</strong>
          </div>
          <div className="feature-stat-card">
            <span>Linked authors</span>
            <strong>{authors.filter((author) => author.linkedPhoneNumber).length}</strong>
          </div>
        </div>

        <div className="feature-grid" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Moderation mode</p>
                <h2>Publishing policy</h2>
              </div>
              <ShieldCheck size={18} />
            </div>

            <div className="moderation-mode-group">
              <button
                className={`moderation-mode-btn ${featureConfig.moderationMode === 'manual_review' ? 'active' : ''}`}
                onClick={() => setModerationMode('manual_review')}
              >
                Keep submissions pending review
              </button>
              <button
                className={`moderation-mode-btn ${featureConfig.moderationMode === 'auto_publish_known_authors' ? 'active' : ''}`}
                onClick={() => setModerationMode('auto_publish_known_authors')}
              >
                Auto-publish for linked authors
              </button>
            </div>

            <label htmlFor="moderation-note" style={{ marginTop: 'var(--space-lg)', display: 'block' }}>
              Default moderation note
            </label>
            <textarea
              id="moderation-note"
              rows={4}
              value={moderationNote}
              onChange={(event) => setModerationNote(event.target.value)}
              style={{ marginTop: '0.6rem' }}
            />
          </div>

          <div className="card feature-panel">
            <div className="feature-panel-header">
              <div>
                <p className="feature-eyebrow">Unmatched submissions</p>
                <h2>Numbers awaiting account linkage</h2>
              </div>
              <UserRoundSearch size={18} />
            </div>

            <div className="feature-list">
              {unmatchedSubmissions.length === 0 ? (
                <p className="text-muted">No unmatched submissions right now.</p>
              ) : (
                unmatchedSubmissions.map((submission) => (
                  <div key={submission.id} className="feature-list-item">
                    <div>
                      <strong>{submission.title}</strong>
                      <p>{submission.normalizedContent.slice(0, 120)}{submission.normalizedContent.length > 120 ? '...' : ''}</p>
                    </div>
                    <div className="feature-list-side">
                      <span className={`status-pill ${getStatusTone(submission.status)}`}>awaiting link</span>
                      <small>{maskPhoneNumber(submission.phoneNumber)}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="card feature-panel" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="feature-panel-header">
            <div>
              <p className="feature-eyebrow">Review queue</p>
              <h2>Matched submissions</h2>
            </div>
            <Clock3 size={18} />
          </div>

          <div className="feature-list">
            {queue.length === 0 ? (
              <p className="text-muted">No submissions are pending review.</p>
            ) : (
              queue.map((submission) => (
                <div key={submission.id} className="feature-list-item feature-list-item-stack">
                  <div className="feature-review-copy">
                    <div className="feature-review-head">
                      <strong>{submission.title}</strong>
                      <span className={`status-pill ${getStatusTone(submission.status)}`}>
                        {submission.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p>{submission.normalizedContent}</p>
                    <small>
                      {maskPhoneNumber(submission.phoneNumber)}
                      {' · '}
                      {formatDate(submission.createdAt)}
                    </small>
                  </div>
                  <div className="feature-review-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => moderateSubmission({
                        submissionId: submission.id,
                        action: 'publish',
                        moderatorName: user.name,
                        notes: moderationNote,
                      })}
                    >
                      <CheckCircle2 size={16} />
                      Publish
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => moderateSubmission({
                        submissionId: submission.id,
                        action: 'hold',
                        moderatorName: user.name,
                        notes: moderationNote,
                      })}
                    >
                      <Clock3 size={16} />
                      Keep pending
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => moderateSubmission({
                        submissionId: submission.id,
                        action: 'reject',
                        moderatorName: user.name,
                        notes: moderationNote,
                      })}
                    >
                      <AlertTriangle size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card feature-panel" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="feature-panel-header">
            <div>
              <p className="feature-eyebrow">Audit trail</p>
              <h2>Recent moderation activity</h2>
            </div>
          </div>

          <div className="feature-list">
            {moderationLogs.slice(0, 8).map((log) => (
              <div key={log.id} className="feature-list-item">
                <div>
                  <strong>{log.action.replace(/_/g, ' ')}</strong>
                  <p>{log.notes}</p>
                </div>
                <div className="feature-list-side">
                  <small>{log.moderatorName}</small>
                  <small>{formatDate(log.createdAt)}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
