<template>
  <div id="app">
    <NavBar 
      :scrolled="scrolled"
      :menu-active="menuActive"
      @toggle-menu="toggleMenu"
    />
    
    <HomePage />
    
    <Chatbot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HomePage from './views/HomePage.vue'
import Chatbot from './components/Chatbot.vue'

// Estado reactivo
const scrolled = ref(false)
const menuActive = ref(false)

// Métodos
const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  console.log('🚀 NetworkcoM Vue.js cargado correctamente')
  
  // Mostrar la URL del backend que se está usando
  const apiUrl = import.meta.env.VITE_API_URL || 'No configurada'
  console.log('🔌 Conectando con backend:', `${apiUrl}/api/chat`)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
