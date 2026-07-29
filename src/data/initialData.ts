import { Dish, ServiceItem, BrandingConfig, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'platillos_especiales',
    name: 'Platillos Especiales',
    description: 'Recetas exclusivas de la casa que fusionan la tradición con nuestro toque oriental red dragon',
    iconName: 'Flame'
  },
  {
    id: 'platos_tipicos',
    name: 'Platos Típicos',
    description: 'Lo mejor de nuestra gastronomía tradicional: Cuy Asado, Pollo al Carbón y guisados ancestrales',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'desayunos',
    name: 'Desayunos',
    description: 'Para iniciar la mañana con energía, tradición y sabor único',
    iconName: 'Coffee'
  },
  {
    id: 'almuerzos',
    name: 'Almuerzos',
    description: 'Menú ejecutivo fresco y variado elaborado cada día',
    iconName: 'Sun'
  },
  {
    id: 'bebidas_jugos',
    name: 'Bebidas y Jugos',
    description: 'Jugos 100% naturales, chicha artesanal y bebidas refrescantes',
    iconName: 'Wine'
  }
];

export const INITIAL_BRANDING: BrandingConfig = {
  name: 'Restaurante Dragón Rojo',
  slogan: 'El auténtico fuego de la tradición gastronómica en tu mesa',
  logoUrl: '/src/assets/images/dragon_rojo_logo_1785295096392.jpg',
  heroImageUrl: '/src/assets/images/dragon_rojo_hero_1785295116501.jpg',
  phone: '+593 99 123 4567',
  whatsapp: '+593991234567',
  email: 'contacto@dragonrojo.com',
  address: 'Av. Central 104 y Calle de los dragones, Sector Gastronómico',
  hours: {
    weekday: 'Lunes a Viernes: 07:00 AM - 10:00 PM',
    weekend: 'Sábados y Domingos: 08:00 AM - 11:00 PM'
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.791783584857!2d-78.48421832415178!3d-0.18065323537233388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a65bf0572d3%3A0xc39f2eb5df3d0a27!2sQuito%2C%20Ecuador!5e0!3m2!1ses!2s!4v1700000000000!5m2!1ses!2s',
  announcement: 'Atención presencial en nuestras amplias instalaciones. ¡No disponemos de servicio a domicilio!',
  hasDelivery: false
};

export const INITIAL_DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Cuy Asado Tradicional Dragón Rojo',
    description: 'Cuy entero seleccionado, adobado con finas especias ancestrales y asado a la brasa hasta lograr un cuero crujiente perfecto. Acompañado de papas horneadas con salsa de maní artesanal y agrio criollo.',
    price: 24.50,
    category: 'platos_tipicos',
    image: '/src/assets/images/cuy_asado_dish_1785295128277.jpg',
    available: true,
    spicyLevel: 1,
    preparationTime: '35-40 min',
    tags: ['Especialidad', 'Ancestral', 'Para Compartir'],
    isFeatured: true
  },
  {
    id: 'dish-2',
    name: 'Pollo al Carbón Especial',
    description: 'Medio pollo marinado durante 24 horas en nuestra mezcla secreta de chierba fina, soya y ají colorado, cocinado lentamente a las brasas de carbón vegetal. Servido con papas doradas y yuca frita.',
    price: 13.90,
    category: 'platos_tipicos',
    image: '/src/assets/images/pollo_al_carbon_1785295146391.jpg',
    available: true,
    spicyLevel: 0,
    preparationTime: '20 min',
    tags: ['A la Brasa', 'Jugoso', 'Popular'],
    isFeatured: true
  },
  {
    id: 'dish-3',
    name: 'Pato Pekín Dragón Imperial',
    description: 'Platillo estelar de la casa. Pato horneado con laqueado agridulce especial de miel de abeja y cinco especias orientales, crujiente por fuera y jugoso por dentro. Acompañado de crepas al vapor y vegetales frescos.',
    price: 28.00,
    category: 'platillos_especiales',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 1,
    preparationTime: '30 min',
    tags: ['Plato Insignia', 'Gourmet'],
    isFeatured: true
  },
  {
    id: 'dish-4',
    name: 'Mar y Tierra en Salsa de Dragón',
    description: 'Combinación suprema de langostinos salteados al wok y lomo fino marinado en salsa de ajo crujiente y ají ahumado, servido sobre una cama de arroz chaufa especial.',
    price: 22.50,
    category: 'platillos_especiales',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 2,
    preparationTime: '25 min',
    tags: ['Picante Sutil', 'Mariscos & Lomo'],
    isFeatured: true
  },
  {
    id: 'dish-5',
    name: 'Desayuno Dragón Completo',
    description: 'Dos huevos fritos o revueltos al gusto, lomo de cerdo salteado, tigrillo de plátano verde con queso criollo, café pasado recién filtrado y jugo de naranja fresco.',
    price: 7.50,
    category: 'desayunos',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 0,
    preparationTime: '15 min',
    tags: ['Completo', 'Energético'],
    isFeatured: false
  },
  {
    id: 'dish-6',
    name: 'Tigrillo con Huevo y Queso Criollo',
    description: 'Majado tradicional de plátano verde frito rehogado con queso fresco de campo, huevo de granja y cebollino. Acompañado de café negro aromático.',
    price: 5.50,
    category: 'desayunos',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 0,
    preparationTime: '12 min',
    tags: ['Autóctono', 'Sin Carne'],
    isFeatured: false
  },
  {
    id: 'dish-7',
    name: 'Almuerzo Ejecutivo del Día',
    description: 'Sopa casera del día (Sopón Criollo o Crema de Maíz) + Segundo a elección (Seco de Pollo, Carne Salteada o Pescado Frito) + Entrada + Bebida de la casa + Postre artesanal.',
    price: 4.50,
    category: 'almuerzos',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 0,
    preparationTime: '10 min',
    tags: ['Diario', 'Económico'],
    isFeatured: false
  },
  {
    id: 'dish-8',
    name: 'Seco de Chivo Tradicional',
    description: 'Tierno estofado de chivo cocinado a fuego lento en chicha de jora, cerveza y achiote con finas hierbas. Servido con arroz amarillo al cilantro, maduro frito y ensalada fresca.',
    price: 9.80,
    category: 'almuerzos',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 1,
    preparationTime: '20 min',
    tags: ['Guiso Tradicional'],
    isFeatured: false
  },
  {
    id: 'dish-9',
    name: 'Chicha Morada Dragón Rojo (1L)',
    description: 'Refrescante chicha artesanal hervida con maíz morado, piña, manzana, canela molida, clavo de olor y gotas de limón de pica. Servida bien helada.',
    price: 4.00,
    category: 'bebidas_jugos',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 0,
    preparationTime: '5 min',
    tags: ['Artesanal', 'Bebida de la Casa'],
    isFeatured: false
  },
  {
    id: 'dish-10',
    name: 'Jugo Natural de Maracuyá y Mango',
    description: 'Néctar 100% natural de frutas seleccionadas, licuado al instante con o sin azúcar al gusto.',
    price: 2.50,
    category: 'bebidas_jugos',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    available: true,
    spicyLevel: 0,
    preparationTime: '5 min',
    tags: ['Natural', 'Sin Preservantes'],
    isFeatured: false
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Reserva de Mesas y Salones Privados',
    description: 'Garantiza tu espacio para almuerzos de negocios, cenas familiares o celebraciones románticas en nuestros ambientes climatizados.',
    icon: 'Calendar',
    features: [
      'Mesas VIP decoradas',
      'Atención preferencial personalizada',
      'Salón privado para grupos hasta 30 personas'
    ],
    available: true
  },
  {
    id: 'srv-2',
    title: 'Atención Presencial y Banquetería',
    description: 'Vive una experiencia gastronómica inolvidable con el cálido servicio de nuestro personal capacitado y cocina a la vista.',
    icon: 'Users',
    features: [
      'Ambiente climatizado y seguro',
      'Zona infantil adaptada',
      'Parqueadero privado custodiatizado'
    ],
    available: true
  },
  {
    id: 'srv-3',
    title: 'Eventos Corporativos y Fiestas',
    description: 'Organizamos recepciones de empresas, cumpleaños y aniversarios con menú personalizado y decoración temática.',
    icon: 'Sparkles',
    features: [
      'Menús degustación a la medida',
      'Equipo audiovisual disponible',
      'Descuento especial en consumos masivos'
    ],
    available: true
  }
];
