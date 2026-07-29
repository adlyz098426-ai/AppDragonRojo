export type CategoryId = 
  | 'platillos_especiales'
  | 'platos_tipicos'
  | 'desayunos'
  | 'almuerzos'
  | 'bebidas_jugos';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  available: boolean;
  spicyLevel?: number; // 0 to 3
  preparationTime?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  available: boolean;
}

export interface BrandingConfig {
  name: string;
  slogan: string;
  logoUrl: string;
  heroImageUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  googleMapsEmbedUrl: string;
  announcement?: string;
  hasDelivery: boolean; // Always false as required, but clear
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}
