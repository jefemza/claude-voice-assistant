import { useState } from 'react';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import PropTypes from 'prop-types';

const VALID_USERS = {
  'luis@esm.com': {
    password: 'ESMClaude2025!',
    name: 'Luis',
    role: 'CEO'
  },
  'admin@esm.com': {
    password: 'AdminESM2025!',
    name: 'Administrador',
    role: 'Admin'
  }
};

export default function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = VALID_USERS[credentials.email];
    
    if (!user || user.password !== credentials.password) {
      setError('Email o contraseña incorrectos');
      setIsLoading(false);
      return;
    }

    // Login exitoso
    const userData = {
      email: credentials.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toLocaleString('es-AR')
    };

    // Guardar en localStorage para persistencia
    localStorage.setItem('claude-voice-user', JSON.stringify(userData));
    
    onLogin(userData);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error al escribir
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-yellow-400/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Claude Voice Assistant</h1>
          <p className="text-gray-400">ESM Argentina - Acceso Restringido</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Acceder</span>
              </>
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center mb-3">Credenciales de acceso:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="bg-gray-900/50 rounded p-2">
              <div className="font-mono">luis@esm.com</div>
              <div className="font-mono">ESMClaude2025!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};