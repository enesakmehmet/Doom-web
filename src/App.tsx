import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [currentResolution, setCurrentResolution] = useState('720p');
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  // Available resolutions for the video
  const resolutions = [
    { label: '480p', value: '480p' },
    { label: '720p', value: '720p' },
    { label: '1080p', value: '1080p' }
  ];

  // Videos data
  const videos = [
    {
      src: "/src/assets/images/DOOM The Dark Ages   Official Trailer 1 (4K)   Coming 2025.mp4",
      title: "DOOM The Dark Ages - Official Trailer"
    },
    {
      src: "/src/assets/images/Doom Eternal _ Phobos Gameplay Trailer _ PS4.mp4",
      title: "DOOM Eternal Gameplay Trailer"
    }
  ];

  // All images that can be displayed in the modal
  const allImages = [
    // Screenshot images
    { src: "/src/assets/images/ekran ss/1.webp", alt: "Screenshot 1", category: "screenshots" },
    { src: "/src/assets/images/ekran ss/2.webp", alt: "Screenshot 2", category: "screenshots" },
    { src: "/src/assets/images/ekran ss/3.webp", alt: "Screenshot 3", category: "screenshots" },
    { src: "/src/assets/images/ekran ss/4.webp", alt: "Screenshot 4", category: "screenshots" },
    // Feature images
    { src: "/src/assets/images/DOOM Eternal ana özellikleri/1.webp", alt: "Feature 1", category: "features" },
    { src: "/src/assets/images/DOOM Eternal ana özellikleri/2.webp", alt: "Feature 2", category: "features" },
    { src: "/src/assets/images/DOOM Eternal ana özellikleri/3.webp", alt: "Feature 3", category: "features" },
    // Horde mode images
    { src: "/src/assets/images/hard mode/1.webp", alt: "Horde Mode 1", category: "horde" },
    { src: "/src/assets/images/hard mode/2.webp", alt: "Horde Mode 2", category: "horde" },
    { src: "/src/assets/images/hard mode/3.webp", alt: "Horde Mode 3", category: "horde" },
    { src: "/src/assets/images/hard mode/4.webp", alt: "Horde Mode 4", category: "horde" }
  ];

  // Screenshots data (subset of allImages)
  const screenshots = allImages.filter(img => img.category === "screenshots");

  // Get visible screenshots
  const getVisibleScreenshots = () => {
    return screenshots;
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (secondVideoRef.current) {
      secondVideoRef.current.volume = newVolume;
    }
  };

  // Handle resolution change
  const handleResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentResolution(e.target.value);
    console.log(`Resolution changed to: ${e.target.value}`);
  };

  // Set initial volume when video loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
    if (secondVideoRef.current) {
      secondVideoRef.current.volume = volume;
    }
  }, [volume]);

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setModalImageIndex(index);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Navigate to next image in modal
  const nextModalImage = () => {
    setModalImageIndex(prevIndex => (prevIndex + 1) % allImages.length);
    setSelectedImage(allImages[(modalImageIndex + 1) % allImages.length].src);
  };

  // Navigate to previous image in modal
  const prevModalImage = () => {
    setModalImageIndex(prevIndex =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
    setSelectedImage(allImages[
      modalImageIndex === 0 ? allImages.length - 1 : modalImageIndex - 1
    ].src);
  };

  // Handle next video
  const handleNextVideo = () => {
    setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
  };

  // Handle previous video
  const handlePrevVideo = () => {
    setCurrentVideoIndex(prevIndex =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="doom-app">
      <div className="overlay"></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="logo">
              <img
                src="/src/assets/images/images.jpeg"
                alt="PlayStation Logo"
                className="ps-logo"
                style={{ width: '80px', height: 'auto' }}
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
            <div className="hero-logo-container">
              <div className="doom-logo-container">
                <div className="doom-logo-bg">
                  <svg viewBox="0 0 300 50" className="doom-logo-svg">
                    <defs>
                      <linearGradient id="doom-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff3000" />
                        <stop offset="50%" stopColor="#ffcc00" />
                        <stop offset="100%" stopColor="#ff3000" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <text 
                      x="50%" 
                      y="70%" 
                      dominantBaseline="middle" 
                      textAnchor="middle" 
                      fill="url(#doom-gradient)" 
                      stroke="#750000" 
                      strokeWidth="1.5" 
                      filter="url(#glow)"
                      className="doom-logo-text">
                      DOOM
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="glitch-text">DOOM ETERNAL</h1>
            <h2>DOOM Slayer'ın başlangıç hikâyesini ve yıkımın yaşandığı zorlu görevini keşfedin.</h2>
            <div className="hero-rating">
              <div className="rating-stars">★★★★★</div>
              <div className="rating-text">5/5 - "Yılın En İyi FPS Oyunu" - Game Critics</div>
            </div>
            <div className="hero-badges">
              <span className="badge">4K UHD</span>
              <span className="badge">HDR</span>
              <span className="badge">60 FPS</span>
              <span className="badge">PS5 Optimize</span>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary">Şimdi Satın Al</button>
              <button className="btn-secondary">Daha Fazla Bilgi</button>
            </div>
          </div>
          <div className="hero-scroll-indicator">
            <div className="scroll-arrow"></div>
            <div className="scroll-text">Aşağı Kaydır</div>
          </div>
        </section>

        {/* Game Info Tabs */}
        <div className="game-tabs">
          <div className="tabs-container-wrapper">
            <div className="tabs-container">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Genel Bakış
              </button>
              <button
                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Özellikler
              </button>
              <button
                className={`tab-btn ${activeTab === 'screenshots' ? 'active' : ''}`}
                onClick={() => setActiveTab('screenshots')}
              >
                Ekran Görüntüleri
              </button>
              <button
                className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                Videolar
              </button>
              <button
                className={`tab-btn ${activeTab === 'dlc' ? 'active' : ''}`}
                onClick={() => setActiveTab('dlc')}
              >
                DLC Paketleri
              </button>
              <button
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                İncelemeler
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content fade-in">
                <div className="game-info-grid">
                  <div className="game-info-text">
                    <h2 className="section-title">Cehennemle Yüzleş</h2>
                    <p className="game-description">
                      İnsanlığın kaderi senin ellerinde. Efsanevi DOOM Slayer olarak cehennem ordularına karşı savaş ve 
                      boyutlar arasında yolculuk ederek dünyayı kurtarmak için destansı bir maceraya atıl.
                    </p>
                    <ul className="feature-list">
                      <li><span className="feature-icon">⚔️</span> Geliştirilmiş silah sistemi ve yeni yetenekler</li>
                      <li><span className="feature-icon">🌍</span> Birbirinden farklı gezegenlerde savaş</li>
                      <li><span className="feature-icon">👹</span> İkonik ve yeni düşmanlarla karşılaş</li>
                      <li><span className="feature-icon">🔄</span> Çok oyunculu modlar ve horde modu</li>
                    </ul>
                    <div className="game-specs">
                      <div className="spec-item">
                        <span className="spec-label">Geliştirici:</span>
                        <span className="spec-value">id Software</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Yayıncı:</span>
                        <span className="spec-value">Bethesda Softworks</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Çıkış Tarihi:</span>
                        <span className="spec-value">20 Mart 2020</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Platformlar:</span>
                        <span className="spec-value">PS5, PS4, Xbox Series X|S, Xbox One, PC</span>
                      </div>
                    </div>
                  </div>
                  <div className="game-info-video">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="info-video"
                      controls
                    >
                      <source src={videos[currentVideoIndex].src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-controls">
                      <button className="video-nav-btn" onClick={handlePrevVideo}>
                        <span>&#9664;</span>
                      </button>
                      <div className="video-info">
                        <div className="video-title">{videos[currentVideoIndex].title}</div>
                        <div className="video-progress">
                          <span className="current-video">{currentVideoIndex + 1}</span>
                          <span className="separator">/</span>
                          <span className="total-videos">{videos.length}</span>
                        </div>
                      </div>
                      <button className="video-nav-btn" onClick={handleNextVideo}>
                        <span>&#9654;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'screenshots' && (
              <div className="screenshots-content fade-in">
                <h2 className="section-title">Ekran Görüntüleri</h2>
                <div className="screenshot-grid">
                  {getVisibleScreenshots().map((screenshot, index) => (
                    <div 
                      key={index} 
                      className="screenshot-item"
                      onClick={() => openImageModal(screenshot.src)}
                    >
                      <img src={screenshot.src} alt={screenshot.alt} />
                      <div className="screenshot-overlay">
                        <div className="screenshot-zoom-icon">+</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="features-content fade-in">
                <h2 className="section-title">Özellikler</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <img src="/src/assets/images/DOOM Eternal ana özellikleri/1.webp" alt="Geliştirilmiş Dövüş Sistemi" />
                    <h3>Geliştirilmiş Dövüş Sistemi</h3>
                    <p>Yeni silahlar, yetenekler ve düşman zayıf noktalarını kullanan stratejik dövüş sistemi ile Slayer'ın gücünü keşfedin.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/src/assets/images/DOOM Eternal ana özellikleri/2.webp" alt="Yeni Düşmanlar" />
                    <h3>Yeni Düşmanlar</h3>
                    <p>Cehennemin yeni ve klasik iblis ordusuyla yüzleşin. Her biri kendi özel yetenekleri ve zayıf noktalarına sahip.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/src/assets/images/DOOM Eternal ana özellikleri/3.webp" alt="Çok Boyutlu Dünyalar" />
                    <h3>Çok Boyutlu Dünyalar</h3>
                    <p>Yıkılmış dünyalardan antik tapınaklara, boyutlar arası yolculuğunuzda birbirinden farklı ortamlarda savaşın.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/src/assets/images/hard mode/1.webp" alt="Hardcore Mod" />
                    <h3>Horde Modu</h3>
                    <p>Kendini tekrar tekrar cehennem dalgalarına karşı test et ve en yüksek skoru elde etmek için savaş.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="videos-content fade-in">
                <h2 className="section-title">Videolar</h2>
                <div className="video-gallery">
                  <div className="main-video">
                    <video 
                      ref={secondVideoRef}
                      controls 
                      className="featured-video"
                    >
                      <source src={videos[currentVideoIndex].src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <h3>{videos[currentVideoIndex].title}</h3>
                  </div>
                  
                  <div className="video-thumbnails">
                    {videos.map((video, index) => (
                      <div 
                        key={index} 
                        className={`video-thumbnail ${index === currentVideoIndex ? 'active' : ''}`}
                        onClick={() => setCurrentVideoIndex(index)}
                      >
                        <div className="thumbnail-overlay">
                          <span className="play-icon">▶</span>
                        </div>
                        <div className="thumbnail-title">{video.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="video-controls-panel">
                  <div className="resolution-selector">
                    <label htmlFor="resolution">Çözünürlük:</label>
                    <select 
                      id="resolution" 
                      value={currentResolution}
                      onChange={handleResolutionChange}
                    >
                      {resolutions.map((res) => (
                        <option key={res.value} value={res.value}>
                          {res.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="volume-control">
                    <label htmlFor="volume">Ses:</label>
                    <input 
                      type="range" 
                      id="volume" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dlc' && (
              <div className="dlc-content fade-in">
                <h2 className="section-title">DLC Paketleri</h2>
                <div className="dlc-grid">
                  <div className="dlc-card">
                    <div className="dlc-image">
                      <img src="/src/assets/images/hard mode/2.webp" alt="The Ancient Gods - Part 1" />
                      <div className="dlc-badge">Çıktı</div>
                    </div>
                    <div className="dlc-info">
                      <h3>The Ancient Gods - Part 1</h3>
                      <p>DOOM Slayer'ın yolculuğu devam ediyor. Cehennem'in ordularını yendikten sonra yeni bir mücadele başlar.</p>
                      <div className="dlc-price">299 TL</div>
                      <button className="dlc-buy-btn">Satın Al</button>
                    </div>
                  </div>
                  
                  <div className="dlc-card">
                    <div className="dlc-image">
                      <img src="/src/assets/images/hard mode/3.webp" alt="The Ancient Gods - Part 2" />
                      <div className="dlc-badge">Çıktı</div>
                    </div>
                    <div className="dlc-info">
                      <h3>The Ancient Gods - Part 2</h3>
                      <p>Destansı hikayenin son bölümü. İnsanlık ve evrenin kaderi için son savaşı ver.</p>
                      <div className="dlc-price">299 TL</div>
                      <button className="dlc-buy-btn">Satın Al</button>
                    </div>
                  </div>
                  
                  <div className="dlc-card">
                    <div className="dlc-image">
                      <img src="/src/assets/images/hard mode/4.webp" alt="Cosmetic Pack" />
                      <div className="dlc-badge">Çıktı</div>
                    </div>
                    <div className="dlc-info">
                      <h3>Kozmetik Paketi</h3>
                      <p>Yeni zırhlar, silah görünümleri ve oyuncu simgeleri ile DOOM Slayer'ını özelleştir.</p>
                      <div className="dlc-price">149 TL</div>
                      <button className="dlc-buy-btn">Satın Al</button>
                    </div>
                  </div>
                  
                  <div className="dlc-card coming-soon">
                    <div className="dlc-image">
                      <img src="/src/assets/images/ekran ss/4.webp" alt="New DLC Coming Soon" />
                      <div className="dlc-badge">Yakında</div>
                    </div>
                    <div className="dlc-info">
                      <h3>Yeni İçerik Paketi</h3>
                      <p>Yakında gelecek yeni içerik paketi ile DOOM evreninde yeni maceralar yaşa.</p>
                      <div className="dlc-price">TBA</div>
                      <button className="dlc-buy-btn" disabled>Ön Sipariş</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content fade-in">
                <h2 className="section-title">İncelemeler</h2>
                
                {/* Eleştirmen Puanları */}
                <div className="critics-container">
                  <div className="critic-score-card main-score">
                    <div className="score-circle-large">
                      <span className="score-number">9.2</span>
                      <span className="score-max">/10</span>
                    </div>
                    <div className="main-score-details">
                      <h3>Mükemmel</h3>
                      <p>90+ eleştirmen değerlendirmesi</p>
                      <div className="score-bar-container">
                        <div className="score-bar-label">Oynanış</div>
                        <div className="score-bar-background">
                          <div className="score-bar-fill" style={{width: '95%'}}></div>
                        </div>
                      </div>
                      <div className="score-bar-container">
                        <div className="score-bar-label">Grafik</div>
                        <div className="score-bar-background">
                          <div className="score-bar-fill" style={{width: '90%'}}></div>
                        </div>
                      </div>
                      <div className="score-bar-container">
                        <div className="score-bar-label">Ses</div>
                        <div className="score-bar-background">
                          <div className="score-bar-fill" style={{width: '98%'}}></div>
                        </div>
                      </div>
                      <div className="score-bar-container">
                        <div className="score-bar-label">Hikaye</div>
                        <div className="score-bar-background">
                          <div className="score-bar-fill" style={{width: '85%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="critic-scores-grid">
                    <div className="critic-score-card">
                      <div className="critic-logo">
                        <img src="/src/assets/images/hard mode/4.webp" alt="IGN Logo" />
                      </div>
                      <div className="critic-score">
                        <span>9.5</span>
                        <span className="critic-score-max">/10</span>
                      </div>
                      <div className="critic-quote">"DOOM Eternal, FPS dünyasının yeni standardı."</div>
                    </div>
                    
                    <div className="critic-score-card">
                      <div className="critic-logo">
                        <img src="/src/assets/images/hard mode/3.webp" alt="GameSpot Logo" />
                      </div>
                      <div className="critic-score">
                        <span>9.0</span>
                        <span className="critic-score-max">/10</span>
                      </div>
                      <div className="critic-quote">"Heyecan verici aksiyon ve derinlikli oynanış."</div>
                    </div>
                    
                    <div className="critic-score-card">
                      <div className="critic-logo">
                        <img src="/src/assets/images/hard mode/2.webp" alt="PC Gamer Logo" />
                      </div>
                      <div className="critic-score">
                        <span>9.4</span>
                        <span className="critic-score-max">/10</span>
                      </div>
                      <div className="critic-quote">"Bu yılın en iyi FPS deneyimi."</div>
                    </div>
                    
                    <div className="critic-score-card">
                      <div className="critic-logo">
                        <img src="/src/assets/images/hard mode/1.webp" alt="Destructoid Logo" />
                      </div>
                      <div className="critic-score">
                        <span>9.0</span>
                        <span className="critic-score-max">/10</span>
                      </div>
                      <div className="critic-quote">"Cehennemle yüzleşmek hiç bu kadar eğlenceli olmamıştı."</div>
                    </div>
                  </div>
                </div>
                
                {/* Ödüller Vitrini */}
                <div className="awards-showcase">
                  <h3 className="awards-title">Ödüller ve Takdir</h3>
                  <div className="awards-container">
                    <div className="award-item">
                      <div className="award-badge">
                        <span className="award-icon">🏆</span>
                      </div>
                      <div className="award-details">
                        <h4>2020 Yılın Oyunu Adayı</h4>
                        <p>The Game Awards</p>
                      </div>
                    </div>
                    
                    <div className="award-item">
                      <div className="award-badge">
                        <span className="award-icon">🎮</span>
                      </div>
                      <div className="award-details">
                        <h4>En İyi Aksiyon Oyunu</h4>
                        <p>Golden Joystick Awards</p>
                      </div>
                    </div>
                    
                    <div className="award-item">
                      <div className="award-badge">
                        <span className="award-icon">🔊</span>
                      </div>
                      <div className="award-details">
                        <h4>En İyi Ses Tasarımı</h4>
                        <p>DICE Awards</p>
                      </div>
                    </div>
                    
                    <div className="award-item">
                      <div className="award-badge">
                        <span className="award-icon">🔥</span>
                      </div>
                      <div className="award-details">
                        <h4>En İyi Oyun Direktörü</h4>
                        <p>BAFTA Game Awards</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Kullanıcı İncelemeleri */}
                <div className="user-reviews-section">
                  <div className="user-reviews-header">
                    <h3>Kullanıcı İncelemeleri</h3>
                    <div className="user-rating-summary">
                      <div className="user-rating-overall">
                        <span className="user-rating-number">4.8</span>
                        <div className="user-rating-stars">★★★★★</div>
                        <span className="user-rating-count">10.845 İnceleme</span>
                      </div>
                      
                      <div className="user-rating-distribution">
                        <div className="rating-bar">
                          <span className="rating-label">5 ★</span>
                          <div className="rating-bar-bg">
                            <div className="rating-bar-fill" style={{width: '85%'}}></div>
                          </div>
                          <span className="rating-percent">85%</span>
                        </div>
                        
                        <div className="rating-bar">
                          <span className="rating-label">4 ★</span>
                          <div className="rating-bar-bg">
                            <div className="rating-bar-fill" style={{width: '10%'}}></div>
                          </div>
                          <span className="rating-percent">10%</span>
                        </div>
                        
                        <div className="rating-bar">
                          <span className="rating-label">3 ★</span>
                          <div className="rating-bar-bg">
                            <div className="rating-bar-fill" style={{width: '3%'}}></div>
                          </div>
                          <span className="rating-percent">3%</span>
                        </div>
                        
                        <div className="rating-bar">
                          <span className="rating-label">2 ★</span>
                          <div className="rating-bar-bg">
                            <div className="rating-bar-fill" style={{width: '1%'}}></div>
                          </div>
                          <span className="rating-percent">1%</span>
                        </div>
                        
                        <div className="rating-bar">
                          <span className="rating-label">1 ★</span>
                          <div className="rating-bar-bg">
                            <div className="rating-bar-fill" style={{width: '1%'}}></div>
                          </div>
                          <span className="rating-percent">1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="filter-sort-options">
                    <div className="review-sort">
                      <label>Sırala:</label>
                      <select className="sort-select">
                        <option value="recent">En Yeni</option>
                        <option value="helpful">En Yararlı</option>
                        <option value="high">En Yüksek Puan</option>
                        <option value="low">En Düşük Puan</option>
                      </select>
                    </div>
                    
                    <div className="review-filter">
                      <label>Filtrele:</label>
                      <div className="filter-buttons">
                        <button className="filter-btn active">Tümü</button>
                        <button className="filter-btn">PC</button>
                        <button className="filter-btn">PS5</button>
                        <button className="filter-btn">Xbox</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="user-reviews-list">
                    <div className="review-card featured">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">JS</div>
                          <div className="reviewer-details">
                            <div className="reviewer-name">JohnSlayer92</div>
                            <div className="review-details">
                              <span className="review-platform">PC</span>
                              <span className="review-date">12 Nisan 2023</span>
                              <span className="review-playtime">120+ saat</span>
                            </div>
                          </div>
                        </div>
                        <div className="review-rating">★★★★★</div>
                      </div>
                      
                      <div className="review-body">
                        <h4 className="review-title">Şimdiye Kadar Oynadığım En İyi DOOM Oyunu</h4>
                        <div className="review-text">
                          <p>Silah mekanikleri muhteşem, düşmanlar zorlayıcı ve müzik... Ah o müzik! Mick Gordon yine harikalar yaratmış. Cehennem ordularını parçalamak hiç bu kadar zevkli olmamıştı. Glory kill sistemi ve platforming elementleri oyuna ekstra bir derinlik katıyor.</p>
                        </div>
                        <div className="review-pros-cons">
                          <div className="review-pros">
                            <h5>Artılar</h5>
                            <ul>
                              <li>Akıcı ve hızlı oynanış</li>
                              <li>Etkileyici müzikler</li>
                              <li>Çeşitli silahlar ve yükseltmeler</li>
                            </ul>
                          </div>
                          <div className="review-cons">
                            <h5>Eksiler</h5>
                            <ul>
                              <li>Bazen çok zorlayıcı olabiliyor</li>
                              <li>Kısa hikaye</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="review-footer">
                        <div className="review-helpful">
                          <span>Bu inceleme yardımcı oldu mu?</span>
                          <button className="helpful-btn">
                            <span className="thumb-icon">👍</span> Evet (243)
                          </button>
                          <button className="helpful-btn">
                            <span className="thumb-icon">👎</span> Hayır (18)
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">DG</div>
                          <div className="reviewer-details">
                            <div className="reviewer-name">DoomGirl</div>
                            <div className="review-details">
                              <span className="review-platform">PS5</span>
                              <span className="review-date">3 Mart 2023</span>
                              <span className="review-playtime">80+ saat</span>
                            </div>
                          </div>
                        </div>
                        <div className="review-rating">★★★★☆</div>
                      </div>
                      
                      <div className="review-body">
                        <h4 className="review-title">Zorlayıcı Ama Ödüllendirici</h4>
                        <div className="review-text">
                          <p>Harika bir oyun ama zorluk seviyesi bazen sinir bozucu olabiliyor. Yine de atmosfer, grafikler ve aksiyon muhteşem. Kesinlikle tavsiye ederim. PS5'in DualSense özellikleri oyuna ekstra bir boyut katıyor.</p>
                        </div>
                      </div>
                      
                      <div className="review-footer">
                        <div className="review-helpful">
                          <span>Bu inceleme yardımcı oldu mu?</span>
                          <button className="helpful-btn">
                            <span className="thumb-icon">👍</span> Evet (156)
                          </button>
                          <button className="helpful-btn">
                            <span className="thumb-icon">👎</span> Hayır (12)
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">MK</div>
                          <div className="reviewer-details">
                            <div className="reviewer-name">MetalKing</div>
                            <div className="review-details">
                              <span className="review-platform">Xbox</span>
                              <span className="review-date">17 Şubat 2023</span>
                              <span className="review-playtime">100+ saat</span>
                            </div>
                          </div>
                        </div>
                        <div className="review-rating">★★★★★</div>
                      </div>
                      
                      <div className="review-body">
                        <h4 className="review-title">Adrenalin Dolu Bir Macera</h4>
                        <div className="review-text">
                          <p>Bu oyun tamamen adrenalin! Her seviye bir öncekinden daha heyecanlı. DLC'ler de ana oyun kadar kaliteli. 100 saat oynadım ve hâlâ sıkılmadım. Multiplayer modu da son güncellemelerle çok daha iyi hale geldi.</p>
                        </div>
                      </div>
                      
                      <div className="review-footer">
                        <div className="review-helpful">
                          <span>Bu inceleme yardımcı oldu mu?</span>
                          <button className="helpful-btn">
                            <span className="thumb-icon">👍</span> Evet (89)
                          </button>
                          <button className="helpful-btn">
                            <span className="thumb-icon">👎</span> Hayır (7)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="reviews-actions">
                    <button className="load-more-btn">Daha Fazla İnceleme Yükle</button>
                    <button className="write-review-btn">İnceleme Yaz</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-top">
              <div className="footer-logo">
                <img
                  src="/src/assets/images/images.jpeg"
                  alt="PlayStation Logo"
                  className="footer-ps-logo"
                  style={{ width: '60px', height: 'auto' }}
                />
                <span className="footer-logo-text">PlayStation</span>
              </div>
              
              <div className="footer-social">
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-discord"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-main">
              <div className="footer-section">
                <h3 className="footer-heading">Hakkında</h3>
                <ul className="footer-links">
                  <li><a href="#">About PlayStation</a></li>
                  <li><a href="#">İş Ortaklıkları</a></li>
                  <li><a href="#">Kariyer</a></li>
                  <li><a href="#">Kurumsal Bilgiler</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-heading">Ürünler</h3>
                <ul className="footer-links">
                  <li><a href="#">PlayStation 5</a></li>
                  <li><a href="#">PlayStation 4</a></li>
                  <li><a href="#">PlayStation VR</a></li>
                  <li><a href="#">Aksesuarlar</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-heading">Destek</h3>
                <ul className="footer-links">
                  <li><a href="#">Destek Merkezi</a></li>
                  <li><a href="#">Kullanıcı Kılavuzları</a></li>
                  <li><a href="#">Yazılım Güncellemeleri</a></li>
                  <li><a href="#">İletişim</a></li>
                </ul>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-legal">
                <a href="#">Gizlilik Politikası</a>
                <a href="#">Kullanım Koşulları</a>
                <a href="#">Yasal Bilgiler</a>
                <a href="#">Çerezler</a>
              </div>
              <div className="footer-copyright">
                © 2023 Sony Interactive Entertainment LLC. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
        
        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal" onClick={closeImageModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={allImages[modalImageIndex].src} alt={allImages[modalImageIndex].alt} />
              <button className="modal-close-btn" onClick={closeImageModal}>×</button>
              <button className="modal-nav-btn prev-btn" onClick={prevModalImage}>&#9664;</button>
              <button className="modal-nav-btn next-btn" onClick={nextModalImage}>&#9654;</button>
              <div className="modal-counter">{modalImageIndex + 1} / {allImages.length}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 