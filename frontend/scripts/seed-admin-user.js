import bcrypt from "bcryptjs";
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

const adminUser = {
    email: "admin@bhutan-tourism.com",
    username: "admin",
    role: "admin",
    passwordHash: "", // Will be set below
};

async function seed() {
    try {
        await client.connect();
        const db = client.db(process.env.MONGODB_DB || "bhutan_tourism");
        const collection = db.collection("users");

        console.log("Seeding admin user...");

        // Check if admin already exists
        const existingAdmin = await collection.findOne({ email: adminUser.email });
        if (existingAdmin) {
            console.log("Admin user already exists. Skipping...");
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash("admin123", 10);

        // Insert admin user
        const result = await collection.insertOne({
            ...adminUser,
            passwordHash: hashedPassword,
            createdAt: new Date(),
        });

        console.log(`Successfully created admin user with ID: ${result.insertedId}`);
        console.log(`Email: ${adminUser.email}`);
        console.log(`Password: admin123 (please change this after first login)`);

        await client.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin user:", error);
        await client.close();
        process.exit(1);
    }
}

seed();
