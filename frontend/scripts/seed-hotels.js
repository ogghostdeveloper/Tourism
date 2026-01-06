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

    console.log("Seeding hotels...");

    // Get destinations
    const destinations = await db
      .collection("destinations")
      .find({})
      .toArray();

    if (destinations.length === 0) {
      console.error("Please seed destinations first");
      await client.close();
      process.exit(1);
    }

    const hotelsCollection = db.collection("hotels");

    // Check if hotels already exist
    const existingCount = await hotelsCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing hotels. Skipping...`);
      await client.close();
      process.exit(0);
    }

    const hotels = [
      {
        name: "Druk Hotel Thimphu",
        slug: "druk-hotel-thimphu",
        location: "Thimphu City Center",
        description:
          "A luxury 5-star hotel in the heart of Thimphu offering world-class amenities and panoramic city views.",
        image: "/images/cinematic/druk-hotel.jpg",
        destinationSlug: "thimphu",
        destinationId: destinations.find((d) => d.slug === "thimphu")._id.toString(),
        rating: 5,
        amenities: ["WiFi", "Restaurant", "Spa", "Fitness Center", "Concierge"],
        priceRange: "$$$$",
        rooms: 67,
        coordinates: [27.5133, 89.6408],
      },
      {
        name: "Amankora Paro",
        slug: "amankora-paro",
        location: "Paro Valley",
        description:
          "An exclusive luxury resort featuring traditional Bhutanese architecture and contemporary comforts.",
        image: "/images/cinematic/amankora.jpg",
        destinationSlug: "paro",
        destinationId: destinations.find((d) => d.slug === "paro")._id.toString(),
        rating: 5,
        amenities: [
          "Spa",
          "Fine Dining",
          "Yoga",
          "Private Guide",
          "Hot Spring",
        ],
        priceRange: "$$$$",
        rooms: 24,
        coordinates: [27.4123, 89.4089],
      },
      {
        name: "Bhutan Kuen Nyam Hotel",
        slug: "bhutan-kuen-nyam",
        location: "Punakha",
        description:
          "A charming mid-range hotel with stunning views of Punakha Dzong and the surrounding valleys.",
        image: "/images/cinematic/kuen-nyam.jpg",
        destinationSlug: "punakha",
        destinationId: destinations.find((d) => d.slug === "punakha")._id.toString(),
        rating: 4,
        amenities: ["Restaurant", "Bar", "Garden", "WiFi", "Parking"],
        priceRange: "$$$",
        rooms: 32,
      },
      {
        name: "Trongsa Dewachen Hotel",
        slug: "trongsa-dewachen",
        location: "Trongsa Town",
        description:
          "A comfortable hotel with traditional Bhutanese décor overlooking the Trongsa valley and ancient dzong.",
        image: "/images/cinematic/trongsa-hotel.jpg",
        destinationSlug: "trongsa",
        destinationId: destinations.find((d) => d.slug === "trongsa")._id.toString(),
        rating: 4,
        amenities: ["Restaurant", "Conference Room", "Garden", "WiFi"],
        priceRange: "$$$",
        rooms: 20,
      },
      {
        name: "Bumthang Eco Resort",
        slug: "bumthang-eco-resort",
        location: "Bumthang Valley",
        description:
          "An eco-friendly resort nestled in the pristine Bumthang valley with organic gardens and sustainable practices.",
        image: "/images/cinematic/bumthang-resort.jpg",
        destinationSlug: "bumthang",
        destinationId: destinations.find((d) => d.slug === "bumthang")._id.toString(),
        rating: 4,
        amenities: ["Organic Restaurant", "Yoga", "Hiking", "Meditation"],
        priceRange: "$$$",
        rooms: 18,
      },
      {
        name: "Wangdue Valley Resort",
        slug: "wangdue-valley-resort",
        location: "Wangdue Phodrang",
        description:
          "A scenic resort with easy access to Phobjikha Valley and traditional Bhutanese village experiences.",
        image: "/images/cinematic/wangdue-resort.jpg",
        destinationSlug: "wangdue-phodrang",
        destinationId: destinations
          .find((d) => d.slug === "wangdue-phodrang")
          ._id.toString(),
        rating: 3,
        amenities: ["Restaurant", "Nature Walks", "Photography", "Parking"],
        priceRange: "$$",
        rooms: 25,
      },
      {
        name: "Paro Gateway Hotel",
        slug: "paro-gateway-hotel",
        location: "Paro Town",
        description:
          "Budget-friendly hotel conveniently located near Paro Airport with easy access to major attractions.",
        image: "/images/cinematic/paro-gateway.jpg",
        destinationSlug: "paro",
        destinationId: destinations.find((d) => d.slug === "paro")._id.toString(),
        rating: 3,
        amenities: ["Restaurant", "WiFi", "Airport Transfer", "Tour Desk"],
        priceRange: "$$",
        rooms: 40,
      },
    ];

    // Insert hotels
    const result = await hotelsCollection.insertMany(
      hotels.map((hotel) => ({
        ...hotel,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Successfully seeded ${result.insertedIds.length} hotels`);
    hotels.forEach((hotel, index) => {
      console.log(`  ${index + 1}. ${hotel.name} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding hotels:", error);
    await client.close();
    process.exit(1);
  }
}

seed();
