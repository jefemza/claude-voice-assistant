const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const CLAUDE_MODEL = import.meta.env.VITE_CLAUDE_MODEL || 'claude-3-haiku-20240307';

export const sendMessageToClaude = async (message, context = '') => {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('API Key de Anthropic no configurada');
  }

  const systemPrompt = `Eres Claude, asistente de IA de Anthropic, hablando con Luis, CEO de ESM Argentina (empresa de telemarketing).

CONTEXTO DE LUIS:
- CEO de empresa de telemarketing en Argentina
- Trabaja con filtrado de portabilidad para Movistar
- Pragmático, directo, orientado a resultados
- Prefiere respuestas concisas y actionables

INSTRUCCIONES:
- SIEMPRE responder en español
- Ser directo y pragmático
- Enfocarse en soluciones prácticas
- Usar ejemplos concretos para su negocio
- Mantener tono profesional pero cercano
- Respuestas concisas (máximo 150 palabras por respuesta de voz)

${context ? `\nCONTEXTO PREVIO DE LA CONVERSACIÓN:\n${context}` : ''}`;

  const requestBody = {
    model: CLAUDE_MODEL,
    max_tokens: 1000,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  };

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de la API de Claude:', errorData);
      
      if (response.status === 401) {
        throw new Error('API Key inválida. Verifica tu configuración.');
      } else if (response.status === 429) {
        throw new Error('Límite de rate excedido. Intenta de nuevo en un momento.');
      } else {
        throw new Error(`Error de la API: ${errorData.error?.message || 'Error desconocido'}`);
      }
    }

    const data = await response.json();
    
    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    } else {
      throw new Error('Respuesta vacía de Claude');
    }
    
  } catch (error) {
    console.error('Error al comunicarse con Claude:', error);
    throw error;
  }
};

// Función para generar contexto de la conversación
export const generateContext = (history, maxEntries = 3) => {
  if (!history || history.length === 0) return '';
  
  const recentHistory = history.slice(-maxEntries * 2); // Últimos intercambios
  
  return recentHistory
    .map(msg => {
      const role = msg.type === 'user' ? 'Luis' : 'Claude';
      return `${role}: ${msg.message}`;
    })
    .join('\n');
};