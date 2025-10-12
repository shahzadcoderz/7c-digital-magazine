import React, { useEffect, useState } from 'react';
import { MessageSquare, Heart, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Opinion } from '../../types';

export const OpinionsPage: React.FC = () => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  useEffect(() => {
    fetchOpinions();
  }, []);

  const fetchOpinions = async () => {
    const { data } = await supabase
      .from('opinions')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setOpinions(data);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'opinion':
        return <MessageSquare className="w-6 h-6" />;
      case 'reflection':
        return <Heart className="w-6 h-6" />;
      case 'debate':
        return <Users className="w-6 h-6" />;
      default:
        return <MessageSquare className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'opinion':
        return 'from-blue-50 to-blue-100 border-blue-500 text-blue-700';
      case 'reflection':
        return 'from-pink-50 to-pink-100 border-pink-500 text-pink-700';
      case 'debate':
        return 'from-purple-50 to-purple-100 border-purple-500 text-purple-700';
      default:
        return 'from-gray-50 to-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Opinion & Expression</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 italic">Voices that matter, thoughts that inspire</p>
      </div>

      {opinions.length > 0 ? (
        <div className="grid gap-6">
          {opinions.map((opinion) => (
            <div
              key={opinion.id}
              className={`bg-gradient-to-br ${getColor(opinion.type)} rounded-xl p-6 border-l-4 relative`}
            >
              <div className="absolute top-6 right-6 opacity-10">
                <MessageSquare className="w-24 h-24" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`p-2 rounded-lg bg-white shadow-sm ${getColor(opinion.type)}`}>
                    {getIcon(opinion.type)}
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wide text-gray-600">
                    {opinion.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{opinion.title}</h3>
                <div className="bg-white/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {opinion.content}
                  </p>
                </div>
                <p className="text-sm text-gray-600 font-medium">- {opinion.author_name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No opinions available yet.</p>
        </div>
      )}
    </div>
  );
};