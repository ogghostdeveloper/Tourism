import { MongoClient, ObjectId } from "mongodb";
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

    console.log("Seeding experiences...");

    // Get experience types to link to
    const experienceTypes = await db
      .collection("experience-types")
      .find({})
      .toArray();

    // Get destinations to link to
    const destinations = await db
      .collection("destinations")
      .find({})
      .toArray();

    if (experienceTypes.length === 0 || destinations.length === 0) {
      console.error("Please seed experience-types and destinations first");
      await client.close();
      process.exit(1);
    }

    const experiencesCollection = db.collection("experiences");

    // Check if experiences already exist
    const existingCount = await experiencesCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing experiences. Skipping...`);
      await client.close();
      process.exit(0);
    }

    const experiences = [
      {
        slug: "tiger-nest-hike",
        title: "Tiger's Nest Monastery Trek",
        category: experienceTypes[0]._id.toString(), // hiking
        description:
          "An iconic 3-hour trek to the cliffside monastery of Paro Taktsang, perched at 3,120 meters above the valley floor.",
        image: "/images/cinematic/tigers-nest.jpg",
        duration: "3-4 hours",
        difficulty: "Moderate",
        destinations: [destinations.find((d) => d.slug === "paro")._id.toString()],
        destinationSlug: "paro",
        gallery: [
          "/images/cinematic/tigers-nest-1.jpg",
          "/images/cinematic/tigers-nest-2.jpg",
        ],
        coordinates: [27.3245, 89.2748],
      },
      {
        slug: "druk-path-trek",
        title: "Druk Path Trek",
        category: experienceTypes[0]._id.toString(), // hiking
        description:
          "A three-day challenging trek offering panoramic views of the Eastern Himalayan mountains with pristine alpine meadows.",
        image: "/images/cinematic/druk-path.jpg",
        duration: "3 days",
        difficulty: "Challenging",
        destinations: [
          destinations.find((d) => d.slug === "thimphu")._id.toString(),
          destinations.find((d) => d.slug === "paro")._id.toString(),
        ],
        destinationSlug: "thimphu",
        gallery: [
          "/images/cinematic/druk-path-1.jpg",
          "/images/cinematic/druk-path-2.jpg",
        ],
      },
      {
        slug: "bumdrak-monastery-tour",
        title: "Bumdrak Monastery Tour",
        category: experienceTypes[1]._id.toString(), // cultural
        description:
          "Visit the sacred Bumdrak monastery, perched on a cliffside with spiritual significance dating back centuries.",
        image: "/images/cinematic/bumdrak.jpg",
        duration: "2-3 hours",
        difficulty: "Easy",
        destinations: [destinations.find((d) => d.slug === "bumthang")._id.toString()],
        destinationSlug: "bumthang",
        gallery: ["/images/cinematic/bumdrak-1.jpg"],
        coordinates: [27.5453, 90.7512],
      },
      {
        slug: "punakha-dzong-visit",
        title: "Punakha Dzong Tour",
        category: experienceTypes[1]._id.toString(), // cultural
        description:
          "Explore the majestic Punakha Dzong, a stunning example of Bhutanese architecture at the confluence of two rivers.",
        image: "/images/cinematic/punakha-dzong.jpg",
        duration: "2 hours",
        difficulty: "Easy",
        destinations: [
          destinations.find((d) => d.slug === "punakha")._id.toString(),
        ],
        destinationSlug: "punakha",
      },
      {
        slug: "pho-chhu-rafting",
        title: "Pho Chhu River Rafting",
        category: experienceTypes[2]._id.toString(), // adventure
        description:
          "Experience thrilling white-water rafting on the scenic Pho Chhu river with Class II and III rapids.",
        image: "/images/cinematic/rafting.jpg",
        duration: "4 hours",
        difficulty: "Moderate",
        destinations: [
          destinations.find((d) => d.slug === "punakha")._id.toString(),
        ],
        destinationSlug: "punakha",
      },
      {
        slug: "bhutan-hot-stone-bath",
        title: "Traditional Hot Stone Bath",
        category: experienceTypes[3]._id.toString(), // wellness
        description:
          "Relax in a traditional Bhutanese hot stone bath filled with medicinal herbs and warmed stones.",
        image: "/images/cinematic/hot-stone-bath.jpg",
        duration: "2 hours",
        difficulty: "Easy",
        destinations: [
          destinations.find((d) => d.slug === "thimphu")._id.toString(),
        ],
        destinationSlug: "thimphu",
      },
      {
        slug: "black-necked-crane-spotting",
        title: "Black-Necked Crane Spotting",
        category: experienceTypes[4]._id.toString(), // wildlife
        description:
          "Observe the rare and endangered black-necked cranes during their winter migration in the Phobjikha Valley.",
        image: "/images/cinematic/crane-spotting.jpg",
        duration: "Half day",
        difficulty: "Easy",
        destinations: [
          destinations.find((d) => d.slug === "wangdue-phodrang")._id.toString(),
        ],
        destinationSlug: "wangdue-phodrang",
      },
      {
        slug: "mountain-photography-tour",
        title: "Mountain Photography Tour",
        category: experienceTypes[5]._id.toString(), // photography
        description:
          "Capture stunning mountain landscapes and sunrise/sunset views with professional photography guidance.",
        image: "/images/cinematic/photo-tour.jpg",
        duration: "Full day",
        difficulty: "Moderate",
        destinations: [
          destinations.find((d) => d.slug === "bumthang")._id.toString(),
          destinations.find((d) => d.slug === "trongsa")._id.toString(),
        ],
        destinationSlug: "bumthang",
      },
      {
        slug: "traditional-cooking-class",
        title: "Traditional Bhutanese Cooking Class",
        category: experienceTypes[6]._id.toString(), // food
        description:
          "Learn to cook authentic Bhutanese dishes like ema datshi and momos with local chefs.",
        image: "/images/cinematic/cooking-class.jpg",
        duration: "3 hours",
        difficulty: "Easy",
        destinations: [
          destinations.find((d) => d.slug === "thimphu")._id.toString(),
        ],
        destinationSlug: "thimphu",
      },
    ];

    // Insert experiences
    const result = await experiencesCollection.insertMany(
      experiences.map((exp) => ({
        ...exp,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Successfully seeded ${result.insertedIds.length} experiences`);
    experiences.forEach((exp, index) => {
      console.log(`  ${index + 1}. ${exp.title} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding experiences:", error);
    await client.close();
    process.exit(1);
  }
}

seed();
