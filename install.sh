#!/bin/bash

echo "🚀 Instalando NetworkcoM Vue.js Project..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero:"
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js versión: $(node -v)"
echo "✅ npm versión: $(npm -v)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Abre src/App.vue y configura tu Gemini API Key"
echo "   2. Ejecuta: npm run dev"
echo "   3. Abre http://localhost:3000 en tu navegador"
echo ""
echo "🎉 ¡Disfruta desarrollando con Vue.js!"
