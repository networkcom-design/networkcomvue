# NetworkcoM - Vue.js 3 Project

Proyecto completo de NetworkcoM desarrollado con Vue.js 3 y Vite.

## 🚀 Características

- ✅ Vue 3 con Composition API
- ✅ Componentes modulares y reutilizables
- ✅ Integración con Gemini API para chatbot
- ✅ Diseño responsivo
- ✅ Animaciones y efectos visuales
- ✅ Estructura profesional de proyecto

## 📁 Estructura del Proyecto

```
networkcom-vue/
├── src/
│   ├── components/        # Componentes Vue
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── ServicesSection.vue
│   │   ├── ContactSection.vue
│   │   ├── FooterSection.vue
│   │   └── Chatbot.vue
│   ├── views/             # Vistas principales
│   │   └── HomePage.vue
│   ├── services/          # Servicios API
│   │   └── geminiService.js
│   ├── assets/            # Recursos estáticos
│   │   └── styles.css
│   ├── App.vue            # Componente raíz
│   └── main.js            # Punto de entrada
├── public/                # Archivos públicos
├── index.html             # HTML principal
├── vite.config.js         # Configuración de Vite
├── package.json           # Dependencias
└── README.md              # Este archivo
```

## 🛠️ Instalación

### Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar API Key de Gemini:**
Abre `src/App.vue` y reemplaza tu API key en la línea 27:
```javascript
geminiApiKey: 'TU_API_KEY_AQUI'
```

Para obtener una API key:
- Ve a https://makersuite.google.com/app/apikey
- Crea una nueva API key
- Cópiala y pégala en el código

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📦 Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🎨 Componentes

### NavBar
Barra de navegación con scroll effect y menú responsive.

### HeroSection
Sección principal con animaciones y llamados a la acción.

### ServicesSection
Grid de servicios con tarjetas animadas.

### ContactSection
Formulario de contacto con validación.

### FooterSection
Pie de página con enlaces sociales.

### Chatbot
Chat integrado con Gemini API para atención automatizada.

## 🔧 Personalización

### Colores
Los colores principales están definidos en los estilos:
- Primary: `#00ff88` (verde neón)
- Secondary: `#00ccff` (cyan)
- Accent: `#ff0080` (rosa)

### Servicios
Modifica el array `services` en `src/views/HomePage.vue` para cambiar los servicios mostrados.

### Redes sociales
Actualiza el array `socialLinks` en `src/views/HomePage.vue` con tus enlaces.

## 🌐 Despliegue

### Build de producción
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Desplegar en:
- **Vercel**: `vercel deploy`
- **Netlify**: Arrastra la carpeta `dist/` a Netlify
- **GitHub Pages**: Configura GitHub Actions con el workflow de Vue

## 📝 Notas

- La API key de Gemini NO debe estar en producción expuesta en el frontend
- Para producción, considera crear un backend que maneje las llamadas a la API
- El proyecto usa Vite para mejor rendimiento y experiencia de desarrollo

## 🤝 Contribuir

Si encuentras bugs o tienes sugerencias, no dudes en crear un issue.

## 📄 Licencia

© 2025 NetworkcoM - Todos los derechos reservados
