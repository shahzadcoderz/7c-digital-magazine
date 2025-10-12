import React, { useEffect, useState } from 'react';
import { Feather, BookOpen, Theater } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CreativeWriting } from '../../types';

export const CreativeWritingPage: React.FC = () => {
  const [writings, setWritings] = useState<CreativeWriting[]>([]);

  useEffect(() => {
    fetchWritings();
  }, []);

  const fetchWritings = async () => {
    const { data } = await supabase
      .from('creative_writing')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setWritings(data);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'poetry':
        return <Feather className="w-6 h-6" />;
      case 'story':
        return <BookOpen className="w-6 h-6" />;
      case 'skit':
        return <Theater className="w-6 h-6" />;
      default:
        return <Feather className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'poetry':
        return 'from-pink-50 to-pink-100 border-pink-500';
      case 'story':
        return 'from-blue-50 to-blue-100 border-blue-500';
      case 'skit':
        return 'from-green-50 to-green-100 border-green-500';
      default:
        return 'from-gray-50 to-gray-100 border-gray-500';
    }
  };

  const groupedWritings = {
    poetry: writings.filter(w => w.type === 'poetry'),
    story: writings.filter(w => w.type === 'story'),
    skit: writings.filter(w => w.type === 'skit'),
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Creative Writing</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
      </div>

      {groupedWritings.poetry.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Feather className="w-6 h-6 text-pink-600" />
            Poetry Gallery
          </h2>
          <div className="grid gap-6">
            {groupedWritings.poetry.map((writing) => (
              <div
                key={writing.id}
                className={`bg-gradient-to-br ${getColor(writing.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{writing.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-3 italic">
                  {writing.content}
                </p>
                <p className="text-sm text-gray-600 font-medium">- {writing.author_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedWritings.story.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Stories & Anecdotes
          </h2>
          <div className="grid gap-6">
            {groupedWritings.story.map((writing) => (
              <div
                key={writing.id}
                className={`bg-gradient-to-br ${getColor(writing.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{writing.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-3">
                  {writing.content}
                </p>
                <p className="text-sm text-gray-600 font-medium">- {writing.author_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedWritings.skit.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Theater className="w-6 h-6 text-green-600" />
            Mini Skits
          </h2>
          <div className="grid gap-6">
            {groupedWritings.skit.map((writing) => (
              <div
                key={writing.id}
                className={`bg-gradient-to-br ${getColor(writing.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{writing.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-3 font-mono text-sm">
                  {writing.content}
                </p>
                <p className="text-sm text-gray-600 font-medium">- {writing.author_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {writings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Feather className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No creative writings available yet.</p>
        </div>
      )}
    </div>
  );
};