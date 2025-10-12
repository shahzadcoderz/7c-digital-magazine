import React, { useEffect, useState } from 'react';
import { Languages, BookText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { LanguageCorner } from '../../types';

export const LanguageCornerPage: React.FC = () => {
  const [items, setItems] = useState<LanguageCorner[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from('language_corner')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setItems(data);
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'malayalam':
        return 'from-emerald-50 to-emerald-100 border-emerald-500 text-emerald-700';
      case 'hindi':
        return 'from-orange-50 to-orange-100 border-orange-500 text-orange-700';
      case 'english':
        return 'from-sky-50 to-sky-100 border-sky-500 text-sky-700';
      default:
        return 'from-gray-50 to-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getLanguageName = (language: string) => {
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  const getTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const groupedItems = {
    malayalam: items.filter(item => item.language === 'malayalam'),
    hindi: items.filter(item => item.language === 'hindi'),
    english: items.filter(item => item.language === 'english'),
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Language Corner</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4">Celebrating linguistic diversity</p>
      </div>

      {Object.entries(groupedItems).map(([language, languageItems]) => (
        languageItems.length > 0 && (
          <div key={language}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Languages className="w-6 h-6 text-teal-600" />
              {getLanguageName(language)}
            </h2>
            <div className="grid gap-4">
              {languageItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-gradient-to-br ${getLanguageColor(item.language)} rounded-xl p-6 border-l-4`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-bold uppercase">
                      {getTypeName(item.type)}
                    </span>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4 mb-3">
                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                  </div>
                  {item.translation && (
                    <div className="bg-white/30 rounded-lg p-3 mb-2">
                      <p className="text-sm text-gray-700 italic">
                        <span className="font-semibold">Translation:</span> {item.translation}
                      </p>
                    </div>
                  )}
                  {item.author_name && (
                    <p className="text-sm text-gray-600 font-medium">- {item.author_name}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No language content available yet.</p>
        </div>
      )}
    </div>
  );
};