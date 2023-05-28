import images from "./images";
export const languages = [
  "Англійська",
  "Арабська",
  "Бенгальська",
  "Бірманська",
  "Гінді",
  "Грецька",
  "Гуджараті",
  "Іспанська",
  "Італійська",
  "Каннада",
  "Китайська",
  "Корейська",
  "Кхмерська",
  "Маратхі",
  "Нідерландська",
  "Німецька",
  "Панджабі",
  "Південно-міньська",
  "Польська",
  "Португальська",
  "Румунська",
  "Сингальська",
  "Суахілі",
  "Тамільська",
  "Турецька",
  "Українська",
  "Урду",
  "Узбецька",
  "Французька",
  "Яванська",
  "Японська",
];
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const digits = /^[0-9]*$/;

export const categoriesImages = [
  { id: 1, imgUrl: images.Depression },
  { id: 2, imgUrl: images.Trivoga },
  { id: 3, imgUrl: images.Stress },
  { id: 4, imgUrl: images.Ptsd },
  { id: 5, imgUrl: images.Addiction },
  { id: 6, imgUrl: images.Realtion },
  { id: 7, imgUrl: images.Traumas },
  { id: 8, imgUrl: images.Romantic },
  { id: 9, imgUrl: images.Sleep },
  { id: 10, imgUrl: images.Rozladi },
];

export const categories = [
  { id: 1, title: "Депресія" },
  { id: 2, title: "Тривожність" },
  { id: 3, title: "Стрес" },
  { id: 4, title: "Постравматичний розлад" },
  { id: 5, title: "Залежність" },
  { id: 6, title: "Міжособистісні проблеми" },
  { id: 7, title: "Травми" },
  { id: 8, title: "Романтичні розлади" },
  { id: 9, title: "Розлади сна" },
  { id: 10, title: "Розлади особистості" },
];
export const mood = [
  images.One,
  images.Two,
  images.Three,
  images.Four,
  images.Five,
];
export { images };
