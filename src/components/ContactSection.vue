<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>
    <div class="contact-container">
      <div class="contact-form">
        <p>Completá el formulario de contacto:</p>
        <form @submit.prevent="handleSubmit" class="contact-form-fields">
          <div class="field-group">
            <label for="nombre">Nombre *</label>
            <input id="nombre" type="text" v-model="form.nombre" required />
          </div>

          <div class="field-group">
            <label for="correo">Correo electrónico *</label>
            <input id="correo" type="email" v-model="form.correo" required />
          </div>

          <div class="field-group">
            <label for="telefono">Número de teléfono</label>
            <input id="telefono" type="tel" v-model="form.telefono" />
          </div>

          <div class="field-group">
            <label for="solicitud">Solicitud de Servicio *</label>
            <textarea id="solicitud" v-model="form.solicitud" rows="5" required></textarea>
          </div>

          <button type="submit" :disabled="loading">Enviar</button>
          <p class="status success" v-if="status === 'success'">¡Solicitud enviada correctamente!</p>
          <p class="status error" v-if="status === 'error'">Ocurrió un error. Intenta de nuevo más tarde.</p>
          <p class="status" v-if="status === 'validation'">Por favor completa todos los campos obligatorios.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { sendContactForm } from '../services/contactService'

const form = ref({
  nombre: '',
  correo: '',
  telefono: '',
  solicitud: ''
})

const status = ref(null)
const loading = ref(false)

const handleSubmit = async () => {
  status.value = null

  if (!form.value.nombre || !form.value.correo || !form.value.solicitud) {
    status.value = 'validation'
    return
  }

  loading.value = true

  try {
    await sendContactForm(form.value)

    status.value = 'success'
    form.value = { nombre: '', correo: '', telefono: '', solicitud: '' }
  } catch (error) {
    console.error('Error al enviar el formulario de contacto:', error)
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
section {
  padding: 5rem 5%;
}

.contact-form-fields {
  display: grid;
  gap: 1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.field-group label {
  margin-bottom: 0.4rem;
  color: #f0f0f0;
  font-weight: 600;
}

.field-group input,
.field-group textarea {
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

button[type="submit"] {
  width: 160px;
  background: #000000;
  color: #ffffff;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s ease;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button[type="submit"]:hover:not(:disabled) {
  transform: translateY(-1px);
}

.status {
  margin-top: 0.8rem;
}

.status.success {
  color: #70db70;
}

.status.error,
.status.validation {
  color: #ff6f6f;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 1.2rem;
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
