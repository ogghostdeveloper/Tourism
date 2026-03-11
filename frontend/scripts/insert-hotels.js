import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const DB = process.env.MONGODB_DB || "bhutan_tourism";

const PLACEHOLDER_IMAGE = "/api/uploads/b2fd247c-4c15-4a81-a482-2aee707f1127.webp";

const hotelsRaw = JSON.parse(readFileSync(path.join(__dirname, "../../hotels.js"), "utf-8"));

/**
 * Builds a name → ObjectId string lookup map from the destinations collection.
 * Matching is case-insensitive and trims whitespace.
 */
async function buildDestinationMap(db) {
  const docs = await db.collection("destinations").find({}, { projection: { name: 1 } }).toArray();
  const map = new Map();
  for (const doc of docs) {
    map.set(doc.name.trim().toLowerCase(), doc._id.toString());
  }
  return map;
}

async function run() {
  try {
    await client.connect();
    const db = client.db(DB);
    const hotelsCollection = db.collection("hotels");

    const destinationMap = await buildDestinationMap(db);

    console.log("\nDestination name → ID mappings loaded:");
    for (const [name, id] of destinationMap) {
      console.log(`  "${name}"  →  ${id}`);
    }
    console.log();

    let inserted = 0;
    let skipped = 0;
    let failed = 0;

    for (const hotel of hotelsRaw) {
      // Skip if a hotel with the same slug already exists
      const existing = await hotelsCollection.findOne({ slug: hotel.slug });
      if (existing) {
        console.log(`⚠  Skipping "${hotel.name}" — slug "${hotel.slug}" already exists.`);
        skipped++;
        continue;
      }

      // Resolve destination name → ID
      const destinationId = destinationMap.get(hotel.destination?.trim().toLowerCase());
      if (!destinationId) {
        console.error(
          `✗  Cannot insert "${hotel.name}" — destination "${hotel.destination}" not found in the database.`
        );
        failed++;
        continue;
      }

      const doc = {
        ...hotel,
        destination: destinationId,
        image: hotel.image ?? PLACEHOLDER_IMAGE,
        gallery: hotel.gallery ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await hotelsCollection.insertOne(doc);
      console.log(`✓  Inserted "${hotel.name}"  (destination: ${destinationId}, id: ${result.insertedId})`);
      inserted++;
    }

    console.log(`\nDone — ${inserted} inserted, ${skipped} skipped, ${failed} failed.`);
    await client.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("Error:", error);
    await client.close();
    process.exit(1);
  }
}

run();
