<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>
    <div class="contact-container">
      <div class="contact-form">
        <!-- 👇 Reemplaza con la URL de tu formulario -->
        <iframe 
          src="https://docs.google.com/forms/d/e/TU_ID_AQUI/viewform?embedded=true"
          width="100%" 
          height="900" 
          frameborder="0" 
          marginheight="0" 
          marginwidth="0"
        >
          Cargando formulario...
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
// No necesitas nada aquí para el iframe
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

iframe {
  border-radius: 10px;
  display: block;
}
</style>
