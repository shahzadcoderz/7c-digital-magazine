import React, { useEffect, useState } from 'react';
import { Users, Award, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SpecialFeature } from '../../types';

export const SpecialFeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<SpecialFeature[]>([]);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    const { data } = await supabase
      .from('special_features')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setFeatures(data);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Users className="w-6 h-6" />;
      case 'spotlight':
        return <Award className="w-6 h-6" />;
      case 'column':
        return <FileText className="w-6 h-6" />;
      default:
        return <Users className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'from-blue-50 to-blue-100 border-blue-600 bg-blue-600';
      case 'spotlight':
        return 'from-yellow-50 to-yellow-100 border-yellow-600 bg-yellow-600';
      case 'column':
        return 'from-green-50 to-green-100 border-green-600 bg-green-600';
      default:
        return 'from-gray-50 to-gray-100 border-gray-600 bg-gray-600';
    }
  };

  const getTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Special Features</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4">Spotlight on excellence and inspiration</p>
      </div>

      {features.length > 0 ? (
        <div className="space-y-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-gradient-to-br ${getColor(feature.type)} rounded-xl overflow-hidden border-l-4 hover:shadow-lg transition`}
            >
              <div className="md:flex">
                {feature.image_url && (
                  <div className="md:w-1/3">
                    <img
                      src={feature.image_url}
                      alt={feature.featured_person}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                )}
                <div className={`p-6 ${feature.image_url ? 'md:w-2/3' : 'w-full'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`p-2 rounded-lg ${getColor(feature.type).split(' ')[3]} text-white`}>
                      {getIcon(feature.type)}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wide text-gray-600">
                      {getTypeName(feature.type)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Featuring: {feature.featured_person}
                  </p>
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {feature.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No special features available yet.</p>
        </div>
      )}
    </div>
  );
};