import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Trash2, MessageSquare, Settings, LogOut } from 'lucide-react';
import { sendMessageToClaude, generateContext } from './services/claudeAPI';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  // Verificar si hay usuario logueado al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('claude-voice-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error al recuperar usuario:', error);
        localStorage.removeItem('claude-voice-user');
      }
    }
  }, []);

  // Configurar reconocimiento de voz
  useEffect(() => {
    if (!user || !('webkitSpeechRecognition' in window)) return;
    
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-ES';
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Error de reconocimiento:', event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
    }
  }, [user]);

  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendMessage = async () => {
    if (!transcript.trim()) return;

    const userMessage = transcript.trim();
    setIsLoading(true);
    
    // Agregar mensaje del usuario al historial
    const newHistory = [...history, { 
      type: 'user', 
      message: userMessage, 
      timestamp: new Date().toLocaleTimeString() 
    }];
    setHistory(newHistory);

    try {
      // Generar contexto de la conversación
      const context = generateContext(history);
      
      // Llamada real a Claude API
      const claudeResponse = await sendMessageToClaude(userMessage, context);
      
      setResponse(claudeResponse);
      
      // Agregar respuesta de Claude al historial
      setHistory([...newHistory, { 
        type: 'claude', 
        message: claudeResponse, 
        timestamp: new Date().toLocaleTimeString() 
      }]);

      // Leer respuesta en voz alta si está habilitado
      if (audioEnabled) {
        speakResponse(claudeResponse);
      }

    } catch (error) {
      const errorMsg = 'Error al conectar con Claude: ' + error.message;
      setResponse(errorMsg);
      setHistory([...newHistory, { 
        type: 'error', 
        message: errorMsg, 
        timestamp: new Date().toLocaleTimeString() 
      }]);
    }

    setTranscript('');
    setIsLoading(false);
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setTranscript('');
    setResponse('');
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('claude-voice-user');
    setHistory([]);
    setTranscript('');
    setResponse('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Si no hay usuario logueado, mostrar login
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <MessageSquare className="logo-icon" />
            <h1>Claude Voice Assistant</h1>
            <span className="subtitle">Bienvenido, {user.name} ({user.role})</span>
          </div>
          <div className="header-controls">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`control-btn ${audioEnabled ? 'active' : ''}`}
              title={audioEnabled ? 'Desactivar audio' : 'Activar audio'}
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="control-btn"
              title="Configuración"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={clearHistory}
              className="control-btn danger"
              title="Limpiar historial"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="control-btn"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Área de conversación */}
        <div className="conversation-area">
          {history.length === 0 ? (
            <div className="welcome-message">
              <MessageSquare size={48} className="welcome-icon" />
              <h2>¡Hola {user.name}!</h2>
              <p>Presiona el micrófono y comienza a hablar con Claude</p>
              <div className="quick-tips">
                <div className="tip">🎙️ Presiona y habla</div>
                <div className="tip">⏹️ Suelta para enviar</div>
                <div className="tip">🔊 Respuesta por voz</div>
              </div>
            </div>
          ) : (
            <div className="messages">
              {history.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-header">
                    <span className="sender">
                      {msg.type === 'user' ? `👤 ${user.name}` : 
                       msg.type === 'claude' ? '🤖 Claude' : '⚠️ Error'}
                    </span>
                    <span className="timestamp">{msg.timestamp}</span>
                  </div>
                  <div className="message-content">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Área de input */}
        <div className="input-area">
          <div className="input-container">
            <div className="transcript-area">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRecording ? "🎙️ Escuchando..." : "Escribe o usa el micrófono..."}
                className="transcript-input"
                disabled={isLoading}
              />
            </div>
            
            <div className="controls">
              <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                className={`mic-button ${isRecording ? 'recording' : ''}`}
                disabled={isLoading}
                title="Mantén presionado para grabar"
              >
                {isRecording ? <Mic className="pulsing" size={24} /> : <MicOff size={24} />}
                <span className="mic-label">
                  {isRecording ? 'Grabando...' : 'Presiona y habla'}
                </span>
              </button>
              
              <button
                onClick={sendMessage}
                className="send-button"
                disabled={!transcript.trim() || isLoading}
                title="Enviar mensaje"
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Panel de configuración */}
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-content">
            <h3>⚙️ Configuración</h3>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={(e) => setAudioEnabled(e.target.checked)}
                />
                Respuestas por voz
              </label>
            </div>
            <div className="setting-item">
              <label>
                Estado del micrófono:
                <span className={isRecording ? 'status-active' : 'status-inactive'}>
                  {isRecording ? ' 🎙️ Activo' : ' 🔇 Inactivo'}
                </span>
              </label>
            </div>
            <button 
              onClick={() => setShowSettings(false)}
              className="close-settings"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;