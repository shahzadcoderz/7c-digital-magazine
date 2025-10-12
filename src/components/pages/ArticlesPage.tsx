import React, { useEffect, useState } from 'react';
import { Smartphone, Brain, Globe, Book } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Article } from '../../types';

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setArticles(data);
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'tech':
        return <Smartphone className="w-8 h-8" />;
      case 'health':
        return <Brain className="w-8 h-8" />;
      case 'social':
        return <Globe className="w-8 h-8" />;
      case 'reviews':
        return <Book className="w-8 h-8" />;
      default:
        return <Book className="w-8 h-8" />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'from-blue-50 to-blue-100 border-blue-600 bg-blue-600';
      case 'health':
        return 'from-green-50 to-green-100 border-green-600 bg-green-600';
      case 'social':
        return 'from-purple-50 to-purple-100 border-purple-600 bg-purple-600';
      case 'reviews':
        return 'from-amber-50 to-amber-100 border-amber-600 bg-amber-600';
      default:
        return 'from-gray-50 to-gray-100 border-gray-600 bg-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'tech':
        return 'Tech & Science';
      case 'health':
        return 'Health & Wellness';
      case 'social':
        return 'Social Issues';
      case 'reviews':
        return 'Book & Movie Reviews';
      default:
        return category;
    }
  };

  const groupedArticles = {
    tech: articles.filter(a => a.category === 'tech'),
    health: articles.filter(a => a.category === 'health'),
    social: articles.filter(a => a.category === 'social'),
    reviews: articles.filter(a => a.category === 'reviews'),
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Informative Articles</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid gap-8">
        {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
          categoryArticles.length > 0 && (
            <div key={category}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className={`p-2 rounded-lg ${getColor(category).split(' ')[3]} text-white`}>
                  {getIcon(category)}
                </span>
                {getCategoryName(category)}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {categoryArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`bg-gradient-to-br ${getColor(article.category)} rounded-xl p-6 border-l-4 hover:shadow-lg transition`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800 flex-1">{article.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">
                      {article.content}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">By {article.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Book className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No articles available yet.</p>
        </div>
      )}
    </div>
  );
};