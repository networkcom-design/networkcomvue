<template>
  <main>
    <HeroSection />
    <ServicesSection :services="services" />
    <ContactSection @submit="handleContactSubmit" />
    <FooterSection :social-links="socialLinks" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'

const services = ref([
  {
    id: 1,
    icon: '🤖',
    title: 'Integración de LLMs',
    description: 'Chatbots inteligentes y análisis de texto con GPT-4 y Gemini.'
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Automatización (RPA)',
    description: 'Automatizamos tareas repetitivas con bots de última generación.'
  },
  {
    id: 3,
    icon: '🔌',
    title: 'APIs Personalizadas',
    description: 'Conectamos tus sistemas con integraciones robustas y escalables.'
  }
])

const socialLinks = ref([
  { name: 'linkedin', icon: '💼', url: '#' },
  { name: 'github', icon: '🐙', url: '#' },
  { name: 'twitter', icon: '🐦', url: '#' }
])

const handleContactSubmit = (formData) => {
  console.log('Formulario enviado:', formData)
  alert(`¡Gracias ${formData.name}! Te contactaremos pronto.`)
}
</script>
