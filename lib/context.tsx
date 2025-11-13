'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Wallet, UserRole } from '@/types';

interface AppContextType {
  user: User | null;
  wallet: Wallet | null;
  setUser: (user: User | null) => void;
  setWallet: (wallet: Wallet | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  // تحميل بيانات المستخدم من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // تحميل المحفظة عند تسجيل الدخول
  useEffect(() => {
    if (user?.id) {
      fetchWallet(user.id);
    }
  }, [user]);

  const fetchWallet = async (userId: string) => {
    try {
      const response = await fetch(`/api/wallet/${userId}`);
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const selectRole = async (role: UserRole) => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/auth/select-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role }),
      });
      const data = await response.json();
      const updatedUser = { ...user, role: data.role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Select role error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setWallet(null);
    localStorage.removeItem('user');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        wallet,
        setUser,
        setWallet,
        login,
        register,
        selectRole,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
