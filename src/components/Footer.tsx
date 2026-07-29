import React from 'react';
import { BrandingConfig } from '../types';
import { Sparkles, MapPin, Phone, Shield } from 'lucide-react';

interface FooterProps {
  branding: BrandingConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ branding, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0a0a0a] text-zinc-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={branding.logoUrl}
                alt={branding.name}
                className="w-10 h-10 rounded-full border border-[#e63946]/80 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-xl text-white font-serif">{branding.name}</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {branding.slogan}. Ofreciendo la mejor tradición gastronómica presencial en un ambiente cálido y familiar.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e63946]/10 border border-[#e63946]/30 text-red-300 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-[#e63946]" />
              <span>Sólo atención presencial en restaurante</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-[#e63946] transition-colors">Inicio</a></li>
              <li><a href="#menu" className="hover:text-[#e63946] transition-colors">Nuestra Carta</a></li>
              <li><a href="#servicios" className="hover:text-[#e63946] transition-colors">Servicios & Eventos</a></li>
              <li><a href="#ubicacion" className="hover:text-[#e63946] transition-colors">Ubicación & Horarios</a></li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Administración</h4>
            <p className="text-xs text-zinc-400">Acceso exclusivo para el personal del restaurante.</p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:text-white transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {branding.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#e63946]" /> Atendiendo en local</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-500" /> {branding.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

