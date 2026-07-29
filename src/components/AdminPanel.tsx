import React, { useState } from 'react';
import { Dish, ServiceItem, BrandingConfig, CategoryId, ToastMessage } from '../types';
import { CATEGORIES } from '../data/initialData';
import {
  X, Plus, Edit2, Trash2, CheckCircle2, XCircle, Sparkles, Image,
  Settings, Utensils, Layers, Lock, AlertTriangle, RefreshCw, Flame, Clock, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  branding: BrandingConfig;
  dishes: Dish[];
  services: ServiceItem[];
  onUpdateBranding: (branding: BrandingConfig) => Promise<void>;
  onCreateDish: (dish: Partial<Dish>) => Promise<void>;
  onUpdateDish: (id: string, dish: Partial<Dish>) => Promise<void>;
  onDeleteDish: (id: string) => Promise<void>;
  onToggleDishStatus: (id: string, available: boolean) => Promise<void>;
  onCreateService: (service: Partial<ServiceItem>) => Promise<void>;
  onUpdateService: (id: string, service: Partial<ServiceItem>) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;
  onResetData: () => Promise<void>;
  addToast: (type: ToastMessage['type'], message: string, title?: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  branding,
  dishes,
  services,
  onUpdateBranding,
  onCreateDish,
  onUpdateDish,
  onDeleteDish,
  onToggleDishStatus,
  onCreateService,
  onUpdateService,
  onDeleteService,
  onResetData,
  addToast
}) => {
  const [activeTab, setActiveTab] = useState<'dishes' | 'services' | 'branding'>('dishes');
  const [searchQuery, setSearchQuery] = useState('');

  // Dish modal state
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [dishFormData, setDishFormData] = useState<Partial<Dish>>({
    name: '',
    description: '',
    price: 10.0,
    category: 'platillos_especiales',
    image: '',
    available: true,
    spicyLevel: 0,
    preparationTime: '20 min',
    tags: [],
    isFeatured: false
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Service modal state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    icon: 'Sparkles',
    features: ['Atención personalizada'],
    available: true
  });
  const [featureInput, setFeatureInput] = useState('');

  // Branding form state
  const [brandingFormData, setBrandingFormData] = useState<BrandingConfig>(branding);

  // Dish Delete Confirmation state
  const [deletingDishId, setDeletingDishId] = useState<string | null>(null);

  if (!isOpen) return null;

  // --- Dish Handlers ---
  const handleOpenCreateDish = () => {
    setEditingDish(null);
    setDishFormData({
      name: '',
      description: '',
      price: 12.0,
      category: 'platillos_especiales',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      available: true,
      spicyLevel: 0,
      preparationTime: '20 min',
      tags: ['Especialidad'],
      isFeatured: false
    });
    setIsDishModalOpen(true);
  };

  const handleOpenEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setDishFormData({ ...dish });
    setIsDishModalOpen(true);
  };

  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishFormData.name || !dishFormData.price) {
      addToast('warning', 'Por favor ingresa nombre y precio del platillo');
      return;
    }

    try {
      if (editingDish) {
        await onUpdateDish(editingDish.id, dishFormData);
        addToast('success', `Platillo "${dishFormData.name}" actualizado correctamente`);
      } else {
        await onCreateDish(dishFormData);
        addToast('success', `Platillo "${dishFormData.name}" creado con éxito`);
      }
      setIsDishModalOpen(false);
    } catch (err: any) {
      addToast('error', err?.message || 'Error al guardar el platillo');
    }
  };

  const handleConfirmDeleteDish = async () => {
    if (!deletingDishId) return;
    try {
      await onDeleteDish(deletingDishId);
      addToast('info', 'Platillo eliminado del menú');
      setDeletingDishId(null);
    } catch (err: any) {
      addToast('error', err?.message || 'Error al eliminar');
    }
  };

  const handleGenerateAIDescription = async () => {
    if (!dishFormData.name) {
      addToast('warning', 'Escribe primero el nombre del platillo para generar la descripción');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dishFormData.name,
          category: CATEGORIES.find(c => c.id === dishFormData.category)?.name,
          ingredients: dishFormData.tags?.join(', ')
        })
      });

      if (!res.ok) {
        throw new Error('Error al conectar con la IA de Gemini');
      }

      const data = await res.json();
      if (data.description) {
        setDishFormData(prev => ({ ...prev, description: data.description }));
        addToast('success', 'Descripción gastronómica generada con Inteligencia Artificial Gemini');
      }
    } catch (err: any) {
      addToast('error', err?.message || 'No se pudo generar con IA');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // --- Service Handlers ---
  const handleOpenCreateService = () => {
    setEditingService(null);
    setServiceFormData({
      title: '',
      description: '',
      icon: 'Sparkles',
      features: [],
      available: true
    });
    setFeatureInput('');
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (srv: ServiceItem) => {
    setEditingService(srv);
    setServiceFormData({ ...srv });
    setFeatureInput('');
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title || !serviceFormData.description) {
      addToast('warning', 'Título y descripción son requeridos');
      return;
    }

    try {
      if (editingService) {
        await onUpdateService(editingService.id, serviceFormData);
        addToast('success', 'Servicio actualizado correctamente');
      } else {
        await onCreateService(serviceFormData);
        addToast('success', 'Servicio creado con éxito');
      }
      setIsServiceModalOpen(false);
    } catch (err: any) {
      addToast('error', err?.message || 'Error al guardar servicio');
    }
  };

  const handleAddServiceFeature = () => {
    if (!featureInput.trim()) return;
    setServiceFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()]
    }));
    setFeatureInput('');
  };

  const handleRemoveServiceFeature = (index: number) => {
    setServiceFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  // --- Branding Handler ---
  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdateBranding(brandingFormData);
      addToast('success', 'Branding y configuración del restaurante actualizados');
    } catch (err: any) {
      addToast('error', err?.message || 'Error al guardar branding');
    }
  };

  const filteredDishesAdmin = dishes.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Dark Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      {/* Main Admin Panel Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl z-10 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="bg-[#161616] px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <span>Panel de Administración CMS</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#e63946] text-white font-mono font-bold">
                  Dragón Rojo
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Gestión en tiempo real de platillos, servicios y marca</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                if (window.confirm('¿Restablecer todo el menú y datos a la configuración de fábrica?')) {
                  await onResetData();
                  addToast('info', 'Datos restablecidos a la versión inicial');
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white border border-white/10 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer Todo</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#161616]/80 px-6 py-2.5 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dishes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === 'dishes'
                  ? 'bg-[#e63946] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Platillos ({dishes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === 'services'
                  ? 'bg-[#e63946] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Servicios ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'branding'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Branding & Logo</span>
            </button>
          </div>

          {activeTab === 'dishes' && (
            <button
              onClick={handleOpenCreateDish}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Platillo</span>
            </button>
          )}

          {activeTab === 'services' && (
            <button
              onClick={handleOpenCreateService}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Servicio</span>
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
          {/* TAB 1: DISHES CRUD */}
          {activeTab === 'dishes' && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="flex items-center justify-between gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Filtrar platillos por nombre o categoría..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>
                <span className="text-xs text-zinc-400">
                  Mostrando {filteredDishesAdmin.length} de {dishes.length}
                </span>
              </div>

              {/* Table / List */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">Platillo</th>
                        <th className="p-4">Categoría</th>
                        <th className="p-4">Precio</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80">
                      {filteredDishesAdmin.map((dish) => (
                        <tr key={dish.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-12 h-12 rounded-lg object-cover bg-zinc-950 border border-zinc-800 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="font-bold text-white text-sm">{dish.name}</h4>
                                <p className="text-[11px] text-zinc-400 line-clamp-1 max-w-xs">{dish.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-medium">
                              {CATEGORIES.find(c => c.id === dish.category)?.name || dish.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-amber-400 text-sm">
                            ${dish.price.toFixed(2)}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => {
                                onToggleDishStatus(dish.id, !dish.available);
                                addToast('info', `Estado cambiado a ${!dish.available ? 'Disponible' : 'Agotado'}`);
                              }}
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                                dish.available
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900'
                                  : 'bg-red-950 text-red-300 border border-red-800/60 hover:bg-red-900'
                              }`}
                            >
                              {dish.available ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                              <span>{dish.available ? 'Disponible' : 'Agotado'}</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditDish(dish)}
                                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                                title="Editar platillo"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeletingDishId(dish.id)}
                                className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-300 transition-colors border border-red-900/40"
                                title="Eliminar platillo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES CRUD */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="p-2 rounded-lg bg-red-950 text-red-400 font-mono text-xs font-bold">
                        {srv.icon}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditService(srv)}
                          className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm('¿Eliminar servicio?')) {
                              await onDeleteService(srv.id);
                              addToast('info', 'Servicio eliminado');
                            }
                          }}
                          className="p-1.5 rounded-md bg-red-950 hover:bg-red-900 text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">{srv.title}</h3>
                    <p className="text-xs text-zinc-400 mb-4">{srv.description}</p>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {srv.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: BRANDING & LOGO SETTINGS */}
          {activeTab === 'branding' && (
            <form onSubmit={handleSaveBranding} className="max-w-3xl mx-auto space-y-6 bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pb-3">
                Configuración de Branding y Datos del Restaurante
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Nombre del Restaurante
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.name}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Eslogan Principal
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.slogan}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, slogan: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    URL del Logo del Restaurante
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.logoUrl}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    URL de Imagen Hero (Fondo Principal)
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.heroImageUrl}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, heroImageUrl: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Teléfono Convencional / Móvil
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.phone}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    WhatsApp (con código de país)
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.whatsapp}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Dirección Física
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.address}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Aviso Banner Superior
                  </label>
                  <input
                    type="text"
                    value={brandingFormData.announcement || ''}
                    onChange={(e) => setBrandingFormData(prev => ({ ...prev, announcement: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg transition-all"
                >
                  Guardar Cambios de Branding
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* DISH CREATE / EDIT MODAL */}
      {isDishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsDishModalOpen(false)} className="fixed inset-0 bg-black/80" />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto z-10 space-y-4">
            <h3 className="text-lg font-bold text-white font-serif">
              {editingDish ? 'Editar Platillo' : 'Crear Nuevo Platillo'}
            </h3>

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nombre del Platillo</label>
                <input
                  type="text"
                  required
                  value={dishFormData.name || ''}
                  onChange={(e) => setDishFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ej. Cuy Asado Especial"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Categoría</label>
                  <select
                    value={dishFormData.category || 'platillos_especiales'}
                    onChange={(e) => setDishFormData(prev => ({ ...prev, category: e.target.value as CategoryId }))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Precio ($ USD)</label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    value={dishFormData.price || 0}
                    onChange={(e) => setDishFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              {/* Description + AI Generator button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-zinc-300">Descripción Gastronómica</label>
                  <button
                    type="button"
                    onClick={handleGenerateAIDescription}
                    disabled={isGeneratingAI}
                    className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingAI ? 'Generando...' : 'Auto-Generar con IA'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={dishFormData.description || ''}
                  onChange={(e) => setDishFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción apetitosa..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">URL de la Imagen del Platillo</label>
                <input
                  type="text"
                  value={dishFormData.image || ''}
                  onChange={(e) => setDishFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nivel de Picante (0 - 3)</label>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    value={dishFormData.spicyLevel || 0}
                    onChange={(e) => setDishFormData(prev => ({ ...prev, spicyLevel: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Tiempo de Preparación</label>
                  <input
                    type="text"
                    value={dishFormData.preparationTime || '20 min'}
                    onChange={(e) => setDishFormData(prev => ({ ...prev, preparationTime: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishFormData.available ?? true}
                    onChange={(e) => setDishFormData(prev => ({ ...prev, available: e.target.checked }))}
                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-emerald-600"
                  />
                  <span>Disponible para Pedidos Presenciales</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishFormData.isFeatured ?? false}
                    onChange={(e) => setDishFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-amber-500"
                  />
                  <span>Destacar en Inicio</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsDishModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white shadow-lg"
                >
                  Guardar Platillo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE CREATE / EDIT MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsServiceModalOpen(false)} className="fixed inset-0 bg-black/80" />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full z-10 space-y-4">
            <h3 className="text-lg font-bold text-white font-serif">
              {editingService ? 'Editar Servicio' : 'Crear Servicio'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Título del Servicio</label>
                <input
                  type="text"
                  required
                  value={serviceFormData.title || ''}
                  onChange={(e) => setServiceFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Descripción</label>
                <textarea
                  rows={2}
                  required
                  value={serviceFormData.description || ''}
                  onChange={(e) => setServiceFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Ícono</label>
                <select
                  value={serviceFormData.icon || 'Sparkles'}
                  onChange={(e) => setServiceFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                >
                  <option value="Calendar">Calendar (Reservas)</option>
                  <option value="Users">Users (Atención Presencial)</option>
                  <option value="Sparkles">Sparkles (Eventos & Fiestas)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Características Incluidas</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="ej. Salón climatizado"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddServiceFeature}
                    className="px-3 py-1.5 bg-zinc-800 text-xs text-white rounded-lg hover:bg-zinc-700"
                  >
                    Agregar
                  </button>
                </div>
                <div className="space-y-1">
                  {serviceFormData.features?.map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 text-zinc-300">
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveServiceFeature(i)}
                        className="text-red-400 hover:text-red-300 text-[11px]"
                      >
                        quitar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 text-xs text-white font-semibold"
                >
                  Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISH DELETE CONFIRMATION MODAL */}
      {deletingDishId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setDeletingDishId(null)} className="fixed inset-0 bg-black/80" />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full z-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">¿Eliminar este platillo?</h3>
            <p className="text-xs text-zinc-400">Esta acción removerá el plato del menú en tiempo real.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingDishId(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDeleteDish}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-semibold text-white shadow-lg"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
