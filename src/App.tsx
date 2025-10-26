import React, { useState } from 'react';
import { MagazineCover } from './components/MagazineCover';
import { MagazineViewer } from './components/MagazineViewer';
import { AdminDashboard } from './components/AdminDashboard';
import { BookOpen, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'cover' | 'magazine' | 'admin'>('cover');

  return (
    <>
      {/* Magazine Cover */}
      {view === 'cover' && <MagazineCover onEnter={() => setView('magazine')} />}

      {/* Magazine Viewer */}
      {view === 'magazine' && <MagazineViewer onBackToCover={() => setView('cover')} />}

      {/* Admin Dashboard */}
      {view === 'admin' && <AdminDashboard />}

      {/* Floating Button to Admin Panel */}
      <button
        onClick={() => setView('admin')}
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 z-50"
        title="Admin Panel"
      >
        <Settings className="w-6 h-6" />
      </button>
    </>
  );
};

export default App;