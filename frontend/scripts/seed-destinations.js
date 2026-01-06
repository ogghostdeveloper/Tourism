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

const destinations = [
  {
    slug: "thimphu",
    name: "Thimphu",
    description: "The capital city of Bhutan, nestled in a valley at 2,300m. Home to the iconic Tashichho Dzong, vibrant markets, and cultural landmarks.",
    image: "/images/cinematic/thimphu.jpg",
    region: "Western Bhutan",
    coordinates: [27.5142, 89.6432],
    priority: 1,
  },
  {
    slug: "paro",
    name: "Paro",
    description: "The gateway to Bhutan, famous for the breathtaking Paro Taktsang (Tiger's Nest) monastery perched on a cliff at 3,120m.",
    image: "/images/cinematic/paro.jpg",
    region: "Western Bhutan",
    coordinates: [27.4089, 89.4117],
    priority: 2,
  },
  {
    slug: "punakha",
    name: "Punakha",
    description: "The former capital of Bhutan, known for the majestic Punakha Dzong at the confluence of the Pho and Mo Chhu rivers.",
    image: "/images/cinematic/punakha.jpg",
    region: "Western Bhutan",
    coordinates: [27.6049, 89.2637],
    priority: 3,
  },
  {
    slug: "wangdue-phodrang",
    name: "Wangdue Phodrang",
    description: "A traditional town with ancient dzong architecture overlooking the Pho Chhu river valley, gateway to central Bhutan.",
    image: "/images/cinematic/wangdue.jpg",
    region: "Western Bhutan",
    coordinates: [27.5115, 89.4487],
    priority: 4,
  },
  {
    slug: "trongsa",
    name: "Trongsa",
    description: "A scenic town in central Bhutan with the impressive Trongsa Dzong commanding the valley. Known for its mountainous terrain and natural beauty.",
    image: "/images/cinematic/trongsa.jpg",
    region: "Central Bhutan",
    coordinates: [27.3142, 90.4965],
    priority: 5,
  },
  {
    slug: "bumthang",
    name: "Bumthang",
    description: "A picturesque valley in the eastern highlands famous for its temples, apple orchards, and pristine natural landscapes.",
    image: "/images/cinematic/bumthang.jpg",
    region: "Eastern Bhutan",
    coordinates: [27.5542, 90.7397],
    priority: 6,
  },
];

async function seed() {
  try {
    await client.connect();
    const db = client.db(DB);
    const collection = db.collection("destinations");

    console.log("Seeding destinations...");

    // Check if destinations already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing destinations. Skipping...`);
      await client.close();
      process.exit(0);
    }

    // Insert destinations
    const result = await collection.insertMany(
      destinations.map((dest) => ({
        ...dest,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Successfully seeded ${result.insertedIds.length} destinations`);
    destinations.forEach((dest, index) => {
      console.log(`  ${index + 1}. ${dest.name} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding destinations:", error);
    await client.close();
    process.exit(1);
  }
}

seed();
