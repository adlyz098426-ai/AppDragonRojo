import React, { useState } from 'react';
import { BrandingConfig } from '../types';
import { Menu as MenuIcon, X, ShieldAlert, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  branding: BrandingConfig;
  onOpenAdmin: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ branding, onOpenAdmin, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nuestra Carta', href: '#menu' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Ubicación y Horarios', href: '#ubicacion' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      {/* Top Banner Notice */}
      <div className="bg-[#e63946]/10 border-b border-[#e63946]/30 text-red-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-[#e63946] shrink-0" />
        <span>{branding.announcement || 'Atención presencial en local. No disponemos de servicio a domicilio.'}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#e63946]/80 shadow-lg shadow-red-950/50 transition-transform duration-300 group-hover:scale-105">
            <img
              src={branding.logoUrl}
              alt={branding.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback icon if image broken
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-serif flex items-center gap-1.5">
              {branding.name}
              <span className="w-2 h-2 rounded-full bg-[#e63946] animate-pulse inline-block"></span>
            </span>
            <span className="text-xs text-zinc-400 hidden sm:inline-block tracking-wide">
              {branding.slogan.length > 45 ? `${branding.slogan.substring(0, 45)}...` : branding.slogan}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors relative py-1 ${
                  isActive ? 'text-white border-b-2 border-[#e63946]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#ubicacion')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-[#e63946]" />
            <span>Cómo Llegar</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e63946] hover:bg-[#d62839] text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-red-950/50 transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Admin Portal</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-900 hover:text-red-400 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('#ubicacion')}
              className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-medium text-zinc-200 flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Ver Ubicación y Horarios</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
