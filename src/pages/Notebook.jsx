import { BookOpen, FileText, Plus, Trash2 } from 'lucide-react';

function formatUpdatedAt(timestamp) {
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(timestamp));
  } catch {
    return 'Recently updated';
  }
}

function getFileLabel(name) {
  return name?.trim() ? name : 'Untitled Notebook';
}

export default function Notebook({
  notebookData,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
  onSelectFile,
  onUpdateContent,
}) {
  const files = notebookData?.files || [];
  const activeFile = files.find((file) => file.id === notebookData?.activeFileId) || files[0];

  return (
    <div>
      <div className="page-header">
        <h1>Personal Notebook</h1>
        <p>Write your own poetry, keep drafts, and organize your thoughts in separate files</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-lg)' }}>
        <div className="notebook-layout">
          <aside className="card notebook-sidebar">
            <div className="notebook-sidebar-header">
              <div>
                <p className="notebook-label">Your Files</p>
                <h2>Notebook</h2>
              </div>
              <button className="btn btn-primary" onClick={onCreateFile}>
                <Plus size={16} />
                New File
              </button>
            </div>

            <div className="notebook-file-list">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`notebook-file-item ${activeFile?.id === file.id ? 'active' : ''}`}
                >
                  <button
                    className="notebook-file-select"
                    onClick={() => onSelectFile(file.id)}
                  >
                    <div className="notebook-file-copy">
                      <span className="notebook-file-icon">
                        <FileText size={16} />
                      </span>
                      <div>
                        <strong>{getFileLabel(file.name)}</strong>
                        <p>{file.content.trim() ? `Updated ${formatUpdatedAt(file.updatedAt)}` : 'Empty file'}</p>
                      </div>
                    </div>
                  </button>
                  <button
                    className="btn-icon notebook-file-delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteFile(file.id);
                    }}
                    aria-label={`Delete ${getFileLabel(file.name)}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </aside>

          <section className="notebook-editor">
            {activeFile ? (
              <div className="card notebook-writing-panel">
                <div className="notebook-panel-header">
                  <div>
                    <p className="notebook-label">Active File</p>
                    <h2>Your Writing Space</h2>
                  </div>
                  <span className="notebook-updated">
                    Updated {formatUpdatedAt(activeFile.updatedAt)}
                  </span>
                </div>

                <input
                  className="notebook-title-input"
                  value={activeFile.name}
                  onChange={(event) => onRenameFile(activeFile.id, event.target.value)}
                  placeholder="Notebook title"
                />

                <textarea
                  className="notebook-textarea"
                  value={activeFile.content}
                  onChange={(event) => onUpdateContent(activeFile.id, event.target.value)}
                  placeholder="Write your own poetry, notes, ideas, or drafts here..."
                />
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <BookOpen size={48} />
                </div>
                <h3>No notebook files</h3>
                <p style={{ marginBottom: '1rem' }}>Create your first notebook file to start writing.</p>
                <button className="btn btn-primary" onClick={onCreateFile}>
                  <Plus size={18} /> New File
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
