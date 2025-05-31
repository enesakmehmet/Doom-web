export interface Service {
  title: string;
  icon: string; // Emoji or icon URL
  description: string;
  details: string;
}

export const servicesLibrary: Service[] = [
  {
    title: 'DOOM DLC Paketleri',
    icon: '🧩',
    description: 'En yeni ve popüler DOOM DLC paketlerini satın alabilir, oyun deneyiminizi zenginleştirebilirsiniz.',
    details: 'Her ay güncellenen DLC arşivimizde, klasik ve yeni DOOM oyunları için tüm ek paketler, harita genişletmeleri ve özel içerikler yer alır. Satın aldığınız DLC’ler hesabınıza anında tanımlanır ve destek ekibimiz kurulumda size yardımcı olur.'
  },
  {
    title: 'Teknik Destek',
    icon: '🛠️',
    description: 'Oyun sırasında karşılaştığınız teknik sorunlar için 7/24 destek hizmetimizden yararlanabilirsiniz.',
    details: 'Uzman destek ekibimiz, bağlantı sorunlarından performans iyileştirmelerine, hata raporlarından donanım uyumluluğuna kadar her konuda size yardımcı olur. Canlı chat ve uzaktan bağlantı desteği ile sorunlarınız hızla çözülür.'
  },
  {
    title: 'Topluluk Forumları',
    icon: '💬',
    description: 'Diğer DOOM oyuncuları ile buluşabilir, stratejiler paylaşabilir ve güncel haberleri takip edebilirsiniz.',
    details: 'Forumlarımızda rehberler, taktikler, mod önerileri ve turnuva duyuruları paylaşılır. Ayrıca, moderatörlerimiz topluluk kurallarını uygular ve güvenli bir ortam sağlar.'
  },
  {
    title: 'Mod Desteği',
    icon: '🧑‍💻',
    description: 'Oyununuzu kişiselleştirmek için topluluk tarafından geliştirilen modları kolayca yükleyebilirsiniz.',
    details: 'Mod kütüphanemizde binlerce kullanıcı yapımı içerik, harita, karakter ve grafik paketi bulunur. Tek tıkla yükleme ve kaldırma desteği ile oyun deneyiminizi dilediğiniz gibi özelleştirin.'
  },
  {
    title: 'E-spor ve Turnuvalar',
    icon: '🏆',
    description: 'Düzenli olarak gerçekleştirilen DOOM turnuvalarına katılabilir, ödüller kazanabilirsiniz.',
    details: 'Çevrimiçi ve yerel turnuvalar, özel etkinlikler ve ödüllü yarışmalar ile rekabetin tadını çıkarın. Katılımcılar için anlık skor tabloları ve canlı yayınlar sunuyoruz.'
  },
  {
    title: 'Kütüphane Yönetimi',
    icon: '📚',
    description: 'Tüm DOOM oyunlarınızı ve içeriklerinizi tek bir panelden yönetin.',
    details: 'Oyun koleksiyonunuzu, DLC ve modlarınızı kolayca görüntüleyin, güncelleyin veya yedekleyin. Kütüphane paneli ile sahip olduğunuz tüm içeriklere hızlıca ulaşabilirsiniz.'
  },
  {
    title: 'Haber ve Duyurular',
    icon: '📰',
    description: 'DOOM ile ilgili en güncel haberleri ve resmi duyuruları takip edin.',
    details: 'Yama notları, yeni sürümler, topluluk etkinlikleri ve geliştirici röportajları gibi birçok güncel bilgiye anında erişim sağlayın.'
  }
];
