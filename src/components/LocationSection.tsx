import React from 'react';
import { BrandingConfig } from '../types';
import { MapPin, Clock, Phone, Mail, Navigation, AlertCircle, MessageSquare } from 'lucide-react';

interface LocationSectionProps {
  branding: BrandingConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ branding }) => {
  return (
    <section id="ubicacion" className="py-20 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#e63946]" />
            <span>Visítanos en Nuestro Local</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Ubicación & Horarios de Atención
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Te esperamos con los brazos abiertos en nuestras instalaciones climatizadas.
          </p>
        </div>

        {/* Notice Card: No Delivery */}
        <div className="mb-10 max-w-4xl mx-auto p-4 rounded-2xl bg-[#161616] border border-[#e63946]/30 shadow-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#e63946]/20 border border-[#e63946]/40 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-[#e63946]" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Aviso Importante a Nuestros Clientes</h4>
            <p className="text-xs text-zinc-300 mt-0.5">
              En <strong className="text-[#e63946]">{branding.name}</strong> NO contamos con servicio a domicilio ni repartidores externos. Nuestra máxima prioridad es ofrecerte los platillos recién salidos de la brasa en nuestra mesa.
            </p>
          </div>
        </div>

        {/* Main Grid: Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-[#161616] p-6 rounded-2xl border border-white/10 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">Dirección</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    {branding.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branding.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-xs font-semibold uppercase tracking-wider text-[#e63946] hover:underline transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Abrir Ruta en GPS</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#161616] p-6 rounded-2xl border border-white/10 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="text-base font-bold text-white font-serif mb-2">Horarios de Atención</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                      <span className="font-medium text-white block">{branding.hours.weekday}</span>
                      <span className="text-[11px] text-zinc-400">Servicio de Desayunos, Almuerzos y Cenas</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                      <span className="font-medium text-white block">{branding.hours.weekend}</span>
                      <span className="text-[11px] text-zinc-400">Platillos Especiales & Cuy Asado continuo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Contact Card */}
            <div className="bg-[#161616] p-6 rounded-2xl border border-white/10 shadow-lg space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Contacto Directo</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${branding.phone}`}
                  className="p-3 rounded-xl bg-[#0a0a0a] hover:bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="truncate">{branding.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${branding.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/50 text-xs text-emerald-300 flex items-center gap-2.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-zinc-400">
                <Mail className="w-4 h-4 text-[#e63946]" />
                <span>{branding.email}</span>
              </div>
            </div>
          </div>

          {/* Google Maps Side (7 cols) */}
          <div className="lg:col-span-7 h-[420px] lg:h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#161616]">
            <iframe
              title="Ubicación Google Maps - Restaurante Dragón Rojo"
              src={branding.googleMapsEmbedUrl}
              className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

