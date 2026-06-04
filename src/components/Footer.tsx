"use client";

import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from './Container';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">ኤልሻዳይ</h3>
            <p className="max-w-xs text-sm leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Menu Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/foods" className="hover:text-amber-500 transition-colors">{t.foods}</Link></li>
              <li><Link href="/drinks" className="hover:text-amber-500 transition-colors">{t.drinks}</Link></li>
              <li><Link href="/beds" className="hover:text-amber-500 transition-colors">{t.beds}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} {t.title}. All rights reserved.</p>
          <p className="text-amber-400 font-bold tracking-wide">
            Designed by Kuraz Digitals Agency
          </p>
        </div>
      </Container>
    </footer>
  );
};
