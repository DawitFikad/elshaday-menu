"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { rooms, Room } from '@/data/roomData';
import { Container } from '@/components/Container';
import { StarRating } from '@/components/StarRating';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Wifi, ShowerHead, Utensils, Bed as BedIcon, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={16} />,
  hotShower: <ShowerHead size={16} />,
  roomService: <Utensils size={16} />,
};

export default function BedsPage() {
  const { language, t } = useLanguage();
  const [selectedRoom, setSelectedRoom] = useState<Room>(rooms[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset image index when room changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedRoom]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <Container>
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
            >
              <span className="text-gradient">{t.beds}</span>
            </motion.h1>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar List - Horizontal scroll on mobile */}
            <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={cn(
                    "flex-shrink-0 w-[280px] sm:w-[320px] lg:w-full text-left p-5 sm:p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group",
                    selectedRoom.id === room.id 
                      ? "bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-900/20" 
                      : "bg-white border-slate-100 text-slate-600 hover:border-amber-200 hover:bg-amber-50/30"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "p-3 rounded-2xl transition-colors",
                      selectedRoom.id === room.id ? "bg-amber-500 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600"
                    )}>
                      <BedIcon size={20} className="sm:size-[24px]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg line-clamp-1">{room.name[language]}</h3>
                      <StarRating rating={room.rating} size={12} className={selectedRoom.id === room.id ? "text-amber-400" : ""} />
                    </div>
                  </div>
                  <CheckCircle2 
                    size={18} 
                    className={cn(
                      "transition-all hidden sm:block",
                      selectedRoom.id === room.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    )} 
                  />
                </button>
              ))}
            </div>

            {/* Room Details View */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRoom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl"
                >
                  {/* Room Image Carousel */}
                  <div className="aspect-[4/3] sm:aspect-video bg-slate-200 relative overflow-hidden group/carousel">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={`${selectedRoom.id}-${activeImageIndex}`}
                        src={selectedRoom.images[activeImageIndex]} 
                        alt={selectedRoom.name[language]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    
                    {/* Carousel Controls - Always visible on mobile */}
                    <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-opacity z-20">
                      <button 
                        onClick={() => setActiveImageIndex(prev => (prev === 0 ? selectedRoom.images.length - 1 : prev - 1))}
                        className="p-2 sm:p-3 bg-black/40 text-white rounded-full backdrop-blur-md hover:bg-amber-500 transition-colors"
                      >
                        <ChevronLeft size={20} className="sm:size-[24px]" />
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => (prev === selectedRoom.images.length - 1 ? 0 : prev + 1))}
                        className="p-2 sm:p-3 bg-black/40 text-white rounded-full backdrop-blur-md hover:bg-amber-500 transition-colors"
                      >
                        <ChevronRight size={20} className="sm:size-[24px]" />
                      </button>
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                      {selectedRoom.images.map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all",
                            activeImageIndex === i ? "bg-amber-500 w-4 sm:w-8" : "bg-white/40"
                          )}
                        />
                      ))}
                    </div>

                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg border border-white/20">
                        <span className="text-slate-900 font-black uppercase tracking-widest text-[10px] sm:text-xs">
                          {t[selectedRoom.type as keyof typeof t]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-12">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8">
                      <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                          {selectedRoom.name[language]}
                        </h2>
                        <div className="flex items-center space-x-4">
                          <StarRating rating={selectedRoom.rating} size={16} />
                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Premium Quality</span>
                        </div>
                      </div>
                      <Link 
                        href="tel:+251" 
                        className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-500 transition-all group shadow-xl shadow-slate-900/10"
                      >
                        <span>Book Now</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-slate-100">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-6 h-0.5 bg-amber-500" />
                          {t.description}
                        </h4>
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                          {selectedRoom.description[language]}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-6 h-0.5 bg-amber-500" />
                          {t.amenities}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedRoom.amenities.map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-amber-200 transition-colors">
                              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                {amenityIcons[amenity]}
                              </div>
                              <span className="text-sm font-bold text-slate-700">{t[amenity as keyof typeof t]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  );
}
