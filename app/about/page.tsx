"use client";

import React from "react";
import Image from "next/image";
import { Award, Compass, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="h-6 w-6 text-black" />,
      title: "Epicurean Standard",
      desc: "We cook only with pure ingredients, authentic recipes, and hand-ground spice masalas.",
    },
    {
      icon: <Compass className="h-6 w-6 text-black" />,
      title: "Cuisine Fusion",
      desc: "Our kitchens run multiple hearths: traditional Tandoori clay ovens, blazing woks, and hot continental grills.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
      title: "Impeccable Sourcing",
      desc: "We partner with local organic spice plantations and meat houses in Telangana to ensure premium standards.",
    },
    {
      icon: <Heart className="h-6 w-6 text-black" />,
      title: "Warm Hospitality",
      desc: "Cafe The Multi Cuisine is designed for family dinners, friendly gathers, and celebrating memories.",
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=600&auto=format&fit=crop",
      title: "Tandoori Specialties",
    },
    {
      url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
      title: "Blazing Chinese Woks",
    },
    {
      url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600&auto=format&fit=crop",
      title: "Traditional South Indian Breakfast",
    },
    {
      url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
      title: "Decadent Desserts",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-black">
        {/* Cinematic Header */}
        <section className="relative pt-32 pb-20 overflow-hidden text-center bg-[#FAF9F5] border-b border-black/8">
          <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4 relative z-10">
            <span className="text-[10px] tracking-[0.25em] font-mono text-[#8A8880] uppercase block">Our Heritage</span>
            <h1 className="text-4xl md:text-7xl font-display font-light italic text-black leading-none">
              The Art of Fine Dining
            </h1>
            <div className="h-[1px] w-20 bg-black/10 mx-auto mt-4" />
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed max-w-2xl mx-auto font-sans font-light">
              For years, Cafe The Multi Cuisine Restaurant has stood as a beacon of luxurious food, bringing under one roof the sensory delights of Indian, Chinese, South Indian, Oriental, and Continental cuisines.
            </p>
          </div>
        </section>

        {/* Editorial Story */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="font-display italic text-3xl md:text-5xl font-light leading-tight text-black">
              A Culinary Sanctuary in <span className="underline decoration-black/15">Secunderabad</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-sans font-light">
              Established in Secunderabad, Cafe The Multi Cuisine Restaurant started with a simple vision: to create a dining experience that does not compromise on authenticity, even when serving a diverse, global menu.
            </p>
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-sans font-light">
              We designed our kitchen to operate as five micro-specialties. Rather than employing generalized cooks, we host dedicated culinary chefs for each section. Our Tandoor items are baked in traditional clay brick ovens; our Chinese entrees are tossed in high-heat steel woks; and our South Indian breakfast dishes are prepared using traditional fermenting methods.
            </p>
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-sans font-light">
              Whether you are craving the comfort of Dal Makhani, the spicy glaze of Paneer Chilli, or a light Caesar Salad at dusk, we invite you to experience hospitality crafted for your senses.
            </p>
          </div>

          <div className="lg:col-span-5 relative h-[380px] lg:h-[480px] rounded-2xl overflow-hidden border border-black/8 shadow-sm bg-[#FAF9F5]">
            <Image
              src="https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=600&auto=format&fit=crop"
              alt="Indulgent family curry table spread"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
          </div>
        </section>

        {/* Brand Values / Philosophy */}
        <section className="py-20 bg-[#FAF9F5] border-y border-black/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#8A8880] uppercase block">Our Guiding Pillars</span>
              <h2 className="text-3xl sm:text-4xl font-display font-light italic text-black">Uncompromising Dining Philosophy</h2>
              <div className="h-[1px] w-16 bg-black/10 mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl space-y-4 border border-black/8 flex flex-col items-start text-left">
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-black/8">{v.icon}</div>
                  <h3 className="font-display italic text-lg font-semibold text-black">{v.title}</h3>
                  <p className="text-xs text-[#555550] leading-relaxed font-sans font-light">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Showcase (Gallery Grid) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#8A8880] uppercase block">Visual Poetry</span>
              <h2 className="text-3xl sm:text-4xl font-display font-light italic text-black">Inside Our Culinary Sanctuary</h2>
              <div className="h-[1px] w-16 bg-black/10 mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative h-64 w-full rounded-2xl overflow-hidden group border border-black/8 bg-[#FAF9F5]">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h3 className="text-[10px] font-sans font-semibold text-black uppercase tracking-widest">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Dedication banner */}
        <section className="py-20 bg-[#FAF9F5] border-t border-black/8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6">
            <Sparkles className="h-7 w-7 text-black mx-auto animate-pulse-slow" />
            <blockquote className="font-display text-lg sm:text-2xl leading-relaxed italic text-[#111111] font-light max-w-2xl mx-auto">
              “Flavour is a universal language. Our mission at Cafe The Multi Cuisine Restaurant is to tell a global culinary story through తెలంగాణ authenticity and luxury presentation. Each platter represents a legacy.”
            </blockquote>
            <div className="space-y-1">
              <cite className="not-italic text-sm font-semibold uppercase tracking-wider text-black font-sans">
                Executive Chef Team
              </cite>
              <p className="text-[9px] font-mono text-[#8A8880] uppercase">Cafe The Multi Cuisine Restaurant</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
