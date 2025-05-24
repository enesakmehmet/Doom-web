import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import '../styles/Destek.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  gameVersion: string;
  platform: string;
  priority: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface GuideItem {
  title: string;
  content: string;
}

interface ReviewData {
  name: string;
  email: string;
  rating: number;
  title: string;
  review: string;
  gameVersion: string;
  playTime: string;
  recommend: boolean;
}

interface Review extends ReviewData {
  id: number;
  date: string;
  likes: number;
  dislikes: number;
}

const Destek = () => {
  const [activeTab, setActiveTab] = useState<string>('faq');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    gameVersion: 'DOOM Eternal',
    platform: 'PC',
    priority: 'normal'
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  
  // İnceleme formu için state'ler
  const [reviewData, setReviewData] = useState<ReviewData>({
    name: '',
    email: '',
    rating: 5,
    title: '',
    review: '',
    gameVersion: 'DOOM Eternal',
    playTime: '10-50 saat',
    recommend: true
  });
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Mehmet Y.",
      email: "mehmet@example.com",
      rating: 5,
      title: "Mükemmel bir oyun!",
      review: "DOOM Eternal, FPS türünün en iyi örneklerinden biri. Akıcı oynanış, etkileyici grafikler ve müthiş müzikleriyle tam bir başyapıt. Oyun içi destek de çok hızlı ve yardımcı.",
      gameVersion: "DOOM Eternal",
      playTime: "50+ saat",
      recommend: true,
      date: "15 Nisan 2025",
      likes: 24,
      dislikes: 2
    },
    {
      id: 2,
      name: "Ayşe K.",
      email: "ayse@example.com",
      rating: 4,
      title: "Harika ama birkaç sorun var",
      review: "Oyun genel olarak çok iyi, ancak bazı performans sorunları yaşadım. Destek ekibi sorunu çözmeme yardımcı oldu ama biraz zaman aldı. Yine de kesinlikle tavsiye ederim.",
      gameVersion: "DOOM Eternal",
      playTime: "10-50 saat",
      recommend: true,
      date: "10 Nisan 2025",
      likes: 15,
      dislikes: 3
    },
    {
      id: 3,
      name: "Ahmet S.",
      email: "ahmet@example.com",
      rating: 5,
      title: "Destek ekibi harika çalışıyor",
      review: "Oyunda yaşadığım tüm sorunlarda destek ekibi anında yardımcı oldu. Özellikle canlı sohbet özelliği çok kullanışlı. Oyunun kendisi zaten muhteşem, ama destek hizmetleri de bir o kadar kaliteli.",
      gameVersion: "DOOM Eternal",
      playTime: "50+ saat",
      recommend: true,
      date: "5 Nisan 2025",
      likes: 32,
      dislikes: 1
    }
  ]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // İnceleme formu için input değişikliği
  const handleReviewInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setReviewData({
        ...reviewData,
        [name]: checkbox.checked
      });
    } else if (name === 'rating') {
      setReviewData({
        ...reviewData,
        [name]: parseInt(value)
      });
    } else {
      setReviewData({
        ...reviewData,
        [name]: value
      });
    }
  };
  
  // İnceleme gönderme işlemi
  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Yeni inceleme oluştur
    const newReview: Review = {
      ...reviewData,
      id: reviews.length + 1,
      date: new Date().toLocaleDateString('tr-TR'),
      likes: 0,
      dislikes: 0
    };
    
    // İncelemelere ekle
    setReviews([newReview, ...reviews]);
    setReviewSubmitted(true);
    
    // Form gönderildikten sonra formu sıfırla
    setTimeout(() => {
      setReviewData({
        name: '',
        email: '',
        rating: 5,
        title: '',
        review: '',
        gameVersion: 'DOOM Eternal',
        playTime: '10-50 saat',
        recommend: true
      });
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 3000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form gönderme işlemi burada gerçekleştirilecek
    console.log('Form data:', formData);
    setFormSubmitted(true);
    
    // Form gönderildikten sonra formu sıfırla
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        gameVersion: 'DOOM Eternal',
        platform: 'PC',
        priority: 'normal'
      });
      setFormSubmitted(false);
    }, 5000);
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    {
      question: "DOOM Eternal'da performans sorunları yaşıyorum. Ne yapabilirim?",
      answer: "Performans sorunlarını çözmek için şu adımları deneyebilirsiniz:\n\n1. Grafik ayarlarınızı düşürün\n2. Sürücülerinizin güncel olduğundan emin olun\n3. Oyun dosyalarınızın bütünlüğünü doğrulayın\n4. Arka planda çalışan gereksiz uygulamaları kapatın\n5. İşletim sisteminizi güncelleyin"
    },
    {
      question: "Oyun çöküyor veya donuyor. Nasıl düzeltebilirim?",
      answer: "Oyunun çökmesi veya donması durumunda:\n\n1. Oyun dosyalarınızı doğrulayın\n2. Ekran kartı sürücülerinizi güncelleyin\n3. DirectX ve Visual C++ Redistributable paketlerini yeniden yükleyin\n4. Oyunu yönetici olarak çalıştırmayı deneyin\n5. Windows Olay Görüntüleyicisi'nde hata kayıtlarını kontrol edin"
    },
    {
      question: "Çevrimiçi özelliklere bağlanamıyorum. Ne yapmalıyım?",
      answer: "Çevrimiçi bağlantı sorunları için:\n\n1. İnternet bağlantınızı kontrol edin\n2. Güvenlik duvarı ve antivirüs ayarlarınızı kontrol edin\n3. Yönlendiricinizi yeniden başlatın\n4. DNS ayarlarınızı değiştirmeyi deneyin\n5. Bethesda.net sunucu durumunu kontrol edin"
    },
    {
      question: "DLC içeriğim yüklenmiyor veya erişilemiyor. Ne yapabilirim?",
      answer: "DLC sorunları için:\n\n1. DLC'nin hesabınıza doğru şekilde tanımlandığından emin olun\n2. Oyunu yeniden başlatın\n3. Oyun dosyalarını doğrulayın\n4. DLC'yi yeniden indirin\n5. Platformunuzun (Steam, Epic, vb.) destek ekibiyle iletişime geçin"
    },
    {
      question: "Kayıtlı oyunum kayboldu. Kurtarabilir miyim?",
      answer: "Kayıtlı oyun sorunları için:\n\n1. Bulut senkronizasyonunu kontrol edin\n2. Yedek kayıt dosyalarını arayın\n3. %LOCALAPPDATA%\\id Software\\DOOM Eternal\\saved klasörünü kontrol edin\n4. Steam/Epic/Bethesda bulut kayıtlarını kontrol edin\n5. Otomatik yedekleme özelliğini etkinleştirin"
    },
    {
      question: "Oyun içi satın alımlarla ilgili sorun yaşıyorum. Ne yapmalıyım?",
      answer: "Satın alma sorunları için:\n\n1. Ödeme yönteminizi doğrulayın\n2. Hesap bakiyenizi kontrol edin\n3. Satın alma geçmişinizi inceleyin\n4. Platformunuzun (Steam, Epic, vb.) destek ekibiyle iletişime geçin\n5. Fatura bilgilerinizi kontrol edin"
    },
    {
      question: "Oyun kontrollerimi özelleştiremiyorum. Nasıl düzeltebilirim?",
      answer: "Kontrol sorunları için:\n\n1. Oyun ayarlarını sıfırlayın\n2. Kontrol cihazınızın güncel olduğundan emin olun\n3. Alternatif bir kontrol cihazı deneyin\n4. Oyun dosyalarını doğrulayın\n5. Kontrol yapılandırma dosyasını manuel olarak düzenleyin"
    },
    {
      question: "Oyun sesinde sorunlar yaşıyorum. Nasıl çözebilirim?",
      answer: "Ses sorunları için:\n\n1. Ses sürücülerinizi güncelleyin\n2. Ses çıkış cihazınızı kontrol edin\n3. Oyun ses ayarlarını sıfırlayın\n4. Windows ses ayarlarını kontrol edin\n5. Ses dosyalarını doğrulayın"
    }
  ];

  const troubleshootingGuides: GuideItem[] = [
    {
      title: "Sistem Gereksinimleri Optimizasyonu",
      content: "DOOM Eternal'ın en iyi performansla çalışması için sistem gereksinimlerini ve optimizasyon ipuçlarını içeren kapsamlı rehber."
    },
    {
      title: "Çökme ve Donma Sorunları",
      content: "Oyunun çökmesi veya donması durumunda izlenecek adımları ve çözümleri içeren detaylı rehber."
    },
    {
      title: "Çevrimiçi Bağlantı Sorunları",
      content: "Battlemode ve diğer çevrimiçi özelliklere bağlanma sorunlarını çözmek için adım adım rehber."
    },
    {
      title: "Grafik ve Görüntü Sorunları",
      content: "Ekran tearing, artifacting ve diğer görsel sorunları çözmek için kapsamlı rehber."
    },
    {
      title: "Ses ve Müzik Sorunları",
      content: "Ses kesilmesi, gecikme veya tamamen kaybolma sorunlarını çözmek için rehber."
    },
    {
      title: "Kontrol ve Giriş Cihazı Sorunları",
      content: "Klavye, fare ve oyun kontrolcüsü sorunlarını çözmek için detaylı rehber."
    }
  ];

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="destek-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="destek-header">
        <h1>DOOM Destek Merkezi</h1>
        <p>Cehennemde sorun mu yaşıyorsunuz? Endişelenmeyin, size yardımcı olmak için buradayız!</p>
      </div>

      <div className="destek-tabs">
        <button 
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <i className="fas fa-question-circle"></i> Sık Sorulan Sorular
        </button>
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <i className="fas fa-envelope"></i> İletişim Formu
        </button>
        <button 
          className={`tab-button ${activeTab === 'guides' ? 'active' : ''}`}
          onClick={() => setActiveTab('guides')}
        >
          <i className="fas fa-book"></i> Sorun Giderme Rehberleri
        </button>
        <button 
          className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <i className="fas fa-server"></i> Sunucu Durumu
        </button>
        <button 
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <i className="fas fa-star"></i> İncelemeler
        </button>
      </div>

      <div className="destek-content">
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h2>Kullanıcı İncelemeleri</h2>
            
            {!showReviewForm ? (
              <div className="reviews-header">
                <p>Destek hizmetlerimiz hakkında düşüncelerinizi paylaşın ve diğer kullanıcıların deneyimlerini okuyun.</p>
                <button 
                  className="review-button" 
                  onClick={() => setShowReviewForm(true)}
                >
                  <i className="fas fa-edit"></i> İnceleme Yaz
                </button>
              </div>
            ) : reviewSubmitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>İncelemeniz Alındı!</h3>
                <p>Değerli geri bildiriminiz için teşekkür ederiz. İncelemeniz başarıyla yayınlandı.</p>
              </div>
            ) : (
              <div className="review-form-container">
                <h3>İnceleme Yaz</h3>
                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Adınız</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={reviewData.name}
                        onChange={handleReviewInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-posta Adresiniz</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={reviewData.email}
                        onChange={handleReviewInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Puanınız</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} className="star-label">
                          <input
                            type="radio"
                            name="rating"
                            value={star}
                            checked={reviewData.rating === star}
                            onChange={handleReviewInputChange}
                          />
                          <i className={`fas fa-star ${reviewData.rating >= star ? 'active' : ''}`}></i>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="title">İnceleme Başlığı</label>
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      value={reviewData.title}
                      onChange={handleReviewInputChange}
                      required 
                      placeholder="İncelemeniz için kısa bir başlık yazın"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="review">İncelemeniz</label>
                    <textarea 
                      id="review" 
                      name="review" 
                      rows={5}
                      value={reviewData.review}
                      onChange={handleReviewInputChange}
                      required
                      placeholder="Destek hizmetlerimiz hakkındaki deneyiminizi paylaşın"
                    ></textarea>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="gameVersion">Oyun Versiyonu</label>
                      <select 
                        id="gameVersion" 
                        name="gameVersion"
                        value={reviewData.gameVersion}
                        onChange={handleReviewInputChange}
                      >
                        <option value="DOOM Eternal">DOOM Eternal</option>
                        <option value="DOOM (2016)">DOOM (2016)</option>
                        <option value="DOOM 3">DOOM 3</option>
                        <option value="DOOM 64">DOOM 64</option>
                        <option value="Classic DOOM">Classic DOOM</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="playTime">Oyun Süresi</label>
                      <select 
                        id="playTime" 
                        name="playTime"
                        value={reviewData.playTime}
                        onChange={handleReviewInputChange}
                      >
                        <option value="0-10 saat">0-10 saat</option>
                        <option value="10-50 saat">10-50 saat</option>
                        <option value="50+ saat">50+ saat</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="recommend" 
                        checked={reviewData.recommend}
                        onChange={handleReviewInputChange}
                      />
                      Bu oyunu başkalarına tavsiye ederim
                    </label>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={() => setShowReviewForm(false)}>
                      <i className="fas fa-times"></i> İptal
                    </button>
                    <button type="submit" className="submit-button">
                      <i className="fas fa-paper-plane"></i> İnceleme Gönder
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="reviews-list">
              {reviews.map((review) => (
                <div className="review-item" key={review.id}>
                  <div className="review-header">
                    <div className="review-info">
                      <h3>{review.title}</h3>
                      <div className="review-meta">
                        <span className="review-author">{review.name}</span>
                        <span className="review-date">{review.date}</span>
                        <span className="review-version">{review.gameVersion}</span>
                        <span className="review-playtime">{review.playTime}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < review.rating ? 'active' : ''}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <div className="review-content">
                    <p>{review.review}</p>
                  </div>
                  <div className="review-footer">
                    <div className="review-recommend">
                      {review.recommend ? (
                        <span className="recommend-yes">
                          <i className="fas fa-thumbs-up"></i> Tavsiye Ediyor
                        </span>
                      ) : (
                        <span className="recommend-no">
                          <i className="fas fa-thumbs-down"></i> Tavsiye Etmiyor
                        </span>
                      )}
                    </div>
                    <div className="review-actions">
                      <button className="review-action-button">
                        <i className="fas fa-thumbs-up"></i> 
                        <span>{review.likes}</span>
                      </button>
                      <button className="review-action-button">
                        <i className="fas fa-thumbs-down"></i>
                        <span>{review.dislikes}</span>
                      </button>
                      <button className="review-action-button">
                        <i className="fas fa-flag"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'faq' && (
          <div className="faq-section">
            <h2>Sık Sorulan Sorular</h2>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <div className="faq-item" key={index}>
                  <div 
                    className={`faq-question ${activeQuestion === index ? 'active' : ''}`}
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3>{item.question}</h3>
                    <span className="toggle-icon">
                      {activeQuestion === index ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}
                    </span>
                  </div>
                  {activeQuestion === index && (
                    <div className="faq-answer">
                      {item.answer.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-section">
            <h2>Destek Talebi Oluştur</h2>
            {formSubmitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>Talebiniz Alındı!</h3>
                <p>Destek ekibimiz en kısa sürede size yanıt verecektir. Talebinizin referans numarası: <strong>#{Math.floor(Math.random() * 1000000)}</strong></p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta Adresiniz</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gameVersion">Oyun Versiyonu</label>
                    <select 
                      id="gameVersion" 
                      name="gameVersion"
                      value={formData.gameVersion}
                      onChange={handleInputChange}
                    >
                      <option value="DOOM Eternal">DOOM Eternal</option>
                      <option value="DOOM (2016)">DOOM (2016)</option>
                      <option value="DOOM 3">DOOM 3</option>
                      <option value="DOOM 64">DOOM 64</option>
                      <option value="Classic DOOM">Classic DOOM</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="platform">Platform</label>
                    <select 
                      id="platform" 
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                    >
                      <option value="PC">PC</option>
                      <option value="PlayStation 5">PlayStation 5</option>
                      <option value="PlayStation 4">PlayStation 4</option>
                      <option value="Xbox Series X|S">Xbox Series X|S</option>
                      <option value="Xbox One">Xbox One</option>
                      <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Konu</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesajınız</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Öncelik</label>
                  <select 
                    id="priority" 
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Düşük - Genel Soru</option>
                    <option value="normal">Normal - Küçük Sorun</option>
                    <option value="high">Yüksek - Oyun Oynamayı Engelleyen Sorun</option>
                    <option value="critical">Kritik - Satın Alma/Hesap Sorunu</option>
                  </select>
                </div>
                <div className="form-group file-upload">
                  <label htmlFor="file">Ekran Görüntüsü veya Dosya Ekle (isteğe bağlı)</label>
                  <input type="file" id="file" name="file" />
                  <small>Maksimum dosya boyutu: 10MB. İzin verilen formatlar: JPG, PNG, PDF, ZIP</small>
                </div>
                <button type="submit" className="submit-button">
                  <i className="fas fa-paper-plane"></i> Talebi Gönder
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="guides-section">
            <h2>Sorun Giderme Rehberleri</h2>
            <div className="guides-grid">
              {troubleshootingGuides.map((guide, index) => (
                <div className="guide-card" key={index}>
                  <div className="guide-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <h3>{guide.title}</h3>
                  <p>{guide.content}</p>
                  <button className="guide-button">Rehberi Görüntüle</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="status-section">
            <h2>Sunucu Durumu</h2>
            <div className="status-grid">
              <div className="status-card">
                <div className="status-icon online">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Battlemode Sunucuları</h3>
                <p className="status-text online">Çevrimiçi</p>
                <p className="status-details">Tüm sistemler normal çalışıyor</p>
              </div>
              <div className="status-card">
                <div className="status-icon online">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Bethesda.net Oturum Açma</h3>
                <p className="status-text online">Çevrimiçi</p>
                <p className="status-details">Tüm sistemler normal çalışıyor</p>
              </div>
              <div className="status-card">
                <div className="status-icon issues">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h3>DLC Doğrulama Hizmeti</h3>
                <p className="status-text issues">Kısmi Kesinti</p>
                <p className="status-details">Bazı kullanıcılar DLC içeriklerine erişimde sorun yaşayabilir</p>
              </div>
              <div className="status-card">
                <div className="status-icon online">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Liderlik Tablosu</h3>
                <p className="status-text online">Çevrimiçi</p>
                <p className="status-details">Tüm sistemler normal çalışıyor</p>
              </div>
            </div>

            <div className="maintenance-info">
              <h3>Planlı Bakım</h3>
              <div className="maintenance-item">
                <div className="maintenance-date">18 Nisan 2025</div>
                <div className="maintenance-details">
                  <h4>Battlemode Sunucuları</h4>
                  <p>Battlemode sunucuları 18 Nisan 2025 tarihinde 03:00 - 07:00 (TSİ) saatleri arasında bakım nedeniyle geçici olarak çevrimdışı olacaktır.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="destek-contact-info">
        <div className="contact-card">
          <div className="contact-icon">
            <i className="fas fa-headset"></i>
          </div>
          <h3>7/24 Canlı Destek</h3>
          <p>Acil sorunlar için canlı destek ekibimizle hemen görüşün</p>
          <button className="contact-button">Canlı Sohbeti Başlat</button>
        </div>
        <div className="contact-card">
          <div className="contact-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h3>E-posta Desteği</h3>
          <p>Detaylı sorularınız için e-posta ile bize ulaşın</p>
          <a href="mailto:support@doom-eternal.com" className="contact-link">support@doom-eternal.com</a>
        </div>
        <div className="contact-card">
          <div className="contact-icon">
            <i className="fas fa-comments"></i>
          </div>
          <h3>Topluluk Forumları</h3>
          <p>Diğer oyuncularla sorunlarınızı paylaşın ve çözümler bulun</p>
          <button className="contact-button">Forumlara Git</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Destek;
