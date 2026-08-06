import React from 'react';
import { Home, Menu } from 'lucide-react';

import { LogoutButton } from './LogoutButton';

interface HeaderProps {
  onMenuToggle?: () => void;
  showLogout?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, showLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Home size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Seazone</h1>
              <p className="text-blue-100 text-xs">Dashboard de Proprietários</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Bem-vindo!</p>
              <p className="text-xs text-blue-100">Gerencie seus imóveis</p>
            </div>
            {showLogout && <LogoutButton />}
            {onMenuToggle && (
            <button
                onClick={onMenuToggle}
                className="p-2 hover:bg-blue-500 rounded-lg transition"
            >
                <Menu size={20} />
            </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};