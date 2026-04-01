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

const scrolled = ref(false)
const menuActive = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
