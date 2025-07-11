import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { authenticateUser, setCurrentUser } from '../../utils/auth';
import { User } from '../../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = authenticateUser(username, password);
    
    if (user) {
      setCurrentUser(user);
      onLogin(user);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
    
    setIsLoading(false);
  };

  const quickLogin = async (user: string) => {
    setIsLoading(true);
    setError('');
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const authenticatedUser = authenticateUser(user, '123');
    
    if (authenticatedUser) {
      setCurrentUser(authenticatedUser);
      onLogin(authenticatedUser);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tourify Control Center</h1>
            <p className="text-gray-600 dark:text-gray-300">Ingresa para acceder al centro de control</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors pr-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 dark:bg-indigo-700 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-center">Acceso rápido:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { user: 'gabo', name: 'Gabo', role: 'Sales' },
                { user: 'pancho', name: 'Pancho', role: 'Dev' },
                { user: 'agus', name: 'Agus', role: 'CEO' }
              ].map((account) => (
                <button
                  key={account.user}
                  onClick={() => quickLogin(account.user)}
                  className="p-3 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{account.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">{account.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};