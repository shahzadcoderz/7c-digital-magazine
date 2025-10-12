import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MediaGallery } from '../../types';

export const MediaGalleryAdmin: React.FC = () => {
  const [items, setItems] = useState<MediaGallery[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'photo' as 'photo' | 'video',
    title: '',
    url: '',
    description: '',
    category: '',
    thumbnail_url: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('media_gallery').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  };

  const resetForm = () => {
    setForm({ type: 'photo', title: '', url: '', description: '', category: '', thumbnail_url: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('media_gallery').update(form).eq('id', editingId);
    } else {
      await supabase.from('media_gallery').insert([form]);
    }
    fetchItems();
    resetForm();
  };

  const handleEdit = (item: MediaGallery) => {
    setForm({ type: item.type, title: item.title, url: item.url, description: item.description, category: item.category, thumbnail_url: item.thumbnail_url });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this media?')) {
      await supabase.from('media_gallery').delete().eq('id', id);
      fetchItems();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Media Gallery</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Add Media'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="w-full px-4 py-2 border rounded-lg" required>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media URL</label>
            <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="https://example.com/image.jpg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg h-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category (optional)</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Events, Sports, Achievements" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (for videos, optional)</label>
            <input type="url" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="https://example.com/thumb.jpg" />
          </div>
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> {editingId ? 'Update' : 'Add'} Media
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              {item.url && (
                <img src={item.type === 'video' ? item.thumbnail_url || item.url : item.url} alt={item.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs mb-2">{item.type}</span>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4 mx-auto" /></button>
                <button onClick={() => handleDelete(item.id)} className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 mx-auto" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};