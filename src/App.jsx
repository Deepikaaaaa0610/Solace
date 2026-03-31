import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PoetsList from './pages/PoetsList';
import PoetProfile from './pages/PoetProfile';
import Community from './pages/Community';
import { initialCommunityPosts } from './data/communityPosts';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Load community posts from localStorage or use defaults
  const [communityPosts, setCommunityPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('solace-community-posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved posts:', e);
    }
    return initialCommunityPosts;
  });

  // Persist to localStorage whenever posts change
  useEffect(() => {
    try {
      localStorage.setItem('solace-community-posts', JSON.stringify(communityPosts));
    } catch (e) {
      console.error('Error saving posts:', e);
    }
  }, [communityPosts]);

  const handleAddPost = (newPost) => {
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const handleLikePost = (postId) => {
    setCommunityPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleBookmarkPost = (postId) => {
    setCommunityPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, bookmarked: !p.bookmarked }
          : p
      )
    );
  };

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                communityPosts={communityPosts}
                onLikePost={handleLikePost}
                onBookmarkPost={handleBookmarkPost}
              />
            }
          />
          <Route
            path="/explore"
            element={<Explore searchQuery={searchQuery} />}
          />
          <Route path="/poets" element={<PoetsList />} />
          <Route path="/poets/:id" element={<PoetProfile />} />
          <Route
            path="/community"
            element={
              <Community
                posts={communityPosts}
                onAddPost={handleAddPost}
                onLikePost={handleLikePost}
                onBookmarkPost={handleBookmarkPost}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
