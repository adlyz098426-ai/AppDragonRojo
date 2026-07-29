import React from 'react';
import { Dish } from '../types';
import { X, Flame, Clock, Tag, CheckCircle, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  phone: string;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose, phone }) => {
  if (!dish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#161616] border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black text-zinc-400 hover:text-white p-2 rounded-full border border-white/10 transition-colors backdrop-blur-md"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0a0a0a]">
            <img
              src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
              alt={dish.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/40 to-transparent" />

            {/* Badges on image */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md ${
                dish.available 
                  ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-300' 
                  : 'bg-red-950/90 border border-red-500/50 text-red-300'
              }`}>
                {dish.available ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {dish.available ? 'Disponible en Local' : 'Agotado'}
              </span>

              <span className="text-2xl font-bold text-white font-sans bg-[#0a0a0a]/80 px-4 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                ${dish.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-2">
                {dish.name}
              </h3>

              {/* Tags & Spicy info */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                {dish.preparationTime && (
                  <span className="flex items-center gap-1.5 bg-[#0a0a0a] border border-white/10 px-2.5 py-1 rounded-md text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-[#e63946]" />
                    {dish.preparationTime}
                  </span>
                )}

                {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                  <span className="flex items-center gap-1 bg-[#e63946]/10 border border-[#e63946]/30 px-2.5 py-1 rounded-md text-[#e63946] font-medium">
                    <Flame className="w-3.5 h-3.5 text-[#e63946]" />
                    Nivel de picante: {'🔥'.repeat(dish.spicyLevel)}
                  </span>
                )}

                {dish.tags && dish.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 bg-[#0a0a0a] border border-white/10 px-2.5 py-1 rounded-md text-zinc-300">
                    <Tag className="w-3.5 h-3.5 text-[#e63946]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/10">
              <h4 className="text-xs uppercase font-semibold text-zinc-400 tracking-wider mb-2">
                Descripción & Detalles
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {dish.description}
              </p>
            </div>

            {/* Presencial Note & Phone info */}
            <div className="p-4 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[#e63946]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#e63946]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Consumo Presencial en Restaurante</h4>
                  <p className="text-xs text-zinc-300">No realizamos envíos a domicilio. ¡Ven a disfrutarlo caliente a la mesa!</p>
                </div>
              </div>

              <a
                href={`tel:${phone}`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#e63946] hover:bg-[#d62839] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-transparent transition-colors shrink-0 shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Reservar Mesa</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
