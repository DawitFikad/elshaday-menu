"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Container } from '@/components/Container';
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Default admin credentials
    if (username === 'admin' && password === 'admin123') {
      // For static export, we'll use localStorage to "persist" login state
      localStorage.setItem('isAdminLoggedIn', 'true');
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-24 pb-12">
        <Container className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 blur-3xl -z-10" />

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-3xl mb-6 border border-amber-500/20">
                <Lock className="w-10 h-10 text-amber-500" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Admin Portal</h1>
              <p className="text-slate-400 font-medium">Please sign in to manage your menu</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-sm font-bold text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <LogIn className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm font-medium mb-4">Forgot your credentials?</p>
              <button 
                type="button"
                className="text-amber-500 font-bold hover:text-amber-400 transition-colors inline-flex items-center gap-2"
                onClick={() => alert('Default credentials are: admin / admin123')}
              >
                Get Help <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </Container>
      </div>
    </main>
  );
}
