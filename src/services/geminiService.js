// Servicio para comunicación con Backend Java Spring Boot
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Envía un mensaje al backend Java
 * @param {string} userMessage - Mensaje del usuario
 * @returns {Promise<string>} - Respuesta del chatbot
 */
export async function sendChatMessage(userMessage) {
  const contextoEmpresa = `ACTÚA COMO: Asistente virtual experto de "NetworkcoM".
TU OBJETIVO: Vender servicios de automatización e IA.
INFORMACIÓN:
- Somos NetworkcoM. Hacemos chatbots, automatización (RPA) e integraciones API.
INSTRUCCIONES:
- Respuestas breves (max 3 frases).
- Si preguntan por chatbots: Explica que usan IA avanzada (GPT/Gemini) para atender clientes 24/7.
- Si quieren contacto: "Completa el <a href='#contacto' style='color: #00ff88;'>Formulario</a>."`
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        context: contextoEmpresa
      })
    })
    
    // Manejar errores HTTP
    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('El servicio de IA está temporalmente no disponible')
      }
      if (response.status === 400) {
        throw new Error('Mensaje inválido o demasiado largo (máx 2000 caracteres)')
      }
      throw new Error(`Error del servidor: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Validar según ChatResponse
    if (!data.success) {
      throw new Error(data.error || 'Error procesando el mensaje')
    }
    
    // Retornar el campo 'reply' de ChatResponse
    return data.reply
    
  } catch (error) {
    console.error('Error en la llamada al backend:', error)
    
    // Mensajes de error más amigables
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error(`No se puede conectar con el servidor. Verifica que el backend esté corriendo en ${API_BASE_URL}`)
    }
    
    throw error
  }
}

/**
 * Verifica el estado del backend
 * @returns {Promise<boolean>} - true si el backend está disponible
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/health`)
    return response.ok
  } catch (error) {
    console.error('Backend no disponible:', error)
    return false
  }
}