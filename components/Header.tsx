import React from 'react';
import { type User } from '../types';
import { LogoutIcon } from './icons';

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Asisten Modul Ajar (AMA)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Rancang modul ajar profesional dengan bantuan AI.
          </p>
        </div>
        {user && onLogout && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Halo, <span className="font-semibold">{user.username}</span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
              title="Keluar"
            >
              <LogoutIcon />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;