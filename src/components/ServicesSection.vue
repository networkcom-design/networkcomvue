<template>
  <section id="servicios">
    <h2 class="section-title">Nuestros Servicios</h2>
    <div class="services-grid">
      <div 
        v-for="service in services" 
        :key="service.id" 
        class="service-card"
      >
        <span class="service-icon">{{ service.icon }}</span>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  services: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
section {
  padding: 5rem 5%;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: linear-gradient(145deg, rgba(0,40,80,0.3), rgba(0,20,40,0.3));
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: #00ccff;
  box-shadow: 0 10px 40px rgba(0, 255, 255, 0.3);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00ccff;
}

.service-card p {
  color: #aaa;
  line-height: 1.6;
}
</style>
