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