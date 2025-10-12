import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const CoverPageAdmin: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    class_name: '',
    theme_quote: '',
    qr_code_url: '',
    school_logo_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCoverPage();
  }, []);

  const fetchCoverPage = async () => {
    const { data } = await supabase.from('cover_page').select('*').limit(1).maybeSingle();
    if (data) {
      setForm(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('cover_page')
      .upsert({ ...form, updated_at: new Date().toISOString() });

    if (error) {
      setMessage('Error saving cover page');
    } else {
      setMessage('Cover page saved successfully!');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Cover Page Settings</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Magazine Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
          <input
            type="text"
            value={form.class_name}
            onChange={(e) => setForm({ ...form, class_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme Quote</label>
          <input
            type="text"
            value={form.theme_quote}
            onChange={(e) => setForm({ ...form, theme_quote: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">QR Code URL (optional)</label>
          <input
            type="url"
            value={form.qr_code_url}
            onChange={(e) => setForm({ ...form, qr_code_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="https://example.com/qr-code.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Logo URL (optional)</label>
          <input
            type="url"
            value={form.school_logo_url}
            onChange={(e) => setForm({ ...form, school_logo_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="https://example.com/logo.png"
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
          {loading ? 'Saving...' : 'Save Cover Page'}
        </button>
      </form>
    </div>
  );
};