"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from './Container';
import { StarRating } from './StarRating';

const hotelReviews = [
  {
    id: 1,
    name: "Abebe Kebede",
    comment: {
      en: "Amazing service and authentic food! The Doro Wat is a must-try.",
      am: "ድንቅ አገልግሎት እና ትክክለኛ ባህላዊ ምግብ! ዶሮ ወጡን እንዳያመልጥዎት።",
      or: "Tajaajila ajaa'ibaa fi nyaata aadaa dhugaa! Kukkuun isaa akka isin hin dabarre."
    },
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    comment: {
      en: "The rooms are very comfortable and the staff is incredibly friendly.",
      am: "ክፍሎቹ በጣም ምቹ ናቸው ሰራተኞቹም በጣም ደግ ናቸው።",
      or: "Kutaaleen isaa baay'ee mijatoo dha, hojjettoonnis baay'ee gaarii dha."
    },
    rating: 4
  }
];

export const ReviewsSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            <span className="text-gradient">{t.hotelReview}</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotelReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-8 text-amber-500/20" size={60} />
              
              <div className="relative z-10">
                <StarRating rating={review.rating} size={18} className="mb-4" />
                <p className="text-slate-700 text-lg italic mb-6 leading-relaxed">
                  "{review.comment[language]}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-slate-900">{review.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-amber-500 rounded-3xl p-10 text-center text-white shadow-2xl shadow-amber-500/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.hotelReview}</h3>
          <p className="text-amber-50 max-w-xl mx-auto mb-8 opacity-90">
            Your feedback helps us improve. Rate your overall experience with us!
          </p>
          <div className="flex flex-col items-center space-y-6">
            <StarRating 
              rating={0} 
              max={5} 
              size={40} 
              interactive={true} 
              className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm"
              onRate={(r) => alert(`Thank you for your ${r}-star rating!`)}
            />
            <button className="bg-white text-amber-600 px-8 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors">
              {t.submitReview}
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
