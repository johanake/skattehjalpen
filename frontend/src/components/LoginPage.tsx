import React, { useState } from 'react';
import { AuthForm } from './AuthForm';

export const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm mode={mode} onToggleMode={handleToggleMode} />
    </div>
  );
};