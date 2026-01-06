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

    console.log("Seeding tour requests...");

    // Get tours
    const tours = await db.collection("tours").find({}).toArray();

    console.log(`Found ${tours.length} tours for linking`);

    const tourRequestsCollection = db.collection("tour-requests");

    // Check if tour requests already exist
    const existingCount = await tourRequestsCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing tour requests. Skipping...`);
      await client.close();
      process.exit(0);
    }

    // Helper to get tour safely
    const getTour = () => tours.length > 0 ? tours[0] : null;

    const tourRequests = [
      {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phone: "+1-555-0101",
        destination: "Paro",
        travelDate: "2026-03-15",
        travelers: "2",
        message:
          "We are interested in the Classic Bhutan tour. We would like to add a day for photography.",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "pending",
      },
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@email.com",
        phone: "+44-20-7946-0958",
        destination: "Bumthang",
        travelDate: "2026-04-20",
        travelers: "4",
        message:
          "Group of 4 friends looking for the Bumthang Cultural Tour. Interested in extending for hiking.",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "approved",
      },
      {
        firstName: "Michael",
        lastName: "Chen",
        email: "mchen@email.com",
        phone: "+86-10-5555-0202",
        destination: "Punakha",
        travelDate: "2026-02-28",
        travelers: "1",
        message:
          "Solo traveler interested in adventure activities. Please suggest the best option.",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "approved",
      },
      {
        firstName: "Emma",
        lastName: "Wilson",
        email: "emma.wilson@email.com",
        phone: "+61-2-5555-0303",
        destination: "Thimphu",
        travelDate: "2026-05-10",
        travelers: "2",
        message:
          "Honeymoon trip! We love photography and cultural experiences. Any special packages?",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "pending",
      },
      {
        firstName: "David",
        lastName: "Kumar",
        email: "david.kumar@email.com",
        phone: "+91-22-5555-0404",
        destination: "Paro",
        travelDate: "2026-06-01",
        travelers: "3",
        message:
          "Family with one child aged 8. Need family-friendly itinerary with easy activities.",
        tourId: null,
        tourName: null,
        status: "pending",
      },
      {
        firstName: "Lisa",
        lastName: "Anderson",
        email: "lisa.a@email.com",
        phone: "+1-212-555-0505",
        destination: "Bumthang",
        travelDate: "2026-03-05",
        travelers: "2",
        message:
          "We want to experience authentic Bhutan away from tourist crowds. Custom itinerary?",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "rejected",
      },
      {
        firstName: "James",
        lastName: "Thompson",
        email: "james.t@email.com",
        phone: "+44-7911-555-0606",
        destination: "Wangdue Phodrang",
        travelDate: "2026-07-15",
        travelers: "5",
        message:
          "Corporate team building trip. 5 people, mix of adventure and cultural activities.",
        tourId: null,
        tourName: null,
        status: "approved",
      },
      {
        firstName: "Patricia",
        lastName: "Martinez",
        email: "patricia.m@email.com",
        phone: "+34-91-555-0707",
        destination: "Paro",
        travelDate: "2026-04-10",
        travelers: "2",
        message:
          "Senior travelers. We prefer easier treks and cultural experiences. Please advise.",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "pending",
      },
      {
        firstName: "Robert",
        lastName: "Lee",
        email: "robert.lee@email.com",
        phone: "+65-6555-0808",
        destination: "Trongsa",
        travelDate: "2026-05-25",
        travelers: "1",
        message:
          "Adventure enthusiast looking for challenging activities and unique experiences.",
        tourId: getTour()?._id?.toString() || null,
        tourName: getTour()?.title || null,
        status: "approved",
      },
    ];

    // Insert tour requests
    const result = await tourRequestsCollection.insertMany(
      tourRequests.map((req) => ({
        ...req,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log(`Successfully seeded ${result.insertedIds.length} tour requests`);
    tourRequests.forEach((req, index) => {
      console.log(
        `  ${index + 1}. ${req.firstName} ${req.lastName} - ${req.destination} (ID: ${result.insertedIds[index]}) [${req.status}]`
      );
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding tour requests:", error);
    await client.close();
    process.exit(1);
  }
}

seed();
