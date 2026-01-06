import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const DB = process.env.MONGODB_DB || "bhutan_tourism";

async function seed() {
  try {
    await client.connect();
    const db = client.db(DB);

    console.log("Seeding tours...");

    // Get hotels and experiences
    const hotels = await db.collection("hotels").find({}).toArray();
    const experiences = await db.collection("experiences").find({}).toArray();

    if (hotels.length === 0 || experiences.length === 0) {
      console.error("Please seed hotels and experiences first");
      console.error(`Hotels found: ${hotels.length}, Experiences found: ${experiences.length}`);
      await client.close();
      process.exit(1);
    }

    // Helper to safely get hotel by index or slug
    const getHotel = (slugOrIndex) => {
      if (typeof slugOrIndex === "number") {
        if (hotels[slugOrIndex]) return hotels[slugOrIndex];
        // Fallback to first available hotel
        console.warn(`Hotel at index ${slugOrIndex} not found, using first available`);
        return hotels[0];
      }
      const found = hotels.find((h) => h.slug === slugOrIndex);
      if (!found) {
        console.warn(`Hotel with slug "${slugOrIndex}" not found, using first available`);
        return hotels[0];
      }
      return found;
    };

    // Helper to safely get experience by slug
    const getExperience = (slug) => {
      const found = experiences.find((e) => e.slug === slug);
      if (!found) {
        console.warn(`Experience with slug "${slug}" not found`);
        return null;
      }
      return found;
    };

    const toursCollection = db.collection("tours");

    // Check if tours already exist
    const existingCount = await toursCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing tours. Skipping...`);
      await client.close();
      process.exit(0);
    }

    // Filter and safely build tours
    const tours = [
      {
        slug: "classic-bhutan-5-days",
        title: "Classic Bhutan 5-Day Tour",
        description:
          "Experience the essence of Bhutan with visits to the iconic Tiger's Nest Monastery, Punakha Dzong, and traditional villages.",
        image: "/images/cinematic/classic-bhutan.jpg",
        duration: "5 days",
        price: 3500,
        priority: 1,
        category: "Cultural",
        highlights: [
          "Tiger's Nest Monastery",
          "Punakha Dzong",
          "Local Village Visit",
          "Traditional Cooking Class",
        ],
        days: [
          {
            day: 1,
            title: "Arrival in Paro",
            description:
              "Arrive at Paro International Airport and transfer to your hotel. Rest and acclimatize.",
            image: "/images/cinematic/day1.jpg",
            hotelId: getHotel("amankora-paro")?._id?.toString() || null,
            items: [
              {
                type: "travel",
                travel: {
                  from: "Paro Airport",
                  to: "Paro Hotel",
                },
                order: 1,
              },
            ],
            accommodation: "Amankora Paro",
            activities: ["Hotel Check-in", "Rest"],
          },
          {
            day: 2,
            title: "Tiger's Nest Trek",
            description:
              "Early morning trek to the iconic Tiger's Nest Monastery perched at 3,120 meters.",
            image: "/images/cinematic/tigers-nest.jpg",
            hotelId: getHotel("amankora-paro")?._id?.toString() || null,
            items: getExperience("tiger-nest-hike")
              ? [
                  {
                    type: "experience",
                    experienceId: getExperience("tiger-nest-hike")?._id?.toString(),
                    order: 1,
                  },
                ]
              : [],
            accommodation: "Amankora Paro",
            activities: ["Tiger's Nest Trek", "Photography"],
            highlights: ["Breathtaking views", "Sacred monastery"],
          },
          {
            day: 3,
            title: "Journey to Punakha",
            description:
              "Drive to Punakha, visiting the highest road pass en route. Explore Punakha Dzong in the afternoon.",
            image: "/images/cinematic/punakha-journey.jpg",
            hotelId: getHotel("bhutan-kuen-nyam")?._id?.toString() || null,
            items: [
              {
                type: "travel",
                travel: {
                  from: "Paro",
                  to: "Punakha",
                },
                order: 1,
              },
              ...(getExperience("punakha-dzong-visit")
                ? [
                    {
                      type: "experience",
                      experienceId: getExperience("punakha-dzong-visit")?._id?.toString(),
                      order: 2,
                    },
                  ]
                : []),
            ],
            accommodation: "Bhutan Kuen Nyam Hotel",
            activities: ["Dochu La Pass", "Punakha Dzong Tour"],
          },
          {
            day: 4,
            title: "Phobjikha Valley & Crane Spotting",
            description:
              "Drive to Phobjikha Valley and spot endangered black-necked cranes during winter migration.",
            image: "/images/cinematic/crane-spotting.jpg",
            hotelId: getHotel("wangdue-valley-resort")?._id?.toString() || null,
            items: getExperience("black-necked-crane-spotting")
              ? [
                  {
                    type: "experience",
                    experienceId: getExperience("black-necked-crane-spotting")?._id?.toString(),
                    order: 1,
                  },
                ]
              : [],
            accommodation: "Wangdue Valley Resort",
            activities: ["Nature Walk", "Bird Watching"],
          },
          {
            day: 5,
            title: "Return to Paro & Departure",
            description:
              "Return drive to Paro. Afternoon visit to local markets before departure.",
            image: "/images/cinematic/paro-market.jpg",
            items: [
              {
                type: "travel",
                travel: {
                  from: "Wangdue Phodrang",
                  to: "Paro Airport",
                },
                order: 1,
              },
            ],
            accommodation: "Airport Transfer",
            activities: ["Paro Market Visit", "Departure"],
          },
        ],
      },
    ].filter(tour => tour.days.length > 0);

    // Insert tours
    const result = await toursCollection.insertMany(
      tours.map((tour) => ({
        ...tour,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Successfully seeded ${result.insertedIds.length} tours`);
    tours.forEach((tour, index) => {
      console.log(`  ${index + 1}. ${tour.title} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding tours:", error);
    await client.close();
    process.exit(1);
  }
}

seed();
