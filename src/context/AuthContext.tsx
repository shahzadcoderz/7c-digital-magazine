import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, initializeAdmin } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAdmin().then(() => {
      const adminStatus = localStorage.getItem('adminAuthenticated');
      if (adminStatus === 'true') {
        setIsAuthenticated(true);
        setIsAdmin(true);
      }
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await crypto.subtle.digest('SHA-256', data);
      const passwordHash = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('password_hash', passwordHash)
        .maybeSingle();

      if (error || !admin) {
        return false;
      }

      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('adminAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};