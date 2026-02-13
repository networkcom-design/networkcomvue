// ===============================================
// Servicio de comunicación con Backend Spring Boot
// Optimizado para producción (Vercel + Java)
// ===============================================

// 🔹 Base URL desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Validar configuración obligatoria
if (!API_BASE_URL) {
  throw new Error(
    '❌ VITE_API_URL no está definida. Configúrala en Vercel (Settings → Environment Variables)'
  );
}

// 🔹 Endpoint base centralizado
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

// 🔹 Timeout global para requests (15s)
const REQUEST_TIMEOUT = 15000;

/**
 * Función interna para hacer fetch con timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Envía un mensaje al backend Java
 * @param {string} userMessage - Mensaje del usuario
 * @returns {Promise<string>} - Respuesta del chatbot
 */
export async function sendChatMessage(userMessage) {

  // 🔹 Validaciones previas (mejor UX)
  if (!userMessage?.trim()) {
    throw new Error('El mensaje no puede estar vacío');
  }

  if (userMessage.length > 2000) {
    throw new Error('El mensaje excede el máximo permitido (2000 caracteres)');
  }

  // 🔹 Contexto empresarial
  const contextoEmpresa = `
ACTÚA COMO: Asistente virtual experto de "NetworkcoM".
TU OBJETIVO: Vender servicios de automatización e IA.
INFORMACIÓN:
- Somos NetworkcoM. Hacemos chatbots, automatización (RPA) e integraciones API.
INSTRUCCIONES:
- Respuestas breves (max 3 frases).
- Si preguntan por chatbots: Explica que usan IA avanzada (GPT/Gemini) para atender clientes 24/7.
- Si quieren contacto: "Completa el <a href='#contacto' style='color: #00ff88;'>Formulario</a>."
`;

  try {
    const response = await fetchWithTimeout(`${CHAT_ENDPOINT}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage.trim(),
        context: contextoEmpresa
      })
    });

    // 🔹 Manejo de errores HTTP
    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('El servicio de IA está temporalmente no disponible');
      }

      if (response.status === 400) {
        throw new Error('Mensaje inválido o demasiado largo (máx 2000 caracteres)');
      }

      if (response.status === 500) {
        throw new Error('Error interno del servidor. Intenta nuevamente.');
      }

      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();

    // 🔹 Validación estructura esperada (ChatResponse)
    if (!data?.success) {
      throw new Error(data?.error || 'Error procesando el mensaje');
    }

    if (!data?.reply) {
      throw new Error('Respuesta inválida del servidor');
    }

    return data.reply;

  } catch (error) {

    console.error('❌ Error en la llamada al backend:', error);

    // Timeout
    if (error.name === 'AbortError') {
      throw new Error('El servidor tardó demasiado en responder. Intenta nuevamente.');
    }

    // Error de conexión (CORS / servidor caí
