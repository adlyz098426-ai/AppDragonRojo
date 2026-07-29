import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_BRANDING, INITIAL_DISHES, INITIAL_SERVICES } from './src/data/initialData';
import { Dish, ServiceItem, BrandingConfig } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent store path
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

interface AppData {
  branding: BrandingConfig;
  dishes: Dish[];
  services: ServiceItem[];
}

function loadData(): AppData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        branding: { ...INITIAL_BRANDING, ...parsed.branding },
        dishes: Array.isArray(parsed.dishes) ? parsed.dishes : INITIAL_DISHES,
        services: Array.isArray(parsed.services) ? parsed.services : INITIAL_SERVICES,
      };
    }
  } catch (err) {
    console.error('Error loading data store, using initial data:', err);
  }
  
  const initial: AppData = {
    branding: INITIAL_BRANDING,
    dishes: INITIAL_DISHES,
    services: INITIAL_SERVICES,
  };
  saveData(initial);
  return initial;
}

function saveData(data: AppData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data store:', err);
  }
}

let dbData = loadData();

// Lazy initialize Gemini API client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// REST API ROUTES
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Branding
app.get('/api/branding', (req, res) => {
  res.json(dbData.branding);
});

app.put('/api/branding', (req, res) => {
  const updated = req.body as BrandingConfig;
  dbData.branding = { ...dbData.branding, ...updated, hasDelivery: false };
  saveData(dbData);
  res.json(dbData.branding);
});

// Dishes CRUD
app.get('/api/dishes', (req, res) => {
  res.json(dbData.dishes);
});

app.post('/api/dishes', (req, res) => {
  const newDish = req.body as Dish;
  if (!newDish.id) {
    newDish.id = `dish-${Date.now()}`;
  }
  dbData.dishes.unshift(newDish);
  saveData(dbData);
  res.status(201).json(newDish);
});

app.put('/api/dishes/:id', (req, res) => {
  const { id } = req.params;
  const index = dbData.dishes.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Platillo no encontrado' });
  }
  dbData.dishes[index] = { ...dbData.dishes[index], ...req.body, id };
  saveData(dbData);
  res.json(dbData.dishes[index]);
});

app.patch('/api/dishes/:id/status', (req, res) => {
  const { id } = req.params;
  const { available } = req.body;
  const index = dbData.dishes.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Platillo no encontrado' });
  }
  dbData.dishes[index].available = Boolean(available);
  saveData(dbData);
  res.json(dbData.dishes[index]);
});

app.delete('/api/dishes/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = dbData.dishes.length;
  dbData.dishes = dbData.dishes.filter(d => d.id !== id);
  if (dbData.dishes.length === initialLength) {
    return res.status(404).json({ error: 'Platillo no encontrado' });
  }
  saveData(dbData);
  res.json({ success: true, message: 'Platillo eliminado' });
});

// Services CRUD
app.get('/api/services', (req, res) => {
  res.json(dbData.services);
});

app.post('/api/services', (req, res) => {
  const newService = req.body as ServiceItem;
  if (!newService.id) {
    newService.id = `srv-${Date.now()}`;
  }
  dbData.services.push(newService);
  saveData(dbData);
  res.status(201).json(newService);
});

app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const index = dbData.services.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  dbData.services[index] = { ...dbData.services[index], ...req.body, id };
  saveData(dbData);
  res.json(dbData.services[index]);
});

app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  dbData.services = dbData.services.filter(s => s.id !== id);
  saveData(dbData);
  res.json({ success: true, message: 'Servicio eliminado' });
});

// AI Description Generator endpoint for Admin CMS
app.post('/api/ai/generate-description', async (req, res) => {
  try {
    const { name, category, ingredients } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nombre del plato es requerido' });
    }

    const ai = getAIClient();
    const prompt = `Actúa como un chef ejecutivo y redactor gastronómico experto para el "Restaurante Dragón Rojo". 
Escribe una descripción apetitosa, tentadora y profesional en español (máximo 40-50 palabras) para el platillo:
Nombre: "${name}"
Categoría: "${category || 'Especialidad'}"
Ingredientes / detalles adicionales: "${ingredients || 'Cocción artesanal e ingredientes de alta calidad'}"

Responde ÚNICAMENTE con la descripción sin comillas ni títulos adicionales.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const description = response.text ? response.text.trim() : 'Delicioso platillo preparado con los más selectos ingredientes de la casa.';
    res.json({ description });
  } catch (error: any) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: error?.message || 'Error al generar la descripción con Inteligencia Artificial' });
  }
});

// Reset data endpoint for Admin reset capability
app.post('/api/reset', (req, res) => {
  dbData = {
    branding: INITIAL_BRANDING,
    dishes: INITIAL_DISHES,
    services: INITIAL_SERVICES,
  };
  saveData(dbData);
  res.json({ success: true, message: 'Datos restablecidos a la configuración inicial' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
