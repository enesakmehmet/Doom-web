import { useState } from 'react';
import NewsModal from '../components/news/NewsModal';
import StatisticsPanel from '../components/StatisticsPanel';
import { DoomButton } from '../components/DoomButton';
import { DoomIcon } from '../components/DoomIcon';
import '../components/doom-button.css';

const newsData = [
  {
    title: 'DOOM Eternal Yeni DLC Duyuruldu!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcA-lCTTburBiML0aOB35ATIyBdk1fnauvAw&s',
    date: '15 Nisan 2025',
    summary: 'DOOM Eternal için "Hell Unleashed" adlı yeni bir DLC paketi resmi olarak duyuruldu. Bu paketle birlikte oyuncular yeni bir cehennem bölgesini keşfedecek, zorlu boss savaşları ve benzersiz silah geliştirmeleriyle karşılaşacak. Ayrıca, topluluk tarafından uzun süredir beklenen çok oyunculu modda yeni haritalar da eklenecek.',
    content: 'DOOM Eternal için duyurulan "Hell Unleashed" DLC’si, oyunculara yeni bir cehennem bölgesi, üç yeni boss savaşı, beş yeni silah geliştirmesi ve topluluk tarafından uzun süredir beklenen çok oyunculu modda dört yeni harita sunuyor. DLC ile birlikte gelen yeni kozmetik içerikler ve başarımlar da DOOM deneyimini daha da zenginleştiriyor. Lansman haftasında DLC’ye özel bir etkinlik ve ödüller de oyuncuları bekliyor.'
  },
  {
    title: 'DOOM Serisi 30. Yılını Kutluyor',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBcffeBnbtejtDuMrsLBenVIn5THTiZYhKww&s',
    date: '10 Mart 2025',
    summary: 'DOOM serisinin 30. yılına özel olarak Bethesda, oyun severlere nostalji dolu bir etkinlik takvimi hazırladı. Eski DOOM oyunlarının yeniden düzenlenmiş sürümleri, özel koleksiyon ürünleri ve topluluk yarışmalarıyla kutlamalar yıl boyunca devam edecek. Ayrıca, serinin geliştiricileri ile yapılacak canlı yayınlar da planlanıyor.',
    content: '30. yıl kutlamaları kapsamında, DOOM 1 ve 2’nin remastered sürümleri, özel koleksiyon figürleri ve bir DOOM belgeseli yayınlanacak. Topluluk için speedrun yarışmaları ve cosplay etkinlikleri düzenlenecek. Ayrıca, DOOM’un efsanevi geliştiricileriyle yapılacak canlı yayınlar ve soru-cevap seansları da yıl boyunca devam edecek.'
  },
  {
    title: 'DOOM Mobile Güncellemesi Yayında',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9OA0ZAldFP_j4c27srRbMRNalCQfBV5f2g&s',
    date: '25 Şubat 2025',
    summary: 'DOOM Mobile için yayınlanan son güncelleme ile oyuna yeni görevler, zorluk seviyeleri ve özel kozmetik içerikler eklendi. Ayrıca, kullanıcı arayüzü daha modern ve akıcı hale getirildi. Geliştirici ekip, topluluktan gelen geri bildirimlere göre oyunu sürekli güncellemeye devam edeceklerini belirtti.',
    content: 'Güncelleme ile gelen yenilikler arasında üç yeni görev, Nightmare zorluk seviyesi, 10’dan fazla yeni kozmetik içerik ve optimize edilmiş bir kullanıcı arayüzü bulunuyor. Ayrıca, oyuncular artık arkadaşlarıyla özel odalarda mücadele edebiliyor ve haftalık etkinliklere katılabiliyor.'
  },
  {
    title: 'DOOM Mod Topluluğu Büyüyor',
    image: 'https://i.ytimg.com/vi/XyY4-_uS918/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAIQSc2aUuLi3gLE7UoldOs_h93YQ',
    date: '5 Ocak 2025',
    summary: 'DOOM mod topluluğu, oyuncuların yarattığı yeni içeriklerle büyümeye devam ediyor. Son dönemde çıkan popüler modlar arasında "Demon Rush" ve "Retro Resurrection" öne çıkıyor. Mod geliştiricileri, resmi Discord sunucusunda rehberler ve destek sunuyor.',
    content: 'En popüler modlar arasında retro görünümlü haritalar, co-op görevler ve yeni düşman türleri bulunuyor. Mod geliştiricileri için resmi Discord’da rehberler, kod örnekleri ve haftalık mod yarışmaları düzenleniyor. En iyi modlar, topluluk tarafından oylanarak ana sayfada öne çıkarılıyor.'
  },
  {
    title: 'DOOM Dünya Turnuvası Başlıyor!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HgMH0pmnv4kKw1kTuuiSD-aSP9yAerP9AQ&s',
    date: '1 Nisan 2025',
    summary: 'DOOM e-spor arenasında büyük bir heyecan başlıyor. 2025 Dünya Turnuvası’nda dünyanın dört bir yanından en iyi oyuncular, ödüller ve ün için mücadele edecek. Turnuva canlı yayınlarla Twitch ve YouTube üzerinden izlenebilecek. Katılım ve ödül detayları için resmi DOOM web sitesini ziyaret edebilirsiniz.',
    content: 'Turnuva elemeleri Mart ayı sonunda başlayacak ve büyük final Haziran’da yapılacak. Katılımcılar için toplamda 100.000$ ödül havuzu bulunuyor. Turnuva maçları Twitch ve YouTube üzerinden canlı izlenebilecek ve izleyiciler için özel çekilişler düzenlenecek.'
  }
];

const Haberler = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setSelectedNews(idx);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="page-content">
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <DoomIcon name="skull" size={36} /> Haberler
      </h1>
      <StatisticsPanel />
      <div className="news-list">
        {newsData.map((news, idx) => (
          <div className="news-item card" key={idx}>
            <img src={news.image} alt={news.title} className="news-img" />
            <div className="news-content">
              <h2>{news.title}</h2>
              <span className="news-date">{news.date}</span>
              <p>{news.summary}</p>
              <DoomButton icon="bolt" onClick={() => handleOpen(idx)}>
                Devamını Oku
              </DoomButton>
            </div>
          </div>
        ))}
      </div>
      {selectedNews !== null && (
        <NewsModal
          open={modalOpen}
          onClose={handleClose}
          title={newsData[selectedNews].title}
          image={newsData[selectedNews].image}
          date={newsData[selectedNews].date}
          content={newsData[selectedNews].content}
        />
      )}
    </div>
  );
};

export default Haberler;
