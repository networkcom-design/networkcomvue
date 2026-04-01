<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>
    <div class="contact-container">
      <div class="contact-form">

        <div v-if="submitStatus === 'success'" class="feedback feedback-success">
          ✅ ¡Mensaje enviado! Te contactaremos a la brevedad.
        </div>
        <div v-if="submitStatus === 'error'" class="feedback feedback-error">
          ⚠️ No se pudo enviar el mensaje. Por favor, intentá de nuevo.
        </div>

        <div class="form-group">
          <label for="contact-name">Nombre</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            placeholder="Tu nombre completo"
            :class="{ 'input-error': errors.name }"
          />
          <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="contact-email">Correo electrónico</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            :class="{ 'input-error': errors.email }"
          />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="contact-phone">Número de teléfono</label>
          <input
            id="contact-phone"
            v-model="form.phone"
            type="tel"
            placeholder="Ej: +54 362 412 3456"
            :class="{ 'input-error': errors.phone }"
          />
          <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
        </div>

        <div class="form-group">
          <label for="contact-service">Solicitud de Servicio</label>
          <textarea
            id="contact-service"
            v-model="form.service"
            rows="5"
            placeholder="¿En qué podemos ayudarte?"
            :class="{ 'input-error': errors.service }"
          ></textarea>
          <span v-if="errors.service" class="error-msg">{{ errors.service }}</span>
        </div>

        <button
          @click="submitForm"
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
        </button>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reemplazá con la URL que te da Apps Script al implementar
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL

const form = reactive({ name: '', email: '', phone: '', service: '' })
const errors = reactive({ name: '', email: '', phone: '', service: '' })
const isSubmitting = ref(false)
const submitStatus = ref(null)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = () => {
  errors.name    = ''
  errors.email   = ''
  errors.phone   = ''
  errors.service = ''
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio.'
    valid = false
  }
  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio.'
    valid = false
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Ingresá un correo válido.'
    valid = false
  }
  if (!form.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio.'
    valid = false
  }
  if (!form.service.trim()) {
    errors.service = 'La solicitud es obligatoria.'
    valid = false
  } else if (form.service.trim().length < 10) {
    errors.service = 'Describí tu solicitud con al menos 10 caracteres.'
    valid = false
  }

  return valid
}

const submitForm = async () => {
  submitStatus.value = null
  if (!validate()) return

  isSubmitting.value = true

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // Apps Script requiere text/plain para evitar preflight CORS
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        name:    form.name.trim(),
        email:   form.email.trim(),
        phone:   form.phone.trim(),
        service: form.service.trim()
      })
    })

    const result = await response.json()

    if (result.success) {
      submitStatus.value = 'success'
      form.name    = ''
      form.email   = ''
      form.phone   = ''
      form.service = ''
    } else {
      throw new Error(result.error)
    }
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
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
  max-width: 800px;
  margin: 0 auto;
}

.contact-form {
  background: linear-gradient(145deg, rgba(0,40,80,0.3), rgba(0,20,40,0.3));
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #00ccff;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 20, 40, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00ccff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255,255,255,0.35);
}

.input-error {
  border-color: #ff4d4d !important;
}

.error-msg {
  display: block;
  margin-top: 0.4rem;
  color: #ff6b6b;
  font-size: 0.82rem;
}

.feedback {
  padding: 0.9rem 1.2rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.feedback-success {
  background: rgba(0, 255, 136, 0.12);
  border: 1px solid rgba(0, 255, 136, 0.4);
  color: #00ff88;
}

.feedback-error {
  background: rgba(255, 77, 77, 0.12);
  border: 1px solid rgba(255, 77, 77, 0.4);
  color: #ff6b6b;
}

.btn {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #00ff88, #00ccff);
  color: #000;
  box-shadow: 0 5px 25px rgba(0, 255, 255, 0.4);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 35px rgba(0, 255, 255, 0.6);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
