import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { MagazineCover } from './components/MagazineCover';
import { MagazineViewer } from './components/MagazineViewer';
import { AdminDashboard } from './components/AdminDashboard';
import { BookOpen, Settings } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [view, setView] = useState<'cover' | 'magazine' | 'admin'>('cover');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-amber-800 flex items-center justify-center">
        <div className="text-white text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && isAdmin && view === 'admin') {
    return <AdminDashboard />;
  }

  if (!isAuthenticated && view === 'admin') {
    return <LoginPage />;
  }

  return (
    <>
      {view === 'cover' && (
        <MagazineCover onEnter={() => setView('magazine')} />
      )}

      {view === 'magazine' && (
        <MagazineViewer onBackToCover={() => setView('cover')} />
      )}

      <button
        onClick={() => setView(view === 'admin' ? 'cover' : 'admin')}
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 z-50"
        title={view === 'admin' ? 'Back to Magazine' : 'Admin Panel'}
      >
        {view === 'admin' ? <BookOpen className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
      </button>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
