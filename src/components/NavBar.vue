<template>
  <nav :class="{ scrolled: scrolled }" role="navigation" aria-label="Menú principal">
    <div class="logo">
      <!-- Reemplazá el src con la ruta correcta a tu logo -->
      <!-- <img
        v-if="!logoFallback"
        src="/logo.png"
        alt="NetworkcoM logo"
        class="logo-img"
        @error="logoFallback = true"
      /> -->
      <span class="logo-brand">NetworkcoM</span>
    </div>

    <ul class="nav-links" :class="{ active: menuActive }" role="list">
      <li v-for="link in navLinks" :key="link.id">
        <a :href="link.href" @click="$emit('toggle-menu')">
          {{ link.text }}
        </a>
      </li>
    </ul>

    <button
      class="menu-toggle"
      @click="$emit('toggle-menu')"
      :aria-expanded="menuActive"
      aria-label="Abrir menú"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  scrolled: Boolean,
  menuActive: Boolean
})

defineEmits(['toggle-menu'])

const logoFallback = ref(false)

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
  padding: 1.2rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}

nav.scrolled {
  padding: 0.8rem 5%;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
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
  font-size: 0.95rem;
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
  background: none;
  border: none;
  padding: 4px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #00ccff;
  margin: 3px 0;
  transition: 0.3s;
  display: block;
  border-radius: 2px;
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
    background: rgba(0, 0, 0, 0.97);
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
