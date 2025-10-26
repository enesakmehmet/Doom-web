import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const achievementData = [
  { name: 'TAMAMLANDI', value: 120 },
  { name: 'DEVAM EDİYOR', value: 90 },
  { name: 'ZORLUK MODU', value: 60 },
  { name: 'KOLEKSİYON', value: 30 },
];

const communityStats = [
  { name: 'PC', Oyuncu: 400 },
  { name: 'PlayStation', Oyuncu: 300 },
  { name: 'Xbox', Oyuncu: 200 },
  { name: 'Switch', Oyuncu: 100 },
];

const COLORS = ['#FF4500', '#FFB800', '#4CAF50', '#2196F3'];

const StatisticsPanel: React.FC = () => {
  return (
    <div style={{ background: 'rgba(30,30,30,0.85)', borderRadius: 16, padding: '2rem', margin: '2rem 0', boxShadow: '0 6px 24px rgba(0,0,0,0.2)' }}>
      <h2 style={{ color: '#FF4500', marginBottom: 24, textAlign: 'center', fontFamily: 'Orbitron, sans-serif' }}>İstatistikler & Infografikler</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
        {/* Oyun Başarıları Pie Chart */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 400 }}>
          <h4 style={{ color: '#fff', marginBottom: 12 }}>Oyun Başarıları Dağılımı</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={achievementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {achievementData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Topluluk Platform Dağılımı Bar Chart */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 500 }}>
          <h4 style={{ color: '#fff', marginBottom: 12 }}>Topluluk Platform Dağılımı</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={communityStats} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Oyuncu" fill="#FF4500" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Karşılaştırma veya ek infografikler için alan */}
      <div style={{ marginTop: 40, textAlign: 'center', color: '#aaa' }}>
        <span>Daha fazla detaylı analiz ve karşılaştırma yakında!</span>
      </div>
    </div>
  );
};

export default StatisticsPanel;
