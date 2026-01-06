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

const experienceTypes = [
  {
    slug: "hiking",
    title: "Hiking & Trekking",
    description: "Explore Bhutan's pristine mountain trails and enjoy breathtaking views of the Himalayan landscape.",
    image: "/images/cinematic/hiking.jpg",
    displayOrder: 1,
  },
  {
    slug: "cultural",
    title: "Cultural Tours",
    description: "Immerse yourself in Bhutanese culture, visit monasteries, and interact with local communities.",
    image: "/images/cinematic/cultural.jpg",
    displayOrder: 2,
  },
  {
    slug: "adventure",
    title: "Adventure Sports",
    description: "Thrilling activities including rafting, rock climbing, and mountain biking in scenic locations.",
    image: "/images/cinematic/adventure.jpg",
    displayOrder: 3,
  },
  {
    slug: "wellness",
    title: "Wellness & Spa",
    description: "Relax and rejuvenate with traditional Bhutanese hot stone baths and wellness treatments.",
    image: "/images/cinematic/wellness.jpg",
    displayOrder: 4,
  },
  {
    slug: "wildlife",
    title: "Wildlife & Nature",
    description: "Discover Bhutan's diverse fauna and pristine ecosystems with guided nature walks.",
    image: "/images/cinematic/wildlife.jpg",
    displayOrder: 5,
  },
  {
    slug: "photography",
    title: "Photography Tours",
    description: "Capture stunning landscapes and cultural moments with professional photography guides.",
    image: "/images/cinematic/photography.jpg",
    displayOrder: 6,
  },
  {
    slug: "food",
    title: "Food & Culinary",
    description: "Experience authentic Bhutanese cuisine and learn traditional cooking methods.",
    image: "/images/cinematic/food.jpg",
    displayOrder: 7,
  },
];

async function seed() {
  try {
    await client.connect();
    const db = client.db(DB);
    const collection = db.collection("experience_types");

    console.log("Seeding experience types...");

    // Check if experience types already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing experience types. Skipping...`);
      await client.close();
      process.exit(0);
    }

    // Insert experience types
    const result = await collection.insertMany(
      experienceTypes.map((type) => ({
        ...type,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Successfully seeded ${result.insertedIds.length} experience types`);
    experienceTypes.forEach((type, index) => {
      console.log(`  ${index + 1}. ${type.title} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding experience types:", error);
    await client.close();
    process.exit(1);
  }
}

seed();
