import React, { useState } from 'react';
import './SecretDoomButton.css';

const doomQuotes = [
  'RIP AND TEAR!',
  'No rest for the living.',
  'You are huge! That means you have huge guts!',
  'DOOMGUY LIVES!',
  'Secret Found!'
];

const monsters = [
  'imp', 'cacodemon', 'revenant', 'cyberdemon', 'mancubus', 'archvile'
];

export const SecretDoomButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [monster, setMonster] = useState(monsters[0]);
  const [quote, setQuote] = useState('');
  const [monsterIndex, setMonsterIndex] = useState(0);
  
  const handleButtonClick = () => {
    setShowModal(true);
    setQuote(doomQuotes[Math.floor(Math.random() * doomQuotes.length)]);
    setScore(0);
    setMonster(monsters[0]);
    setMonsterIndex(0);
  };

  const handleShoot = () => {
    setScore(score + 1);
    if (monsterIndex < monsters.length - 1) {
      setMonsterIndex(monsterIndex + 1);
      setMonster(monsters[monsterIndex + 1]);
    } else {
      setMonsterIndex(0);
      setMonster(monsters[0]);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="secret-doom-btn"
        onClick={handleButtonClick}
        title="Gizli Doom!"
        style={{
          position: 'fixed',
          bottom: 12,
          right: 12,
          opacity: 0.07,
          zIndex: 9999,
          background: 'none',
          border: 'none',
          width: 48,
          height: 48,
          cursor: 'pointer',
        }}
      >
        <img src="/src/assets/images/doom-hero.jpg" alt="Secret Doom" style={{ width: 48, height: 48, filter: 'grayscale(1)' }} />
      </button>
      {showModal && (
        <div className="secret-doom-modal-overlay" onClick={handleClose}>
          <div className="secret-doom-modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: '#ff4500', textAlign: 'center' }}>{quote}</h2>
            <div className="monster-area">
              <div className={`monster-sprite monster-${monster}`}></div>
              <button className="shoot-btn" onClick={handleShoot}>
                <span role="img" aria-label="shoot">🔫</span> Ateş Et!
              </button>
              <div className="score">Skor: {score}</div>
            </div>
            <button className="close-btn" onClick={handleClose}>Kapat</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretDoomButton;
