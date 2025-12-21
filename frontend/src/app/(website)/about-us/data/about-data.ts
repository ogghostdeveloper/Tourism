import { 
  Hero, 
  AboutSection, 
  MissionItem, 
  WhyBhutanItem, 
  SustainabilityItem 
} from "../schema";

export const aboutSectionsData = {
  hero: {
    title: "About Us",
    subtitle: "Discover the heart of Bhutan through authentic experiences",
    content: "Welcome to our journey through the Land of the Thunder Dragon",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
  },
  story: {
    title: "Our Story",
    content: "Founded with a passion for showcasing the beauty and culture of Bhutan, we are dedicated to creating meaningful travel experiences that connect you with the heart of this mystical kingdom. Our journey began with a simple belief: travel should transform, educate, and inspire.",
  },
  mission: {
    title: "Our Mission",
    content: "To provide travelers with authentic, sustainable, and transformative experiences that honor Bhutan's unique culture, environment, and philosophy of Gross National Happiness.",
  },
  purpose: {
    title: "Our Purpose",
    content: "We exist to bridge cultures, create understanding, and facilitate journeys that leave lasting positive impacts on both travelers and the communities they visit.",
  },
  sustainable: {
    title: "Sustainable Travel",
    content: "We are committed to responsible tourism practices that preserve Bhutan's pristine environment and rich cultural heritage for future generations. Every journey we create follows sustainable principles.",
  },
};

// Legacy structured data for backwards compatibility
export const heroData: Hero = {
  title: "ABOUT US",
  subtitle: "Discover Our Story",
  description: "Curators of remarkable travel experiences in the Kingdom of Happiness",
  backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop"
};

export const ourStoryData: AboutSection = {
  id: "our-story",
  title: "It Began with a Feeling",
  subtitle: "Our Story",
  content: [
    "Our journey started with a deep fascination for Bhutan—a land where happiness is measured not in wealth, but in the wellbeing of its people and the preservation of its culture.",
    "We wanted to create more than just tours. We envisioned experiences that would sweep aside the ordinary and connect travelers with the extraordinary spirit of the Himalayan kingdom.",
    "Since our founding, we've become curators of tailor-made travel experiences—all crafted with inspirational care and an incomparable attention to detail. For us, the most important question has always been: how do you want to feel?"
  ],
  image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
  order: 1
};

export const missionItems: MissionItem[] = [
  {
    id: "authentic-connections",
    title: "Authentic Connections",
    description: "We curate trips for travelers who want to see Bhutan up close—foregoing tourist traps in favor of deeper and more intimate connections with the culture and its people.",
    order: 1
  },
  {
    id: "sustainable-tourism",
    title: "Sustainable Tourism",
    description: "Our commitment to sustainable tourism aligns with Bhutan's philosophy of preserving its pristine environment and rich cultural heritage for future generations.",
    order: 2
  },
  {
    id: "local-communities",
    title: "Local Communities",
    description: "Every journey we design supports local communities, from family-run homestays to traditional craftsmen, ensuring your travel makes a positive impact.",
    order: 3
  },
  {
    id: "tailored-experiences",
    title: "Tailored Experiences",
    description: "We design all journeys from the ground up, ensuring no two trips are ever quite alike. Your experience will be as unique as you are.",
    order: 4
  }
];

export const ourPurposeData: AboutSection = {
  id: "our-purpose",
  title: "Travel with Purpose",
  subtitle: "Our Purpose",
  content: [
    "We believe travel should be transformative. Every journey we craft is designed to leave you changed—enriched by the places you've been, the people you've met, and the experiences you've collected.",
    "Our purpose is to open doors to Bhutan's hidden treasures while ensuring that tourism contributes positively to the preservation of its unique way of life.",
    "When you travel with us, you're not just a visitor—you become part of Bhutan's story, and Bhutan becomes part of yours."
  ],
  image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
  order: 2
};

export const sustainabilityItems: SustainabilityItem[] = [
  {
    id: "carbon-negative",
    title: "Carbon Negative Country",
    description: "Bhutan is the world's only carbon-negative country, absorbing more CO2 than it produces. We support initiatives that maintain this remarkable achievement.",
    order: 1
  },
  {
    id: "eco-friendly-practices",
    title: "Eco-Friendly Practices",
    description: "From minimizing plastic use to supporting renewable energy projects, we ensure our operations align with Bhutan's environmental values.",
    order: 2
  },
  {
    id: "cultural-preservation",
    title: "Cultural Preservation",
    description: "We work closely with local communities to ensure tourism supports rather than disrupts traditional ways of life and cultural practices.",
    order: 3
  },
  {
    id: "responsible-tourism",
    title: "Responsible Tourism",
    description: "Our high-value, low-impact approach ensures that tourism benefits are distributed widely while protecting Bhutan's pristine environment.",
    order: 4
  }
];

export const whyBhutanItems: WhyBhutanItem[] = [
  {
    id: "gross-national-happiness",
    title: "Gross National Happiness",
    icon: "smile",
    description: "Bhutan measures progress through Gross National Happiness rather than GDP, prioritizing the wellbeing of its people and environment over economic growth alone.",
    order: 1
  },
  {
    id: "pristine-nature",
    title: "Pristine Nature",
    icon: "mountain",
    description: "With 72% forest coverage and a constitutional mandate to maintain at least 60% of the land under forest cover, Bhutan offers some of the world's most pristine landscapes.",
    order: 2
  },
  {
    id: "living-culture",
    title: "Living Culture",
    icon: "heart",
    description: "In Bhutan, culture isn't preserved in museums—it's alive in daily life. From traditional dress to ancient festivals, Bhutanese culture thrives in the modern world.",
    order: 3
  },
  {
    id: "spiritual-heritage",
    title: "Spiritual Heritage",
    icon: "sparkles",
    description: "Buddhism permeates every aspect of Bhutanese life, offering travelers a chance to explore profound spiritual traditions and practices in their authentic context.",
    order: 4
  },
  {
    id: "sustainable-development",
    title: "Sustainable Development",
    icon: "leaf",
    description: "Bhutan's approach to development balances modernization with tradition, proving that progress and preservation can coexist harmoniously.",
    order: 5
  },
  {
    id: "exclusive-access",
    title: "Exclusive Access",
    icon: "key",
    description: "Bhutan's high-value tourism policy means fewer crowds and more meaningful interactions, offering an exclusive and intimate travel experience.",
    order: 6
  }
];
