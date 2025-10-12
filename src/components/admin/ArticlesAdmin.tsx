import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Article } from '../../types';

export const ArticlesAdmin: React.FC = () => {
  const [items, setItems] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    category: 'tech' as 'tech' | 'health' | 'social' | 'reviews',
    title: '',
    content: '',
    author: '',
    icon: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  };

  const resetForm = () => {
    setForm({ category: 'tech', title: '', content: '', author: '', icon: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('articles').update(form).eq('id', editingId);
    } else {
      await supabase.from('articles').insert([form]);
    }
    fetchItems();
    resetForm();
  };

  const handleEdit = (item: Article) => {
    setForm({ category: item.category, title: item.title, content: item.content, author: item.author, icon: item.icon });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this article?')) {
      await supabase.from('articles').delete().eq('id', id);
      fetchItems();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Articles</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })} className="w-full px-4 py-2 border rounded-lg" required>
              <option value="tech">Tech & Science</option>
              <option value="health">Health</option>
              <option value="social">Social Issues</option>
              <option value="reviews">Reviews</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2 border rounded-lg h-32" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> {editingId ? 'Update' : 'Add'} Article
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs mb-2">{item.category}</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{item.content}</p>
              <p className="text-sm text-gray-500">By {item.author}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
