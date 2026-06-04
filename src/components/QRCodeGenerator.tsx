"use client";

import React, { useState, useRef } from 'react';
import { Download, Share2, QrCode, Smartphone, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import { RESTAURANT_URL } from '@/lib/constants';

export const QRCodeGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadQRCode = () => {
    setIsGenerating(true);
    try {
      // Create a simple QR code placeholder image download
      const link = document.createElement('a');
      link.download = 'elshaday-restaurant-qr.png';
      link.href = '/api/qr-code';
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(RESTAURANT_URL);
      alert('URL copied to clipboard!');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareQRCode = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: t.title || 'Elshaday Restaurant',
          text: t.subtitle || 'Experience Premium Hospitality & Traditional Flavors',
          url: RESTAURANT_URL,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(RESTAURANT_URL);
        alert('URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-amber-400/30">
          <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-serif">
          QR Code Generator
        </h3>
        <p className="text-sm text-white/70 leading-relaxed font-sans">
          Generate a QR code for customers to scan and access the digital menu
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 mb-6 border border-amber-400/10">
        {/* QR Code Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center border-2 border-amber-400/30 shadow-inner">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-amber-400/60 mx-auto mb-2" />
              <p className="text-xs text-white/50 font-sans">QR Code</p>
              <p className="text-xs text-white/30 mt-1 font-sans">{RESTAURANT_URL}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={downloadQRCode}
          disabled={isGenerating}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 disabled:from-amber-400/50 disabled:to-orange-500/50 text-slate-900 rounded-2xl font-bold transition-all shadow-lg hover:shadow-amber-400/30 mobile-touch-target"
        >
          <Download size={18} />
          <span>{isGenerating ? 'Generating...' : 'Download QR Code'}</span>
        </button>
        
        <button
          onClick={shareQRCode}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-2xl font-bold transition-all border border-amber-400/20 hover:border-amber-400/40 mobile-touch-target"
        >
          <Share2 size={18} />
          <span>Share URL</span>
        </button>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-amber-400/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border border-amber-400/20">
        <p className="text-xs text-amber-400 font-medium text-center font-sans">
          <strong>URL:</strong> {RESTAURANT_URL}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-white/50">
        <Smartphone size={14} />
        <span className="font-sans">Customers can scan this QR code to view the menu</span>
      </div>

      <div className="mt-6 pt-6 border-t border-amber-400/20 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <p className="text-amber-400 font-bold tracking-widest text-xs uppercase">
            Designed by Kuraz Digitals Agency
          </p>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
      </div>
    </div>
  );
};
