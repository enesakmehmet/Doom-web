import React from 'react';
<<<<<<< HEAD
import { DoomIcon } from '../components/DoomIcon';
import { DoomButton } from '../components/DoomButton';
import { magazaProducts } from './magazaProducts';
import '../components/doom-button.css';

const Magaza = () => (
  <div className="page-content" style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 0' }}>
    <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
      <DoomIcon name="flame" size={32} /> Mağaza
    </h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginTop: 40 }}>
      {magazaProducts.map(product => (
        <div key={product.id} style={{ background: '#191919', borderRadius: 14, boxShadow: '0 4px 20px #b71c1c22', padding: 24, width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #b71c1c' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 18, border: '2px solid #ffeb3b33' }} />
          <h2 style={{ color: '#ffeb3b', fontSize: 22, margin: '8px 0 4px', fontFamily: 'Orbitron, Arial Black, Arial, sans-serif', textAlign: 'center' }}>{product.name}</h2>
          <div style={{ color: '#fff', opacity: 0.8, fontSize: 15, marginBottom: 8, textAlign: 'center' }}>{product.desc}</div>
          <div style={{ color: '#b71c1c', fontWeight: 'bold', fontSize: 20, marginBottom: 14 }}>{product.price} TL</div>
          <DoomButton icon="skull" style={{ width: '100%' }}>
            Sepete Ekle
          </DoomButton>
        </div>
      ))}
    </div>
=======

const Magaza = () => (
  <div className="page-content">
    <h1>Mağaza</h1>
    <p>Mağaza sayfasına hoş geldiniz! DOOM ürünlerini satın alabilirsiniz.</p>
>>>>>>> 81067d34b79eb295e2c38ef2ac72720360727fa9
  </div>
);

export default Magaza;
