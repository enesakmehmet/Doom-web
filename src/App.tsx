import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="doom-app" style={{ 
      backgroundImage: "url('/src/assets/images/ekran ss/1.webp')", 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      <div className="overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 0
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="logo">
              <img 
                src="/src/assets/images/images.jpeg" 
                alt="PlayStation Logo" 
                className="ps-logo" 
                style={{
                  width: '120px',
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '20px'
                }}
              />
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
                    <h3>Gelişmiş Silah Sistemi</h3>
                    <p>Yeni silahlar, modifikasyonlar ve yükseltmelerle donatılmış bir cephaneliğe sahip olun. Super Shotgun'a monte edilmiş Meat Hook ile düşmanlarınıza doğru hızla ilerleyin, Ballista ile güçlü enerji mızrakları fırlatın ve Crucible kılıcı ile iblisleri tek hamlede ikiye bölün.</p>
                    <div className="feature-image-placeholder">
                      {<img src='/src/assets/images/DOOM Eternal ana özellikleri/1.webp'></img>}
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <h3>Çevresel Yıkım ve Keşif</h3>
                    <p>Tamamen yıkılabilir iblisler ve çevreler ile daha önce hiç olmadığı kadar tatmin edici bir savaş deneyimi yaşayın. Yeni tırmanma yetenekleri, çift dash ve gelişmiş havada manevra kabiliyeti ile daha önce ulaşılamayan alanlara erişin ve gizli ödülleri keşfedin.</p>
                    <div className="feature-image-placeholder">
                      {<img src='/src/assets/images/DOOM Eternal ana özellikleri/2.webp'></img>}
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <h3>Cehennem Ordusu Genişliyor</h3>
                    <p>Marauder, Doom Hunter ve Gladyator gibi yeni ve zorlu düşmanlarla karşılaşın. Her biri benzersiz saldırı desenleri ve zayıf noktalarıyla, savaş stratejinizi sürekli değiştirmenizi ve her karşılaşmaya uyum sağlamanızı gerektirecek. Cehennemin en tehlikeli yaratıklarını alt etmek için tüm yeteneklerinizi kullanın.</p>
                    <div className="feature-image-placeholder">
                      {<img src='/src/assets/images/DOOM Eternal ana özellikleri/3.webp'></img>}
                    </div>
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
                      <img 
                        src="/src/assets/images/ekran ss/1.webp" 
                        alt="Screenshot 1" 
                        onClick={() => openImageModal("/src/assets/images/ekran ss/1.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                      <img 
                        src="/src/assets/images/ekran ss/2.webp" 
                        alt="Screenshot 2" 
                        onClick={() => openImageModal("/src/assets/images/ekran ss/2.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                      <img 
                        src="/src/assets/images/ekran ss/3.webp" 
                        alt="Screenshot 3" 
                        onClick={() => openImageModal("/src/assets/images/ekran ss/3.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                      <img 
                        src="/src/assets/images/ekran ss/4.webp" 
                        alt="Screenshot 4" 
                        onClick={() => openImageModal("/src/assets/images/ekran ss/4.webp")}
                        style={{ cursor: 'pointer' }}
                      />
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
                <h2>Horde Modu</h2>
                <p>DOOM Eternal'ın Horde Modu, oyuncuların sonsuz dalgalar halinde gelen iblislerle savaştığı zorlu bir hayatta kalma deneyimidir. Puanınızı en üst düzeye çıkarmak için kombolar yapın, çarpanları koruyun ve ölümcül silahlarınızı kullanın.</p>
                
                <div className="horde-features">
                  <div className="horde-feature">
                    <h3>Üç Benzersiz Harita</h3>
                    <p>Cehennem, Mars ve Dünya'nın kalıntıları arasında savaşın. Her harita, kendi benzersiz düşman dalgaları ve zorlukları ile gelir.</p>
                    <div className="horde-image">
                      <img 
                        src="/src/assets/images/hard mode/1.webp" 
                        alt="Horde Map 1" 
                        onClick={() => openImageModal("/src/assets/images/hard mode/1.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  
                  <div className="horde-feature">
                    <h3>Puan Sistemi</h3>
                    <p>Doğru silahları kullanarak, zayıf noktaları hedef alarak ve hızlı öldürmeler gerçekleştirerek puanınızı artırın. Liderlik tablolarında en yüksek skoru elde etmek için arkadaşlarınızla rekabet edin.</p>
                    <div className="horde-image">
                      <img 
                        src="/src/assets/images/hard mode/2.webp" 
                        alt="Horde Map 2" 
                        onClick={() => openImageModal("/src/assets/images/hard mode/2.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  
                  <div className="horde-feature">
                    <h3>Boss Dalgaları</h3>
                    <p>Her birkaç dalgada bir, zorlu bir patron düşmanla karşılaşacaksınız. Bu patronları yenmek için stratejinizi ayarlayın ve tüm silah ve yeteneklerinizi kullanın.</p>
                    <div className="horde-image">
                      <img 
                        src="/src/assets/images/hard mode/3.webp" 
                        alt="Horde Map 3" 
                        onClick={() => openImageModal("/src/assets/images/hard mode/3.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  
                  <div className="horde-feature">
                    <h3>Ödüller ve Kozmetikler</h3>
                    <p>Horde Modu'nda belirli zorlukları tamamlayarak özel silah kaplamaları, oyuncu rozetleri ve daha fazlasını açın.</p>
                    <div className="horde-image">
                      <img 
                        src="/src/assets/images/hard mode/4.webp" 
                        alt="Horde Map 4" 
                        onClick={() => openImageModal("/src/assets/images/hard mode/4.webp")}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* DLC Section */}
          {activeTab === 'dlc' && (
            <section className="dlc-section">
              <h2>Eklentiler</h2>
              <p>DOOM Eternal deneyiminizi genişletin ve yeni içeriklerle oyunu keşfetmeye devam edin.</p>
              
              <div className="dlc-cards">
                <div className="dlc-card">
                  <h3>Year One Pass</h3>
                  <p>The Ancient Gods Part One ve Part Two genişletme paketlerini içerir.</p>
                  <button className="btn-buy">Satın Al</button>
                </div>
                
                <div className="dlc-card">
                  <h3>Rip & Tear Pack</h3>
                  <p>DOOT Revenant oyuncu görünümü, Cultist Base Master seviyesi ve klasik silah sesleri paketi.</p>
                  <button className="btn-buy">Satın Al</button>
                </div>
                
                <div className="dlc-card">
                  <h3>Cosmetic Packs</h3>
                  <p>Çeşitli kozmetik paketleri ile Slayer'ınızı özelleştirin.</p>
                  <button className="btn-buy">Satın Al</button>
                </div>
              </div>
            </section>
          )}

          {/* Ancient Gods Section */}
          {activeTab === 'ancient-gods' && (
            <section className="ancient-gods-section">
              <h2>The Ancient Gods</h2>
              <p>DOOM Eternal'ın epik hikayesini genişleten iki bölümlük DLC serisi.</p>
              
              <div className="ancient-gods-content">
                <div className="ancient-gods-part">
                  <h3>Part One: Yeni Tehdit</h3>
                  <p>İnsanlığı kurtardıktan sonra, Slayer yeni bir görevle karşı karşıya: dengeyi korumak için Maykr'ın yerini alacak bir varlık bulmak. Cehennemin derinliklerine inin ve yeni düşmanlarla savaşın.</p>
                </div>
                
                <div className="ancient-gods-part">
                  <h3>Part Two: Son Savaş</h3>
                  <p>Slayer'ın destansı yolculuğunun sonuna tanık olun. Dark Lord ile nihai karşılaşma için hazırlanın ve kaderinizi mühürleyin.</p>
                </div>
                
                <div className="ancient-gods-features">
                  <div className="ag-feature">
                    <h4>Yeni Silahlar ve Yetenekler</h4>
                    <p>The Ancient Gods, cephaneliğinize yeni eklemeler ve Slayer'ın yeteneklerine yeni yükseltmeler sunar.</p>
                  </div>
                  
                  <div className="ag-feature">
                    <h4>Yeni Ortamlar</h4>
                    <p>Daha önce görülmemiş cehennem boyutlarını ve antik tanrıların krallıklarını keşfedin.</p>
                  </div>
                  
                  <div className="ag-feature">
                    <h4>Zorlu Düşmanlar</h4>
                    <p>Yeni düşman türleri ve daha zorlu patron savaşlarıyla karşılaşın.</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img 
                src="/src/assets/images/images.jpeg" 
                alt="PlayStation Logo" 
                style={{
                  width: '150px',
                  height: 'auto',
                  marginBottom: '20px'
                }}
              />
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Hakkında</h4>
                <ul>
                  <li><a href="#">Şirket Bilgisi</a></li>
                  <li><a href="#">Kariyer</a></li>
                  <li><a href="#">Basın Merkezi</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Ürünler</h4>
                <ul>
                  <li><a href="#">PS5</a></li>
                  <li><a href="#">PS4</a></li>
                  <li><a href="#">PS VR2</a></li>
                  <li><a href="#">PS Plus</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Destek</h4>
                <ul>
                  <li><a href="#">Yardım</a></li>
                  <li><a href="#">SSS</a></li>
                  <li><a href="#">İletişim</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-social">
              <h4>Bizi Takip Edin</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">Facebook</a>
                <a href="#" className="social-icon">Twitter</a>
                <a href="#" className="social-icon">Instagram</a>
                <a href="#" className="social-icon">YouTube</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Sony Interactive Entertainment Inc. DOOM ETERNAL, id Software ve Bethesda Softworks LLC'nin tescilli markalarıdır.</p>
          </div>
        </footer>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
            />
            <button 
              onClick={closeImageModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
