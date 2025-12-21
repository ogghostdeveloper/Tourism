import { Destination } from "../schema";

export const destinationsData: Destination[] = [
  {
    slug: "thimphu",
    name: "Thimphu",
    description:
      "The capital and largest city of Bhutan, Thimphu is a unique blend of tradition and modernity. Explore the majestic Tashichho Dzong, the National Memorial Chorten, and the weekend market. Experience the vibrant culture of Bhutan's administrative and economic hub while surrounded by pristine mountain landscapes.",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2940&auto=format&fit=crop",
    region: "Western Bhutan",
    highlights: [
      "Tashichho Dzong - Fortress monastery",
      "Buddha Dordenma Statue - Giant golden Buddha",
      "National Memorial Chorten - Memorial stupa",
      "Weekend Market - Local crafts and produce",
      "Folk Heritage Museum",
      "Takin Preserve - National animal sanctuary",
    ],
    coordinates: [27.4728, 89.6393],
    experiences: ["trekking-druk-path", "hot-stone-bath", "archery-experience"],
    hotels: ["six-senses-thimphu", "le-meridien-thimphu"],
  },
  {
    slug: "paro",
    name: "Paro",
    description:
      "Home to the iconic Tiger's Nest Monastery (Taktsang), Paro is a beautiful valley with pristine air, clear rivers, and breathtaking mountain views. The Paro Airport is the only international airport in Bhutan, making it the gateway to the Kingdom. Rich in history and natural beauty, Paro offers unforgettable experiences.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
    region: "Western Bhutan",
    highlights: [
      "Tiger's Nest Monastery (Taktsang) - Iconic cliff-side monastery",
      "Rinpung Dzong - Impressive fortress",
      "National Museum - Cultural artifacts",
      "Kyichu Lhakhang - Ancient temple",
      "Drukgyel Dzong - Historic ruins",
      "Paro Valley - Scenic landscapes",
    ],
    coordinates: [27.4287, 89.4164],
    experiences: ["paro-tshechu-festival", "meditation-retreat"],
    hotels: ["amankora-paro", "zhiwa-ling-heritage", "hotel-olathang"],
  },
  {
    slug: "punakha",
    name: "Punakha",
    description:
      "The ancient capital of Bhutan, Punakha is known for its stunning dzong at the confluence of two rivers - the Pho Chhu and Mo Chhu. The subtropical climate and fertile valley make it a perfect winter retreat. Experience the grandeur of Punakha Dzong, one of the most beautiful dzongs in Bhutan, and explore the surrounding rice terraces.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
    region: "Western Bhutan",
    highlights: [
      "Punakha Dzong - Palace of Great Happiness",
      "Suspension Bridge - Longest in Bhutan",
      "Chimi Lhakhang - Fertility temple",
      "Mo Chhu River - White-water rafting",
      "Khamsum Yulley Namgyal Chorten",
      "Rice Terraces - Scenic farmlands",
    ],
    coordinates: [27.5833, 89.8667],
    experiences: ["hot-stone-bath"],
    hotels: ["como-uma-punakha"],
  },
  {
    slug: "bumthang",
    name: "Bumthang",
    description:
      "The spiritual heartland of Bhutan, Bumthang valley is home to ancient temples, monasteries, and sacred sites. This is where Buddhism first entered Bhutan in the 7th century. Comprising four valleys - Chokhor, Tang, Ura, and Chhume - Bumthang is rich in history, culture, and natural beauty. Experience authentic rural Bhutan in this serene setting.",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
    region: "Central Bhutan",
    highlights: [
      "Jakar Dzong - Fortress of the White Bird",
      "Jambay Lhakhang - Ancient 7th-century temple",
      "Kurjey Lhakhang - Sacred monastery complex",
      "Tamshing Monastery - Treasure revealer's monastery",
      "Swiss Farm - Cheese and apple production",
      "Tang Valley - Remote spiritual valley",
    ],
    coordinates: [27.5475, 90.7333],
    experiences: ["meditation-retreat"],
    hotels: [],
  },
  {
    slug: "gangtey",
    name: "Gangtey",
    description:
      "Located in the beautiful Phobjikha Valley, Gangtey is famous for its glacial valley and as the winter home of the rare black-necked cranes. The valley is one of the most beautiful spots in Bhutan, with stunning mountain views and pristine forests. Visit the ancient Gangtey Monastery and experience the tranquility of this remote highland valley.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop",
    region: "Central Bhutan",
    highlights: [
      "Gangtey Monastery - Historic hilltop monastery",
      "Black-Necked Crane Observation - Winter migrants",
      "Phobjikha Valley - Glacial valley",
      "Nature Trails - Scenic hiking paths",
      "Traditional Farmhouses",
      "Crane Information Centre",
    ],
    coordinates: [27.4667, 90.1667],
    experiences: ["trekking-druk-path"],
    hotels: [],
  },
  {
    slug: "haa",
    name: "Haa Valley",
    description:
      "One of Bhutan's most pristine and least visited valleys, Haa offers an authentic glimpse into traditional Bhutanese life. Surrounded by virgin forests and lofty peaks, this hidden gem is perfect for those seeking off-the-beaten-path experiences. The valley is known for its unique animistic traditions and warm hospitality.",
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=2940&auto=format&fit=crop",
    region: "Western Bhutan",
    highlights: [
      "Lhakhang Karpo - White Temple",
      "Lhakhang Nagpo - Black Temple",
      "Traditional Villages - Authentic culture",
      "Haa Summer Festival - Annual celebration",
      "Miri Pun Sum - Three brother hills",
      "Apple Orchards - Local produce",
    ],
    coordinates: [27.3833, 89.2833],
    experiences: [],
    hotels: [],
  },
];
