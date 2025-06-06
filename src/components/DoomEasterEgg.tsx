import React, { useState } from 'react';
import './DoomEasterEgg.css';

const cheatCodes = [
  { code: 'iddqd', desc: 'God Mode Aktif!' },
  { code: 'idkfa', desc: 'Tüm Silahlar ve Anahtarlar Açıldı!' },
  { code: 'idclip', desc: 'Duvarlardan Geçme Modu!' },
  { code: 'idspispopd', desc: 'No Clipping!' },
  { code: 'idbehold', desc: 'Powerup Modu!' }
];

export const DoomEasterEgg: React.FC = () => {
  const [input, setInput] = useState('');
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [desc, setDesc] = useState('');
  const [show, setShow] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toLowerCase());
    const found = cheatCodes.find(c => e.target.value.toLowerCase() === c.code);
    if (found) {
      setActiveCode(found.code);
      setDesc(found.desc);
      setShow(true);
      setInput('');
      setTimeout(() => setShow(false), 2500);
    }
  };

  return (
    <div className="doom-easter-egg-container">
      <input
        className="doom-easter-egg-input"
        type="text"
        value={input}
        maxLength={12}
        placeholder="Cheat kodu gir..."
        onChange={handleInputChange}
        onFocus={e => e.target.select()}
        title="Doom cheat kodları için buraya yaz!"
      />
      {show && (
        <div className="doom-easter-egg-toast">
          <span className="cheat-code">{activeCode}</span>
          <span className="cheat-desc">{desc}</span>
        </div>
      )}
    </div>
  );
};

export default DoomEasterEgg;
