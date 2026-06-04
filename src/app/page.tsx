"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Container } from "@/components/Container";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { Utensils, Coffee, Bed, ArrowRight, QrCode } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const categories = [
    {
      title: t.foods,
      href: "/foods",
      icon: <Utensils size={40} />,
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=800&auto=format&fit=crop",
      description: t.exploreServices
    },
    {
      title: t.drinks,
      href: "/drinks",
      icon: <Coffee size={40} />,
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      description: t.exploreServices
    },
    {
      title: t.beds,
      href: "/beds",
      icon: <Bed size={40} />,
      color: "bg-slate-900",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
      description: t.exploreServices
    }
  ];

  return (
    <main className="min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <Hero />
      
      <section className="py-12 sm:py-16 lg:py-24 bg-white relative z-10">
        <Container>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 mb-4">{t.exploreServices}</h2>
            <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={cat.href}
                  className="group block bg-slate-50 rounded-2xl sm:rounded-[2.5rem] overflow-hidden hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-slate-100 h-full"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                    <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 ${cat.color} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                      {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center group-hover:text-amber-600 transition-colors">
                      {cat.title}
                      <ArrowRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
