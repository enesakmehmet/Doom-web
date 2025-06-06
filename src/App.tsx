import { useState, useRef, useEffect, useMemo } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider, useCart } from './contexts/CartContext'
import LoginModal from './components/auth/LoginModal'
import RegisterModal from './components/auth/RegisterModal'
import UserProfile from './components/auth/UserProfile'
import CartIndicator from './components/cart/CartIndicator'
import CartModal from './components/cart/CartModal'
import Oyunlar from './pages/Oyunlar'
import Donanim from './pages/Donanim'
import Hizmetler from './pages/Hizmetler'
import Haberler from './pages/Haberler'
import Magaza from './pages/Magaza'
import Destek from './pages/Destek'

interface DLC {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  badge?: string;
  longDescription: string;
  features: string[];
  releaseDate: string;
}

import SecretDoomButton from './components/SecretDoomButton';
import DoomEasterEgg from './components/DoomEasterEgg';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDlc, setSelectedDlc] = useState<number | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [currentResolution, setCurrentResolution] = useState('720p');
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  
  const { isAuthenticated } = useAuth();
  const { isCartOpen, toggleCart, addItem } = useCart();

  // Available resolutions for the video
  const resolutions = [
    { label: '480p', value: '480p' },
    { label: '720p', value: '720p' },
    { label: '1080p', value: '1080p' }
  ];

  // Videos data with useMemo to prevent unnecessary re-renders
  const videos = useMemo(() => [
    {
      src: "/src/assets/images/DOOM The Dark Ages   Official Trailer 1 (4K)   Coming 2025.mp4",
      title: "DOOM The Dark Ages - Official Trailer"
    },
    {
      src: "/src/assets/images/Doom Eternal _ Phobos Gameplay Trailer _ PS4.mp4",
      title: "DOOM Eternal Gameplay Trailer"
    }
  ], []);

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

  // Update video source when currentVideoIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideoIndex].src;
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
    if (secondVideoRef.current) {
      secondVideoRef.current.src = videos[currentVideoIndex].src;
      secondVideoRef.current.load();
      secondVideoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  }, [currentVideoIndex, videos]);

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

  // DLC data
  const dlcPackages: DLC[] = [
    {
      id: 1,
      title: "The Ancient Gods - Part 1",
      description: "DOOM Slayer'ın yolculuğu devam ediyor. Cehennem'in ordularını yendikten sonra yeni bir mücadele başlar.",
      image: "/src/assets/images/hard mode/2.webp",
      price: "299 TL",
      badge: "Çıktı",
      longDescription: "The Ancient Gods - Part 1, DOOM Eternal'ın ilk büyük hikaye genişletmesi olarak Slayer'ın maceralarına devam ediyor. Cehennemin Dünya'yı işgal etmesine son verdikten sonra, daha büyük bir tehdit ortaya çıkar. Yeni bölgeler keşfedilmeyi bekliyor, yeni silahlar ve yetenekler onları bekliyor ve daha tehlikeli düşmanlar ile yüzleşmek zorunda kalacak.",
      features: [
        "3 Yeni Bölge",
        "Yeni Silahlar ve Yetenekler",
        "Zorlayıcı Yeni Düşmanlar",
        "Genişletilmiş Hikaye"
      ],
      releaseDate: "20 Ekim 2020"
    },
    {
      id: 2,
      title: "The Ancient Gods - Part 2",
      description: "Destansı hikayenin son bölümü. İnsanlık ve evrenin kaderi için son savaşı ver.",
      image: "/src/assets/images/hard mode/3.webp",
      price: "299 TL",
      badge: "Çıktı",
      longDescription: "The Ancient Gods - Part 2, DOOM Eternal'ın destansı hikayesini muhteşem bir finalle sonlandırıyor. Slayer, insanlığın ve tüm boyutların kaderini belirleyecek nihai savaşa giriyor. Yeni bölgeler, daha güçlü silahlar ve daha zorlu düşmanlar bu genişletmede sizi bekliyor.",
      features: [
        "3 Yeni Bölge",
        "Yeni Silah: Sentinel Hammer",
        "Yeni Düşman Tipleri",
        "Epik Final"
      ],
      releaseDate: "18 Mart 2021"
    },
    {
      id: 3,
      title: "Kozmetik Paketi",
      description: "Yeni zırhlar, silah görünümleri ve oyuncu simgeleri ile DOOM Slayer'ını özelleştir.",
      image: "/src/assets/images/hard mode/4.webp",
      price: "149 TL",
      badge: "Çıktı",
      longDescription: "DOOM Eternal Kozmetik Paketi, oyuncuların Slayer'ını kişiselleştirmesine olanak tanıyan çeşitli görünümler sunuyor. Yeni zırh setleri, silah kaplamaları, profil simgeleri ve daha fazlası bu pakette yer alıyor.",
      features: [
        "5 Yeni Zırh Seti",
        "10 Silah Kaplaması",
        "20 Profil Simgesi",
        "15 Nameplates"
      ],
      releaseDate: "5 Haziran 2020"
    },
    {
      id: 4,
      title: "Yeni İçerik Paketi",
      description: "Yakında gelecek yeni içerik paketi ile DOOM evreninde yeni maceralar yaşa.",
      image: "/src/assets/images/ekran ss/4.webp",
      price: "TBA",
      badge: "Yakında",
      longDescription: "DOOM Eternal için gelecek olan yeni içerik paketi, oyuna tamamen yeni bir macera ve hikaye ekleyecek. Yeni bölgeler, silahlar ve düşmanlar ile DOOM evrenindeki maceranıza devam edeceksiniz.",
      features: [
        "Yeni Hikaye İçeriği",
        "Yeni Silahlar",
        "Yeni Düşmanlar",
        "Yeni Bölgeler"
      ],
      releaseDate: "2024"
    }
  ];

  // Open DLC details modal
  const openDlcModal = (id: number) => {
    setSelectedDlc(id);
  };

  // Close DLC details modal
  const closeDlcModal = () => {
    setSelectedDlc(null);
  };

  // Yeni özellikler verisi ekliyorum
  const featureDetails = [
    {
      id: 1,
      title: "Geliştirilmiş Dövüş Sistemi",
      image: "/src/assets/images/DOOM Eternal ana özellikleri/1.webp",
      shortDescription: "Yeni silahlar, yetenekler ve düşman zayıf noktalarını kullanan stratejik dövüş sistemi ile Slayer'ın gücünü keşfedin.",
      longDescription: "DOOM Eternal'ın geliştirilmiş dövüş sistemi, oyuncuların cehennem ordularına karşı daha stratejik ve heyecan verici bir şekilde savaşmasına olanak tanır. Yeni silahlar, modifikasyonlar ve yetenekler eklenmiştir. Glory Kill sistemi genişletilmiş olup, düşman zayıf noktalarına göre özel infaz animasyonları içerir.",
      features: [
        "Yükseltilmiş silah modifikasyonları",
        "Geliştirilmiş Glory Kill sistemi",
        "Yeni hareket mekanikleri",
        "Zırh, sağlık ve cephane toplama stratejileri"
      ]
    },
    {
      id: 2,
      title: "Yeni Düşmanlar",
      image: "/src/assets/images/DOOM Eternal ana özellikleri/2.webp",
      shortDescription: "Cehennemin yeni ve klasik iblis ordusuyla yüzleşin. Her biri kendi özel yetenekleri ve zayıf noktalarına sahip.",
      longDescription: "DOOM Eternal'da karşılaşacağınız iblis ordusu, hem klasik DOOM düşmanlarını hem de tamamen yeni yaratıkları içerir. Her düşman türü, kendine özgü saldırı kalıpları ve zayıflıklarıyla oynanışta stratejik derinlik sağlar. Marauder, Doom Hunter ve Gladyator gibi yeni boss düşmanlar zorlu bir mücadele sunar.",
      features: [
        "12+ yeni düşman türü",
        "Gelişmiş düşman yapay zekası",
        "Çeşitli zayıf noktalar ve stratejiler",
        "Epik boss savaşları"
      ]
    },
    {
      id: 3,
      title: "Çok Boyutlu Dünyalar",
      image: "/src/assets/images/DOOM Eternal ana özellikleri/3.webp",
      shortDescription: "Yıkılmış dünyalardan antik tapınaklara, boyutlar arası yolculuğunuzda birbirinden farklı ortamlarda savaşın.",
      longDescription: "DOOM Eternal oyuncuları cehennemin derinliklerinden, işgal edilmiş Dünya şehirlerine ve kadim Sentinel dünyasına kadar çeşitli lokasyonlara götürür. Her bölüm benzersiz görsel stilini ve çevre tasarımını sergiler, platform bulmacaları ve gizli alanlarla keşif yapmayı teşvik eder.",
      features: [
        "8+ benzersiz gezegen ve boyut",
        "Detaylı çevre tasarımları",
        "Hikaye odaklı keşif",
        "Gizli bölgeler ve koleksiyonlar"
      ]
    },
    {
      id: 4,
      title: "Horde Modu",
      image: "/src/assets/images/hard mode/1.webp",
      shortDescription: "Kendini tekrar tekrar cehennem dalgalarına karşı test et ve en yüksek skoru elde etmek için savaş.",
      longDescription: "Horde Modu, oyuncuların sonsuz cehennem dalgalarına karşı hayatta kalma becerilerini test etmelerini sağlar. Her dalga giderek zorlaşır ve oyuncular çeşitli ödüller ve güçlendirmeler kazanabilir. Çeşitli arenalar ve zorluk seviyeleri ile yüksek tekrar oynanabilirlik sunar.",
      features: [
        "Sonsuz düşman dalgaları",
        "Yüksek skor tabloları",
        "Özel güçlendirmeler ve ödüller",
        "Çoklu arena seçeneği"
      ]
    }
  ];

  // Seçili özellik için state
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  // Open Feature details modal
  const openFeatureModal = (id: number) => {
    setSelectedFeature(id);
  };

  // Close Feature details modal
  const closeFeatureModal = () => {
    setSelectedFeature(null);
  };

  // Open Login Modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  // Open Register Modal
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  // Close Auth Modals
  const closeAuthModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Handle adding game to cart
  const handleAddGameToCart = () => {
    addItem({
      id: 1,
      title: "DOOM Eternal",
      price: 499,
      image: "/src/assets/images/ekran ss/1.webp",
      type: "game"
    });
    
    // Show feedback
    alert("DOOM Eternal sepete eklendi!");
  };

  // Handle adding DLC to cart
  const handleAddDlcToCart = (dlc: DLC) => {
    addItem({
      id: dlc.id,
      title: dlc.title,
      price: parseInt(dlc.price) || 299, // Default to 299 if parsing fails
      image: dlc.image,
      type: "dlc"
    });
    
    // Show feedback
    alert(`${dlc.title} sepete eklendi!`);
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
                <li><Link to="/oyunlar">Oyunlar</Link></li>
                <li><Link to="/donanim">Donanım</Link></li>
                <li><Link to="/hizmetler">Hizmetler</Link></li>
                <li><Link to="/haberler">Haberler</Link></li>
                <li><Link to="/magaza">Mağaza</Link></li>
                <li><Link to="/destek">Destek</Link></li>
              </ul>
            </nav>
            <div className="header-actions">
              <CartIndicator />
              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <button className="btn-sign-in" onClick={openLoginModal}>Oturum Aç</button>
              )}
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
              <button className="btn-primary" onClick={handleAddGameToCart}>Şimdi Satın Al</button>
              <button className="btn-secondary">Daha Fazla Bilgi</button>
            </div>
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
                      src={videos[currentVideoIndex].src}
                    >
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
                  {featureDetails.map((feature) => (
                    <div className="feature-card" key={feature.id} onClick={() => openFeatureModal(feature.id)}>
                      <img src={feature.image} alt={feature.title} />
                      <h3>{feature.title}</h3>
                      <p>{feature.shortDescription}</p>
                    </div>
                  ))}
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
                      src={videos[currentVideoIndex].src}
                    >
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
                  {dlcPackages.map((dlc) => (
                    <div className="dlc-card" key={dlc.id} onClick={() => openDlcModal(dlc.id)}>
                      <div className="dlc-image">
                        <img src={dlc.image} alt={dlc.title} />
                        <div className={`dlc-badge ${dlc.badge === 'Yakında' ? 'coming-soon' : ''}`}>{dlc.badge}</div>
                      </div>
                      <div className="dlc-info">
                        <h3>{dlc.title}</h3>
                        <p>{dlc.description}</p>
                        <div className="dlc-price">{dlc.price}</div>
                        <button 
                          className="dlc-buy-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening modal
                            if (dlc.badge !== 'Yakında') {
                              handleAddDlcToCart(dlc);
                            }
                          }}
                          disabled={dlc.badge === 'Yakında'}
                        >
                          {dlc.badge === 'Yakında' ? 'Yakında' : 'Sepete Ekle'}
                        </button>
                      </div>
                    </div>
                  ))}
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

        {/* Gizli Doom Butonu */}
        <SecretDoomButton />
        {/* Doom Easter Egg Cheat Input */}
        <DoomEasterEgg />
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
                &copy; 2023 Sony Interactive Entertainment LLC. All rights reserved.
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

        {/* DLC Modal */}
        {selectedDlc && (
          <div className="dlc-modal-overlay" onClick={closeDlcModal}>
            <div className="dlc-modal" onClick={(e) => e.stopPropagation()}>
              <button className="dlc-modal-close" onClick={closeDlcModal}>×</button>
              
              {dlcPackages.filter(dlc => dlc.id === selectedDlc).map(dlc => (
                <div key={dlc.id} className="dlc-modal-content">
                  <div className="dlc-modal-image">
                    <img src={dlc.image} alt={dlc.title} />
                    {dlc.badge && (
                      <div className={`dlc-modal-badge ${dlc.badge === 'Yakında' ? 'special' : ''}`}>
                        {dlc.badge}
                      </div>
                    )}
                  </div>
                  
                  <div className="dlc-modal-details">
                    <h2 className="dlc-modal-title">{dlc.title}</h2>
                    <p className="dlc-modal-description">{dlc.longDescription}</p>
                    
                    <div className="dlc-modal-features">
                      <h3>Özellikler</h3>
                      <ul>
                        {dlc.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="dlc-modal-info">
                      <div className="dlc-modal-release">
                        <span>Çıkış Tarihi:</span> {dlc.releaseDate}
                      </div>
                      <div className="dlc-modal-price">
                        <span>Fiyat:</span> {dlc.price}
                      </div>
                    </div>
                    
                    <button 
                      className="dlc-modal-buy" 
                      disabled={dlc.badge === 'Yakında'}
                      onClick={() => {
                        handleAddDlcToCart(dlc);
                        closeDlcModal();
                      }}
                    >
                      {dlc.badge === 'Yakında' ? 'Yakında' : 'Sepete Ekle'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Modal */}
        {selectedFeature !== null && (
          <div className="modal-overlay" onClick={closeFeatureModal}>
            <div className="feature-modal" onClick={(e) => e.stopPropagation()}>
              {featureDetails.filter(feature => feature.id === selectedFeature).map((feature) => (
                <div key={feature.id} className="feature-modal-inner">
                  <div className="feature-modal-header">
                    <h2>{feature.title}</h2>
                    <button className="modal-close-btn" onClick={closeFeatureModal}>×</button>
                  </div>
                  <div className="feature-modal-body">
                    <div className="feature-modal-image">
                      <img src={feature.image} alt={feature.title} />
                    </div>
                    <div className="feature-modal-info">
                      <div className="feature-modal-description">
                        <p>{feature.longDescription}</p>
                      </div>
                      <div className="feature-modal-details">
                        <h3>Özellikler</h3>
                        <ul>
                          {feature.features.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="feature-modal-footer">
                    <button className="feature-modal-back" onClick={closeFeatureModal}>Kapat</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Auth Modals */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeAuthModals} 
          onSwitchToRegister={openRegisterModal} 
        />
        
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={closeAuthModals} 
          onSwitchToLogin={openLoginModal} 
        />
        
        {/* Cart Modal */}
        {isCartOpen && <CartModal onClose={toggleCart} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/oyunlar" element={<Oyunlar />} />
          <Route path="/donanim" element={<Donanim />} />
          <Route path="/hizmetler" element={<Hizmetler />} />
          <Route path="/haberler" element={<Haberler />} />
          <Route path="/magaza" element={<Magaza />} />
          <Route path="/destek" element={<Destek />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App