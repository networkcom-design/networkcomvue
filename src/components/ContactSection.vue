<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>
    <div class="contact-container">
      <div class="contact-form">
        <p>Completá el formulario de contacto:</p>
      
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdoMGR5J3K2Nb2yzMlSeq5_5HWXVHojY8TwCTPCRmvnUwXXMw/viewform?embedded=true"
          width="100%"
          height="800"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Cargando…
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
// No necesitas nada aquí
</script>

<style scoped>
section {
  padding: 5rem 5%;
}
iframe {
  width: 100%;
  min-height: 700px;
  border: none;
  border-radius: 15px;
  background: white;
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

.btn-primary {
  display: inline-block;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  color: #000;
  box-shadow: 0 5px 25px rgba(0, 255, 255, 0.4);
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 35px rgba(0, 255, 255, 0.6);
}
</style>
