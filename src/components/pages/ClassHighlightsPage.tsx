import React, { useEffect, useState } from 'react';
import { Trophy, FolderOpen, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ClassHighlight } from '../../types';

export const ClassHighlightsPage: React.FC = () => {
  const [highlights, setHighlights] = useState<ClassHighlight[]>([]);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    const { data } = await supabase
      .from('class_highlights')
      .select('*')
      .order('event_date', { ascending: false });

    if (data) {
      setHighlights(data);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-6 h-6" />;
      case 'project':
        return <FolderOpen className="w-6 h-6" />;
      case 'event':
        return <Calendar className="w-6 h-6" />;
      default:
        return <Calendar className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'from-yellow-50 to-yellow-100 border-yellow-600 bg-yellow-600';
      case 'project':
        return 'from-blue-50 to-blue-100 border-blue-600 bg-blue-600';
      case 'event':
        return 'from-green-50 to-green-100 border-green-600 bg-green-600';
      default:
        return 'from-gray-50 to-gray-100 border-gray-600 bg-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Class Highlights</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4">Celebrating our achievements and memories</p>
      </div>

      {highlights.length > 0 ? (
        <div className="space-y-6">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className={`bg-gradient-to-br ${getColor(highlight.type)} rounded-xl overflow-hidden border-l-4 hover:shadow-lg transition`}
            >
              <div className="md:flex">
                {highlight.image_url && (
                  <div className="md:w-1/3">
                    <img
                      src={highlight.image_url}
                      alt={highlight.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                )}
                <div className={`p-6 ${highlight.image_url ? 'md:w-2/3' : 'w-full'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`p-2 rounded-lg ${getColor(highlight.type).split(' ')[3]} text-white`}>
                      {getIcon(highlight.type)}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wide text-gray-600">
                      {highlight.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(highlight.event_date)}
                  </p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No highlights available yet.</p>
        </div>
      )}
    </div>
  );
};