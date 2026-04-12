// Servicio para envío del formulario de contacto al backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

/**
 * Envía los datos del formulario de contacto al backend.
 *
 * @param {Object} payload - Datos del formulario
 * @param {string} payload.nombre - Nombre del contacto
 * @param {string} payload.correo - Correo electrónico
 * @param {string} [payload.telefono] - Teléfono (opcional)
 * @param {string} payload.solicitud - Mensaje o solicitud
 * @returns {Promise<void>}
 */
export async function sendContactForm(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}${CONTACT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    console.log("response",response);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Los datos del formulario no son válidos.')
      }
      if (response.status === 429) {
        throw new Error('Se alcanzó el límite de solicitudes. Intentá nuevamente en unos minutos.')
      }
      if (response.status >= 500) {
        throw new Error('Ocurrió un error en el servidor. Por favor, intentá más tarde.')
      }
      throw new Error('No se pudo enviar la solicitud de contacto.')
    }

    let data = null
    try {
      data = await response.json()
    } catch {
      // Algunos backends responden 200 sin cuerpo JSON; en ese caso
      // consideramos el envío como exitoso.
      return
    }

    if (data && data.success === false) {
      throw new Error(data.error || 'No se pudo procesar la solicitud de contacto.')
    }
  } catch (error) {
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      throw new Error('No se puede conectar con el servidor. Por favor, intentá más tarde.')
    }

    throw error
  }
}
