import React, { useState } from 'react';
import { type User } from '../types';
import { loginUser, registerUser } from '../services/apiService';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = isRegister 
        ? await registerUser(username, password)
        : await loginUser(username, password);

      if (response.success && response.user) {
        onLoginSuccess(response.user);
      } else {
        setError(response.message || 'Terjadi kesalahan.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Asisten Modul Ajar (AMA)
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          {isRegister ? 'Buat akun untuk memulai' : 'Silakan masuk untuk melanjutkan'}
        </p>

        <div className="flex border-b mb-6">
          <button onClick={() => { setIsRegister(false); setError(''); }} className={`flex-1 py-2 text-sm font-medium ${!isRegister ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}>
            Masuk
          </button>
          <button onClick={() => { setIsRegister(true); setError(''); }} className={`flex-1 py-2 text-sm font-medium ${isRegister ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}>
            Daftar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400"
          >
            {isLoading ? 'Memproses...' : (isRegister ? 'Daftar' : 'Masuk')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;