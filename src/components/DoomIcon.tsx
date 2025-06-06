import React from 'react';

interface DoomIconProps {
  name: 'skull' | 'flame' | 'bolt';
  size?: number;
  color?: string;
  className?: string;
}

const icons = {
  skull: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M12 2C7 2 3 6 3 11c0 2.2 1.6 4.3 3.6 5.7-.2.7-.6 2.1-1.2 3.2-.2.4.1.9.6.9h2c.3 0 .6-.2.7-.5l.8-2.4c.2-.5.8-.5 1 0l.8 2.4c.1.3.4.5.7.5h2c.5 0 .8-.5.6-.9-.6-1.1-1-2.5-1.2-3.2C19.4 15.3 21 13.2 21 11c0-5-4-9-9-9zm-2 14a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M12 2s4 7 4 11a4 4 0 11-8 0C8 9 12 2 12 2zm0 20a6 6 0 006-6c0-5-6-12-6-12S6 11 6 16a6 6 0 006 6z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M7 2v13h3v7l7-12h-4l4-8z" />
    </svg>
  ),
};

export const DoomIcon: React.FC<DoomIconProps> = ({ name, size = 24, color = '#B71C1C', className }) => (
  <span style={{ display: 'inline-flex', width: size, height: size, color }} className={className}>
    {icons[name]}
  </span>
);
