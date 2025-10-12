import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const EditorialAdmin: React.FC = () => {
  const [form, setForm] = useState({
    principal_message: '',
    teacher_message: '',
    editorial_note: '',
    theme_introduction: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEditorial();
  }, []);

  const fetchEditorial = async () => {
    const { data } = await supabase.from('editorial').select('*').limit(1).maybeSingle();
    if (data) {
      setForm(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('editorial')
      .upsert({ ...form, updated_at: new Date().toISOString() });

    if (error) {
      setMessage('Error saving editorial content');
    } else {
      setMessage('Editorial content saved successfully!');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Editorial Section</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Principal's Message</label>
          <textarea
            value={form.principal_message}
            onChange={(e) => setForm({ ...form, principal_message: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 h-32"
            placeholder="Enter the principal's message..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class Teacher's Message</label>
          <textarea
            value={form.teacher_message}
            onChange={(e) => setForm({ ...form, teacher_message: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 h-32"
            placeholder="Enter the teacher's message..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Editorial Note</label>
          <textarea
            value={form.editorial_note}
            onChange={(e) => setForm({ ...form, editorial_note: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 h-32"
            placeholder="Enter editorial note from class leader..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme Introduction</label>
          <textarea
            value={form.theme_introduction}
            onChange={(e) => setForm({ ...form, theme_introduction: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 h-32"
            placeholder="Introduce the theme 'Beyond Boundaries'..."
          />
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : 'Save Editorial'}
        </button>
      </form>
    </div>
  );
};