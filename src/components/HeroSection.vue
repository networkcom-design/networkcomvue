<template>
  <section class="hero" id="inicio">
    <div class="circuit-bg"></div>
    <div class="hero-content">
      <h1>NetworkcoM</h1>
      <h2>Integración de LLMs y Automatizaciones Inteligentes</h2>
      <p>
        Transformamos procesos empresariales integrando los mejores modelos de lenguaje 
        (ChatGPT, Claude, Gemini) y automatizaciones avanzadas.
      </p>
      <div class="cta-buttons">
        <a href="#contacto" class="btn btn-primary">Comenzar Proyecto</a>
        <a href="#servicios" class="btn btn-secondary">Ver Servicios</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 5%;
}

.circuit-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,20,40,0.8) 100%),
    repeating-linear-gradient(90deg, transparent 0px, transparent 50px, rgba(0,255,255,0.03) 50px, rgba(0,255,255,0.03) 51px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 50px, rgba(0,255,255,0.03) 50px, rgba(0,255,255,0.03) 51px);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff88, #00ccff, #ff0080, #ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInUp 1s ease;
}

.hero h2 {
  font-size: 2rem;
  color: #00ccff;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease 0.2s both;
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  color: #aaa;
  animation: fadeInUp 1s ease 0.4s both;
}

.cta-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  animation: fadeInUp 1s ease 0.6s both;
}

.btn {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #00ff88, #00ccff);
  color: #000;
  box-shadow: 0 5px 25px rgba(0, 255, 255, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 35px rgba(0, 255, 255, 0.6);
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #00ccff;
}

.btn-secondary:hover {
  background: rgba(0, 204, 255, 0.1);
  transform: translateY(-3px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
}
</style>
