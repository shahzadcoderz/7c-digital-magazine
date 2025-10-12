import React, { useEffect, useState } from 'react';
import { Image, Video, Play } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MediaGallery } from '../../types';

export const MediaGalleryPage: React.FC = () => {
  const [media, setMedia] = useState<MediaGallery[]>([]);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const { data } = await supabase
      .from('media_gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setMedia(data);
    }
  };

  const filteredMedia = filter === 'all'
    ? media
    : media.filter(item => item.type === filter);

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Media Gallery</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4">Photos and videos from our journey</p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition ${
            filter === 'all'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Media
        </button>
        <button
          onClick={() => setFilter('photo')}
          className={`px-6 py-2 rounded-full font-medium transition flex items-center gap-2 ${
            filter === 'photo'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Image className="w-4 h-4" />
          Photos
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-6 py-2 rounded-full font-medium transition flex items-center gap-2 ${
            filter === 'video'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Video className="w-4 h-4" />
          Videos
        </button>
      </div>

      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
                {item.type === 'photo' ? (
                  item.url ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <Image className="w-16 h-16 text-gray-400" />
                  )
                ) : (
                  <>
                    {item.thumbnail_url ? (
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <Video className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="w-8 h-8 text-teal-600" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === 'photo'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {item.type === 'photo' ? <Image className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  {item.category && (
                    <span className="text-xs text-gray-500">
                      {item.category}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          {filter === 'photo' ? (
            <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
          ) : filter === 'video' ? (
            <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
          ) : (
            <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
          )}
          <p>No {filter === 'all' ? 'media' : `${filter}s`} available yet.</p>
        </div>
      )}
    </div>
  );
};