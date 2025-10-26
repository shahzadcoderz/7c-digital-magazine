import React from 'react';
import { LogIn, BookOpen } from 'lucide-react';

interface LoginPageProps {
  onLogin?: () => void; // optional callback for navigation
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // Directly go to admin panel
    if (onLogin) onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-amber-50 to-teal-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-600 p-4 rounded-full">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            VII-C Magazine
          </h1>
          <p className="text-center text-gray-600 mb-8">Admin Panel</p>

          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Login to Admin Panel
          </button>
        </div>

        <div className="text-center mt-6 text-gray-600 text-sm">
          <p className="italic">Beyond Boundaries - Breaking limits in learning and life</p>
        </div>
      </div>
    </div>
  );
};