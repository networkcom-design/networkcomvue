<template>
  <nav :class="{ scrolled: scrolled }">
    <div class="logo">🌐 NetworkcoM</div>
    
    <ul class="nav-links" :class="{ active: menuActive }">
      <li v-for="link in navLinks" :key="link.id">
        <a :href="link.href" @click="$emit('toggle-menu')">
          {{ link.text }}
        </a>
      </li>
    </ul>
    
    <div class="menu-toggle" @click="$emit('toggle-menu')">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  scrolled: Boolean,
  menuActive: Boolean
})

defineEmits(['toggle-menu'])

const navLinks = ref([
  { id: 1, href: '#inicio', text: 'Inicio' },
  { id: 2, href: '#servicios', text: 'Servicios' },
  { id: 3, href: '#contacto', text: 'Contacto' }
])
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}

nav.scrolled {
  padding: 1rem 5%;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00ff88, #00ccff, #ff0080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00ff88, #00ccff);
  transition: width 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #00ccff;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  
  .nav-links.active {
    transform: translateX(0);
  }
}
</style>
