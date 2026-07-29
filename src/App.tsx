import React, { useState, useEffect } from 'react';
import { BrandingConfig, Dish, ServiceItem, ToastMessage } from './types';
import { INITIAL_BRANDING, INITIAL_DISHES, INITIAL_SERVICES } from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { ServicesSection } from './components/ServicesSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [branding, setBranding] = useState<BrandingConfig>(INITIAL_BRANDING);
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Helper for toast notifications
  const addToast = (type: ToastMessage['type'], message: string, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, type, message, title }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Fetch initial data from Express backend
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [resBranding, resDishes, resServices] = await Promise.all([
          fetch('/api/branding').then(res => res.ok ? res.json() : null),
          fetch('/api/dishes').then(res => res.ok ? res.json() : null),
          fetch('/api/services').then(res => res.ok ? res.json() : null),
        ]);

        if (resBranding) setBranding(resBranding);
        if (resDishes && Array.isArray(resDishes)) setDishes(resDishes);
        if (resServices && Array.isArray(resServices)) setServices(resServices);
      } catch (err) {
        console.warn('Backend service offline or loading initial fallback state:', err);
      }
    };

    fetchAllData();
  }, []);

  // Track scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'menu', 'servicios', 'ubicacion'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // API Mutators
  const handleUpdateBranding = async (newBranding: BrandingConfig) => {
    setBranding(newBranding);
    try {
      await fetch('/api/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBranding)
      });
    } catch (err) {
      console.error('Error syncing branding:', err);
    }
  };

  const handleCreateDish = async (dishData: Partial<Dish>) => {
    const newDish: Dish = {
      id: `dish-${Date.now()}`,
      name: dishData.name || 'Nuevo Platillo',
      description: dishData.description || '',
      price: dishData.price || 10.0,
      category: dishData.category || 'platillos_especiales',
      image: dishData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      available: dishData.available ?? true,
      spicyLevel: dishData.spicyLevel || 0,
      preparationTime: dishData.preparationTime || '20 min',
      tags: dishData.tags || [],
      isFeatured: dishData.isFeatured || false
    };

    setDishes(prev => [newDish, ...prev]);

    try {
      await fetch('/api/dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDish)
      });
    } catch (err) {
      console.error('Error saving dish:', err);
    }
  };

  const handleUpdateDish = async (id: string, dishData: Partial<Dish>) => {
    setDishes(prev => prev.map(d => d.id === id ? { ...d, ...dishData } as Dish : d));
    try {
      await fetch(`/api/dishes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dishData)
      });
    } catch (err) {
      console.error('Error updating dish:', err);
    }
  };

  const handleToggleDishStatus = async (id: string, available: boolean) => {
    setDishes(prev => prev.map(d => d.id === id ? { ...d, available } : d));
    try {
      await fetch(`/api/dishes/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available })
      });
    } catch (err) {
      console.error('Error toggling dish status:', err);
    }
  };

  const handleDeleteDish = async (id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id));
    try {
      await fetch(`/api/dishes/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting dish:', err);
    }
  };

  const handleCreateService = async (srvData: Partial<ServiceItem>) => {
    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: srvData.title || 'Nuevo Servicio',
      description: srvData.description || '',
      icon: srvData.icon || 'Sparkles',
      features: srvData.features || [],
      available: srvData.available ?? true
    };
    setServices(prev => [...prev, newSrv]);
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSrv)
      });
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleUpdateService = async (id: string, srvData: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...srvData } as ServiceItem : s));
    try {
      await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(srvData)
      });
    } catch (err) {
      console.error('Error updating service:', err);
    }
  };

  const handleDeleteService = async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const handleResetData = async () => {
    setBranding(INITIAL_BRANDING);
    setDishes(INITIAL_DISHES);
    setServices(INITIAL_SERVICES);
    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch (err) {
      console.error('Error resetting data:', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Header Bar */}
      <Header
        branding={branding}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero branding={branding} />

        {/* Dynamic Categorized Menu Section */}
        <MenuSection
          dishes={dishes}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* Services & Events Section */}
        <ServicesSection
          services={services}
          phone={branding.phone}
        />

        {/* Location & Google Maps Section */}
        <LocationSection branding={branding} />
      </main>

      {/* Footer */}
      <Footer
        branding={branding}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Dish Details Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        phone={branding.phone}
      />

      {/* CMS Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        branding={branding}
        dishes={dishes}
        services={services}
        onUpdateBranding={handleUpdateBranding}
        onCreateDish={handleCreateDish}
        onUpdateDish={handleUpdateDish}
        onDeleteDish={handleDeleteDish}
        onToggleDishStatus={handleToggleDishStatus}
        onCreateService={handleCreateService}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        onResetData={handleResetData}
        addToast={addToast}
      />
    </div>
  );
}
