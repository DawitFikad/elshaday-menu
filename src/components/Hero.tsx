"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from './Container';
import Link from 'next/link';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20 sm:pt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ 
            backgroundImage: "url('/images/hero-bg.jpg')",
            filter: "brightness(0.35)" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[1.1]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-gradient inline-block">ኤልሻዳይ</span>
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-3 sm:mt-4 font-bold text-amber-500 uppercase tracking-[0.2em]">ሁለገብ መዝናኛ</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-8 sm:mb-12 font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link 
              href="/foods" 
              className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-amber-500/40 text-base sm:text-lg text-center"
            >
              {t.foods}
            </Link>
            <Link 
              href="/drinks" 
              className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full font-bold border-2 border-white/20 transition-all hover:scale-105 active:scale-95 text-base sm:text-lg text-center"
            >
              {t.drinks}
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
