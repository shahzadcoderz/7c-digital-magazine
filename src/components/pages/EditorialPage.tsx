import React, { useEffect, useState } from 'react';
import { User, Users, PenTool, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Editorial } from '../../types';

export const EditorialPage: React.FC = () => {
  const [editorial, setEditorial] = useState<Editorial | null>(null);

  useEffect(() => {
    fetchEditorial();
  }, []);

  const fetchEditorial = async () => {
    const { data } = await supabase
      .from('editorial')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data) {
      setEditorial(data);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Editorial Section</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid gap-8">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8 border-l-4 border-teal-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-600 p-2 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Message from Principal</h2>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {editorial?.principal_message || 'No message available yet.'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 border-l-4 border-amber-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-600 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Message from Class Teacher</h2>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {editorial?.teacher_message || 'No message available yet.'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-l-4 border-blue-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Editorial Note</h2>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {editorial?.editorial_note || 'No editorial note available yet.'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-l-4 border-purple-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Theme Introduction</h2>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {editorial?.theme_introduction || 'No theme introduction available yet.'}
          </p>
        </div>
      </div>
    </div>
  );
};