import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Oyunlar.css';

const Oyunlar = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="oyunlar-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="oyunlar-header">
        <h1>DOOM Oyunları</h1>
        <p>Cehennem kapıları açıldı ve dünyayı kurtarmak için sadece sen varsın. DOOM serisinin efsanevi FPS oyunlarıyla tanış ve dünyanın en iyi düşman avlama deneyimini yaşa.</p>
      </div>
      
      {/* Öne Çıkan Oyun */}
      <div className="featured-game">
        <img src="/src/assets/images/enternal.jpeg" alt="DOOM Eternal" className="featured-image" />
        <div className="featured-content">
          <h2 className="featured-title">DOOM Eternal</h2>
          <h3 className="featured-subtitle">Cehennem Ordularını Yok Et</h3>
          <p className="featured-description">
            DOOM Slayer olarak geri dön ve dünyayı istila eden cehennem ordularına karşı savaş. Yeni silahlar, yetenekler ve düşmanlarla dolu bu devam oyununda, serinin öncülüğünü yapan hızlı ve akıcı FPS deneyimini yaşayın.
          </p>
          <div className="featured-actions">
            <a href="#" className="featured-button featured-buy">Hemen Satın Al</a>
            <a href="#" className="featured-button featured-trailer">Fragmanı İzle</a>
          </div>
        </div>
      </div>
      
      {/* Oyunlar Listesi */}
      <div className="oyunlar-grid">
        {/* DOOM (2016) */}
        <div className="oyun-card">
          <img src="/src/assets/images/91uV7r7aAhL._AC_UF1000,1000_QL80_.jpg" alt="DOOM (2016)" className="oyun-image" />
          <div className="oyun-content">
            <h2 className="oyun-title">DOOM (2016)</h2>
            <p className="oyun-release">Yayın Tarihi: 13 Mayıs 2016</p>
            <p className="oyun-description">
              Modern DOOM serisinin başlangıcı. Mars'taki UAC tesisinde açılan portal sonrası cehennem yaratıkları ile savaşan DOOM Slayer'in hikayesi.
            </p>
            <div className="oyun-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul className="features-list">
                <li>Tek oyunculu yoğun hikaye modu</li>
                <li>Çok oyunculu rekabetçi modlar</li>
                <li>SnapMap harita ve mod oluşturma aracı</li>
                <li>Klasik DOOM'un modern yorumu</li>
              </ul>
            </div>
            <div className="oyun-platforms">
              <span className="platform-badge">PC</span>
              <span className="platform-badge">PlayStation 4</span>
              <span className="platform-badge">Xbox One</span>
              <span className="platform-badge">Nintendo Switch</span>
            </div>
            <div className="oyun-actions">
              <a href="#" className="oyun-button buy-button">Satın Al</a>
              <a href="#" className="oyun-button details-button">Detaylar</a>
            </div>
          </div>
        </div>
        
        {/* DOOM 3 */}
        <div className="oyun-card">
          <img src="/src/assets/images/doom 3.jpeg" alt="DOOM 3" className="oyun-image" />
          <div className="oyun-content">
            <h2 className="oyun-title">DOOM 3</h2>
            <p className="oyun-release">Yayın Tarihi: 3 Ağustos 2004</p>
            <p className="oyun-description">
              Serinin korku öğelerini ön plana çıkaran DOOM 3, Mars'taki UAC tesisinde yaşanan bir felaketi konu alıyor. Karanlık koridorlarda hayatta kalmaya çalışın.
            </p>
            <div className="oyun-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul className="features-list">
                <li>Korku ve gerilim dolu atmosfer</li>
                <li>Gelişmiş gölgelendirme ve ışıklandırma</li>
                <li>Resurrection of Evil genişletme paketi</li>
                <li>BFG Edition ile yeniden düzenlenen oynanış</li>
              </ul>
            </div>
            <div className="oyun-platforms">
              <span className="platform-badge">PC</span>
              <span className="platform-badge">PlayStation 3</span>
              <span className="platform-badge">Xbox 360</span>
              <span className="platform-badge">Nintendo Switch</span>
            </div>
            <div className="oyun-actions">
              <a href="#" className="oyun-button buy-button">Satın Al</a>
              <a href="#" className="oyun-button details-button">Detaylar</a>
            </div>
          </div>
        </div>
        
        {/* DOOM 64 */}
        <div className="oyun-card">
          <img src="/src/assets/images/capsule_616x353.jpg" alt="DOOM 64" className="oyun-image" />
          <div className="oyun-content">
            <h2 className="oyun-title">DOOM 64</h2>
            <p className="oyun-release">Yayın Tarihi: 31 Mart 1997 (Yeniden yayın: 20 Mart 2020)</p>
            <p className="oyun-description">
              Orijinal olarak Nintendo 64 için geliştirilen DOOM 64, modern platformlarda yeniden hayat buldu. Klasik DOOM oynanışını benzersiz seviyeler ve silahlarla deneyimleyin.
            </p>
            <div className="oyun-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul className="features-list">
                <li>30'dan fazla özel seviye</li>
                <li>Yeniden tasarlanmış silahlar ve düşmanlar</li>
                <li>Yeni "The Lost Levels" bölümü</li>
                <li>Güncellenmiş görseller ve ses</li>
              </ul>
            </div>
            <div className="oyun-platforms">
              <span className="platform-badge">PC</span>
              <span className="platform-badge">PlayStation 4</span>
              <span className="platform-badge">Xbox One</span>
              <span className="platform-badge">Nintendo Switch</span>
            </div>
            <div className="oyun-actions">
              <a href="#" className="oyun-button buy-button">Satın Al</a>
              <a href="#" className="oyun-button details-button">Detaylar</a>
            </div>
          </div>
        </div>
        
        {/* DOOM Eternal: The Ancient Gods */}
        <div className="oyun-card">
          <img src="/src/assets/images/DE_Ancient_Gods_2_HERO_1920x870.png" alt="DOOM Eternal: The Ancient Gods" className="oyun-image" />
          <div className="oyun-content">
            <h2 className="oyun-title">DOOM Eternal: The Ancient Gods</h2>
            <p className="oyun-release">Yayın Tarihi: 20 Ekim 2020 (Part 1), 18 Mart 2021 (Part 2)</p>
            <p className="oyun-description">
              DOOM Eternal'in iki bölümlük DLC paketi. DOOM Slayer olarak dengeleri değiştiren bir göreve çıkın ve Maykr'ların dünyasını keşfedin.
            </p>
            <div className="oyun-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul className="features-list">
                <li>Yeni bölgeler ve zorlu seviyeler</li>
                <li>Yeni silahlar ve yetenekler</li>
                <li>Yeni düşman türleri</li>
                <li>DOOM Eternal hikayesinin devamı</li>
              </ul>
            </div>
            <div className="oyun-platforms">
              <span className="platform-badge">PC</span>
              <span className="platform-badge">PlayStation 4/5</span>
              <span className="platform-badge">Xbox One/Series X|S</span>
              <span className="platform-badge">Nintendo Switch</span>
            </div>
            <div className="oyun-actions">
              <a href="#" className="oyun-button buy-button">Satın Al</a>
              <a href="#" className="oyun-button details-button">Detaylar</a>
            </div>
          </div>
        </div>
        
        {/* DOOM 1 & 2 */}
        <div className="oyun-card">
          <img src="/src/assets/images/hlyfh6uzn0q61.webp" alt="DOOM Classic Collection" className="oyun-image" />
          <div className="oyun-content">
            <h2 className="oyun-title">DOOM Classic Collection</h2>
            <p className="oyun-release">Yayın Tarihi: 26 Temmuz 2019 (Yeniden yayın)</p>
            <p className="oyun-description">
              FPS türünün temellerini atan orijinal DOOM ve DOOM II oyunları. Modern platformlarda güncellenmiş haliyle oynayın ve DOOM'un köklerini keşfedin.
            </p>
            <div className="oyun-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul className="features-list">
                <li>DOOM ve DOOM II tam sürümleri</li>
                <li>Tüm genişletme paketleri dahil</li>
                <li>Yeni seviye paketleri</li>
                <li>Güncellenmiş kontroller ve ayarlar</li>
              </ul>
            </div>
            <div className="oyun-platforms">
              <span className="platform-badge">PC</span>
              <span className="platform-badge">PlayStation 4</span>
              <span className="platform-badge">Xbox One</span>
              <span className="platform-badge">Nintendo Switch</span>
              <span className="platform-badge">iOS</span>
              <span className="platform-badge">Android</span>
            </div>
            <div className="oyun-actions">
              <a href="#" className="oyun-button buy-button">Satın Al</a>
              <a href="#" className="oyun-button details-button">Detaylar</a>
            </div>
          </div>
        </div>
        
        {/* DOOM VFR */}
        <div className="oyun-card">
          <img src="/src/assets/images/vfr.jpg" alt="DOOM VFR" className="oyun-image" />
          <div className="oyun-content">
            <h2 className="oyun-title">DOOM VFR</h2>
            <p className="oyun-release">Yayın Tarihi: 1 Aralık 2017</p>
            <p className="oyun-description">
              DOOM evrenini sanal gerçeklik içinde deneyimleyin. VR için özel olarak tasarlanmış bu oyunda, Mars'taki UAC tesisinde cehennem yaratıklarıyla yüz yüze gelin.
            </p>
            <div className="oyun-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul className="features-list">
                <li>Tam VR deneyimi</li>
                <li>Teleportasyon ve hareket sistemleri</li>
                <li>DOOM 2016 evreninde geçen yeni hikaye</li>
                <li>VR için optimize edilmiş silahlar ve savaş</li>
              </ul>
            </div>
            <div className="oyun-platforms">
              <span className="platform-badge">PlayStation VR</span>
              <span className="platform-badge">HTC Vive</span>
              <span className="platform-badge">Oculus Rift</span>
            </div>
            <div className="oyun-actions">
              <a href="#" className="oyun-button buy-button">Satın Al</a>
              <a href="#" className="oyun-button details-button">Detaylar</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Yaklaşan Oyunlar */}
      <div className="upcoming-games">
        <h2 className="section-title">Yaklaşan DOOM Oyunları</h2>
        <div className="upcoming-card">
          <div className="upcoming-content">
            <h3>DOOM: The Dark Ages</h3>
            <p className="upcoming-info">Beklenen Çıkış: 2026</p>
            <p className="upcoming-description">
              DOOM serisinin yeni bölümü hakkında detaylar henüz açıklanmadı. Ancak sızan bilgilere göre, DOOM Slayer'in geçmişini ve Night Sentinel'ların hikayesini konu alacak.
            </p>
            <a href="#" className="upcoming-button">Haber Bültenine Abone Ol</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Oyunlar;
