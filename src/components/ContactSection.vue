<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>
    <div class="contact-container">
      <div class="contact-form">

        <div v-if="submitStatus === 'success'" class="feedback feedback-success">
          ✅ ¡Mensaje enviado! Te contactaremos a la brevedad.
        </div>
        <div v-if="submitStatus === 'error'" class="feedback feedback-error">
          ⚠️ Hubo un error al enviar. Por favor, intentá de nuevo.
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
          <label for="contact-email">Email</label>
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
          <label for="contact-message">Mensaje</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            rows="5"
            placeholder="¿En qué podemos ayudarte?"
            :class="{ 'input-error': errors.message }"
          ></textarea>
          <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
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

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null) // null | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio.'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'El email es obligatorio.'
    valid = false
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Ingresá un email válido.'
    valid = false
  }

  if (!form.message.trim()) {
    errors.message = 'El mensaje es obligatorio.'
    valid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
    valid = false
  }

  return valid
}

const submitForm = async () => {
  submitStatus.value = null
  if (!validate()) return

  isSubmitting.value = true

  try {
    emit('submit', {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    })

    await new Promise(resolve => setTimeout(resolve, 600))

    submitStatus.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
section {
  padding: 2rem;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
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
