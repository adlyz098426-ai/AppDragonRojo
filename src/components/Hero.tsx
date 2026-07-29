import React from 'react';
import { BrandingConfig } from '../types';
import { Utensils, MapPin, Flame, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  branding: BrandingConfig;
}

export const Hero: React.FC<HeroProps> = ({ branding }) => {
  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    document.querySelector('#ubicacion')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] py-16 lg:py-24">
      {/* Background Hero Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={branding.heroImageUrl}
          alt="Restaurante Dragón Rojo Ambiente"
          className="w-full h-full object-cover filter brightness-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/90" />
      </div>

      {/* Decorative Red Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#e63946]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg"
        >
          <Flame className="w-4 h-4 text-[#e63946] animate-pulse" />
          <span>Atención Presencial en Restaurante — Fuego y Tradición</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-serif tracking-tight leading-none mb-6"
        >
          <span className="block text-zinc-100">{branding.name}</span>
          <span className="block mt-3 text-3xl sm:text-5xl lg:text-6xl font-serif font-bold italic text-[#e63946]">
            Sabor Ancestral & Brasa
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-10"
        >
          {branding.slogan}. Disfruta de la mejor experiencia gastronómica en un ambiente acogedor, con ingredientes de primera y la sazón única de nuestras recetas secretas a las brasas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e63946] hover:bg-[#d62839] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-950/60 flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95"
          >
            <Utensils className="w-4 h-4 text-amber-300" />
            <span>Ver Carta Completa</span>
          </button>

          <button
            onClick={scrollToLocation}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
          >
            <MapPin className="w-4 h-4 text-[#e63946]" />
            <span>Ubicación y Horarios</span>
          </button>
        </motion.div>

        {/* Value Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8"
        >
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#161616] border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#e63946] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Receta Tradicional</p>
              <p className="text-sm font-semibold text-white">Cuy Asado & Brasa</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#161616] border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#e63946] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Atención Diaria</p>
              <p className="text-sm font-semibold text-white">Desayunos y Almuerzos</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#161616] border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#e63946] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Atención Presencial</p>
              <p className="text-sm font-semibold text-white">Local Climatizado</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

