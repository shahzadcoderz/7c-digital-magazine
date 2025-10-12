import React, { useEffect, useState } from 'react';
import { Palette, Camera, Smile, Scissors } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ArtGallery } from '../../types';

export const ArtGalleryPage: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtGallery[]>([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    const { data } = await supabase
      .from('art_gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setArtworks(data);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'drawing':
        return <Palette className="w-5 h-5" />;
      case 'cartoon':
        return <Smile className="w-5 h-5" />;
      case 'photo':
        return <Camera className="w-5 h-5" />;
      case 'craft':
        return <Scissors className="w-5 h-5" />;
      default:
        return <Palette className="w-5 h-5" />;
    }
  };

  const getTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Art & Aesthetics</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
      </div>

      {artworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                {artwork.image_url ? (
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="text-gray-400">
                    <Palette className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    {getIcon(artwork.type)}
                    {getTypeName(artwork.type)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{artwork.title}</h3>
                {artwork.description && (
                  <p className="text-sm text-gray-600 mb-2">{artwork.description}</p>
                )}
                <p className="text-sm text-gray-500 font-medium">By {artwork.artist_name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No artworks available yet.</p>
        </div>
      )}
    </div>
  );
};