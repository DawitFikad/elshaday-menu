"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit2, Trash2, Save, X, 
  Utensils, Coffee, Bed, LogOut, LayoutDashboard,
  Filter, TrendingUp, DollarSign, Package, Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { menuItems as initialMenuItems, drinkItems as initialDrinkItems, MenuItem, DrinkItem } from '@/data/menuData';
import { Container } from '@/components/Container';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'foods' | 'drinks'>('foods');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [drinkItems, setDrinkItems] = useState<DrinkItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth
    const auth = localStorage.getItem('isAdminLoggedIn');
    if (auth !== 'true') {
      window.location.href = '/admin';
    } else {
      setIsLoggedIn(true);
      setMenuItems(initialMenuItems);
      setDrinkItems(initialDrinkItems);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = '/admin';
  };

  const handleDelete = (id: string, type: 'food' | 'drink') => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'food') {
        setMenuItems(prev => prev.filter(item => item.id !== id));
      } else {
        setDrinkItems(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const startEdit = (item: any) => {
    setIsEditing(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (activeTab === 'foods') {
      setMenuItems(prev => prev.map(item => item.id === editForm.id ? editForm : item));
    } else {
      setDrinkItems(prev => prev.map(item => item.id === editForm.id ? editForm : item));
    }
    setIsEditing(null);
    setEditForm(null);
    alert('Item updated successfully!');
  };

  const handleAdd = () => {
    const newId = `${activeTab === 'foods' ? 'f' : 'd'}${Date.now()}`;
    const newItem: any = activeTab === 'foods' ? {
      id: newId,
      category: 'lunch',
      isFasting: false,
      name: { en: 'New Item', am: 'አዲስ ምግብ', or: 'Nyaata Haaraa' },
      description: { en: 'Description', am: 'መግለጫ', or: 'Ibsa' },
      ingredients: { en: [], am: [], or: [] },
      image: '/images/default.png',
      rating: 5.0,
      price: 0
    } : {
      id: newId,
      category: 'cold',
      name: { en: 'New Drink', am: 'አዲስ መጠጥ', or: 'Dhugaatii Haaraa' },
      description: { en: 'Description', am: 'መግለጫ', or: 'Ibsa' },
      image: '/images/default.png',
      rating: 5.0,
      price: 0
    };

    if (activeTab === 'foods') {
      setMenuItems([newItem, ...menuItems]);
    } else {
      setDrinkItems([newItem, ...drinkItems]);
    }
    startEdit(newItem);
  };

  if (!isLoggedIn) return null;

  const currentItems = activeTab === 'foods' 
    ? menuItems.filter(item => item.name[language].toLowerCase().includes(searchQuery.toLowerCase()))
    : drinkItems.filter(item => item.name[language].toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="pt-28 pb-12 flex-grow">
        <Container>
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Foods', value: menuItems.length, icon: Utensils, color: 'bg-blue-500' },
              { label: 'Total Drinks', value: drinkItems.length, icon: Coffee, color: 'bg-amber-500' },
              { label: 'Average Rating', value: '4.8', icon: TrendingUp, color: 'bg-emerald-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center space-x-6"
              >
                <div className={cn("p-4 rounded-2xl text-white", stat.color)}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
            {/* Dashboard Controls */}
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
                <button
                  onClick={() => setActiveTab('foods')}
                  className={cn(
                    "px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2",
                    activeTab === 'foods' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Utensils size={18} />
                  Foods
                </button>
                <button
                  onClick={() => setActiveTab('drinks')}
                  className={cn(
                    "px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2",
                    activeTab === 'drinks' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Coffee size={18} />
                  Drinks
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-amber-500 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Plus size={20} />
                  Add Item
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-200 hover:bg-red-500 hover:text-white text-slate-600 rounded-2xl font-black flex items-center justify-center gap-2 transition-all"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Item</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Price (ETB)</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">AR Model</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence mode="popLayout">
                    {currentItems.map((item) => (
                      <motion.tr
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-lg">{item.name[language]}</p>
                              <p className="text-sm text-slate-400 line-clamp-1">{item.description[language]}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-xl font-black text-slate-900">{item.price}</span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          {item.arModel ? (
                            <span className="inline-flex items-center gap-1.5 text-amber-500 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-200">
                              <Sparkles size={14} />
                              {item.arModel.split('/').pop()}
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs font-medium italic">None</span>
                          )}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => startEdit(item)}
                              className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, activeTab === 'foods' ? 'food' : 'drink')}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Edit Item</h3>
                <button onClick={() => setIsEditing(null)} className="p-3 hover:bg-slate-100 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Name (English)</label>
                    <input
                      type="text"
                      value={editForm.name.en}
                      onChange={(e) => setEditForm({ ...editForm, name: { ...editForm.name, en: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-amber-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price (ETB)</label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-amber-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description (English)</label>
                  <textarea
                    value={editForm.description.en}
                    onChange={(e) => setEditForm({ ...editForm, description: { ...editForm.description, en: e.target.value } })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-amber-500 focus:outline-none transition-all min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">AR Model Path (e.g. /models/kitfo.glb)</label>
                    <input
                      type="text"
                      value={editForm.arModel || ''}
                      onChange={(e) => setEditForm({ ...editForm, arModel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-300"
                      placeholder="Enter model path..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">iOS AR Model Path (e.g. /models/kitfo.usdz)</label>
                    <input
                      type="text"
                      value={editForm.iosArModel || ''}
                      onChange={(e) => setEditForm({ ...editForm, iosArModel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-300"
                      placeholder="Enter iOS model path..."
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <input
                    type="checkbox"
                    id="hasArAssets"
                    checked={editForm.hasArAssets || false}
                    onChange={(e) => setEditForm({ ...editForm, hasArAssets: e.target.checked })}
                    className="w-5 h-5 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="hasArAssets" className="text-sm font-bold text-slate-700 uppercase tracking-wider cursor-pointer">
                    Enable AR Button for this item
                  </label>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(null)}
                  className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
