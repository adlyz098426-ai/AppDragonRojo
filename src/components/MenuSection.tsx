import React, { useState, useMemo } from 'react';
import { Dish, CategoryId, CategoryInfo } from '../types';
import { CATEGORIES } from '../data/initialData';
import { Search, Flame, Eye, Utensils, CheckCircle2, XCircle, Coffee, Sun, Wine, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ dishes, onSelectDish }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlySpicy, setOnlySpicy] = useState<boolean>(false);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Helper for rendering Category Icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4 text-red-400" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4 text-amber-400" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-emerald-400" />;
      case 'Sun': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'Wine': return <Wine className="w-4 h-4 text-purple-400" />;
      default: return <Utensils className="w-4 h-4 text-zinc-400" />;
    }
  };

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category check
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(query);
        const matchDesc = dish.description.toLowerCase().includes(query);
        const matchTags = dish.tags?.some(t => t.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchTags) return false;
      }
      // Spicy filter
      if (onlySpicy && (!dish.spicyLevel || dish.spicyLevel === 0)) {
        return false;
      }
      // Available filter
      if (onlyAvailable && !dish.available) {
        return false;
      }
      return true;
    });
  }, [dishes, selectedCategory, searchTerm, onlySpicy, onlyAvailable]);

  const activeCategoryInfo = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Nuestra Carta & Menú Gastronómico</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Sabor Auténtico en Cada Platillo
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Selección preparada al momento con insumos frescos y nuestro toque tradicional a las brasas.
          </p>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 border ${
              selectedCategory === 'all'
                ? 'bg-[#e63946] text-white border-[#e63946] shadow-lg shadow-red-950/60'
                : 'bg-[#161616] text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Todos ({dishes.length})</span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = dishes.filter(d => d.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#e63946] text-white border-[#e63946] shadow-lg shadow-red-950/60'
                    : 'bg-[#161616] text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Banner Subtext if selected */}
        {activeCategoryInfo && (
          <div className="mb-6 p-4 rounded-xl bg-[#161616] border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#e63946]/20 text-[#e63946] border border-[#e63946]/30">
              {getCategoryIcon(activeCategoryInfo.iconName)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{activeCategoryInfo.name}</h3>
              <p className="text-xs text-zinc-400">{activeCategoryInfo.description}</p>
            </div>
          </div>
        )}

        {/* Search & Secondary Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#161616] p-4 rounded-2xl border border-white/10">
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar platillos por nombre o ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#e63946] transition-colors"
            />
          </div>

          {/* Filter Toggles */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlySpicy}
                onChange={(e) => setOnlySpicy(e.target.checked)}
                className="w-4 h-4 rounded bg-[#0a0a0a] border-zinc-700 text-[#e63946] focus:ring-[#e63946]"
              />
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#e63946]" />
                Solo Picantes
              </span>
            </label>

            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded bg-[#0a0a0a] border-zinc-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Solo Disponibles
              </span>
            </label>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#161616] rounded-2xl border border-white/10">
            <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No se encontraron platillos</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Intenta cambiar la categoría o limpiar los filtros de búsqueda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setOnlySpicy(false);
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-xs font-semibold text-zinc-200 hover:bg-white/20 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredDishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-[#161616] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-[#e63946]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Dish Card Image */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0a0a0a]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                          dish.available
                            ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-950/90 text-red-300 border border-red-500/40'
                        }`}>
                          {dish.available ? 'Disponible' : 'Agotado'}
                        </span>

                        {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                          <span className="px-2 py-1 rounded-md bg-black/80 text-[#e63946] text-xs border border-red-900/50 backdrop-blur-md">
                            {'🔥'.repeat(dish.spicyLevel)}
                          </span>
                        )}
                      </div>

                      {/* Featured tag */}
                      {dish.isFeatured && (
                        <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-[#e63946] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                          Destacado
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg text-white font-serif group-hover:text-[#e63946] transition-colors leading-snug">
                          {dish.name}
                        </h3>
                        <span className="text-xl font-bold text-white font-sans shrink-0">
                          ${dish.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-5 pb-5 pt-0">
                    <button
                      onClick={() => onSelectDish(dish)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0a0a0a] hover:bg-[#e63946] text-zinc-300 hover:text-white border border-white/10 hover:border-[#e63946] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver Detalles</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
