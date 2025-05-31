import React, { useState, useEffect } from 'react';
import '../App.css';

const Donanim = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (tab: string) => {
    setAnimateIn(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimateIn(true);
    }, 300);
  };

  return (
    <div className="page-content hardware-page">
      <div className="hero-section hardware-hero">
        <div className="hero-content">
          <h1 className="hardware-title">DOOM ETERNAL <span className="accent-text">DONANIM</span></h1>
          <p className="hardware-subtitle">Cehennem güçleriyle savaşmak için ihtiyacın olan en güçlü ekipmanlar</p>
        </div>
      </div>

      <div className="hardware-container">
        <div className="hardware-tabs">
          <button 
            className={`tab-btn ${activeTab === 'recommended' ? 'active' : ''}`}
            onClick={() => handleTabChange('recommended')}
          >
            <i className="fas fa-microchip"></i> Önerilen Sistemler
          </button>
          <button 
            className={`tab-btn ${activeTab === 'peripherals' ? 'active' : ''}`}
            onClick={() => handleTabChange('peripherals')}
          >
            <i className="fas fa-keyboard"></i> Çevre Birimleri
          </button>
          <button 
            className={`tab-btn ${activeTab === 'special' ? 'active' : ''}`}
            onClick={() => handleTabChange('special')}
          >
            <i className="fas fa-fire"></i> Özel Koleksiyonlar
          </button>
        </div>

        <div className={`hardware-content ${animateIn ? 'fade-in' : 'fade-out'}`}>
          {activeTab === 'recommended' && (
            <div className="system-requirements">
              <div className="requirements-header">
                <h2>Sistem Gereksinimleri</h2>
                <p>DOOM Eternal'ı en iyi performansla oynamak için gereken donanım özellikleri</p>
              </div>
              
              <div className="requirements-cards">
                <div className="requirement-card minimum">
                  <div className="card-header">
                    <h3>Minimum Gereksinimler</h3>
                    <span className="fps-badge">1080p @ 60FPS</span>
                  </div>
                  <ul className="specs-list">
                    <li>
                      <span className="spec-name">İşletim Sistemi:</span>
                      <span className="spec-value">Windows 10 (64-bit)</span>
                    </li>
                    <li>
                      <span className="spec-name">İşlemci:</span>
                      <span className="spec-value">Intel Core i5-2500K / AMD Ryzen 3 2300X</span>
                    </li>
                    <li>
                      <span className="spec-name">RAM:</span>
                      <span className="spec-value">8 GB</span>
                    </li>
                    <li>
                      <span className="spec-name">Ekran Kartı:</span>
                      <span className="spec-value">NVIDIA GeForce GTX 1050Ti / AMD Radeon R9 280</span>
                    </li>
                    <li>
                      <span className="spec-name">VRAM:</span>
                      <span className="spec-value">4 GB</span>
                    </li>
                    <li>
                      <span className="spec-name">Depolama:</span>
                      <span className="spec-value">50 GB boş alan</span>
                    </li>
                  </ul>
                </div>

                <div className="requirement-card recommended">
                  <div className="card-header">
                    <h3>Önerilen Gereksinimler</h3>
                    <span className="fps-badge">1440p @ 60FPS</span>
                  </div>
                  <ul className="specs-list">
                    <li>
                      <span className="spec-name">İşletim Sistemi:</span>
                      <span className="spec-value">Windows 10 (64-bit)</span>
                    </li>
                    <li>
                      <span className="spec-name">İşlemci:</span>
                      <span className="spec-value">Intel Core i7-8700 / AMD Ryzen 7 3700X</span>
                    </li>
                    <li>
                      <span className="spec-name">RAM:</span>
                      <span className="spec-value">16 GB</span>
                    </li>
                    <li>
                      <span className="spec-name">Ekran Kartı:</span>
                      <span className="spec-value">NVIDIA GeForce RTX 2070 / AMD Radeon RX 5700 XT</span>
                    </li>
                    <li>
                      <span className="spec-name">VRAM:</span>
                      <span className="spec-value">8 GB</span>
                    </li>
                    <li>
                      <span className="spec-name">Depolama:</span>
                      <span className="spec-value">SSD üzerinde 50 GB boş alan</span>
                    </li>
                  </ul>
                </div>

                <div className="requirement-card ultra">
                  <div className="card-header">
                    <h3>Ultra Nightmare</h3>
                    <span className="fps-badge">4K @ 60FPS + Ray Tracing</span>
                  </div>
                  <ul className="specs-list">
                    <li>
                      <span className="spec-name">İşletim Sistemi:</span>
                      <span className="spec-value">Windows 10 (64-bit)</span>
                    </li>
                    <li>
                      <span className="spec-name">İşlemci:</span>
                      <span className="spec-value">Intel Core i9-12900K / AMD Ryzen 9 5950X</span>
                    </li>
                    <li>
                      <span className="spec-name">RAM:</span>
                      <span className="spec-value">32 GB</span>
                    </li>
                    <li>
                      <span className="spec-name">Ekran Kartı:</span>
                      <span className="spec-value">NVIDIA GeForce RTX 3080 / AMD Radeon RX 6800 XT</span>
                    </li>
                    <li>
                      <span className="spec-name">VRAM:</span>
                      <span className="spec-value">10 GB+</span>
                    </li>
                    <li>
                      <span className="spec-name">Depolama:</span>
                      <span className="spec-value">NVMe SSD üzerinde 50 GB boş alan</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="performance-tips">
                <h3>Performans İpuçları</h3>
                <div className="tips-grid">
                  <div className="tip-card">
                    <i className="fas fa-memory tip-icon"></i>
                    <h4>RAM Optimizasyonu</h4>
                    <p>Oyun sırasında arka planda çalışan gereksiz uygulamaları kapatarak RAM kullanımını azaltın.</p>
                  </div>
                  <div className="tip-card">
                    <i className="fas fa-temperature-high tip-icon"></i>
                    <h4>Soğutma Çözümleri</h4>
                    <p>Uzun oyun seansları için bilgisayarınızın soğutma sisteminin yeterli olduğundan emin olun.</p>
                  </div>
                  <div className="tip-card">
                    <i className="fas fa-bolt tip-icon"></i>
                    <h4>Güç Yönetimi</h4>
                    <p>Bilgisayarınızın güç planını "Yüksek Performans" olarak ayarlayarak maksimum performans alın.</p>
                  </div>
                  <div className="tip-card">
                    <i className="fas fa-hdd tip-icon"></i>
                    <h4>SSD Kullanımı</h4>
                    <p>Oyunu SSD üzerine kurarak yükleme sürelerini önemli ölçüde azaltın.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'peripherals' && (
            <div className="peripherals-section">
              <div className="section-header">
                <h2>DOOM Eternal İçin Önerilen Çevre Birimleri</h2>
                <p>Cehennem güçlerine karşı savaşınızda size avantaj sağlayacak ekipmanlar</p>
              </div>

              <div className="peripherals-grid">
                <div className="peripheral-card">
                  <div className="peripheral-content">
                    <h3>Mekanik Klavyeler</h3>
                    <p>Hızlı tepki süresi ve dayanıklılık için özel tasarlanmış oyuncu klavyeleri</p>
                    <ul className="peripheral-features">
                      <li><i className="fas fa-check"></i> RGB Aydınlatma</li>
                      <li><i className="fas fa-check"></i> Programlanabilir Makro Tuşları</li>
                      <li><i className="fas fa-check"></i> N-Key Rollover</li>
                    </ul>
                    <div className="recommended-models">
                      <h4>Önerilen Modeller:</h4>
                      <ul>
                        <li>Razer Huntsman Elite</li>
                        <li>Logitech G Pro X</li>
                        <li>SteelSeries Apex Pro</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="peripheral-card">
                  <div className="peripheral-content">
                    <h3>Oyuncu Fareleri</h3>
                    <p>Hassas nişan alma ve hızlı hareketler için optimize edilmiş fareler</p>
                    <ul className="peripheral-features">
                      <li><i className="fas fa-check"></i> Yüksek DPI Sensörü</li>
                      <li><i className="fas fa-check"></i> Düşük Gecikme Süresi</li>
                      <li><i className="fas fa-check"></i> Ergonomik Tasarım</li>
                    </ul>
                    <div className="recommended-models">
                      <h4>Önerilen Modeller:</h4>
                      <ul>
                        <li>Logitech G502 HERO</li>
                        <li>Razer DeathAdder V2</li>
                        <li>SteelSeries Rival 600</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="peripheral-card">
                  <div className="peripheral-content">
                    <h3>Oyuncu Kulaklıkları</h3>
                    <p>Düşmanların yerini belirlemek için 3D ses ve kristal netliğinde iletişim</p>
                    <ul className="peripheral-features">
                      <li><i className="fas fa-check"></i> 7.1 Surround Ses</li>
                      <li><i className="fas fa-check"></i> Gürültü Engelleyici Mikrofon</li>
                      <li><i className="fas fa-check"></i> Uzun Süreli Konfor</li>
                    </ul>
                    <div className="recommended-models">
                      <h4>Önerilen Modeller:</h4>
                      <ul>
                        <li>HyperX Cloud Alpha</li>
                        <li>SteelSeries Arctis Pro</li>
                        <li>Logitech G Pro X</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="peripheral-card">
                  <div className="peripheral-content">
                    <h3>Oyuncu Monitörleri</h3>
                    <p>Yüksek yenileme hızı ve düşük tepki süresi ile akıcı oyun deneyimi</p>
                    <ul className="peripheral-features">
                      <li><i className="fas fa-check"></i> 144Hz+ Yenileme Hızı</li>
                      <li><i className="fas fa-check"></i> 1ms Tepki Süresi</li>
                      <li><i className="fas fa-check"></i> Adaptive Sync Teknolojisi</li>
                    </ul>
                    <div className="recommended-models">
                      <h4>Önerilen Modeller:</h4>
                      <ul>
                        <li>ASUS ROG Swift PG279Q</li>
                        <li>LG 27GL850-B UltraGear</li>
                        <li>Samsung Odyssey G7</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'special' && (
            <div className="special-collections">
              <div className="section-header">
                <h2>DOOM Özel Koleksiyonları</h2>
                <p>Gerçek DOOM hayranları için özel tasarlanmış sınırlı sayıda donanım koleksiyonları</p>
              </div>

              <div className="collections-showcase">
                <div className="collection-item featured">
                  <div className="collection-badge">Sınırlı Üretim</div>
                  <div className="collection-content">
                    <h3>DOOM Eternal Özel PC</h3>
                    <p className="collection-desc">DOOM temalı özel kasa tasarımı, RGB aydınlatma ve üstün performans için optimize edilmiş bileşenlerle donatılmış özel üretim bilgisayar.</p>
                    <div className="collection-specs">
                      <div className="spec-item">
                        <i className="fas fa-microchip"></i>
                        <span>RTX 3090 Ti</span>
                      </div>
                      <div className="spec-item">
                        <i className="fas fa-server"></i>
                        <span>i9-12900K</span>
                      </div>
                      <div className="spec-item">
                        <i className="fas fa-memory"></i>
                        <span>64GB DDR5</span>
                      </div>
                    </div>
                    <div className="collection-price">
                      <span className="price-tag">59.999 ₺</span>
                      <button className="btn-notify">Stok Bilgilendirmesi Al</button>
                    </div>
                  </div>
                </div>

                <div className="collections-grid">
                  <div className="collection-item">
                    <h3>DOOM Slayer Klavye</h3>
                    <p>Özel tasarlanmış tuş kapakları ve DOOM temalı aydınlatma profilleri</p>
                    <span className="price-tag">3.499 ₺</span>
                  </div>

                  <div className="collection-item">
                    <h3>DOOM Eternal Mouse</h3>
                    <p>Cehennem ateşi temalı RGB aydınlatma ve özel makro tuşları</p>
                    <span className="price-tag">1.899 ₺</span>
                  </div>

                  <div className="collection-item">
                    <h3>Slayer Kulaklık</h3>
                    <p>Demon boynuzu tasarımlı kulaklık standı ile birlikte</p>
                    <span className="price-tag">4.299 ₺</span>
                  </div>

                  <div className="collection-item">
                    <h3>DOOM Gaming Sandalye</h3>
                    <p>Slayer simgesi işlemeli, ergonomik tasarım</p>
                    <span className="price-tag">7.599 ₺</span>
                  </div>
                </div>

                <div className="collection-bundle">
                  <div className="bundle-content">
                    <div className="bundle-header">
                      <h3>DOOM Eternal Tam Set</h3>
                      <span className="bundle-badge">%15 İndirim</span>
                    </div>
                    <p>Tüm DOOM Eternal özel donanım koleksiyonunu içeren paket. Sınırlı sayıda üretilmiştir.</p>
                    <ul className="bundle-items">
                      <li><i className="fas fa-check-circle"></i> DOOM Eternal Özel PC</li>
                      <li><i className="fas fa-check-circle"></i> DOOM Slayer Klavye</li>
                      <li><i className="fas fa-check-circle"></i> DOOM Eternal Mouse</li>
                      <li><i className="fas fa-check-circle"></i> Slayer Kulaklık</li>
                      <li><i className="fas fa-check-circle"></i> DOOM Gaming Sandalye</li>
                      <li><i className="fas fa-check-circle"></i> Özel Koleksiyon Kutusu</li>
                    </ul>
                    <div className="bundle-price">
                      <span className="original-price">77.595 ₺</span>
                      <span className="discount-price">65.999 ₺</span>
                    </div>
                    <button className="btn-preorder">Ön Sipariş Ver</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hardware-faq">
        <h2>Sıkça Sorulan Sorular</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>DOOM Eternal'ı dizüstü bilgisayarımda oynayabilir miyim?</h3>
            <p>Evet, dizüstü bilgisayarınız minimum sistem gereksinimlerini karşılıyorsa oyunu oynayabilirsiniz. Ancak ısınma sorunlarını önlemek için iyi bir soğutma sistemine sahip olduğunuzdan emin olun.</p>
          </div>
          <div className="faq-item">
            <h3>Ray tracing özelliği için hangi ekran kartları destekleniyor?</h3>
            <p>DOOM Eternal'daki ray tracing özellikleri için NVIDIA RTX 2060 veya üzeri, ya da AMD RX 6700 XT veya üzeri ekran kartları önerilmektedir.</p>
          </div>
          <div className="faq-item">
            <h3>Oyun için önerilen depolama alanı ne kadar?</h3>
            <p>Oyun ve güncellemeleri için en az 80 GB boş alan ayırmanızı öneririz. En iyi performans için SSD kullanmanız tavsiye edilir.</p>
          </div>
          <div className="faq-item">
            <h3>DOOM Eternal özel donanım koleksiyonları ne zaman satışa sunulacak?</h3>
            <p>Özel koleksiyonlar sınırlı sayıda üretilmektedir ve belirli dönemlerde satışa sunulmaktadır. Stok bilgilendirmesi almak için web sitemize kaydolabilirsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donanim;
