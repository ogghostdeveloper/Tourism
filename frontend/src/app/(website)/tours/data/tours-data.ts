import { Tour } from "../schema";

export const tours: Tour[] = [
  {
    id: "1",
    slug: "spiritual-discovery-nepal-bhutan",
    title: "Spiritual Discovery: Nepal & Bhutan",
    description:
      "A transformative journey through the spiritual heartlands of the Himalayas. Experience ancient monasteries, vibrant culture, and breathtaking landscapes across Nepal and Bhutan.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
    duration: "14 Days / 13 Nights",
    price: "From $8,500 per person",
    featured: true,
    category: "Spiritual & Cultural",
    highlights: [
      "Tiger's Nest Monastery hike",
      "UNESCO World Heritage Sites in Kathmandu",
      "Punakha Dzong and traditional festivals",
      "Hot stone bath experience",
      "Black-necked cranes in Gangtey Valley",
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description:
          "Arrive in the vibrant capital of Nepal. Transfer to your luxury hotel and enjoy a welcome dinner with traditional Nepali cuisine.",
        image: "https://images.unsplash.com/photo-1506792006437-256b665541e2?w=2940&auto=format&fit=crop",
        accommodation: "Dwarika's Hotel",
        activities: ["Airport Transfer", "Welcome Dinner"],
        highlights: ["First glimpse of Himalayas", "Traditional Nepali hospitality"],
        experiences: [
          {
            title: "Traditional Nepali Dinner",
            description:
              "Enjoy a multi-course feast of authentic Nepali dishes accompanied by a cultural dance performance.",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=2940&auto=format&fit=crop",
            category: "Dining",
          },
          {
            title: "Private Rickshaw Tour",
            description:
              "Explore the bustling streets of Thamel and the old city on a private rickshaw ride.",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=2940&auto=format&fit=crop",
            category: "Adventure",
          },
        ],
      },
      {
        day: 2,
        title: "Kathmandu Valley Exploration",
        description:
          "Visit the sacred Swayambhunath Stupa and the historic Patan Durbar Square. Immerse yourself in the rich history of the valley.",
        image: "https://images.unsplash.com/photo-1558799555-605c59c09871?w=2940&auto=format&fit=crop",
        accommodation: "Dwarika's Hotel",
        activities: ["Guided City Tour", "Pottery Workshop in Patan"],
        highlights: ["Swayambhunath Stupa (Monkey Temple)", "Patan Durbar Square"],
      },
      {
        day: 3,
        title: "Fly to Paro, Bhutan",
        description:
          "Experience one of the world's most spectacular flights over the Himalayas. Arrive in Paro and visit the National Museum.",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=2940&auto=format&fit=crop",
        accommodation: "COMO Uma Paro",
        activities: ["Flight to Paro", "Museum Visit"],
        highlights: ["Aerial view of Everest", "National Museum of Bhutan"],
      },
      {
        day: 4,
        title: "Thimphu: The Capital",
        description:
          "Drive to Thimphu. Visit the Buddha Dordenma statue and the Textile Museum. Explore the local markets.",
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=2940&auto=format&fit=crop",
        accommodation: "Amankora Thimphu",
        activities: ["Drive to Thimphu", "Market Walk"],
        highlights: ["Buddha Dordenma", "Royal Textile Academy"],
      },
      {
        day: 5,
        title: "Punakha Dzong",
        description:
          "Journey over the Dochu La pass with panoramic Himalayan views. Visit the majestic Punakha Dzong, the Palace of Great Happiness.",
        image: "https://images.unsplash.com/photo-1589307357838-38d6b8ec407e?w=2940&auto=format&fit=crop",
        accommodation: "Six Senses Punakha",
        activities: ["Scenic Drive", "Dzong Tour"],
        highlights: ["Dochu La Pass (108 Chortens)", "Punakha Dzong"],
      },
      {
        day: 6,
        title: "Gangtey Valley",
        description:
          "Travel to the glacial valley of Phobjikha. Visit the Gangtey Monastery and look for black-necked cranes (seasonal).",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
        accommodation: "Gangtey Lodge",
        activities: ["Nature Walk", "Monastery Visit"],
        highlights: ["Phobjikha Valley", "Black-Necked Cranes"],
      },
      {
        day: 7,
        title: "Return to Paro",
        description:
          "Drive back to Paro. Enjoy a traditional hot stone bath to relax and rejuvenate.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=2940&auto=format&fit=crop",
        accommodation: "COMO Uma Paro",
        activities: ["Return Drive", "Hot Stone Bath"],
        highlights: ["Relaxing Evening", "Traditional Wellness"],
      },
      {
        day: 8,
        title: "Tiger's Nest Hike",
        description:
          "The highlight of the trip: a hike to the iconic Paro Taktsang (Tiger's Nest) Monastery, perched on a cliffside.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
        accommodation: "COMO Uma Paro",
        activities: ["Guided Hike", "Farewell Dinner"],
        highlights: ["Paro Taktsang", "Cliffside Views"],
      },
      {
        day: 9,
        title: "Departure",
        description:
          "Transfer to Paro International Airport for your onward journey, carrying memories of the Kingdom of Happiness.",
        accommodation: "N/A",
        activities: ["Airport Transfer"],
        highlights: ["Final Views of Bhutan"],
      },
    ],
  },
  {
    id: "2",
    slug: "luxury-honeymoon-bhutan",
    title: "Luxury Honeymoon in Bhutan",
    description:
      "The ultimate romantic escape. Private villas, intimate dining, and exclusive cultural experiences in the Land of the Thunder Dragon.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
    duration: "10 Days / 9 Nights",
    price: "From $12,000 per person",
    featured: false,
    category: "Honeymoon & Romance",
    highlights: [
      "Private luxury accommodations",
      "Couples spa treatments",
      "Candlelit dinners at scenic locations",
      "Tiger's Nest sunrise experience",
      "Private cultural performances",
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Begin your romantic journey with a warm welcome at Paro International Airport. Transfer to your luxury resort and enjoy a couples spa treatment.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=2940&auto=format&fit=crop",
        accommodation: "COMO Uma Paro - Luxury Villa",
        activities: ["Airport Transfer", "Welcome Spa Treatment"],
        highlights: ["Mountain views from private villa", "Couples massage"],
      },
      {
        day: 2,
        title: "Paro Exploration",
        description:
          "Private guided tour of Paro valley, including Rinpung Dzong and Ta Dzong. Evening at leisure with intimate dinner.",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=2940&auto=format&fit=crop",
        accommodation: "COMO Uma Paro - Luxury Villa",
        activities: ["Private Guided Tour", "Candlelit Dinner"],
        highlights: ["Rinpung Dzong", "Romantic dinner setup"],
      },
    ],
  },
  {
    id: "3",
    slug: "bhutan-trekking-adventure",
    title: "Bhutan Trekking Adventure",
    description:
      "Challenge yourself with spectacular treks through pristine Himalayan wilderness. Experience remote villages, high-altitude lakes, and breathtaking mountain vistas.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=2940&auto=format&fit=crop",
    duration: "12 Days / 11 Nights",
    price: "From $6,800 per person",
    featured: true,
    category: "Adventure & Trekking",
    highlights: [
      "Druk Path Trek (5-6 days)",
      "Camp under the stars",
      "Pristine alpine lakes",
      "Traditional farmhouse stays",
      "Himalayan wildlife spotting",
    ],
    days: [
      {
        day: 1,
        title: "Arrival and Acclimatization",
        description:
          "Arrive in Paro and take it easy today. Short hike to Zuri Dzong for acclimatization and panoramic views of Paro valley.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
        accommodation: "Hotel in Paro",
        activities: ["Acclimatization Hike", "Trek Briefing"],
        highlights: ["Zuri Dzong viewpoint", "Trek preparation"],
      },
      {
        day: 2,
        title: "Begin Druk Path Trek",
        description:
          "Start your trek from Ta Dzong. Climb through blue pine and fir forests to reach Jele Dzong camp.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=2940&auto=format&fit=crop",
        accommodation: "Camping at Jele Dzong",
        activities: ["Trek to Jele Dzong", "Camp Setup"],
        highlights: ["First night camping", "Mountain vistas"],
      },
    ],
  },
  {
    id: "4",
    slug: "cultural-immersion-bhutan",
    title: "Cultural Immersion in Bhutan",
    description:
      "Deep dive into Bhutanese culture, traditions, and daily life. Stay with local families, participate in traditional crafts, and attend authentic festivals.",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=2940&auto=format&fit=crop",
    duration: "8 Days / 7 Nights",
    price: "From $4,500 per person",
    featured: false,
    category: "Cultural & Traditional",
    highlights: [
      "Farmhouse homestays",
      "Traditional cooking classes",
      "Archery competitions",
      "Weaving workshops",
      "Festival participation (seasonal)",
    ],
    days: [
      {
        day: 1,
        title: "Welcome to Bhutan",
        description:
          "Arrive in Paro and transfer to a traditional farmhouse. Learn about Bhutanese architecture and family life.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
        accommodation: "Traditional Farmhouse",
        activities: ["Farmhouse Tour", "Traditional Welcome Dinner"],
        highlights: ["Authentic Bhutanese home", "Family interaction"],
      },
    ],
  },
  {
    id: "5",
    slug: "bhutan-festival-tour",
    title: "Bhutan Festival Experience",
    description:
      "Time your visit to witness the spectacular Tshechu festivals. Masked dances, colorful costumes, and deep spiritual ceremonies come alive.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
    duration: "7 Days / 6 Nights",
    price: "From $5,200 per person",
    featured: false,
    category: "Festivals & Events",
    highlights: [
      "Paro or Thimphu Tshechu",
      "Masked dance performances",
      "Cham dance ceremonies",
      "Traditional costume experience",
      "Sacred blessing ceremonies",
    ],
    days: [
      {
        day: 1,
        title: "Arrival and Festival Preparation",
        description:
          "Arrive in Bhutan and prepare for the festival experience. Learn about the significance of Tshechu.",
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=2940&auto=format&fit=crop",
        accommodation: "Hotel in Paro/Thimphu",
        activities: ["Cultural Briefing", "Traditional Dress Fitting"],
        highlights: ["Festival preparation", "Cultural orientation"],
      },
    ],
  },
  {
    id: "6",
    slug: "bhutan-wellness-retreat",
    title: "Bhutan Wellness & Meditation Retreat",
    description:
      "Find inner peace in the Himalayan kingdom. Meditation sessions, yoga, traditional healing, and spiritual guidance combine for a transformative experience.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=2940&auto=format&fit=crop",
    duration: "9 Days / 8 Nights",
    price: "From $7,800 per person",
    featured: true,
    category: "Wellness & Spa",
    highlights: [
      "Daily meditation with monks",
      "Traditional hot stone baths",
      "Yoga in mountain settings",
      "Bhutanese healing therapies",
      "Silent retreat day",
    ],
    days: [
      {
        day: 1,
        title: "Arrival and Orientation",
        description:
          "Arrive at your wellness resort. Meet your meditation instructor and begin your journey to inner peace.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
        accommodation: "COMO Uma Paro",
        activities: ["Wellness Consultation", "Evening Meditation"],
        highlights: ["Resort orientation", "First meditation session"],
      },
    ],
  },
];
