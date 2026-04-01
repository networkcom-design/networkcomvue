<template>
  <footer>
    <div class="social-links">
      <a :href="link('LinkedIn')" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <IconLinkedin />
        <span>LinkedIn</span>
      </a>
      <a :href="link('Instagram')" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <IconInstagram />
        <span>Instagram</span>
      </a>
      <a :href="link('Facebook')" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <IconFacebook />
        <span>Facebook</span>
      </a>
    </div>
    <p>© {{ currentYear }} NetworkcoM - Todos los derechos reservados</p>
  </footer>
</template>

<script setup>
import IconLinkedin from './icons/IconLinkedin.vue'
import IconInstagram from './icons/IconInstagram.vue'
import IconFacebook from './icons/IconFacebook.vue'

const props = defineProps({
  socialLinks: {
    type: Array,
    required: true
  }
})

const link = (name) => props.socialLinks.find(l => l.name === name)?.url || '#'

const currentYear = new Date().getFullYear()
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
}

.social-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #aaa;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s, transform 0.3s;
}

.social-links a:hover {
  color: #fff;
  transform: translateY(-3px);
}

.social-links a :deep(svg) {
  flex-shrink: 0;
  transition: transform 0.3s;
}

.social-links a:hover :deep(svg) {
  transform: scale(1.1);
}
</style>