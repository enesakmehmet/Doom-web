import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h2>Oturum Aç</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-posta adresinizi girin"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Şifrenizi girin"
            />
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <div className="auth-actions">
            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
            <button 
              type="button" 
              className="auth-back-btn" 
              onClick={onClose}
            >
              Geri Dön
            </button>
          </div>
          
          <div className="auth-switch">
            <p>Hesabınız yok mu? <button type="button" onClick={onSwitchToRegister}>Kayıt Ol</button></p>
          </div>
          
          <div className="auth-demo">
            <p>Demo hesabı: doom@slayer.com / password123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
