<template>
  <section id="contacto">
    <h2 class="section-title">Contacto</h2>
    <div class="contact-container">
      <div class="contact-form">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="form.name" type="text" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required>
        </div>
        <div class="form-group">
          <label>Mensaje</label>
          <textarea v-model="form.message" rows="5" required></textarea>
        </div>
        <button @click="submitForm" class="btn btn-primary">
          Enviar Mensaje
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  if (form.value.name && form.value.email && form.value.message) {
    emit('submit', { ...form.value })
    form.value = { name: '', email: '', message: '' }
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
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #00ccff;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 20, 40, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00ccff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
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

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 35px rgba(0, 255, 255, 0.6);
}
</style>
