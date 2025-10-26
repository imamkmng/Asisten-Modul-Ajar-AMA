import React from 'react';
import { type Module } from '../types';

interface ModuleHistoryProps {
  modules: Module[];
  onSelect: (content: string) => void;
  isLoading: boolean;
}

const ModuleHistory: React.FC<ModuleHistoryProps> = ({ modules, onSelect, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Riwayat Modul Ajar</h2>
      {isLoading ? (
        <p className="text-sm text-gray-500">Memuat riwayat...</p>
      ) : modules.length === 0 ? (
        <p className="text-sm text-gray-500">Anda belum menyimpan modul ajar apa pun.</p>
      ) : (
        <ul className="space-y-1 max-h-64 overflow-y-auto">
          {modules.map((module) => (
            <li key={module.id}>
              <button
                onClick={() => onSelect(module.content)}
                className="w-full text-left p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                <p className="text-sm font-medium text-primary-700 truncate">{module.title}</p>
                <p className="text-xs text-gray-400">
                  {new Date(module.createdAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModuleHistory;