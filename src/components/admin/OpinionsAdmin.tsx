import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Opinion } from '../../types';

export const OpinionsAdmin: React.FC = () => {
  const [items, setItems] = useState<Opinion[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'opinion' as 'opinion' | 'reflection' | 'debate',
    title: '',
    content: '',
    author_name: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('opinions').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  };

  const resetForm = () => {
    setForm({ type: 'opinion', title: '', content: '', author_name: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('opinions').update(form).eq('id', editingId);
    } else {
      await supabase.from('opinions').insert([form]);
    }
    fetchItems();
    resetForm();
  };

  const handleEdit = (item: Opinion) => {
    setForm({ type: item.type, title: item.title, content: item.content, author_name: item.author_name });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this opinion?')) {
      await supabase.from('opinions').delete().eq('id', id);
      fetchItems();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Opinions & Expression</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="w-full px-4 py-2 border rounded-lg" required>
              <option value="opinion">Opinion</option>
              <option value="reflection">Personal Reflection</option>
              <option value="debate">Debate Highlight</option>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
            <input type="text" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> {editingId ? 'Update' : 'Add'} Opinion
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs mb-2">{item.type}</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{item.content}</p>
              <p className="text-sm text-gray-500">By {item.author_name}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};