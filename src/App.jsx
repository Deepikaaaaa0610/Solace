import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PoetsList from './pages/PoetsList';
import PoetProfile from './pages/PoetProfile';
import Community from './pages/Community';
import Notebook from './pages/Notebook';
import SavedWorks from './pages/SavedWorks';
import Dictionary from './pages/Dictionary';
import { initialCommunityPosts } from './data/communityPosts';

function createNotebookFile(name = 'My Notebook') {
  const timestamp = Date.now();
  return {
    id: `nb-${timestamp}`,
    name,
    content: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function sanitizeNotebookFile(file, index = 0) {
  const createdAt = Number(file?.createdAt) || Date.now();
  const updatedAt = Number(file?.updatedAt) || createdAt;

  return {
    id: file?.id || `nb-${createdAt}-${index}`,
    name: typeof file?.name === 'string' ? file.name : `Notebook ${index + 1}`,
    content: typeof file?.content === 'string' ? file.content : '',
    createdAt,
    updatedAt,
  };
}

function createDefaultNotebookState() {
  return {
    files: [],
    activeFileId: null,
  };
}

function isLegacyAutoNotebook(files = []) {
  if (files.length !== 1) {
    return false;
  }

  const [file] = files;
  return (
    file?.name === 'My Notebook' &&
    !file?.content?.trim()
  );
}

function extractLegacySavedWorks(files = []) {
  const seen = new Set();
  const extracted = [];

  files.forEach((file) => {
    if (!Array.isArray(file?.savedWorks)) {
      return;
    }

    file.savedWorks.forEach((work) => {
      if (!work?.id || seen.has(work.id)) {
        return;
      }

      seen.add(work.id);
      extracted.push(work);
    });
  });

  return extracted;
}

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

  const [notebookData, setNotebookData] = useState(() => {
    try {
      const saved = localStorage.getItem('solace-notebook-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed?.files)) {
          const files = parsed.files.map((file, index) => sanitizeNotebookFile(file, index));

          if (isLegacyAutoNotebook(files)) {
            return createDefaultNotebookState();
          }

          const hasActiveFile = files.some((file) => file.id === parsed.activeFileId);

          return {
            files,
            activeFileId: hasActiveFile ? parsed.activeFileId : files[0]?.id || null,
          };
        }
      }
    } catch (e) {
      console.error('Error loading notebook data:', e);
    }

    return createDefaultNotebookState();
  });

  const [savedWorks, setSavedWorks] = useState(() => {
    try {
      const saved = localStorage.getItem('solace-saved-works');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }

      const legacyNotebook = localStorage.getItem('solace-notebook-data');
      if (legacyNotebook) {
        const parsedNotebook = JSON.parse(legacyNotebook);
        return extractLegacySavedWorks(parsedNotebook?.files);
      }
    } catch (e) {
      console.error('Error loading saved works:', e);
    }

    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('solace-notebook-data', JSON.stringify(notebookData));
    } catch (e) {
      console.error('Error saving notebook data:', e);
    }
  }, [notebookData]);

  useEffect(() => {
    try {
      localStorage.setItem('solace-saved-works', JSON.stringify(savedWorks));
    } catch (e) {
      console.error('Error saving works:', e);
    }
  }, [savedWorks]);

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

  const handleSetActiveNotebookFile = (fileId) => {
    setNotebookData((prev) => ({
      ...prev,
      activeFileId: fileId,
    }));
  };

  const handleCreateNotebookFile = () => {
    const newFile = createNotebookFile(`Notebook ${notebookData.files.length + 1}`);
    setNotebookData((prev) => ({
      files: [newFile, ...prev.files],
      activeFileId: newFile.id,
    }));
  };

  const handleRenameNotebookFile = (fileId, name) => {
    setNotebookData((prev) => ({
      ...prev,
      files: prev.files.map((file) =>
        file.id === fileId
          ? { ...file, name, updatedAt: Date.now() }
          : file
      ),
    }));
  };

  const handleUpdateNotebookContent = (fileId, content) => {
    setNotebookData((prev) => ({
      ...prev,
      files: prev.files.map((file) =>
        file.id === fileId
          ? { ...file, content, updatedAt: Date.now() }
          : file
      ),
    }));
  };

  const handleDeleteNotebookFile = (fileId) => {
    setNotebookData((prev) => {
      if (prev.files.length === 1) {
        return createDefaultNotebookState();
      }

      const remainingFiles = prev.files.filter((file) => file.id !== fileId);
      return {
        files: remainingFiles,
        activeFileId:
          prev.activeFileId === fileId
            ? remainingFiles[0]?.id || null
            : prev.activeFileId,
      };
    });
  };

  const handleSaveWork = (work) => {
    let added = false;

    setSavedWorks((prev) => {
      const alreadyExists = prev.some((savedWork) => savedWork.id === work.id);
      added = !alreadyExists;

      if (alreadyExists) {
        return prev;
      }

      return [
        {
          id: work.id,
          title: work.title,
          text: work.text,
          roman: work.roman || '',
          poetId: work.poetId,
          poetName: work.poetName,
          type: work.type,
          likes: work.likes ?? 0,
          tags: work.tags || [],
        },
        ...prev,
      ];
    });

    return { added, collectionName: 'Saved Works' };
  };

  const handleRemoveSavedWork = (workId) => {
    setSavedWorks((prev) => prev.filter((work) => work.id !== workId));
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
                onSaveWork={handleSaveWork}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                searchQuery={searchQuery}
                onSaveWork={handleSaveWork}
              />
            }
          />
          <Route path="/poets" element={<PoetsList />} />
          <Route
            path="/poets/:id"
            element={<PoetProfile onSaveWork={handleSaveWork} />}
          />
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
          <Route
            path="/notebook"
            element={
              <Notebook
                notebookData={notebookData}
                onCreateFile={handleCreateNotebookFile}
                onDeleteFile={handleDeleteNotebookFile}
                onRenameFile={handleRenameNotebookFile}
                onSelectFile={handleSetActiveNotebookFile}
                onUpdateContent={handleUpdateNotebookContent}
              />
            }
          />
          <Route
            path="/saved"
            element={
              <SavedWorks
                savedWorks={savedWorks}
                onRemoveWork={handleRemoveSavedWork}
              />
            }
          />
          <Route path="/dictionary" element={<Dictionary />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
