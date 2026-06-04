"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, Utensils, Coffee, Bed, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'am', label: 'አማ' },
    { code: 'or', label: 'OR' },
  ];

  const navLinks = [
    { href: '/foods', label: t.foods, icon: <Utensils size={20} /> },
    { href: '/drinks', label: t.drinks, icon: <Coffee size={20} /> },
    { href: '/beds', label: t.beds, icon: <Bed size={20} /> },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/10" 
          : "bg-transparent py-5"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="group flex flex-col items-start">
              <span className="text-xl sm:text-2xl font-black text-white leading-none tracking-tighter">
                <span className="text-amber-500 group-hover:text-amber-400 transition-colors">ኤልሻዳይ</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">ሁለገብ መዝናኛ</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <div className="flex items-center space-x-1 lg:space-x-2 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-bold transition-all flex items-center space-x-2 px-4 py-2.5 rounded-xl",
                    pathname === link.href 
                      ? "text-white bg-amber-500 shadow-lg shadow-amber-500/20" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.icon}
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-black transition-all",
                    language === lang.code
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-black transition-all",
                    language === lang.code
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-white/5 rounded-xl text-white hover:text-amber-500 transition-colors border border-white/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-4 right-4 mt-4 bg-slate-900 border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden md:hidden"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-2xl transition-all",
                      pathname === link.href 
                        ? "bg-amber-500 text-white shadow-xl shadow-amber-500/20" 
                        : "bg-white/5 text-slate-300 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-xl",
                      pathname === link.href ? "bg-white/20" : "bg-white/5"
                    )}>
                      {link.icon}
                    </div>
                    <span className="text-lg font-bold">{link.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Language</span>
                  <span className="text-white font-bold">{languages.find(l => l.code === language)?.label}</span>
                </div>
                <div className="flex space-x-2">
                  <Link href="tel:+251" className="p-3 bg-white/5 rounded-xl text-amber-500 hover:bg-amber-500 hover:text-white transition-all">
                    <Phone size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
