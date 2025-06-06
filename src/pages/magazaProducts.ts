export interface MagazaProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  desc: string;
}

export const magazaProducts: MagazaProduct[] = [
  {
    id: 1,
    name: 'DOOM Slayer Figürü',
    image: '/src/assets/images/doom 3.jpeg',
    price: 899,
    desc: 'Detaylı ve koleksiyonluk DOOM Slayer figürü.'
  },
  {
    id: 2,
    name: 'DOOM Eternal Tişört',
    image: '/src/assets/images/enternal.jpeg',
    price: 349,
    desc: 'Özel baskılı DOOM Eternal temalı tişört.'
  },
  {
    id: 3,
    name: 'DOOM Poster Seti',
    image: '/src/assets/images/vfr.jpg',
    price: 199,
    desc: '3 parçadan oluşan yüksek kaliteli DOOM poster seti.'
  },
  {
    id: 4,
    name: 'DOOM Oyun Koleksiyonu',
    image: '/src/assets/images/91uV7r7aAhL._AC_UF1000,1000_QL80_.jpg',
    price: 1499,
    desc: 'Tüm klasik DOOM oyunlarını içeren koleksiyon paketi.'
  }
];
