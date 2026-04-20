import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'solace-auth-user';

function generateUserId() {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id && parsed?.name) return parsed;
      }
    } catch (e) {
      console.error('Error loading auth state:', e);
    }
    return null;
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving auth state:', e);
    }
  }, [user]);

  const login = useCallback((userData) => {
    const normalizedContact = userData.contact.trim().toLowerCase();
    const isAdmin = normalizedContact === 'admin@solace.com';
    const newUser = {
      id: generateUserId(),
      name: userData.name,
      contact: userData.contact,
      contactType: userData.contactType, // 'email' or 'phone'
      initials: getInitials(userData.name),
      slug: slugify(userData.name),
      roles: isAdmin ? ['admin', 'moderator'] : ['author'],
      isAdmin,
      createdAt: Date.now(),
    };
    setUser(newUser);
    setShowAuthModal(false);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPendingRedirect(null);
  }, []);

  const openAuthModal = useCallback((redirectPath = null) => {
    setPendingRedirect(redirectPath);
    setShowAuthModal(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setPendingRedirect(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    showAuthModal,
    openAuthModal,
    closeAuthModal,
    pendingRedirect,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
