// Servicio para comunicación con Backend Java Spring Boot
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

/**
 * Envía un mensaje al backend Java.
 * NOTA: El contexto/prompt del sistema debe manejarse en el backend,
 * no en el frontend. Aquí solo enviamos el mensaje del usuario.
 *
 * @param {string} userMessage - Mensaje del usuario
 * Respuesta REST esperada (200): { "reply": string }
 * @returns {Promise<string>} - Texto en data.reply
 */
export async function sendChatMessage(userMessage) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: userMessage})
    })

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('El servicio de IA está temporalmente no disponible.')
      }
      if (response.status === 400) {
        throw new Error('Mensaje inválido o demasiado largo (máx. 2000 caracteres).')
      }
      throw new Error('Ocurrió un error en el servidor. Por favor, intentá más tarde.')
    }

    const data = await response.json().catch(() => ({}))

    if (typeof data?.reply !== 'string' || !data.reply.trim()) {
      throw new Error('Respuesta del servidor sin contenido válido.')
    }

    return data.reply

  } catch (error) {
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      throw new Error('No se puede conectar con el servidor. Por favor, intentá más tarde.')
    }

    throw error
  }
}

/**
 * Verifica el estado del backend.
 * @returns {Promise<boolean>} - true si el backend está disponible
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/health`, {
      signal: AbortSignal.timeout(5000)
    })
    return response.ok
  } catch {
    return false
  }
}
