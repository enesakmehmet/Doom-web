import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) return null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="user-profile">
      <button className="user-profile-button" onClick={toggleDropdown}>
        <div className="user-avatar">
          {getInitials()}
        </div>
        <span className="user-name">{user.name}</span>
      </button>

      {isDropdownOpen && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <div className="user-dropdown-avatar">
              {getInitials()}
            </div>
            <div className="user-dropdown-info">
              <p className="user-dropdown-name">{user.name}</p>
              <p className="user-dropdown-email">{user.email}</p>
            </div>
          </div>
          
          <div className="user-dropdown-menu">
            <button className="user-dropdown-item">
              Hesabım
            </button>
            <button className="user-dropdown-item">
              Siparişlerim
            </button>
            <button className="user-dropdown-item">
              İstek Listem
            </button>
            <button className="user-dropdown-item" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
