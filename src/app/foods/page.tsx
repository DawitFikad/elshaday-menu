"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { menuItems, MenuItem } from '@/data/menuData';
import { Container } from '@/components/Container';
import { StarRating } from '@/components/StarRating';
import { ARButton } from '@/components/ARButton';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Utensils, Leaf, Beef, ArrowLeft, ArrowRight, X, Search, Heart, TrendingUp, Clock, Sparkles } from 'lucide-react';

export default function FoodsPage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<MenuItem['category'] | 'all'>('all');
  const [fastingFilter, setFastingFilter] = useState<'all' | 'fasting' | 'non-fasting'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'category'>('rating');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories: { id: MenuItem['category'] | 'all'; label: string }[] = [
    { id: 'all', label: t.all },
    { id: 'breakfast', label: t.breakfast },
    { id: 'lunch', label: t.lunch },
    { id: 'dinner', label: t.dinner },
  ];

  const filteredItems = useMemo(() => {
    let items = menuItems.filter(item => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      const fastingMatch = 
        fastingFilter === 'all' || 
        (fastingFilter === 'fasting' && item.isFasting) || 
        (fastingFilter === 'non-fasting' && !item.isFasting);
      const searchMatch = searchQuery === '' || 
        item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients[language].some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && fastingMatch && searchMatch;
    });

    // Sort items
    items.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name[language].localeCompare(b.name[language]);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return items;
  }, [activeCategory, fastingFilter, searchQuery, sortBy, language]);

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
    <main className="min-h-screen bg-gradient-to-br from-black via-charcoal to-burgundy text-ivory">
      <Navbar />
      
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <Container>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="text-gold text-sm font-bold uppercase tracking-widest">Premium Selection</span>
              <Sparkles className="w-6 h-6 text-gold" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-gradient font-serif mb-4 sm:mb-6"
            >
              FOOD MENU
            </motion.h1>
            <div className="animated-separator mx-auto mb-6 sm:mb-8" />
            <p className="text-ivory/60 text-sm sm:text-base max-w-2xl mx-auto font-sans">
              Discover our authentic Ethiopian cuisine crafted with love and tradition
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
              <input
                type="text"
                placeholder={t.search || 'Search dishes, ingredients...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-md border-2 border-gold/20 rounded-2xl text-ivory placeholder-ivory/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all font-sans"
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
                    "flex-shrink-0 px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border-2 relative overflow-hidden uppercase tracking-widest",
                    activeCategory === cat.id 
                      ? "text-black border-gold shadow-xl luxury-shadow" 
                      : "text-ivory/60 border-gold/20 bg-black/20 hover:bg-gold/10 hover:border-gold/40 hover:text-ivory"
                  )}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="categoryActive"
                      className="absolute inset-0 bg-gold"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Fasting Filter & Sort - Scrollable on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex lg:flex-wrap lg:justify-center overflow-x-auto pb-4 lg:pb-0 gap-3 sm:gap-4 mb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              <button
                onClick={() => setFastingFilter('all')}
                className={cn(
                  "flex-shrink-0 flex items-center space-x-2 px-5 sm:px-8 py-3.5 rounded-2xl sm:rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-2",
                  fastingFilter === 'all' ? "bg-gold text-black border-gold shadow-lg" : "bg-black/20 text-ivory/60 border-gold/20 hover:border-gold/40"
                )}
              >
                <Utensils size={14} />
                <span>{t.all}</span>
              </button>
              <button
                onClick={() => setFastingFilter('fasting')}
                className={cn(
                  "flex-shrink-0 flex items-center space-x-2 px-5 sm:px-8 py-3.5 rounded-2xl sm:rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-2",
                  fastingFilter === 'fasting' ? "bg-green-600 text-white border-green-600 shadow-lg" : "bg-black/20 text-green-400/60 border-green-400/20 hover:border-green-400/40"
                )}
              >
                <Leaf size={14} />
                <span>{t.fasting}</span>
              </button>
              <button
                onClick={() => setFastingFilter('non-fasting')}
                className={cn(
                  "flex-shrink-0 flex items-center space-x-2 px-5 sm:px-8 py-3.5 rounded-2xl sm:rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-2",
                  fastingFilter === 'non-fasting' ? "bg-red-600 text-white border-red-600 shadow-lg" : "bg-black/20 text-red-400/60 border-red-400/20 hover:border-red-400/40"
                )}
              >
                <Beef size={14} />
                <span>{t.nonFasting}</span>
              </button>

              <div className="hidden lg:block w-px h-10 bg-gold/20 mx-4" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-shrink-0 px-5 sm:px-8 py-3.5 rounded-2xl sm:rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-gold/20 bg-black/20 text-ivory/60 focus:border-gold focus:outline-none cursor-pointer"
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
                <p className="text-ivory/60 text-sm font-sans">
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
                  className="group relative bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border border-gold/20 rounded-3xl overflow-hidden shadow-2xl luxury-shadow flex flex-col h-full cursor-pointer transition-all duration-500 hover:shadow-gold/30 hover:border-gold/50 hover:scale-[1.02]"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20 hover:bg-gold/20 transition-all group-hover:border-gold/50"
                  >
                    <Heart 
                      size={16} 
                      className={cn(
                        "transition-colors",
                        favorites.has(item.id) ? "fill-red-500 text-red-500" : "text-gold/60 hover:text-red-500"
                      )}
                    />
                  </button>

                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-charcoal to-black">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img 
                      src={item.image} 
                      alt={item.name[language]}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex flex-col gap-2 items-end">
                      <div className="bg-gold/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <TrendingUp size={10} className="text-black" />
                        <StarRating rating={item.rating} size={12} className="sm:size-[14px]" />
                      </div>
                      {item.isFasting ? (
                        <div className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center space-x-1 shadow-lg">
                          <Leaf size={10} />
                          <span>{t.fasting}</span>
                        </div>
                      ) : (
                        <div className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center space-x-1 shadow-lg">
                          <Beef size={10} />
                          <span>{t.nonFasting}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-grow flex flex-col relative">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                        {t[item.category as keyof typeof t]}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gold font-black text-sm">{item.price} ETB</span>
                        <div className="flex items-center gap-1 text-gold/60 text-xs">
                          <Clock size={12} />
                          <span>15-30 min</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-ivory mb-3 group-hover:text-gold transition-colors duration-300">
                      {item.name[language]}
                    </h3>
                    <p className="text-ivory/70 text-sm leading-relaxed mb-4 flex-grow font-sans line-clamp-2">
                      {item.description[language]}
                    </p>
                    
                    <div className="flex flex-col gap-3 pt-4 border-t border-gold/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-gold/60 font-sans">
                            {t.rating}
                          </span>
                          <span className="text-gold font-bold">{item.rating}</span>
                        </div>
                        <button className="text-sm font-semibold text-gold hover:text-ivory transition-colors duration-300 font-sans flex items-center gap-1 group/btn">
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
              <Search className="w-16 h-16 text-gold/30 mx-auto mb-4" />
              <p className="text-ivory/60 text-lg font-sans">No dishes found matching your search</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-gold hover:text-ivory transition-colors font-semibold"
              >
                Clear search
              </button>
            </motion.div>
          )}

          {/* Food Detail Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedItem(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-gradient-to-br from-black via-charcoal to-black border border-gold/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto luxury-shadow relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-gold/20 transition-all border border-gold/20 group"
                  >
                    <X size={24} className="text-gold group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* Image section */}
                  <div className="relative h-72 sm:h-96 overflow-hidden bg-gradient-to-br from-charcoal to-black rounded-t-3xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name[language]}
                      className="w-full h-full object-contain"
                    />
                    {/* Floating badges */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                      <div className="flex gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-gold bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30">
                          {t[selectedItem.category as keyof typeof t]}
                        </span>
                        {selectedItem.isFasting ? (
                          <span className="text-sm font-bold uppercase tracking-wider text-green-400 bg-green-900/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 flex items-center space-x-1">
                            <Leaf size={14} />
                            <span>{t.fasting}</span>
                          </span>
                        ) : (
                          <span className="text-sm font-bold uppercase tracking-wider text-red-400 bg-red-900/60 backdrop-blur-sm px-4 py-2 rounded-full border border-red-400/30 flex items-center space-x-1">
                            <Beef size={14} />
                            <span>{t.nonFasting}</span>
                          </span>
                        )}
                      </div>
                      <div className="bg-gold/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <TrendingUp size={16} className="text-black" />
                        <StarRating rating={selectedItem.rating} size={16} />
                        <span className="text-black font-bold">{selectedItem.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="flex items-center space-x-2 text-gold hover:text-ivory transition-colors font-sans font-semibold"
                      >
                        <ArrowLeft size={20} />
                        <span>{t.backToMenu || 'Back to Menu'}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(selectedItem.id);
                        }}
                        className="p-2 rounded-full bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all"
                      >
                        <Heart 
                          size={20} 
                          className={cn(
                            "transition-colors",
                            favorites.has(selectedItem.id) ? "fill-red-500 text-red-500" : "text-gold"
                          )}
                        />
                      </button>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory mb-2">
                      {selectedItem.name[language]}
                    </h2>
                    <div className="text-gold font-black text-2xl mb-4">{selectedItem.price} ETB</div>
                    
                    <p className="text-ivory/80 text-lg leading-relaxed mb-8 font-sans">
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
                    
                    {/* Ingredients */}
                    <div className="mb-8">
                      <h3 className="text-xl font-serif font-bold text-ivory mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-gold" />
                        {t.ingredients}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedItem.ingredients[language].map((ingredient, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-gradient-to-r from-gold/10 to-gold/5 text-gold px-4 py-2 rounded-full text-sm font-sans border border-gold/20 hover:border-gold/40 transition-colors cursor-default"
                          >
                            {ingredient}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gold/20">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gold/60" />
                          <span className="text-ivory/60 text-sm font-sans">15-30 min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-gold/60" />
                          <span className="text-gold font-bold">{selectedItem.rating}</span>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-gold/30 font-sans flex items-center gap-2">
                        {t.submitReview}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>

      <Footer />
    </main>
  );
}
