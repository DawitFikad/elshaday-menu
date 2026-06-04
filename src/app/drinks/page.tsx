"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { drinkItems, DrinkItem } from '@/data/menuData';
import { Container } from '@/components/Container';
import { StarRating } from '@/components/StarRating';
import { ARButton } from '@/components/ARButton';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Coffee, Snowflake, Flame, Search, Heart, TrendingUp, Clock, Sparkles, ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function DrinksPage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<DrinkItem['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'category'>('rating');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<DrinkItem | null>(null);

  const categories: { id: DrinkItem['category'] | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.all, icon: <Coffee size={18} /> },
    { id: 'hot', label: t.hotDrinks, icon: <Flame size={18} /> },
    { id: 'cold', label: t.coldDrinks, icon: <Snowflake size={18} /> },
  ];

  const filteredItems = useMemo(() => {
    let items = drinkItems.filter(item => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      const searchMatch = searchQuery === '' || 
        item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description[language].toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });

    // Sort items
    items.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name[language].localeCompare(b.name[language]);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return items;
  }, [activeCategory, searchQuery, sortBy, language]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />
      
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <Container>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Refreshing Selection</span>
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-gradient font-serif mb-4 sm:mb-6"
            >
              {t.drinks}
            </motion.h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-6" />
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto font-sans">
              Quench your thirst with our premium selection of hot and cold beverages
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
              <input
                type="text"
                placeholder={t.search || 'Search drinks...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-md border-2 border-amber-400/20 rounded-2xl text-white placeholder-white/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all font-sans"
              />
            </div>
          </motion.div>
            
            {/* Category Tabs - Scrollable on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex lg:flex-wrap lg:justify-center overflow-x-auto pb-4 lg:pb-0 gap-3 sm:gap-4 mb-6 sm:mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex-shrink-0 flex items-center space-x-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl sm:rounded-full text-xs sm:text-sm font-bold transition-all relative overflow-hidden border-2",
                    activeCategory === cat.id 
                      ? "text-slate-900 border-amber-400 shadow-xl shadow-amber-400/30" 
                      : "text-white/60 border-amber-400/20 bg-slate-800/50 hover:bg-slate-700/50 hover:border-amber-400/60 hover:text-white"
                  )}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="drinkCategoryActive"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat.icon}</span>
                  <span className="relative z-10 uppercase tracking-widest text-[10px] sm:text-xs">{cat.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Sort Options - Scrollable on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex lg:justify-center overflow-x-auto pb-4 lg:pb-0 mb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-shrink-0 px-8 py-3.5 rounded-2xl sm:rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-amber-400/20 bg-slate-800/50 text-white/60 focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="name">A-Z</option>
                <option value="category">Category</option>
              </select>
            </motion.div>

            {/* Results count */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-6"
              >
                <p className="text-white/60 text-sm font-sans">
                  {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </p>
              </motion.div>
            )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/50 flex flex-col h-full cursor-pointer transition-all duration-500 hover:shadow-amber-400/20 hover:border-amber-400/40 hover:scale-[1.02]"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 p-2 rounded-full bg-slate-900/50 backdrop-blur-sm border border-amber-400/20 hover:bg-amber-400/20 transition-all group-hover:border-amber-400/50"
                  >
                    <Heart 
                      size={16} 
                      className={cn(
                        "transition-colors",
                        favorites.has(item.id) ? "fill-red-500 text-red-500" : "text-amber-400/60 hover:text-red-500"
                      )}
                    />
                  </button>

                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
                    <img 
                      src={item.image} 
                      alt={item.name[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex flex-col gap-2 items-end">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <TrendingUp size={10} className="text-slate-900" />
                        <StarRating rating={item.rating} size={12} className="sm:size-[14px]" />
                      </div>
                    </div>
                    {/* Floating Category Icon */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20">
                      <div className={cn(
                        "p-2 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/20 text-white",
                        item.category === 'hot' ? "bg-gradient-to-br from-orange-500 to-red-500" : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      )}>
                        {item.category === 'hot' ? <Flame size={16} className="sm:size-[20px]" /> : <Snowflake size={16} className="sm:size-[20px]" />}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-grow flex flex-col relative">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                        item.category === 'hot' 
                          ? "text-orange-400 bg-orange-400/10 border-orange-400/20" 
                          : "text-blue-400 bg-blue-400/10 border-blue-400/20"
                      )}>
                        {item.category === 'hot' ? t.hotDrinks : t.coldDrinks}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-black text-sm">{item.price} ETB</span>
                        <div className="flex items-center gap-1 text-amber-400/60 text-xs">
                          <Clock size={12} />
                          <span>5-10 min</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                      {item.name[language]}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 flex-grow font-sans line-clamp-2">
                      {item.description[language]}
                    </p>
                    
                    <div className="flex flex-col gap-3 pt-4 border-t border-amber-400/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-400/60 font-sans">
                            {t.rating}
                          </span>
                          <span className="text-amber-400 font-bold">{item.rating}</span>
                        </div>
                        <button className="text-sm font-semibold text-amber-400 hover:text-white transition-colors duration-300 font-sans flex items-center gap-1 group/btn">
                          {t.submitReview}
                          <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                        </button>
                      </div>

                      {item.hasArAssets && item.arModel && (
                        <ARButton 
                          modelSrc={item.arModel} 
                          iosSrc={item.iosArModel} 
                          title={item.name[language]} 
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-amber-400/30 mx-auto mb-4" />
              <p className="text-white/60 text-lg font-sans">No drinks found matching your search</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-amber-400 hover:text-white transition-colors font-semibold"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </Container>
      </div>

      {/* Drink Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-amber-400/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 bg-slate-900/50 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-amber-400/20 transition-all border border-amber-400/20 group"
              >
                <X size={24} className="text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Image section */}
              <div className="relative h-72 sm:h-96 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name[language]}
                  className="w-full h-full object-cover"
                />
                {/* Floating badges */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                  <div className={cn(
                    "px-4 py-2 rounded-full border backdrop-blur-sm flex items-center gap-2",
                    selectedItem.category === 'hot'
                      ? "bg-orange-500/80 border-orange-400/30 text-white"
                      : "bg-blue-500/80 border-blue-400/30 text-white"
                  )}>
                    {selectedItem.category === 'hot' ? <Flame size={16} /> : <Snowflake size={16} />}
                    <span className="font-bold">{selectedItem.category === 'hot' ? t.hotDrinks : t.coldDrinks}</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <TrendingUp size={16} className="text-slate-900" />
                    <StarRating rating={selectedItem.rating} size={16} />
                    <span className="text-slate-900 font-bold">{selectedItem.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex items-center space-x-2 text-amber-400 hover:text-white transition-colors font-sans font-semibold"
                  >
                    <ArrowLeft size={20} />
                    <span>Back to Menu</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedItem.id);
                    }}
                    className="p-2 rounded-full bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 transition-all"
                  >
                    <Heart 
                      size={20} 
                      className={cn(
                        "transition-colors",
                        favorites.has(selectedItem.id) ? "fill-red-500 text-red-500" : "text-amber-400"
                      )}
                    />
                  </button>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                      {selectedItem.name[language]}
                    </h2>
                    <div className="text-amber-400 font-black text-2xl mb-4">{selectedItem.price} ETB</div>
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-8 font-sans">
                      {selectedItem.description[language]}
                    </p>

                    {selectedItem.hasArAssets && selectedItem.arModel && (
                      <div className="mb-8">
                        <ARButton 
                          modelSrc={selectedItem.arModel} 
                          iosSrc={selectedItem.iosArModel} 
                          title={selectedItem.name[language]} 
                        />
                      </div>
                    )}
                
                {/* Action buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-amber-400/20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-400/60" />
                      <span className="text-white/60 text-sm font-sans">5-10 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-400/60" />
                      <span className="text-amber-400 font-bold">{selectedItem.rating}</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-slate-900 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-amber-400/30 font-sans flex items-center gap-2">
                    {t.submitReview}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
