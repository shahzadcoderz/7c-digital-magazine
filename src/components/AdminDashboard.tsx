import React, { useState } from 'react';
import { LogOut, Settings, Database, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EditorialAdmin } from './admin/EditorialAdmin';
import { CreativeWritingAdmin } from './admin/CreativeWritingAdmin';
import { ArticlesAdmin } from './admin/ArticlesAdmin';
import { ArtGalleryAdmin } from './admin/ArtGalleryAdmin';
import { OpinionsAdmin } from './admin/OpinionsAdmin';
import { ClassHighlightsAdmin } from './admin/ClassHighlightsAdmin';
import { FunZoneAdmin } from './admin/FunZoneAdmin';
import { LanguageCornerAdmin } from './admin/LanguageCornerAdmin';
import { InspirationalAdmin } from './admin/InspirationalAdmin';
import { SpecialFeaturesAdmin } from './admin/SpecialFeaturesAdmin';
import { MediaGalleryAdmin } from './admin/MediaGalleryAdmin';
import { CoverPageAdmin } from './admin/CoverPageAdmin';

export const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('cover');

  const sections = [
    { id: 'cover', name: 'Cover Page', icon: Settings },
    { id: 'editorial', name: 'Editorial', icon: Settings },
    { id: 'creative', name: 'Creative Writing', icon: Settings },
    { id: 'articles', name: 'Articles', icon: Settings },
    { id: 'art', name: 'Art Gallery', icon: ImageIcon },
    { id: 'opinions', name: 'Opinions', icon: Settings },
    { id: 'highlights', name: 'Class Highlights', icon: Settings },
    { id: 'fun', name: 'Fun Zone', icon: Settings },
    { id: 'language', name: 'Language Corner', icon: Settings },
    { id: 'inspirational', name: 'Inspirational', icon: Settings },
    { id: 'special', name: 'Special Features', icon: Settings },
    { id: 'media', name: 'Media Gallery', icon: Database },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'cover':
        return <CoverPageAdmin />;
      case 'editorial':
        return <EditorialAdmin />;
      case 'creative':
        return <CreativeWritingAdmin />;
      case 'articles':
        return <ArticlesAdmin />;
      case 'art':
        return <ArtGalleryAdmin />;
      case 'opinions':
        return <OpinionsAdmin />;
      case 'highlights':
        return <ClassHighlightsAdmin />;
      case 'fun':
        return <FunZoneAdmin />;
      case 'language':
        return <LanguageCornerAdmin />;
      case 'inspirational':
        return <InspirationalAdmin />;
      case 'special':
        return <SpecialFeaturesAdmin />;
      case 'media':
        return <MediaGalleryAdmin />;
      default:
        return <EditorialAdmin />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-teal-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">VII-C Magazine - Admin Panel</h1>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-800 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-72px)] p-4">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <section.icon className="w-5 h-5" />
                {section.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};