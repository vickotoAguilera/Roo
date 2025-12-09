// components/AuthButton.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthButton() {
  const { user, loading, signIn, logout } = useAuth();

  if (loading) {
    return (
      <button className="btn btn-outline" disabled>
        <i className="fas fa-spinner fa-spin"></i> Cargando...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex gap-sm" style={{ alignItems: 'center' }}>
        {user.photoURL && (
          <img 
            src={user.photoURL} 
            alt={user.displayName || 'User'} 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%',
              border: '2px solid var(--color-primary)'
            }}
          />
        )}
        <span style={{ color: 'var(--text-primary)' }}>
          {user.displayName}
        </span>
        <button className="btn btn-outline" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> Salir
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary" onClick={signIn}>
      <i className="fab fa-google"></i> Iniciar con Google
    </button>
  );
}
