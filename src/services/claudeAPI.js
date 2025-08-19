const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const CLAUDE_MODEL = import.meta.env.VITE_CLAUDE_MODEL || 'claude-3-haiku-20240307';

export const sendMessageToClaude = async (message, context = '') => {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('API Key de Anthropic no configurada');
  }

  // Ya no llamamos directo a Anthropic desde el navegador para evitar CORS.
  // En su lugar, usamos la función serverless /api/claude.
  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, context, model: CLAUDE_MODEL })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData?.error || 'Error desconocido';
      throw new Error(`Error de la API: ${msg}`);
    }

    const data = await response.json();

    if (data?.text) {
      return data.text;
    } else {
      throw new Error('Respuesta vacía del servidor');
    }
  } catch (error) {
    console.error('Error al comunicarse con Claude:', error);
    throw error;
  }
};

// Función para generar contexto de la conversación
export const generateContext = (history, maxEntries = 3) => {
  if (!history || history.length === 0) return '';
  const recentHistory = history.slice(-maxEntries * 2);
  return recentHistory
    .map(msg => {
      const role = msg.type === 'user' ? 'Luis' : 'Claude';
      return `${role}: ${msg.message}`;
    })
    .join('\n');
};