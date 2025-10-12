import React, { useEffect, useState } from 'react';
import { Sparkles, BookHeart, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Inspirational } from '../../types';

export const InspirationalPage: React.FC = () => {
  const [items, setItems] = useState<Inspirational[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from('inspirational')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setItems(data);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <Sparkles className="w-6 h-6" />;
      case 'story':
        return <BookHeart className="w-6 h-6" />;
      case 'message':
        return <Star className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'quote':
        return 'from-amber-50 to-amber-100 border-amber-500 bg-amber-600';
      case 'story':
        return 'from-rose-50 to-rose-100 border-rose-500 bg-rose-600';
      case 'message':
        return 'from-cyan-50 to-cyan-100 border-cyan-500 bg-cyan-600';
      default:
        return 'from-gray-50 to-gray-100 border-gray-500 bg-gray-600';
    }
  };

  const groupedItems = {
    quote: items.filter(item => item.type === 'quote'),
    story: items.filter(item => item.type === 'story'),
    message: items.filter(item => item.type === 'message'),
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Inspirational Section</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 italic">Words that uplift, stories that inspire</p>
      </div>

      {groupedItems.quote.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            Quotes Wall
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {groupedItems.quote.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 opacity-5">
                  <Sparkles className="w-32 h-32" />
                </div>
                <div className="relative">
                  <p className="text-xl font-semibold text-gray-800 mb-3 italic">
                    "{item.content}"
                  </p>
                  {item.author_name && (
                    <p className="text-sm text-gray-600 font-medium">- {item.author_name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedItems.story.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookHeart className="w-6 h-6 text-rose-600" />
            Moral Stories
          </h2>
          <div className="grid gap-6">
            {groupedItems.story.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>
                {item.author_name && (
                  <p className="text-sm text-gray-600 font-medium mt-3">- {item.author_name}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedItems.message.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-cyan-600" />
            Life Skills & Values
          </h2>
          <div className="grid gap-4">
            {groupedItems.message.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No inspirational content available yet.</p>
        </div>
      )}
    </div>
  );
};