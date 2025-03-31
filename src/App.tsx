import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="doom-app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/src/assets/images/images.jpeg" alt="PlayStation Logo" className="ps-logo" />
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#">Oyunlar</a></li>
              <li><a href="#">Donanım</a></li>
              <li><a href="#">Hizmetler</a></li>
              <li><a href="#">Haberler</a></li>
              <li><a href="#">Mağaza</a></li>
              <li><a href="#">Destek</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="btn-sign-in">Oturum Aç</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>DOOM ETERNAL</h1>
          <h2>DOOM Slayer'ın başlangıç hikâyesini ve yıkımın yaşandığı zorlu görevini keşfedin.</h2>
          <div className="hero-buttons">
            <button className="btn-primary">Şimdi Satın Al</button>
            <button className="btn-secondary">Daha Fazla Bilgi</button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="game-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Genel Bakış
          </button>
          <button 
            className={`tab-btn ${activeTab === 'editions' ? 'active' : ''}`}
            onClick={() => setActiveTab('editions')}
          >
            Sürümler
          </button>
          <button 
            className={`tab-btn ${activeTab === 'dlc' ? 'active' : ''}`}
            onClick={() => setActiveTab('dlc')}
          >
            Eklentiler
          </button>
          <button 
            className={`tab-btn ${activeTab === 'horde' ? 'active' : ''}`}
            onClick={() => setActiveTab('horde')}
          >
            Horde Modu
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ancient-gods' ? 'active' : ''}`}
            onClick={() => setActiveTab('ancient-gods')}
          >
            The Ancient Gods
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <div className="content-container">
        {/* Overview Section */}
        {activeTab === 'overview' && (
          <section className="overview-section">
            <div className="overview-content">
              <div className="overview-text">
                <p>Cehennemin orduları Dünya'yı işgal etti. Boyutlar boyunca iblisleri fethetmek ve insanlığın son yıkımını durdurmak için destansı bir tek oyunculu senaryoda Slayer olun. Korktukları tek şey sensin.</p>
                <p>Birinci şahıs çatışmaların yaşandığı DOOM Eternal'da hız ve gücün en büyük kombinasyonunu yaşayın.</p>
              </div>
              
              <h2>DOOM Eternal ana özellikleri</h2>
              
              <div className="features">
                <div className="feature-item">
                  <h3>Slayer tehdidinin seviyesi en yüksekte</h3>
                  <p>Omuzuna monte edilmiş alev makinesi, bileğe monte bıçak, yükseltilmiş silahlar, modlar ve yeteneklerle donanmış bir şekilde, her zamankinden daha hızlı, daha güçlü ve çok yönlüsünüz.</p>
                </div>
                
                <div className="feature-item">
                  <h3>Şeytani üçleme</h3>
                  <p>Düşmanlarınızdan ihtiyacınız olanı alın: Öldürücü darbe karşılığında ekstra sağlık, zırh için yakma ve iblisleri testereyle keserek daha fazla cephane toplama özelliğiyle en büyük iblis avcısı olun.</p>
                </div>
                
                <div className="feature-item">
                  <h3>BATTLEMODE'a girin</h3>
                  <p>2'ye karşı 1 çok oyunculu yepyeni bir deneyim. Tepeden tırnağa silahlı bir DOOM Slayer, oyuncuların kontrolündeki iki iblisle karşı karşıya kalarak, heyecanlı bir birinci şahıs çatışmalarda en iyisi olmak için beş tur boyunca mücadele edecek.</p>
                </div>
              </div>
              
              <div className="gameplay-media">
                <div className="gameplay-video">
                  <video 
                    src="/src/assets/images/DOOM The Dark Ages   Official Trailer 1 (4K)   Coming 2025.mp4" 
                    controls 
                    poster="/images/doom-gameplay.jpg"
                    className="embedded-video"
                    width="100%"
                    preload="metadata"
                  >
                    Tarayıcınız video etiketini desteklemiyor.
                  </video>
                </div>
                
                <div className="screenshots">
                  <h3>Ekran Görüntüleri</h3>
                  <div className="screenshot-grid">
                    <img src="/src/assets/images/ekran ss/1.webp" alt="Screenshot 1" />
                    <img src="/src/assets/images/ekran ss/2.webp" alt="Screenshot 2" />
                    <img src="/src/assets/images/ekran ss/3.webp" alt="Screenshot 3" />
                    <img src="/src/assets/images/ekran ss/4.webp" alt="Screenshot 4" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Editions Section */}
        {activeTab === 'editions' && (
          <section className="editions-section">
            <h2>Sürümler:</h2>
            
            <div className="editions-grid">
              <div className="edition-card">
                <img src="/images/standard-edition.jpg" alt="Standard Edition" />
                <h3>Standard Edition</h3>
                <ul>
                  <li>DOOM Eternal (BattleMode) PS4™ & PS5™</li>
                  <li>DOOM Eternal Single Player Campaign</li>
                </ul>
                <button className="btn-buy">Satın Al</button>
              </div>
              
              <div className="edition-card">
                <img src="/images/ps5-upgrade.jpg" alt="PS5 Upgrade" />
                <h3>PS5 Upgrade</h3>
                <button className="btn-more-info">Daha Fazla Bilgi Edinin</button>
              </div>
              
              <div className="edition-card">
                <img src="/images/doom-anthology.jpg" alt="DOOM Anthology" />
                <h3>DOOM Anthology</h3>
                <ul>
                  <li>DOOM + DOOM II</li>
                  <li>DOOM 3</li>
                  <li>DOOM 64</li>
                  <li>DOOM (2016)</li>
                  <li>DOOM Eternal (Deluxe Edition)</li>
                </ul>
                <button className="btn-buy">Satın Al</button>
              </div>
              
              <div className="edition-card">
                <img src="/images/deluxe-edition.jpg" alt="Deluxe Edition" />
                <h3>Deluxe Edition</h3>
                <ul>
                  <li>DOOM Eternal (BattleMode) PS4 & PS5</li>
                  <li>DOOM Eternal Single Player Campaign</li>
                  <li>Ancient Gods Part One Campaign</li>
                  <li>Ancient Gods Part Two Campaign</li>
                  <li>Demonic Slayer Skin</li>
                  <li>Classic Weapon Sound Pack</li>
                </ul>
                <button className="btn-buy">Satın Al</button>
              </div>
            </div>
          </section>
        )}

        {/* Horde Mode Section */}
        {activeTab === 'horde' && (
          <section className="horde-section">
            <div className="horde-content">
              <h2>Horde Modu geldi</h2>
              <p>Artık mevcut olan Güncelleme 6.66, Horde Modu ve yükseltilmiş BATTLEMODE 2.0 çok oyunculu dahil olmak üzere ödüllü ve aksiyon dolu DOOM Eternal'a tüm oyunculara ücretsiz olarak çok sayıda yeni içerik, iyileştirme ve düzeltme getiriyor.</p>
              
              <div className="horde-features">
                <div className="horde-feature">
                  <h3>Horde Modu</h3>
                  <p>Göreviniz basit: Yepyeni, arcade tarzı Horde Modu denemelerinde ustalaşın. Tüm avantajlar, rünler ve yükseltmelerle başlayarak, ancak yalnızca usta bir Combat Shotgun ile silahlanarak, iblis dalgalarını yenerek, ek silahların kilidini açın ve meydan okumalarla dolu üç seviye boyunca savaşın.</p>
                  <p>Tüm karşılaşmaları ve bulmacaları tamamlayarak, DOOM II Slayer ve Biker Slayer dahil olmak üzere, 7'den fazla yeni görünümün kilidini açın!</p>
                </div>
                
                <div className="horde-feature">
                  <h3>BATTLEMODE 2.0</h3>
                  <p>BATTLEMODE'un rekabetçi güncellemesine hoş geldiniz! Bu yükseltme, yeni ödüller ve eşleştirme, liderlik tabloları, yeni Arena 'Stronghold' ve yeni Dread Knight oynanabilir iblis ile yepyeni bir seri tabanlı Sıralama Sistemi getiriyor.</p>
                  <p>Geliştirilmiş gecikme süresi ve isabet kaydı, çok sayıda denge değişikliği ve üç yeni harita dahil olmak üzere bir yıldan fazla süren güncellemeler ve yamalar ile DOOM Eternal'ın benzersiz, 2'ye karşı 1 çok oyunculu modunu deneyimlemek için bundan daha iyi bir zaman olmamıştı.</p>
                </div>
                
                <div className="horde-feature">
                  <h3>Yepyeni iki Master Seviye</h3>
                  <p>Mars Core ve World Spear Master Seviyelerinde yeteneklerinizi nihai teste tabi tutun! Yepyeni bir savaş deneyimi getiren ve dünyaya yalnızca en büyük Slayer'lara layık olan bu meydan okumalarda ustalaştığını gösteren karışık iblis karşılaşmalarına girin.</p>
                  <p>*World Spear Master Level, The Ancient Gods - Part Two'ya sahip olmayı gerektirir.</p>
                </div>
              </div>
              
              <div className="horde-screenshots">
                <h3>Son ekran görüntüleri</h3>
                <div className="screenshot-grid">
                  <img src="/src/assets/images/hard mode/1.webp" alt="Horde Mode Screenshot 1" />
                  <img src="/src/assets/images/hard mode/2.webp" alt="Horde Mode Screenshot 2" />
                  <img src="/src/assets/images/hard mode/3.webp" alt="Horde Mode Screenshot 3" />
                  <img src="/src/assets/images/hard mode/4.webp" alt="Horde Mode Screenshot 4" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* DLC Section */}
        {activeTab === 'dlc' && (
          <section className="dlc-section">
            <h2>Eklentiler</h2>
            <div className="dlc-grid">
              <div className="dlc-card">
                <img src="/images/ancient-gods-1.jpg" alt="Ancient Gods Part One" />
                <h3>Ancient Gods Part One</h3>
                <ul>
                  <li>DOOM Eternal (BattleMode) PS4™ & PS5™</li>
                  <li>The Ancient Gods Part One Add On</li>
                  <li>Maykr Skin</li>
                </ul>
                <button className="btn-buy">Satın Al</button>
              </div>
              
              <div className="dlc-card">
                <img src="/images/ancient-gods-2.jpg" alt="Ancient Gods Part Two" />
                <h3>Ancient Gods Part Two</h3>
                <ul>
                  <li>DOOM Eternal (BattleMode) PS4™ & PS5™</li>
                  <li>The Ancient Gods Part Two Campaign</li>
                  <li>Barbarian Slayer Skin</li>
                </ul>
                <button className="btn-buy">Satın Al</button>
              </div>
              
              <div className="dlc-card">
                <img src="/images/year-one-pass.jpg" alt="Year One Pass" />
                <h3>Year One Pass</h3>
                <ul>
                  <li>DOOM Eternal (BattleMode) PS4™ & PS5™</li>
                  <li>The Ancient Gods Part One Campaign</li>
                  <li>The Ancient Gods Part Two Campaign</li>
                </ul>
                <button className="btn-buy">Satın Al</button>
              </div>
            </div>
          </section>
        )}

        {/* Ancient Gods Section */}
        {activeTab === 'ancient-gods' && (
          <section className="ancient-gods-section">
            <div className="ancient-gods-content">
              <h2>DOOM Eternal: The Ancient Gods</h2>
              <div className="ancient-gods-description">
                <p>DOOM Eternal'ın hikâyesi, The Ancient Gods iki bölümlük hikâye DLC'si ile devam ediyor. Slayer olarak, dengeyi geri getirmek ve uzun süredir devam eden savaşı sonlandırmak için yeni boyutlara seyahat edin.</p>
              </div>
              
              <div className="ancient-gods-parts">
                <div className="ancient-gods-part">
                  <h3>Part One</h3>
                  <img src="/images/ancient-gods-1-full.jpg" alt="Ancient Gods Part One" />
                  <p>Cehennem'in yenilgisinden ve İkon'un yok edilmesinden sonra, dengeleri geri getirmek için yeni bir görev başlar. Boyutlar arasında seyahat ederek, Maykr'ın Seraphim'i bulun ve yeni bir tehdit oluşturan karanlık Lord'u durdurun.</p>
                  <button className="btn-buy">Satın Al</button>
                </div>
                
                <div className="ancient-gods-part">
                  <h3>Part Two</h3>
                  <img src="/images/ancient-gods-2-full.jpg" alt="Ancient Gods Part Two" />
                  <p>Karanlık Lord'un yükselişini durdurmak için son savaşa hazırlanın. Cehennem ordularını komuta eden Karanlık Lord'a karşı destansı bir savaşta, Slayer olarak insanlığın kaderini belirleyin.</p>
                  <button className="btn-buy">Satın Al</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/images/playstation-logo-white.png" alt="PlayStation Logo" />
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Destek</h4>
              <ul>
                <li><a href="#">Destek</a></li>
                <li><a href="#">SSS</a></li>
                <li><a href="#">Garanti</a></li>
                <li><a href="#">Manuals</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Yasal</h4>
              <ul>
                <li><a href="#">Kullanım Şartları</a></li>
                <li><a href="#">Gizlilik Politikası</a></li>
                <li><a href="#">Çerezler</a></li>
                <li><a href="#">Yasal Bilgiler</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Sosyal Medya</h4>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Hakkında</h4>
              <ul>
                <li><a href="#">Şirket</a></li>
                <li><a href="#">Kariyer</a></li>
                <li><a href="#">Basın</a></li>
                <li><a href="#">İletişim</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p> 2025 Sony Interactive Entertainment Inc. DOOM Eternal, id Software, Bethesda ve ilgili logolar Bethesda Softworks LLC'nin tescilli ticari markalarıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
