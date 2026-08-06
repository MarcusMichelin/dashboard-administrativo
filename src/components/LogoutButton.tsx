'use client';

import React from 'react';
import { supabase } from '@/lib/supabase';
import { LogOut } from 'lucide-react';

export const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
    >
      <LogOut size={20} />
      Sair
    </button>
  );
};