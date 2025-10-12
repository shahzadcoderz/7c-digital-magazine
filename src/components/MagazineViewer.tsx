import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';
import { EditorialPage } from './pages/EditorialPage';
import { CreativeWritingPage } from './pages/CreativeWritingPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArtGalleryPage } from './pages/ArtGalleryPage';
import { OpinionsPage } from './pages/OpinionsPage';
import { ClassHighlightsPage } from './pages/ClassHighlightsPage';
import { FunZonePage } from './pages/FunZonePage';
import { LanguageCornerPage } from './pages/LanguageCornerPage';
import { InspirationalPage } from './pages/InspirationalPage';
import { SpecialFeaturesPage } from './pages/SpecialFeaturesPage';
import { MediaGalleryPage } from './pages/MediaGalleryPage';

interface MagazineViewerProps {
  onBackToCover: () => void;
}

export const MagazineViewer: React.FC<MagazineViewerProps> = ({ onBackToCover }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const pages = [
    { title: 'Editorial', component: EditorialPage },
    { title: 'Creative Writing', component: CreativeWritingPage },
    { title: 'Informative Articles', component: ArticlesPage },
    { title: 'Art & Aesthetics', component: ArtGalleryPage },
    { title: 'Opinion & Expression', component: OpinionsPage },
    { title: 'Class Highlights', component: ClassHighlightsPage },
    { title: 'Fun Zone', component: FunZonePage },
    { title: 'Language Corner', component: LanguageCornerPage },
    { title: 'Inspirational', component: InspirationalPage },
    { title: 'Special Features', component: SpecialFeaturesPage },
    { title: 'Media Gallery', component: MediaGalleryPage },
  ];

  const CurrentPageComponent = pages[currentPage].component;

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToCover}
              className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold transition"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Cover</span>
            </button>

            <h1 className="text-xl font-bold text-gray-800 text-center flex-1">
              {pages[currentPage].title}
            </h1>

            <button
              onClick={() => setShowNav(!showNav)}
              className="text-teal-700 hover:text-teal-900 transition lg:hidden"
            >
              {showNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {pages.length}
              </span>
            </div>
          </div>

          {showNav && (
            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    setShowNav(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    currentPage === index
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="hidden lg:block fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-white shadow-lg rounded-r-xl p-2 space-y-1">
          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`block w-48 text-left px-4 py-2 rounded-lg text-sm transition ${
                currentPage === index
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 lg:ml-48">
        <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[600px]">
          <CurrentPageComponent />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-gray-600 font-medium lg:hidden">
            {currentPage + 1} / {pages.length}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};