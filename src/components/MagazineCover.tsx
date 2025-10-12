import React, { useEffect, useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CoverPage } from '../types';

interface MagazineCoverProps {
  onEnter: () => void;
}

export const MagazineCover: React.FC<MagazineCoverProps> = ({ onEnter }) => {
  const [cover, setCover] = useState<CoverPage | null>(null);

  useEffect(() => {
    fetchCover();
  }, []);

  const fetchCover = async () => {
    const { data } = await supabase
      .from('cover_page')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data) {
      setCover(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-700 to-amber-800 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-6 rounded-full shadow-lg">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
            {cover?.title || 'Voices of Tomorrow'}
          </h1>

          <p className="text-2xl text-amber-200 mb-6">
            {cover?.subtitle || 'VII-C Magazine - 2025 Edition'}
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-xl text-white font-medium italic">
              {cover?.theme_quote || 'Beyond Boundaries - Breaking limits in learning and life'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-amber-100 text-lg mb-8">
            <span className="font-semibold">{cover?.class_name || 'VII-C'}</span>
            <span className="text-amber-300">•</span>
            <span>Class Magazine</span>
          </div>

          <button
            onClick={onEnter}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-full transition transform hover:scale-105 shadow-xl"
          >
            <span>Enter the Magazine</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <p className="text-white/80 mt-8 text-sm">
          Dream. Create. Inspire.
        </p>
      </div>
    </div>
  );
};