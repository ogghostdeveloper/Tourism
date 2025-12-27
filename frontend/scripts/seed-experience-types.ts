
import clientPromise from "../src/lib/mongodb";

const experiences = [
    {
        slug: "wellness",
        title: "Wellness & Rejuvenation",
        description: "Bhutan is a sanctuary for the soul. Immerse yourself in traditional healing practices, from hot stone baths to meditation retreats in serene monasteries. Our wellness journeys are designed to restore balance to your mind, body, and spirit.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2940&auto=format&fit=crop",
        displayOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: "festivals",
        title: "Festivals & Culture",
        description: "Experience the vibrant heartbeat of Bhutan through its Tshechus. Witness masked dances, receive blessings, and join locals in celebrating their rich heritage. These festivals are a riot of color and spiritual energy.",
        image: "https://images.unsplash.com/photo-1605649988358-3cc42c676451?q=80&w=2940&auto=format&fit=crop",
        displayOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: "nature",
        title: "Nature & Wildlife",
        description: "As the world's only carbon-negative country, Bhutan offers untouched landscapes. Explore pristine forests, spot rare wildlife like the black-necked crane, and breathe the purest air in the Himalayas.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2940&auto=format&fit=crop",
        displayOrder: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

async function seed() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || "bhutan_tourism");
        const collection = db.collection("experience_types");

        console.log("Seeding experience types...");

        // Clear existing
        await collection.deleteMany({});

        // Insert new
        const result = await collection.insertMany(experiences);
        console.log(`Successfully seeded ${result.insertedCount} experience types.`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seed();
