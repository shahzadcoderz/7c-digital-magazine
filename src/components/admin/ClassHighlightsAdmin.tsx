import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ClassHighlight } from '../../types';

export const ClassHighlightsAdmin: React.FC = () => {
  const [items, setItems] = useState<ClassHighlight[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'achievement' as 'achievement' | 'project' | 'event',
    title: '',
    description: '',
    image_url: '',
    event_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('class_highlights').select('*').order('event_date', { ascending: false });
    if (data) setItems(data);
  };

  const resetForm = () => {
    setForm({ type: 'achievement', title: '', description: '', image_url: '', event_date: new Date().toISOString().split('T')[0] });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('class_highlights').update(form).eq('id', editingId);
    } else {
      await supabase.from('class_highlights').insert([form]);
    }
    fetchItems();
    resetForm();
  };

  const handleEdit = (item: ClassHighlight) => {
    setForm({ type: item.type, title: item.title, description: item.description, image_url: item.image_url, event_date: item.event_date });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete?')) { await supabase.from('class_highlights').delete().eq('id', id); fetchItems(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Class Highlights</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {showForm ? 'Cancel' : 'Add'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="w-full px-4 py-2 border rounded-lg" required>
              <option value="achievement">Achievement</option>
              <option value="project">Project</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg h-24" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label><input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Date</label><input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required /></div>
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"><Save className="w-5 h-5" /> {editingId ? 'Update' : 'Add'}</button>
        </form>
      )}
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between">
            <div className="flex-1"><span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs mb-2">{item.type}</span><h3 className="text-xl font-bold mb-2">{item.title}</h3><p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p></div>
            <div className="flex gap-2 ml-4"><button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button><button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
};
