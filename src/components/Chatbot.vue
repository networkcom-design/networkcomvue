<template>
  <div>
    <button class="chat-toggle" @click="toggleChat">💬</button>
    
    <!-- Indicador de estado del backend -->
    <div v-if="isOpen && !backendAvailable" class="backend-warning">
      ⚠️ Backend no disponible
    </div>
    
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <span>Chat con NetworkcoM</span>
        <span class="chat-close" @click="toggleChat">✕</span>
      </div>
      
      <div ref="messagesContainer" class="chat-messages" @click="handleLinkClick">
        <div 
          v-for="msg in messages" 
          :key="msg.timestamp"
          class="message"
          :class="msg.sender === 'user' ? 'message-user' : 'message-bot'"
          v-html="msg.text"
        ></div>
        
        <div v-if="isLoading" class="message message-bot">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <div class="chat-input-container">
        <input 
          v-model="inputText"
          @keypress.enter="sendMessage"
          :disabled="isLoading || !backendAvailable"
          class="chat-input" 
          type="text" 
          :placeholder="backendAvailable ? 'Escribe tu mensaje...' : 'Backend no disponible'"
        >
        <button 
          @click="sendMessage" 
          :disabled="isLoading || !backendAvailable"
          class="chat-send"
        >
          {{ isLoading ? '...' : 'Enviar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { sendChatMessage, checkBackendHealth } from '../services/geminiService'

const isOpen = ref(false)
const messages = ref([])
const inputText = ref('')
const isLoading = ref(false)
const backendAvailable = ref(true)
const messagesContainer = ref(null)

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  
  // Verificar estado del backend al abrir
  if (isOpen.value) {
    backendAvailable.value = await checkBackendHealth()
    
    if (!backendAvailable.value) {
      messages.value.push({
        text: '⚠️ El servidor no está disponible. Verifica que el backend esté corriendo en <code>http://localhost:8080</code>',
        sender: 'bot',
        timestamp: Date.now()
      })
    } else if (messages.value.length === 0) {
      // Mensaje de bienvenida
      messages.value.push({
        text: '👋 ¡Hola! Soy el asistente virtual de NetworkcoM. ¿En qué puedo ayudarte?',
        sender: 'bot',
        timestamp: Date.now()
      })
    }
  }
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value || !backendAvailable.value) return

  // Validar longitud (backend tiene límite de 2000)
  if (text.length > 2000) {
    messages.value.push({
      text: '⚠️ El mensaje es demasiado largo. Por favor, escribe menos de 2000 caracteres.',
      sender: 'bot',
      timestamp: Date.now()
    })
    return
  }

  // Agregar mensaje del usuario
  messages.value.push({
    text: text,
    sender: 'user',
    timestamp: Date.now()
  })

  inputText.value = ''
  isLoading.value = true

  try {
    const reply = await sendChatMessage(text)
    
    messages.value.push({
      text: reply,
      sender: 'bot',
      timestamp: Date.now()
    })

    // Auto-scroll a contacto si el mensaje lo contiene
    await nextTick()
    if (reply.includes('#contacto')) {
      setTimeout(() => {
        document.querySelector('#contacto')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 500)
    }

  } catch (err) {
    let errorMessage = '⚠️ <strong>Error:</strong> '
    
    if (err.message.includes('conectar con el servidor')) {
      errorMessage += 'No se puede conectar con el backend. Verifica que Spring Boot esté corriendo en <code>http://localhost:8080</code>'
      backendAvailable.value = false
    } else {
      errorMessage += err.message
    }
    
    messages.value.push({
      text: errorMessage,
      sender: 'bot',
      timestamp: Date.now()
    })
  } finally {
    isLoading.value = false
  }

  // Auto scroll al final
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleLinkClick = (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault()
    const targetId = e.target.getAttribute('href')
    const targetSection = document.querySelector(targetId)
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}

// Verificar backend al montar
onMounted(async () => {
  backendAvailable.value = await checkBackendHealth()
  if (!backendAvailable.value) {
    console.warn('⚠️ Backend no disponible al iniciar')
  } else {
    console.log('✅ Backend conectado correctamente')
  }
})
</script>

<style scoped>
.chat-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  box-shadow: 0 5px 25px rgba(0, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border: none;
  transition: all 0.3s;
}

.chat-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 35px rgba(0, 255, 255, 0.7);
}

.chat-window {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  z-index: 998;
  width: 380px;
  height: 500px;
  background: linear-gradient(145deg, rgba(0,40,80,0.95), rgba(0,20,40,0.95));
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
}

.chat-header {
  padding: 1.2rem;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  border-radius: 20px 20px 0 0;
  color: #000;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-close {
  cursor: pointer;
  font-size: 1.5rem;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-messages::-webkit-scrollbar {
  width: 5px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #00ccff;
  border-radius: 10px;
}

.chat-input-container {
  padding: 1rem;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  display: flex;
  gap: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 0.8rem;
  background: rgba(0, 20, 40, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: #fff;
}

.chat-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-send {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  border: none;
  border-radius: 10px;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.chat-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-send:not(:disabled):hover {
  transform: scale(1.05);
}

.message {
  padding: 0.8rem;
  border-radius: 10px;
  max-width: 85%;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.message-user {
  align-self: flex-end;
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid #00ff88;
}

.message-bot {
  align-self: flex-start;
  background: rgba(0, 40, 80, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.1);
}

.backend-warning {
  position: fixed;
  bottom: 8rem;
  right: 2rem;
  z-index: 997;
  background: rgba(255, 165, 0, 0.9);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  animation: fadeIn 0.3s ease;
}

/* Typing indicator animation */
.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 0.2rem 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ccff;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chat-window {
    width: 90%;
    right: 5%;
  }
}
</style>