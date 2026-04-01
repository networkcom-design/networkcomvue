<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>

    <div class="contact-container">
      <div class="contact-form">
        <p>Completá el formulario de contacto:</p>

        <iframe
          :key="iframeKey"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdoMGR5J3K2Nb2yzMlSeq5_5HWXVHojY8TwCTPCRmvnUwXXMw/viewform?embedded=true&usp=sf_link"
          loading="lazy"
          referrerpolicy="no-referrer"
        >
          Cargando…
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 🔥 Esto fuerza a recargar el iframe y evita que quede en "Thanks for submitting"
const iframeKey = ref(0)

onMounted(() => {
  iframeKey.value++
})
</script>

<style scoped>
section {
  padding: 5rem 5%;
}

/* 🔥 iframe mejorado */
iframe {
  width: 100%;
  height: 900px;
  border: none;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* responsive */
@media (max-width: 768px) {
  iframe {
    height: 1000px;
  }
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-container {
  max-width: 900px;
  margin: 0 auto;
}

.contact-form {
  background: linear-gradient(145deg, rgba(0,40,80,0.3), rgba(0,20,40,0.3));
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  overflow: hidden;
}

p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  font-size: 1rem;
}
</style>
