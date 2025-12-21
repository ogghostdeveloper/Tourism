import { Experience } from "../schema";

export const experiences: Experience[] = [
    // Thimphu experiences
    {
        slug: "wellness",
        title: "Wellness & Rejuvenation",
        category: "Relaxation",
        description: "Bhutan is a sanctuary for the soul. Immerse yourself in traditional healing practices, from hot stone baths to meditation retreats in serene monasteries. Our wellness journeys are designed to restore balance to your mind, body, and spirit.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=2940&auto=format&fit=crop",
        coordinates: [27.4728, 89.6393],
        destinationSlug: "thimphu",
        gallery: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1545389336-cf090694435e?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "thimphu-heritage-walk",
        title: "Thimphu Heritage Walk",
        category: "Culture",
        description: "Discover the capital's blend of tradition and modernity through historic sites and bustling markets.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
        duration: "4 Hours",
        difficulty: "Easy",
        coordinates: [27.4728, 89.6393],
        destinationSlug: "thimphu",
        gallery: [
            "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "buddha-dordenma-visit",
        title: "Buddha Dordenma Visit",
        category: "Culture",
        description: "Visit the giant golden Buddha statue overlooking Thimphu valley, a symbol of peace and prosperity.",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.4728, 89.6393],
        destinationSlug: "thimphu",
        gallery: []
    },
    {
        slug: "takin-preserve-tour",
        title: "Takin Preserve Tour",
        category: "Nature",
        description: "Meet Bhutan's unique national animal, the Takin, in its natural habitat within the preserve.",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.4728, 89.6393],
        destinationSlug: "thimphu",
        gallery: []
    },
    {
        slug: "tashichho-dzong-tour",
        title: "Tashichho Dzong Tour",
        category: "Culture",
        description: "Explore the impressive fortress monastery that houses the throne room and government offices.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
        duration: "3 Hours",
        difficulty: "Easy",
        coordinates: [27.4728, 89.6393],
        destinationSlug: "thimphu",
        gallery: []
    },
    {
        slug: "memorial-chorten-visit",
        title: "Memorial Chorten Visit",
        category: "Culture",
        description: "Experience the spiritual heart of Thimphu at this iconic white stupa where locals come to pray.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.4728, 89.6393],
        destinationSlug: "thimphu",
        gallery: []
    },

    // Paro experiences
    {
        slug: "paro-adventure",
        title: "Adventure & Trekking",
        category: "Adventure",
        description: "Challenge yourself with treks through remote mountain passes and valleys. From the legendary Snowman Trek to the iconic Tiger's Nest hike, Bhutan offers adventures for all skill levels.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
        duration: "5-14 Days",
        difficulty: "Challenging",
        coordinates: [27.4919, 89.3635],
        destinationSlug: "paro",
        gallery: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "tigers-nest-hike",
        title: "Tiger's Nest Hike",
        category: "Adventure",
        description: "Hike to the iconic Paro Taktsang monastery, perched on a cliffside 900m above the valley floor.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
        duration: "5-6 Hours",
        difficulty: "Moderate",
        coordinates: [27.4919, 89.3635],
        destinationSlug: "paro",
        gallery: [
            "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "paro-dzong-tour",
        title: "Rinpung Dzong Tour",
        category: "Culture",
        description: "Explore the impressive Paro Dzong fortress with stunning views of the valley below.",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.4287, 89.4164],
        destinationSlug: "paro",
        gallery: []
    },
    {
        slug: "kyichu-lhakhang-visit",
        title: "Kyichu Lhakhang Visit",
        category: "Culture",
        description: "Visit one of Bhutan's oldest and most sacred temples, built in the 7th century.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.4287, 89.4164],
        destinationSlug: "paro",
        gallery: []
    },
    {
        slug: "paro-valley-cycling",
        title: "Paro Valley Cycling",
        category: "Adventure",
        description: "Cycle through the scenic Paro valley, passing rice fields, farmhouses, and ancient temples.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
        duration: "3-4 Hours",
        difficulty: "Moderate",
        coordinates: [27.4287, 89.4164],
        destinationSlug: "paro",
        gallery: []
    },
    {
        slug: "national-museum-visit",
        title: "National Museum Visit",
        category: "Culture",
        description: "Discover Bhutan's rich cultural heritage at the National Museum housed in the ancient Ta Dzong.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.4287, 89.4164],
        destinationSlug: "paro",
        gallery: []
    },

    // Punakha experiences
    {
        slug: "punakha-dzong-visit",
        title: "Punakha Dzong Visit",
        category: "Culture",
        description: "Explore the stunning architecture of Punakha Dzong, the second oldest and second largest dzong in Bhutan.",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2940&auto=format&fit=crop",
        duration: "3 Hours",
        difficulty: "Easy",
        coordinates: [27.5921, 89.8797],
        destinationSlug: "punakha",
        gallery: [
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "rafting-phochhu",
        title: "Rafting on Pho Chhu",
        category: "Adventure",
        description: "Exhilarating white water rafting past the Punakha Dzong.",
        image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=2940&auto=format&fit=crop",
        duration: "4 Hours",
        difficulty: "Moderate",
        coordinates: [27.6000, 89.9000],
        destinationSlug: "punakha",
        gallery: [
            "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484264883307-f094e67c5f69?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "chimi-lhakhang-trek",
        title: "Chimi Lhakhang Trek",
        category: "Culture",
        description: "Walk through rice fields to the fertility temple, learning about local traditions and blessings.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.5833, 89.8667],
        destinationSlug: "punakha",
        gallery: []
    },
    {
        slug: "suspension-bridge-walk",
        title: "Suspension Bridge Walk",
        category: "Adventure",
        description: "Cross Bhutan's longest suspension bridge with prayer flags fluttering in the breeze.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.5833, 89.8667],
        destinationSlug: "punakha",
        gallery: []
    },
    {
        slug: "khamsum-yulley-chorten-hike",
        title: "Khamsum Yulley Chorten Hike",
        category: "Adventure",
        description: "Hike through terraced fields to this stunning temple with panoramic valley views.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop",
        duration: "3 Hours",
        difficulty: "Moderate",
        coordinates: [27.5833, 89.8667],
        destinationSlug: "punakha",
        gallery: []
    },
    {
        slug: "punakha-rice-field-walk",
        title: "Rice Field Walk",
        category: "Nature",
        description: "Stroll through verdant rice terraces and experience rural Bhutanese farming life.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.5833, 89.8667],
        destinationSlug: "punakha",
        gallery: []
    },

    // Bumthang experiences
    {
        slug: "festivals",
        title: "Festivals & Culture",
        category: "Culture",
        description: "Experience the vibrant heartbeat of Bhutan through its Tshechus. Witness masked dances, receive blessings, and join locals in celebrating their rich heritage. These festivals are a riot of color and spiritual energy.",
        image: "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=2940&auto=format&fit=crop",
        coordinates: [27.5921, 90.4183],
        destinationSlug: "bumthang",
        gallery: [
            "https://images.unsplash.com/photo-1528114039593-4366cc08227d?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "spiritual",
        title: "Spiritual Journeys",
        category: "Culture",
        description: "Connect with Bhutan's deep spiritual roots. Visit ancient monasteries, join monks in prayer, and learn about Buddhism from respected lamas. These journeys offer profound insights into mindfulness and compassion.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "3-7 Days",
        difficulty: "Easy",
        coordinates: [27.5500, 90.7333],
        destinationSlug: "bumthang",
        gallery: [
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "bumthang-cultural-immersion",
        title: "Bumthang Cultural Immersion",
        category: "Culture",
        description: "Experience authentic Bhutanese village life, learn traditional crafts, and visit ancient temples in the spiritual heartland.",
        image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=2940&auto=format&fit=crop",
        duration: "Full Day",
        difficulty: "Easy",
        coordinates: [27.5500, 90.7333],
        destinationSlug: "bumthang",
        gallery: [
            "https://images.unsplash.com/photo-1528114039593-4366cc08227d?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "jakar-dzong-visit",
        title: "Jakar Dzong Visit",
        category: "Culture",
        description: "Explore the 'Fortress of the White Bird' with its commanding views over the Bumthang valley.",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.5500, 90.7333],
        destinationSlug: "bumthang",
        gallery: []
    },
    {
        slug: "jambay-lhakhang-visit",
        title: "Jambay Lhakhang Visit",
        category: "Culture",
        description: "Visit this ancient 7th-century temple, one of the oldest in Bhutan.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.5500, 90.7333],
        destinationSlug: "bumthang",
        gallery: []
    },
    {
        slug: "kurjey-lhakhang-pilgrimage",
        title: "Kurjey Lhakhang Pilgrimage",
        category: "Culture",
        description: "Walk through the sacred monastery complex where Guru Rinpoche meditated.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.5500, 90.7333],
        destinationSlug: "bumthang",
        gallery: []
    },
    {
        slug: "bumthang-brewery-tour",
        title: "Bumthang Brewery Tour",
        category: "Culture",
        description: "Visit the famous Red Panda beer brewery and learn about Bhutan's brewing traditions.",
        image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.5500, 90.7333],
        destinationSlug: "bumthang",
        gallery: []
    },

    // Gangtey experiences
    {
        slug: "gangtey-nature",
        title: "Nature & Wildlife",
        category: "Nature",
        description: "As the world's only carbon-negative country, Bhutan offers untouched landscapes. Explore pristine forests, spot rare wildlife like the black-necked crane, and breathe the purest air in the Himalayas.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop",
        coordinates: [27.4526, 90.1917],
        destinationSlug: "gangtey",
        gallery: [
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "black-necked-crane-tour",
        title: "Black-Necked Crane Tour",
        category: "Nature",
        description: "Visit the Gangtey Valley to witness the rare and graceful black-necked cranes during winter months.",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=2940&auto=format&fit=crop",
        duration: "Half Day",
        difficulty: "Easy",
        coordinates: [27.4526, 90.1917],
        destinationSlug: "gangtey",
        gallery: [
            "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "gangtey-monastery-visit",
        title: "Gangtey Monastery Visit",
        category: "Culture",
        description: "Visit the hilltop monastery with stunning views over the Phobjikha Valley.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.4667, 90.1667],
        destinationSlug: "gangtey",
        gallery: []
    },
    {
        slug: "gangtey-nature-trail",
        title: "Gangtey Nature Trail",
        category: "Nature",
        description: "Walk through pristine forests and meadows with panoramic views of the valley.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop",
        duration: "3 Hours",
        difficulty: "Easy",
        coordinates: [27.4667, 90.1667],
        destinationSlug: "gangtey",
        gallery: []
    },
    {
        slug: "crane-information-center",
        title: "Crane Information Center",
        category: "Nature",
        description: "Learn about conservation efforts and the migration patterns of the rare black-necked cranes.",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.4667, 90.1667],
        destinationSlug: "gangtey",
        gallery: []
    },
    {
        slug: "phobjikha-valley-cycling",
        title: "Phobjikha Valley Cycling",
        category: "Adventure",
        description: "Cycle through the stunning glacial valley surrounded by mountains and farmlands.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
        duration: "4 Hours",
        difficulty: "Moderate",
        coordinates: [27.4667, 90.1667],
        destinationSlug: "gangtey",
        gallery: []
    },
    {
        slug: "farmhouse-homestay-experience",
        title: "Farmhouse Homestay Experience",
        category: "Culture",
        description: "Stay with a local family and experience traditional Bhutanese rural life firsthand.",
        image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=2940&auto=format&fit=crop",
        duration: "Full Day",
        difficulty: "Easy",
        coordinates: [27.4667, 90.1667],
        destinationSlug: "gangtey",
        gallery: []
    },

    // Haa Valley experiences
    {
        slug: "haa-valley-exploration",
        title: "Haa Valley Exploration",
        category: "Nature",
        description: "Venture off the beaten path to discover one of Bhutan's most pristine and untouched valleys.",
        image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=2940&auto=format&fit=crop",
        duration: "Full Day",
        difficulty: "Moderate",
        coordinates: [27.3133, 89.2267],
        destinationSlug: "haa",
        gallery: [
            "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop"
        ]
    },
    {
        slug: "lhakhang-karpo-visit",
        title: "Lhakhang Karpo Visit",
        category: "Culture",
        description: "Visit the White Temple, one of the most sacred sites in the Haa Valley.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.3833, 89.2833],
        destinationSlug: "haa",
        gallery: []
    },
    {
        slug: "lhakhang-nagpo-visit",
        title: "Lhakhang Nagpo Visit",
        category: "Culture",
        description: "Explore the Black Temple and learn about the legend of the three brother hills.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
        duration: "1 Hour",
        difficulty: "Easy",
        coordinates: [27.3833, 89.2833],
        destinationSlug: "haa",
        gallery: []
    },
    {
        slug: "haa-summer-festival",
        title: "Haa Summer Festival",
        category: "Culture",
        description: "Experience the unique animistic traditions and nomadic culture of the Haa Valley.",
        image: "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=2940&auto=format&fit=crop",
        duration: "Full Day",
        difficulty: "Easy",
        coordinates: [27.3833, 89.2833],
        destinationSlug: "haa",
        gallery: []
    },
    {
        slug: "haa-valley-trek",
        title: "Haa Valley Trek",
        category: "Adventure",
        description: "Trek through virgin forests and mountain passes in one of Bhutan's most remote valleys.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=2940&auto=format&fit=crop",
        duration: "2-3 Days",
        difficulty: "Challenging",
        coordinates: [27.3833, 89.2833],
        destinationSlug: "haa",
        gallery: []
    },
    {
        slug: "haa-apple-orchard-tour",
        title: "Apple Orchard Tour",
        category: "Nature",
        description: "Visit local apple orchards and taste fresh produce from this fertile valley.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2940&auto=format&fit=crop",
        duration: "2 Hours",
        difficulty: "Easy",
        coordinates: [27.3833, 89.2833],
        destinationSlug: "haa",
        gallery: []
    },
    {
        slug: "haa-traditional-village-walk",
        title: "Traditional Village Walk",
        category: "Culture",
        description: "Walk through authentic Bhutanese villages and experience the warm hospitality of locals.",
        image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=2940&auto=format&fit=crop",
        duration: "3 Hours",
        difficulty: "Easy",
        coordinates: [27.3833, 89.2833],
        destinationSlug: "haa",
        gallery: []
    }
];
