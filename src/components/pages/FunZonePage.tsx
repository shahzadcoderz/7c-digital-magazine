import React, { useEffect, useState } from 'react';
import { Smile, HelpCircle, Lightbulb, Grid3x3 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { FunZone } from '../../types';

export const FunZonePage: React.FC = () => {
  const [funItems, setFunItems] = useState<FunZone[]>([]);
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchFunItems();
  }, []);

  const fetchFunItems = async () => {
    const { data } = await supabase
      .from('fun_zone')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setFunItems(data);
    }
  };

  const toggleAnswer = (id: string) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'riddle':
        return <HelpCircle className="w-6 h-6" />;
      case 'joke':
        return <Smile className="w-6 h-6" />;
      case 'quiz':
        return <Lightbulb className="w-6 h-6" />;
      case 'crossword':
        return <Grid3x3 className="w-6 h-6" />;
      default:
        return <Smile className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'riddle':
        return 'from-purple-50 to-purple-100 border-purple-500 bg-purple-600';
      case 'joke':
        return 'from-yellow-50 to-yellow-100 border-yellow-500 bg-yellow-600';
      case 'quiz':
        return 'from-blue-50 to-blue-100 border-blue-500 bg-blue-600';
      case 'crossword':
        return 'from-pink-50 to-pink-100 border-pink-500 bg-pink-600';
      default:
        return 'from-gray-50 to-gray-100 border-gray-500 bg-gray-600';
    }
  };

  const groupedItems = {
    riddle: funItems.filter(item => item.type === 'riddle'),
    joke: funItems.filter(item => item.type === 'joke'),
    quiz: funItems.filter(item => item.type === 'quiz'),
    crossword: funItems.filter(item => item.type === 'crossword'),
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Fun Zone</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4">Laughter, learning, and brain teasers!</p>
      </div>

      {groupedItems.riddle.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-600" />
            Riddles & Brain Teasers
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {groupedItems.riddle.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                {item.answer && (
                  <div>
                    <button
                      onClick={() => toggleAnswer(item.id)}
                      className="text-sm text-purple-700 font-semibold hover:text-purple-900 transition"
                    >
                      {showAnswers[item.id] ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    {showAnswers[item.id] && (
                      <p className="mt-2 text-sm bg-white/60 rounded p-3 text-gray-800">
                        <span className="font-bold">Answer:</span> {item.answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedItems.joke.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Smile className="w-6 h-6 text-yellow-600" />
            Funny Jokes
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {groupedItems.joke.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedItems.quiz.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            GK Quiz
          </h2>
          <div className="grid gap-4">
            {groupedItems.quiz.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                {item.answer && (
                  <div>
                    <button
                      onClick={() => toggleAnswer(item.id)}
                      className="text-sm text-blue-700 font-semibold hover:text-blue-900 transition"
                    >
                      {showAnswers[item.id] ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    {showAnswers[item.id] && (
                      <p className="mt-2 text-sm bg-white/60 rounded p-3 text-gray-800">
                        <span className="font-bold">Answer:</span> {item.answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedItems.crossword.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Grid3x3 className="w-6 h-6 text-pink-600" />
            Crosswords & Puzzles
          </h2>
          <div className="grid gap-4">
            {groupedItems.crossword.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${getColor(item.type)} rounded-xl p-6 border-l-4`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {funItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Smile className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No fun content available yet.</p>
        </div>
      )}
    </div>
  );
};