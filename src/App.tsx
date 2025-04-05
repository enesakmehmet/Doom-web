import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5); // Default volume at 50%
  const [currentResolution, setCurrentResolution] = useState('720p'); // Default resolution
  const [modalImageIndex, setModalImageIndex] = useState(0); // Track current modal image index
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Track current video index
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
    // In a real implementation, you would change the video source based on resolution
    // For this example, we'll just log the change
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
    // Find the index of the clicked image in allImages
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
                  marginRight: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #003087 0%, #0070cc 100%)',
                  padding: '10px',
                  boxShadow: '0 0 15px rgba(0, 112, 204, 0.7)'
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
        <section className="hero-section" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/src/assets/images/ekran ss/2.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div className="hero-content">
            <h1 style={{
              textShadow: '0 0 20px rgba(230, 0, 18, 0.8), 0 0 30px rgba(230, 0, 18, 0.5)',
              fontWeight: 900,
              letterSpacing: '4px',
              fontSize: 'clamp(3rem, 10vw, 5rem)'
            }}>DOOM ETERNAL</h1>
            <h2>DOOM Slayer'ın başlangıç hikâyesini ve yıkımın yaşandığı zorlu görevini keşfedin.</h2>
            <div className="hero-buttons">
              <button className="btn-primary">Şimdi Satın Al</button>
              <button className="btn-secondary">Daha Fazla Bilgi</button>
            </div>
          </div>
          <div className="hero-scroll-indicator">
            <span className="scroll-arrow"></span>
            <span className="scroll-text">Aşağı Kaydır</span>
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
        <div className="content-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2rem',
        }}>
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <section className="overview-section">
              <div className="overview-content">
                <div className="overview-text" style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  marginBottom: '2.5rem',
                  maxWidth: '800px',
                  margin: '0 auto 3rem'
                }}>
                  <p style={{ marginBottom: '1.2rem' }}>Cehennemin orduları Dünya'yı işgal etti. Boyutlar boyunca iblisleri fethetmek ve insanlığın son yıkımını durdurmak için destansı bir tek oyunculu senaryoda Slayer olun. Korktukları tek şey sensin.</p>
                  <p>Birinci şahıs çatışmaların yaşandığı DOOM Eternal'da hız ve gücün en büyük kombinasyonunu yaşayın.</p>
                </div>

                <h2 style={{
                  fontSize: '2.2rem',
                  marginBottom: '2rem',
                  textAlign: 'center',
                  color: 'var(--primary-color)',
                  textShadow: '0 0 10px rgba(230, 0, 18, 0.4)'
                }}>DOOM Eternal Ana Özellikleri</h2>

                <div className="features" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2.5rem',
                  marginBottom: '4rem'
                }}>
                  <div className="feature-item" style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    overflow: 'hidden'
                  }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      marginBottom: '1.2rem',
                      color: 'var(--primary-color)',
                      borderBottom: '1px solid rgba(230, 0, 18, 0.3)',
                      paddingBottom: '0.7rem'
                    }}>Gelişmiş Silah Sistemi</h3>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>Yeni silahlar, modifikasyonlar ve yükseltmelerle donatılmış bir cephaneliğe sahip olun. Super Shotgun'a monte edilmiş Meat Hook ile düşmanlarınıza doğru hızla ilerleyin, Ballista ile güçlü enerji mızrakları fırlatın ve Crucible kılıcı ile iblisleri tek hamlede ikiye bölün.</p>
                    <div className="feature-image-placeholder" style={{
                      borderRadius: '6px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <img
                        src='/src/assets/images/DOOM Eternal ana özellikleri/1.webp'
                        alt="Gelişmiş Silah Sistemi"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          transform: 'scale(1)',
                          transition: 'transform 0.8s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => openImageModal('/src/assets/images/DOOM Eternal ana özellikleri/1.webp')}
                      />
                    </div>
                  </div>

                  <div className="feature-item" style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    overflow: 'hidden'
                  }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      marginBottom: '1.2rem',
                      color: 'var(--primary-color)',
                      borderBottom: '1px solid rgba(230, 0, 18, 0.3)',
                      paddingBottom: '0.7rem'
                    }}>Çevresel Yıkım ve Keşif</h3>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>Tamamen yıkılabilir iblisler ve çevreler ile daha önce hiç olmadığı kadar tatmin edici bir savaş deneyimi yaşayın. Yeni tırmanma yetenekleri, çift dash ve gelişmiş havada manevra kabiliyeti ile daha önce ulaşılamayan alanlara erişin ve gizli ödülleri keşfedin.</p>
                    <div className="feature-image-placeholder" style={{
                      borderRadius: '6px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <img
                        src='/src/assets/images/DOOM Eternal ana özellikleri/2.webp'
                        alt="Çevresel Yıkım ve Keşif"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          transform: 'scale(1)',
                          transition: 'transform 0.8s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => openImageModal('/src/assets/images/DOOM Eternal ana özellikleri/2.webp')}
                      />
                    </div>
                  </div>

                  <div className="feature-item" style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    overflow: 'hidden'
                  }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      marginBottom: '1.2rem',
                      color: 'var(--primary-color)',
                      borderBottom: '1px solid rgba(230, 0, 18, 0.3)',
                      paddingBottom: '0.7rem'
                    }}>Cehennem Ordusu Genişliyor</h3>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>Marauder, Doom Hunter ve Gladyator gibi yeni ve zorlu düşmanlarla karşılaşın. Her biri benzersiz saldırı desenleri ve zayıf noktalarıyla, savaş stratejinizi sürekli değiştirmenizi ve her karşılaşmaya uyum sağlamanızı gerektirecek. Cehennemin en tehlikeli yaratıklarını alt etmek için tüm yeteneklerinizi kullanın.</p>
                    <div className="feature-image-placeholder" style={{
                      borderRadius: '6px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <img
                        src='/src/assets/images/DOOM Eternal ana özellikleri/3.webp'
                        alt="Cehennem Ordusu Genişliyor"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          transform: 'scale(1)',
                          transition: 'transform 0.8s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => openImageModal('/src/assets/images/DOOM Eternal ana özellikleri/3.webp')}
                      />
                    </div>
                  </div>
                </div>

                <div className="gameplay-media" style={{
                  backgroundColor: 'rgba(15, 15, 15, 0.8)',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  margin: '2rem 0 4rem'
                }}>
                  <h3 style={{
                    fontSize: '1.8rem',
                    marginBottom: '1.5rem',
                    color: 'var(--primary-color)',
                    textAlign: 'center',
                    textShadow: '0 0 10px rgba(230, 0, 18, 0.3)'
                  }}>Oyun Videoları</h3>
                  <div className="video-carousel" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '1rem 0 2rem'
                  }}>
                    <button
                      className="nav-btn prev-btn"
                      onClick={handlePrevVideo}
                      aria-label="Önceki video"
                      style={{
                        backgroundColor: 'rgba(230, 0, 18, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 0 10px rgba(230, 0, 18, 0.5)'
                      }}
                    >
                      &lt;
                    </button>

                    <div className="gameplay-video" style={{
                      flex: 1,
                      maxWidth: '90%',
                      margin: '0 auto'
                    }}>
                      {currentVideoIndex === 0 && (
                        <div className="video-container">
                          <h4 style={{
                            marginBottom: '1rem',
                            fontSize: '1.2rem',
                            color: 'var(--primary-color)'
                          }}>{videos[0].title}</h4>
                          <video
                            ref={videoRef}
                            src={videos[0].src}
                            controls
                            poster="/src/assets/images/ekran ss/1.webp"
                            className="embedded-video"
                            width="100%"
                            preload="metadata"
                            style={{
                              borderRadius: '8px',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                              backgroundColor: '#000'
                            }}
                          >
                            Tarayıcınız video etiketini desteklemiyor.
                          </video>
                        </div>
                      )}

                      {currentVideoIndex === 1 && (
                        <div className="video-container">
                          <h4 style={{
                            marginBottom: '1rem',
                            fontSize: '1.2rem',
                            color: 'var(--primary-color)'
                          }}>{videos[1].title}</h4>
                          <video
                            ref={secondVideoRef}
                            src={videos[1].src}
                            controls
                            poster="/src/assets/images/ekran ss/3.webp"
                            className="embedded-video"
                            width="100%"
                            preload="metadata"
                            style={{
                              borderRadius: '8px',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                              backgroundColor: '#000'
                            }}
                          >
                            Tarayıcınız video etiketini desteklemiyor.
                          </video>
                        </div>
                      )}

                      <div className="video-controls-custom" style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: '15px',
                        borderRadius: '0 0 8px 8px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '15px',
                        marginTop: '-5px'
                      }}>
                        <div className="video-control-group" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <label htmlFor="volume-control" style={{
                            fontWeight: 600,
                            color: 'var(--light-text)',
                            minWidth: '90px',
                            fontFamily: 'Orbitron, sans-serif'
                          }}>Ses:</label>
                          <input
                            type="range"
                            id="volume-control"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volume-slider"
                          />
                          <span className="volume-value">{Math.round(volume * 100)}%</span>
                        </div>

                        <div className="video-control-group">
                          <label htmlFor="resolution-control">Çözünürlük:</label>
                          <select
                            id="resolution-control"
                            value={currentResolution}
                            onChange={handleResolutionChange}
                            className="resolution-select"
                          >
                            {resolutions.map((res) => (
                              <option key={res.value} value={res.value}>
                                {res.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      className="nav-btn next-btn"
                      onClick={handleNextVideo}
                      aria-label="Sonraki video"
                      style={{
                        backgroundColor: 'rgba(230, 0, 18, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 0 10px rgba(230, 0, 18, 0.5)'
                      }}
                    >
                      &gt;
                    </button>
                  </div>

                  <div className="video-indicators">
                    {videos.map((_, index) => (
                      <span
                        key={index}
                        className={`indicator ${index === currentVideoIndex ? 'active' : ''}`}
                        onClick={() => setCurrentVideoIndex(index)}
                      />
                    ))}
                  </div>

                  {/* Screenshots Section */}
                  <div className="screenshots-section">
                    <h3 className="screenshots-heading">Ekran Görüntüleri</h3>
                    <div className="screenshot-grid">
                      {screenshots.map((screenshot, index) => (
                        <div key={index} className="screenshot-item" onClick={() => openImageModal(screenshot.src)}>
                          <img
                            src={screenshot.src}
                            alt={screenshot.alt}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Editions Section */}
          {activeTab === 'editions' && (
            <section className="editions-section">
              <h2 style={{
                fontSize: '2.2rem',
                marginBottom: '2.5rem',
                textAlign: 'center',
                color: 'var(--primary-color)',
                textShadow: '0 0 10px rgba(230, 0, 18, 0.4)'
              }}>Sürümler</h2>

              <div className="editions-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                marginBottom: '3rem'
              }}>
                <div className="edition-card" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <div style={{
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h3 style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1.8rem',
                        textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
                      }}>Standard Edition</h3>
                    </div>
                    <img
                      src="/src/assets/images/ekran ss/1.webp"
                      alt="Standard Edition"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '1.5rem',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <ul style={{
                      marginBottom: '1.5rem',
                      flexGrow: 1
                    }}>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM Eternal (BattleMode) PS4™ & PS5™
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM Eternal Single Player Campaign
                      </li>
                    </ul>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--light-text)'
                      }}>₺499</span>
                      <button className="btn-primary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>Satın Al</button>
                    </div>
                  </div>
                </div>

                <div className="edition-card" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <div style={{
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h3 style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1.8rem',
                        textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
                      }}>PS5 Upgrade</h3>
                    </div>
                    <img
                      src="/src/assets/images/ekran ss/3.webp"
                      alt="PS5 Upgrade"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '1.5rem',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <p style={{
                      marginBottom: '1.5rem',
                      lineHeight: '1.6',
                      color: 'var(--gray-text)',
                      flexGrow: 1
                    }}>
                      DOOM Eternal'ın PS5 versiyonu ile 4K çözünürlük, 120 FPS performans, gelişmiş ses ve daha hızlı yükleme süreleri deneyimine sahip olun.
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--light-text)'
                      }}>ÜCRETSİZ</span>
                      <button className="btn-secondary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>Bilgi Al</button>
                    </div>
                  </div>
                </div>

                <div className="edition-card" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <div style={{
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h3 style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1.8rem',
                        textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
                      }}>DOOM Anthology</h3>
                    </div>
                    <img
                      src="/src/assets/images/hard mode/3.webp"
                      alt="DOOM Anthology"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '1.5rem',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <ul style={{
                      marginBottom: '1.5rem',
                      flexGrow: 1
                    }}>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM + DOOM II
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM 3
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM 64
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM (2016)
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM Eternal (Deluxe Edition)
                      </li>
                    </ul>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--light-text)'
                      }}>₺999</span>
                      <button className="btn-primary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>Satın Al</button>
                    </div>
                  </div>
                </div>

                <div className="edition-card" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                  }}>En İyi Değer</div>
                  <div style={{
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h3 style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1.8rem',
                        textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
                      }}>Deluxe Edition</h3>
                    </div>
                    <img
                      src="/src/assets/images/hard mode/2.webp"
                      alt="Deluxe Edition"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '1.5rem',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <ul style={{
                      marginBottom: '1.5rem',
                      flexGrow: 1
                    }}>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM Eternal (BattleMode) PS4 & PS5
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        DOOM Eternal Single Player Campaign
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        Ancient Gods Part One Campaign
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        Ancient Gods Part Two Campaign
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        Demonic Slayer Skin
                      </li>
                      <li style={{
                        marginBottom: '0.8rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary-color)',
                          fontWeight: 'bold'
                        }}>✓</span>
                        Classic Weapon Sound Pack
                      </li>
                    </ul>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: 'normal',
                          color: 'var(--gray-text)',
                          textDecoration: 'line-through',
                          marginRight: '8px'
                        }}>₺799</span>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: 'var(--primary-color)'
                        }}>₺649</span>
                      </div>
                      <button className="btn-primary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>Satın Al</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* DLC Section */}
          {activeTab === 'dlc' && (
            <section className="dlc-section">
              <h2 style={{
                fontSize: '2.2rem',
                marginBottom: '1rem',
                textAlign: 'center',
                color: 'var(--primary-color)',
                textShadow: '0 0 10px rgba(230, 0, 18, 0.4)'
              }}>Eklentiler</h2>
              <p style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 3rem',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: 'var(--gray-text)'
              }}>DOOM Eternal deneyiminizi genişletin ve yeni içeriklerle oyunu keşfetmeye devam edin.</p>

              <div className="dlc-cards" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                marginBottom: '4rem'
              }}>
                <div className="dlc-card" style={{
                  backgroundColor: 'rgba(25, 25, 30, 0.9)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(230, 0, 18, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="dlc-card-image" style={{
                    height: '200px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img
                      src="/src/assets/images/hard mode/1.webp"
                      alt="Year One Pass"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                    <div className="dlc-overlay" style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 2
                    }}>
                      <span className="dlc-badge" style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        padding: '5px 10px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        borderRadius: '4px',
                        letterSpacing: '1px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
                      }}>POPÜLER</span>
                    </div>
                  </div>

                  <div className="dlc-card-content" style={{
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      marginBottom: '1rem',
                      color: 'white',
                      fontFamily: 'Orbitron, sans-serif'
                    }}>Year One Pass</h3>

                    <p style={{
                      color: 'var(--gray-text)',
                      marginBottom: '1.5rem',
                      fontSize: '1rem',
                      lineHeight: '1.5'
                    }}>The Ancient Gods Part One ve Part Two genişletme paketlerini içerir.</p>

                    <div className="dlc-features" style={{
                      marginBottom: '1.5rem',
                      flexGrow: 1
                    }}>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>İki tam hikaye DLC'si</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Yeni silahlar ve yetenekler</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Yeni düşmanlar ve bölgeler</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--light-text)'
                      }}>₺299</span>
                      <button className="btn-primary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>SATIN AL</button>
                    </div>
                  </div>
                </div>

                <div className="dlc-card" style={{
                  backgroundColor: 'rgba(25, 25, 30, 0.9)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(230, 0, 18, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="dlc-card-image" style={{
                    height: '200px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img
                      src="/src/assets/images/hard mode/4.webp"
                      alt="Rip & Tear Pack"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>

                  <div className="dlc-card-content" style={{
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      marginBottom: '1rem',
                      color: 'white',
                      fontFamily: 'Orbitron, sans-serif'
                    }}>Rip & Tear Pack</h3>

                    <p style={{
                      color: 'var(--gray-text)',
                      marginBottom: '1.5rem',
                      fontSize: '1rem',
                      lineHeight: '1.5'
                    }}>DOOT Revenant oyuncu görünümü, Cultist Base Master seviyesi ve klasik silah sesleri paketi.</p>

                    <div className="dlc-features" style={{
                      marginBottom: '1.5rem',
                      flexGrow: 1
                    }}>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Özel oyuncu görünümü</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Bonus seviye</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Nostaljik silah sesleri</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--light-text)'
                      }}>₺149</span>
                      <button className="btn-primary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>SATIN AL</button>
                    </div>
                  </div>
                </div>

                <div className="dlc-card" style={{
                  backgroundColor: 'rgba(25, 25, 30, 0.9)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(230, 0, 18, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="dlc-card-image" style={{
                    height: '200px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img
                      src="/src/assets/images/DOOM Eternal ana özellikleri/3.webp"
                      alt="Cosmetic Packs"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>

                  <div className="dlc-card-content" style={{
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      marginBottom: '1rem',
                      color: 'white',
                      fontFamily: 'Orbitron, sans-serif'
                    }}>Cosmetic Packs</h3>

                    <p style={{
                      color: 'var(--gray-text)',
                      marginBottom: '1.5rem',
                      fontSize: '1rem',
                      lineHeight: '1.5'
                    }}>Çeşitli kozmetik paketleri ile Slayer'ınızı özelleştirin.</p>

                    <div className="dlc-features" style={{
                      marginBottom: '1.5rem',
                      flexGrow: 1
                    }}>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Zırh görünümleri</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Silah kaplamaları</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span>Oyuncu simgeleri</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--light-text)'
                      }}>₺99</span>
                      <button className="btn-primary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem'
                      }}>SATIN AL</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dlc-bundle" style={{
                margin: '3rem auto',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.9), rgba(25, 25, 30, 0.9))',
                border: '2px solid rgba(230, 0, 18, 0.5)',
                boxShadow: '0 0 30px rgba(230, 0, 18, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                maxWidth: '1000px'
              }}>
                <div className="dlc-bundle-content" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '2.5rem',
                  gap: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(45deg, transparent, rgba(230, 0, 18, 0.05))`,
                    zIndex: 0
                  }}></div>

                  <div className="dlc-bundle-info" style={{
                    flex: 2,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <h3 style={{
                      fontSize: '2.2rem',
                      marginBottom: '1rem',
                      color: 'var(--primary-color)',
                      textShadow: '0 0 10px rgba(230, 0, 18, 0.5)',
                      fontFamily: 'Orbitron, sans-serif'
                    }}>DOOM Eternal Deluxe Edition</h3>

                    <p style={{
                      fontSize: '1.2rem',
                      marginBottom: '1.5rem',
                      color: '#ddd',
                      maxWidth: '600px',
                      lineHeight: '1.6'
                    }}>Tüm içerikleri tek pakette alın ve %25 tasarruf edin!</p>

                    <div className="dlc-features" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginTop: '1.2rem'
                    }}>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span style={{ color: '#ccc' }}>Ana oyun</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span style={{ color: '#ccc' }}>Year One Pass</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span style={{ color: '#ccc' }}>Tüm kozmetik paketler</span>
                      </div>
                      <div className="dlc-feature" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0.8rem'
                      }}>
                        <span className="dlc-icon" style={{
                          color: 'var(--primary-color)',
                          fontWeight: 'bold',
                          marginRight: '10px',
                          fontSize: '1.1rem'
                        }}>✓</span>
                        <span style={{ color: '#ccc' }}>Dijital artbook</span>
                      </div>
                    </div>
                  </div>

                  <div className="dlc-bundle-action" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div className="dlc-price" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <span className="dlc-old-price" style={{
                        fontSize: '1.2rem',
                        textDecoration: 'line-through',
                        color: '#999',
                        marginBottom: '0.5rem'
                      }}>₺1299</span>
                      <span className="dlc-new-price" style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: 'var(--primary-color)',
                        textShadow: '0 0 10px rgba(230, 0, 18, 0.5)'
                      }}>₺974</span>
                    </div>
                    <button className="btn-primary" style={{
                      width: '100%',
                      padding: '1rem 2rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'var(--primary-color)',
                      boxShadow: '0 0 15px rgba(230, 0, 18, 0.6)'
                    }}>DELUXE EDITION SATIN AL</button>
                  </div>
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

          {/* Ancient Gods Section */}
          {activeTab === 'ancient-gods' && (
            <section className="ancient-gods-section">
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.9), rgba(40, 10, 10, 0.95))',
                borderRadius: '16px',
                padding: '3rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(230, 0, 18, 0.3)',
                border: '1px solid rgba(230, 0, 18, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(45deg, transparent, rgba(230, 0, 18, 0.05))`,
                  zIndex: 0
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--primary-color)',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textShadow: '0 0 15px rgba(230, 0, 18, 0.6)',
                    fontFamily: 'Orbitron, sans-serif',
                    letterSpacing: '2px'
                  }}>The Ancient Gods</h2>
                  
                  <p style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    fontSize: '1.2rem',
                    maxWidth: '800px',
                    margin: '0 auto 3rem',
                    color: '#ccc',
                    lineHeight: '1.8'
                  }}>
                    DOOM Eternal'ın iki bölümlük büyük hikaye genişletmesi, Slayer'ın görevinin son kısmını deneyimleyin. 
                    Yeni silahlar, düşmanlar ve destansı yeni bölgelerle cehennemin ordularına karşı savaşın.
                  </p>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '3rem'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(30, 30, 35, 0.8)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <img 
                          src="/src/assets/images/hard mode/1.webp" 
                          alt="Part One" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}>
                          <h3 style={{
                            color: 'white',
                            fontSize: '1.8rem',
                            textAlign: 'center',
                            textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)',
                            fontFamily: 'Orbitron, sans-serif',
                            marginBottom: '10px'
                          }}>Part One</h3>
                          <span style={{
                            backgroundColor: 'var(--primary-color)',
                            color: 'white', 
                            padding: '5px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>Çıktı</span>
                        </div>
                      </div>
                      
                      <div style={{
                        padding: '1.5rem',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <p style={{
                          marginBottom: '1.5rem',
                          color: '#ddd',
                          lineHeight: '1.6',
                          fontSize: '1rem'
                        }}>
                          Slayer olarak, İblis Tanrılarının boyunduruğu altında bozulmuş cennetler alemini özgürleştirin. 
                          Makyage'teki UAC Atlantica Tesisi'nden denizaltı DOOM ortamları, 
                          yıldıran düşman güçleri ve güçlü yeni yetenekler içeren heyecan verici yeni konumlara adım atın.
                        </p>
                        
                        <h4 style={{
                          fontSize: '1.3rem',
                          marginBottom: '1rem',
                          color: 'var(--primary-color)',
                          fontFamily: 'Orbitron, sans-serif'
                        }}>Öne Çıkan Özellikler</h4>
                        
                        <ul style={{
                          marginBottom: '1.5rem',
                          listStyle: 'none',
                          padding: 0
                        }}>
                          <li style={{
                            marginBottom: '0.8rem',
                            position: 'relative',
                            paddingLeft: '1.5rem'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--primary-color)',
                              fontWeight: 'bold'
                            }}>✓</span>
                            Yeni Bölgeler ve Ortamlar
                          </li>
                          <li style={{
                            marginBottom: '0.8rem',
                            position: 'relative',
                            paddingLeft: '1.5rem'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--primary-color)',
                              fontWeight: 'bold'
                            }}>✓</span>
                            Zorlu Yeni Düşmanlar
                          </li>
                          <li style={{
                            marginBottom: '0.8rem',
                            position: 'relative',
                            paddingLeft: '1.5rem'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--primary-color)',
                              fontWeight: 'bold'
                            }}>✓</span>
                            Genişletilmiş Hikaye
                          </li>
                        </ul>
                        
                        <div style={{
                          marginTop: 'auto',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'var(--light-text)'
                          }}>₺199</span>
                          <button className="btn-primary" style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem'
                          }}>SATIN AL</button>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      backgroundColor: 'rgba(30, 30, 35, 0.8)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <img 
                          src="/src/assets/images/hard mode/2.webp" 
                          alt="Part Two" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}>
                          <h3 style={{
                            color: 'white',
                            fontSize: '1.8rem',
                            textAlign: 'center',
                            textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)',
                            fontFamily: 'Orbitron, sans-serif',
                            marginBottom: '10px'
                          }}>Part Two</h3>
                          <span style={{
                            backgroundColor: 'var(--primary-color)',
                            color: 'white', 
                            padding: '5px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>Çıktı</span>
                        </div>
                      </div>
                      
                      <div style={{
                        padding: '1.5rem',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <p style={{
                          marginBottom: '1.5rem',
                          color: '#ddd',
                          lineHeight: '1.6',
                          fontSize: '1rem'
                        }}>
                          Karanlığın ordularını mağlup etmek, dünyaları kurtarmak ve tarihin en büyük savaşında 
                          iblis aleyhine dengeyi geri getirmek için destansı bir göreve çıkın. 
                          Uyanışın denizlerinden Dünyaevine kadar yer alan DOOM Eternal hikaye finali.
                        </p>
                        
                        <h4 style={{
                          fontSize: '1.3rem',
                          marginBottom: '1rem',
                          color: 'var(--primary-color)',
                          fontFamily: 'Orbitron, sans-serif'
                        }}>Öne Çıkan Özellikler</h4>
                        
                        <ul style={{
                          marginBottom: '1.5rem',
                          listStyle: 'none',
                          padding: 0
                        }}>
                          <li style={{
                            marginBottom: '0.8rem',
                            position: 'relative',
                            paddingLeft: '1.5rem'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--primary-color)',
                              fontWeight: 'bold'
                            }}>✓</span>
                            Epic Boss Savaşları
                          </li>
                          <li style={{
                            marginBottom: '0.8rem',
                            position: 'relative',
                            paddingLeft: '1.5rem'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--primary-color)',
                              fontWeight: 'bold'
                            }}>✓</span>
                            Sentinel Çekici Silahı
                          </li>
                          <li style={{
                            marginBottom: '0.8rem',
                            position: 'relative',
                            paddingLeft: '1.5rem'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--primary-color)',
                              fontWeight: 'bold'
                            }}>✓</span>
                            Muhteşem Final
                          </li>
                        </ul>
                        
                        <div style={{
                          marginTop: 'auto',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'var(--light-text)'
                          }}>₺199</span>
                          <button className="btn-primary" style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem'
                          }}>SATIN AL</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'rgba(40, 10, 10, 0.4)',
                    borderRadius: '12px',
                    padding: '2rem',
                    marginTop: '3rem',
                    border: '1px solid rgba(230, 0, 18, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `linear-gradient(45deg, transparent, rgba(230, 0, 18, 0.1))`,
                      zIndex: 0
                    }}></div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h3 style={{
                        fontSize: '1.8rem',
                        marginBottom: '1.5rem',
                        color: 'var(--primary-color)',
                        textAlign: 'center',
                        fontFamily: 'Orbitron, sans-serif'
                      }}>The Ancient Gods - Year One Pass</h3>
                      
                      <p style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        color: '#ddd',
                        maxWidth: '800px',
                        margin: '0 auto 2rem'
                      }}>
                        Part One ve Part Two'yu içeren tam paket. %15 indirimle iki bölümü birden satın alın.
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '1rem'
                          }}>
                            <span style={{
                              fontSize: '1.2rem',
                              fontWeight: 'normal',
                              color: '#999',
                              textDecoration: 'line-through'
                            }}>₺398</span>
                            <span style={{
                              fontSize: '2rem',
                              fontWeight: 'bold',
                              color: 'var(--primary-color)',
                              textShadow: '0 0 10px rgba(230, 0, 18, 0.5)'
                            }}>₺339</span>
                          </div>
                          <span style={{
                            backgroundColor: 'rgba(230, 0, 18, 0.2)',
                            color: '#fff',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                          }}>%15 İndirim</span>
                        </div>
                        
                        <button className="btn-primary" style={{
                          padding: '1rem 2rem',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          boxShadow: '0 0 15px rgba(230, 0, 18, 0.6)'
                        }}>PAKETI SATIN AL</button>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    marginTop: '4rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      marginBottom: '2rem',
                      color: 'var(--primary-color)',
                      textAlign: 'center',
                      fontFamily: 'Orbitron, sans-serif'
                    }}>Görüntüler</h3>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {allImages.filter(img => img.category === "horde").map((image, index) => (
                        <div key={index} style={{
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                          transition: 'all 0.3s ease'
                        }} onClick={() => openImageModal(image.src)}>
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="footer" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '3rem 0 1rem',
          marginTop: '3rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="footer-content" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '0 2rem'
          }}>
            <div className="footer-logo" style={{
              flex: '0 0 100%',
              marginBottom: '2.5rem',
              textAlign: 'center'
            }}>
              <img
                src="/src/assets/images/images.jpeg"
                alt="PlayStation Logo"
                style={{
                  width: '120px',
                  height: 'auto',
                  marginBottom: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #003087 0%, #0070cc 100%)',
                  padding: '12px',
                  boxShadow: '0 0 20px rgba(0, 112, 204, 0.6)'
                }}
              />
            </div>
            <div className="footer-links" style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '2rem'
            }}>
              <div className="footer-column" style={{
                flex: '1',
                minWidth: '200px',
                marginBottom: '1.5rem',
                padding: '0 1rem'
              }}>
                <h4 style={{
                  color: 'var(--primary-color)',
                  marginBottom: '1.2rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  position: 'relative',
                  paddingBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Hakkında
                    <span style={{
                      content: '""',
                      position: 'absolute',
                      left: '0',
                      bottom: '-10px',
                      width: '40px',
                      height: '3px',
                      backgroundColor: 'var(--primary-color)',
                      borderRadius: '3px'
                    }}></span>
                  </span>
                </h4>
                <ul style={{ marginLeft: '5px' }}>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>Şirket Bilgisi</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>Kariyer</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>Basın Merkezi</a></li>
                </ul>
              </div>
              <div className="footer-column" style={{
                flex: '1',
                minWidth: '200px',
                marginBottom: '1.5rem',
                padding: '0 1rem'
              }}>
                <h4 style={{
                  color: 'var(--primary-color)',
                  marginBottom: '1.2rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  position: 'relative',
                  paddingBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Ürünler
                    <span style={{
                      content: '""',
                      position: 'absolute',
                      left: '0',
                      bottom: '-10px',
                      width: '40px',
                      height: '3px',
                      backgroundColor: 'var(--primary-color)',
                      borderRadius: '3px'
                    }}></span>
                  </span>
                </h4>
                <ul style={{ marginLeft: '5px' }}>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>PS5</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>PS4</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>PS VR2</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>PS Plus</a></li>
                </ul>
              </div>
              <div className="footer-column" style={{
                flex: '1',
                minWidth: '200px',
                marginBottom: '1.5rem',
                padding: '0 1rem'
              }}>
                <h4 style={{
                  color: 'var(--primary-color)',
                  marginBottom: '1.2rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  position: 'relative',
                  paddingBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Destek
                    <span style={{
                      content: '""',
                      position: 'absolute',
                      left: '0',
                      bottom: '-10px',
                      width: '40px',
                      height: '3px',
                      backgroundColor: 'var(--primary-color)',
                      borderRadius: '3px'
                    }}></span>
                  </span>
                </h4>
                <ul style={{ marginLeft: '5px' }}>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>Yardım</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>SSS</a></li>
                  <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#cccccc', transition: 'color 0.3s' }}>İletişim</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-social" style={{
              flex: '1 0 100%',
              padding: '0 1rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{
                color: 'var(--primary-color)',
                marginBottom: '1.2rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                textAlign: 'center',
                position: 'relative',
                paddingBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <span style={{
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  Bizi Takip Edin
                  <span style={{
                    content: '""',
                    position: 'absolute',
                    left: '0',
                    bottom: '-10px',
                    width: '100%',
                    height: '3px',
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '3px'
                  }}></span>
                </span>
              </h4>
              <div className="social-icons" style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginTop: '1.5rem'
              }}>
                <a href="#" className="social-icon" style={{
                  color: '#cccccc',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>FB</a>
                <a href="#" className="social-icon" style={{
                  color: '#cccccc',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>TW</a>
                <a href="#" className="social-icon" style={{
                  color: '#cccccc',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>IG</a>
                <a href="#" className="social-icon" style={{
                  color: '#cccccc',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>YT</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            marginTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <p>&copy; 2025 Sony Interactive Entertainment Inc. DOOM ETERNAL, id Software ve Bethesda Softworks LLC'nin tescilli markalarıdır.</p>
          </div>
        </footer>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeImageModal}>×</button>
            <img src={selectedImage} alt="Enlarged view" />

            <button
              className="modal-nav-btn"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              onClick={prevModalImage}
            >
              &lt;
            </button>

            <button
              className="modal-nav-btn"
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
              onClick={nextModalImage}
            >
              &gt;
            </button>

            <div className="modal-counter">
              {modalImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
