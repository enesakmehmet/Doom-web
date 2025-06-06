import React from 'react';
import { DoomIcon } from './DoomIcon';
import './doom-button.css';

interface DoomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: 'skull' | 'flame' | 'bolt';
  children: React.ReactNode;
}

export const DoomButton: React.FC<DoomButtonProps> = ({ icon, children, ...props }) => (
  <button className="doom-btn" {...props}>
    {icon && <DoomIcon name={icon} size={20} className="doom-btn-icon" />}
    <span>{children}</span>
  </button>
);
