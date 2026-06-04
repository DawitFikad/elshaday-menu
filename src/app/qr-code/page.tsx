"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/Container';
import { QrCode, ArrowLeft, Sparkles, Smartphone, Printer, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function QRCodePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />
      
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Digital Access</span>
                <Sparkles className="w-6 h-6 text-amber-400" />
              </motion.div>

              <Link 
                href="/"
                className="inline-flex items-center space-x-2 text-white/60 hover:text-amber-400 transition-colors mb-6 mobile-touch-target"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Home</span>
              </Link>
              
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-400/30">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gradient font-serif mb-4 sm:mb-6">
                QR CODE GENERATOR
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-6" />
              <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
                Create and download premium QR codes for your restaurant. Customers can scan these codes to instantly access your digital menu on their phones.
              </p>
            </motion.div>

            {/* QR Code Generator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <QRCodeGenerator />
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-3xl p-6 shadow-2xl hover:border-amber-400/40 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 font-serif">Generate QR Code</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  Create a QR code that links directly to your restaurant's digital menu
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-3xl p-6 shadow-2xl hover:border-amber-400/40 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Printer className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 font-serif">Print & Display</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  Download and print the QR code to display at tables, entrance, or counter
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-3xl p-6 shadow-2xl hover:border-amber-400/40 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Smartphone className="w-6 h-6 text-slate-900" />
                </div>
                <h3 className="font-bold text-white mb-2 font-serif">Customer Access</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  Customers scan to instantly view your menu on their mobile devices
                </p>
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 bg-gradient-to-br from-amber-400/10 to-orange-500/10 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center font-serif flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Why Use QR Codes?
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="font-sans">Contactless dining experience</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="font-sans">Easy menu updates without reprinting</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="font-sans">Reduces printing costs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="font-sans">Modern, tech-forward impression</span>
                </div>
              </div>
            </motion.div>

            {/* Branding Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-amber-400/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-8 py-4">
                <p className="text-amber-400 font-bold tracking-widest text-sm uppercase">
                  Designed by Kuraz Digitals Agency
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  );
}
