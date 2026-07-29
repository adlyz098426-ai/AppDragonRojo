import React from 'react';
import { ServiceItem } from '../types';
import { Calendar, Users, Sparkles, CheckCircle, Phone } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  phone: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, phone }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-6 h-6 text-[#e63946]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#e63946]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#e63946]" />;
      default: return <Sparkles className="w-6 h-6 text-[#e63946]" />;
    }
  };

  return (
    <section id="servicios" className="py-20 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#e63946]" />
            <span>Experiencias Exclusivas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Nuestros Servicios & Atención
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Brindamos una experiencia gastronómica integral para compartir momentos inolvidables.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#161616] rounded-2xl p-8 border border-white/10 shadow-xl flex flex-col justify-between hover:border-[#e63946]/40 transition-all group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(srv.icon)}
                </div>

                <h3 className="text-xl font-bold text-white font-serif mb-3 group-hover:text-[#e63946] transition-colors uppercase tracking-tight">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8">
                  {srv.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-[#e63946] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`tel:${phone}`}
                className="w-full py-3 px-4 rounded-xl bg-[#0a0a0a] hover:bg-[#e63946] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Consultar Servicio</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

