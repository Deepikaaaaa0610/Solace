import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Lock } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Small delay so the page renders the prompt first
      const timer = setTimeout(() => openAuthModal(), 600);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, openAuthModal]);

  if (!isAuthenticated) {
    return (
      <div className="protected-gate">
        <div className="protected-gate-content animate-fade-in-up">
          <div className="protected-gate-icon">
            <Lock size={32} />
          </div>
          <h2>Sign in to continue</h2>
          <p>You need to be signed in to access this page. Sign in to save your poetry, manage your notebook, and more.</p>
          <button className="btn btn-primary" onClick={() => openAuthModal()}>
            <BookOpen size={18} />
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return children;
}
