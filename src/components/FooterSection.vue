<template>
  <footer>
    <div class="social-links">
      <a 
        v-for="link in socialLinks" 
        :key="link.name" 
        :href="link.url" 
        target="_blank"
      >
        {{ link.icon }}
      </a>
    </div>
    <p>© 2025 NetworkcoM - Todos los derechos reservados</p>
  </footer>
</template>

<script setup>
defineProps({
  socialLinks: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
footer {
  background: rgba(0, 0, 0, 0.9);
  padding: 3rem 5%;
  text-align: center;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
}

.social-links {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.social-links a {
  color: #00ccff;
  transition: 0.3s;
}

.social-links a:hover {
  color: #00ff88;
  transform: translateY(-3px);
}
</style>
