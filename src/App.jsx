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
import Dictionary from './pages/Dictionary';
import { initialCommunityPosts } from './data/communityPosts';

function createNotebookFile(name = 'My Notebook') {
  const timestamp = Date.now();
  return {
    id: `nb-${timestamp}`,
    name,
    content: '',
    savedWorks: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function createDefaultNotebookState() {
  const initialFile = createNotebookFile();
  return {
    files: [initialFile],
    activeFileId: initialFile.id,
  };
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
        if (Array.isArray(parsed?.files) && parsed.files.length > 0) {
          return {
            files: parsed.files,
            activeFileId: parsed.activeFileId || parsed.files[0].id,
          };
        }
      }
    } catch (e) {
      console.error('Error loading notebook data:', e);
    }

    return createDefaultNotebookState();
  });

  useEffect(() => {
    try {
      localStorage.setItem('solace-notebook-data', JSON.stringify(notebookData));
    } catch (e) {
      console.error('Error saving notebook data:', e);
    }
  }, [notebookData]);

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
          ? { ...file, name: name || 'Untitled Notebook', updatedAt: Date.now() }
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
            ? remainingFiles[0].id
            : prev.activeFileId,
      };
    });
  };

  const handleSaveWorkToNotebook = (work) => {
    let result = { added: false, fileName: 'My Notebook' };

    setNotebookData((prev) => {
      const files = prev.files.length > 0 ? prev.files : createDefaultNotebookState().files;
      const activeFileId = prev.activeFileId || files[0].id;
      const targetFile = files.find((file) => file.id === activeFileId) || files[0];
      const alreadyExists = targetFile.savedWorks.some((savedWork) => savedWork.id === work.id);

      result = {
        added: !alreadyExists,
        fileName: targetFile.name,
      };

      if (alreadyExists) {
        return {
          files,
          activeFileId: targetFile.id,
        };
      }

      return {
        files: files.map((file) =>
          file.id === targetFile.id
            ? {
                ...file,
                savedWorks: [
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
                  ...file.savedWorks,
                ],
                updatedAt: Date.now(),
              }
            : file
        ),
        activeFileId: targetFile.id,
      };
    });

    return result;
  };

  const handleRemoveWorkFromNotebook = (fileId, workId) => {
    setNotebookData((prev) => ({
      ...prev,
      files: prev.files.map((file) =>
        file.id === fileId
          ? {
              ...file,
              savedWorks: file.savedWorks.filter((work) => work.id !== workId),
              updatedAt: Date.now(),
            }
          : file
      ),
    }));
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
                onSaveToNotebook={handleSaveWorkToNotebook}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                searchQuery={searchQuery}
                onSaveToNotebook={handleSaveWorkToNotebook}
              />
            }
          />
          <Route path="/poets" element={<PoetsList />} />
          <Route
            path="/poets/:id"
            element={<PoetProfile onSaveToNotebook={handleSaveWorkToNotebook} />}
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
                onRemoveWork={handleRemoveWorkFromNotebook}
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
