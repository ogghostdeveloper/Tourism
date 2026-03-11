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

const experiencesRaw = JSON.parse(
  readFileSync(path.join(__dirname, "../../experiences.js"), "utf-8")
);

/**
 * Builds a name → ObjectId string lookup map from the destinations collection.
 * Matching is case-insensitive and trims whitespace.
 */
async function buildDestinationMap(db) {
  const docs = await db
    .collection("destinations")
    .find({}, { projection: { name: 1 } })
    .toArray();
  const map = new Map();
  for (const doc of docs) {
    map.set(doc.name.trim().toLowerCase(), doc._id.toString());
  }
  return map;
}

/**
 * Builds a title → ObjectId string lookup map from the experience_types collection.
 * Matching is case-insensitive and trims whitespace.
 */
async function buildCategoryMap(db) {
  const docs = await db
    .collection("experience_types")
    .find({}, { projection: { title: 1 } })
    .toArray();
  const map = new Map();
  for (const doc of docs) {
    map.set(doc.title.trim().toLowerCase(), doc._id.toString());
  }
  return map;
}

async function run() {
  try {
    await client.connect();
    const db = client.db(DB);
    const experiencesCollection = db.collection("experiences");

    const destinationMap = await buildDestinationMap(db);
    const categoryMap = await buildCategoryMap(db);

    console.log("\nDestination name → ID mappings loaded:");
    for (const [name, id] of destinationMap) {
      console.log(`  "${name}"  →  ${id}`);
    }

    console.log("\nCategory (experience_type) title → ID mappings loaded:");
    for (const [title, id] of categoryMap) {
      console.log(`  "${title}"  →  ${id}`);
    }
    console.log();

    let inserted = 0;
    let skipped = 0;
    let failed = 0;

    for (const experience of experiencesRaw) {
      // Skip if an experience with the same slug already exists
      const existing = await experiencesCollection.findOne({ slug: experience.slug });
      if (existing) {
        console.log(
          `⚠  Skipping "${experience.title}" — slug "${experience.slug}" already exists.`
        );
        skipped++;
        continue;
      }

      // Resolve category name → ID
      const categoryId = categoryMap.get(experience.category?.trim().toLowerCase());
      if (!categoryId) {
        console.error(
          `✗  Cannot insert "${experience.title}" — category "${experience.category}" not found in experience_types collection.`
        );
        failed++;
        continue;
      }

      // Resolve destination name(s) → ID array.
      // The source data uses a single string; normalise to array for uniform handling.
      const rawDestinations = Array.isArray(experience.destinations)
        ? experience.destinations
        : [experience.destinations];

      const destinationIds = [];
      let destinationFailed = false;
      for (const destName of rawDestinations) {
        const destId = destinationMap.get(destName?.trim().toLowerCase());
        if (!destId) {
          console.error(
            `✗  Cannot insert "${experience.title}" — destination "${destName}" not found in destinations collection.`
          );
          destinationFailed = true;
          break;
        }
        destinationIds.push(destId);
      }

      if (destinationFailed) {
        failed++;
        continue;
      }

      const { destinations: _rawDest, ...rest } = experience;

      const doc = {
        ...rest,
        category: categoryId,
        destinations: destinationIds,
        image: experience.image ?? PLACEHOLDER_IMAGE,
        gallery: experience.gallery ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await experiencesCollection.insertOne(doc);
      console.log(
        `✓  Inserted "${experience.title}"  (category: ${categoryId}, destinations: [${destinationIds.join(", ")}], id: ${result.insertedId})`
      );
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
