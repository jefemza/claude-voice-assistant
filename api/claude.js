export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  
  if (!ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'API Key de Anthropic no configurada en el servidor' });
    return;
  }

  try {
    const { message, context = '', model = 'claude-3-haiku-20240307' } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Mensaje requerido' });
      return;
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
      model: model,
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
        res.status(401).json({ error: 'API Key inválida' });
      } else if (response.status === 429) {
        res.status(429).json({ error: 'Límite de rate excedido' });
      } else {
        res.status(500).json({ error: errorData.error?.message || 'Error desconocido' });
      }
      return;
    }

    const data = await response.json();
    
    if (data.content && data.content.length > 0) {
      res.status(200).json({ text: data.content[0].text });
    } else {
      res.status(500).json({ error: 'Respuesta vacía de Claude' });
    }
    
  } catch (error) {
    console.error('Error al comunicarse con Claude:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}