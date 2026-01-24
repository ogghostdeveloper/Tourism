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

    console.log("Seeding experiences with updated schema...");

    const experiencesCollection = db.collection("experiences");

    // Clear existing experiences to avoid duplicates or conflicts with old schema
    console.log("Cleaning existing experiences collection...");
    await experiencesCollection.deleteMany({});

    const experiencesData = [
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed1"),
        "title": "Tiger’s Nest Monastery (Paro Taktsang) Hike",
        "slug": "tigers-nest-monastery-paro-taktsang-hike",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Paro Taktsang, famously known as Tiger’s Nest, is Bhutan’s most iconic cliffside monastery, dramatically perched on a granite wall above the Paro Valley. The experience is a rewarding half-day hike through pine forests draped in prayer flags, with viewpoints that reveal the monastery’s seemingly impossible placement. Visitors typically pause at the main viewpoint café before continuing uphill to the temple complex, where stories of Guru Rinpoche and Bhutan’s spiritual heritage come alive in murals, altars, and the quiet hum of devotion.",
        "duration": "5 Hours",
        "difficulty": "Moderate",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.4916, 89.3634],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 1800,
        "priority": 1
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed2"),
        "title": "Punakha Dzong Riverside Walk",
        "slug": "punakha-dzong-riverside-walk",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Punakha Dzong, the ‘Palace of Great Happiness,’ sits at the confluence of the Pho Chhu and Mo Chhu rivers and is one of Bhutan’s most impressive fortress-monasteries. This experience pairs a relaxed exploration of the dzong’s courtyards, temples, and traditional architecture with a scenic riverside walk where jacaranda trees bloom in season and prayer flags ripple above the water. It’s an easy, high-reward cultural stop that showcases Bhutanese craftsmanship and Punakha’s gentler climate.",
        "duration": "2 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.5916, 89.8762],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 700,
        "priority": 2
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed3"),
        "title": "Dochula Pass Viewpoint & 108 Chortens",
        "slug": "dochula-pass-viewpoint-108-chortens",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Dochula Pass is a mountain viewpoint between Thimphu and Punakha, famous for the 108 Druk Wangyal Chortens that form a stunning mandala-like landscape of white stupas. On clear days, the Himalayan range appears in the distance, making this one of Bhutan’s most photogenic stops. Visitors can stroll among the chortens, visit the nearby temple, and enjoy a warm tea break while soaking in the alpine air and panoramic scenery.",
        "duration": "1.5 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.4829, 89.7569],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 500,
        "priority": 3
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed4"),
        "title": "Khamsum Yulley Namgyal Chorten Hike",
        "slug": "khamsum-yulley-namgyal-chorten-hike",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "This gentle hike near Punakha leads to Khamsum Yulley Namgyal Chorten, a beautifully detailed stupa built to promote peace and harmony. The trail winds past rice fields and along the river before climbing through forest to the hilltop chorten. Inside, visitors find intricate Buddhist iconography across multiple levels, and from the top, sweeping views of the Punakha Valley unfold—especially stunning during planting and harvest seasons.",
        "duration": "3 Hours",
        "difficulty": "Moderate",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.5786, 89.8481],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 900,
        "priority": 4
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed5"),
        "title": "Buddha Dordenma & Kuenselphodrang Nature Walk",
        "slug": "buddha-dordenma-kuenselphodrang-nature-walk",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Overlooking Thimphu Valley, the massive Buddha Dordenma statue is one of the world’s largest sitting Buddhas and a landmark of modern Bhutanese devotion. This experience combines time at the statue and meditation halls with an easy nature walk around Kuenselphodrang, where pine forests, viewpoints, and quiet trails offer a calmer side of the capital. It’s a great short outing for travelers who want a mix of big-sky scenery, spirituality, and fresh air.",
        "duration": "2 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.4948, 89.6613],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 600,
        "priority": 5
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed6"),
        "title": "Phobjikha Valley: Black-Necked Crane Viewpoint",
        "slug": "phobjikha-valley-black-necked-crane-viewpoint",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Phobjikha is a broad glacial valley in central Bhutan, known for its winter visitors: the rare black-necked cranes that migrate from the Tibetan Plateau. This experience focuses on the classic crane viewpoint and a quiet valley introduction—open landscapes, traditional farmhouses, and a sense of spacious stillness that feels very different from the western valleys. In crane season (typically late October to early spring), visitors may spot cranes feeding in the wetlands and learn how local conservation traditions protect them.",
        "duration": "2 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.4456, 90.1760],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 850,
        "priority": 6
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed7"),
        "title": "Haa Valley Cultural Day Trip",
        "slug": "haa-valley-cultural-day-trip",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Haa Valley is one of Bhutan’s quieter western valleys, often visited for its peaceful landscapes, traditional villages, and gentle pace of life. A cultural day trip typically includes valley viewpoints, local temples, and short village walks where visitors see stone houses, grazing yaks, and fields framed by forested ridges. It’s ideal for travelers who want a less-touristed experience that still feels distinctly Bhutanese—authentic, rural, and scenic without demanding long hikes.",
        "duration": "6 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.3875, 89.2807],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 1400,
        "priority": 7
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed8"),
        "title": "Paro Dzong & Traditional Wooden Bridge",
        "slug": "paro-dzong-traditional-wooden-bridge",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Rinpung Dzong in Paro is a classic Bhutanese fortress-monastery with towering walls, ornate woodwork, and courtyards that feel like a living museum of Himalayan architecture. The visit pairs beautifully with a walk across the traditional wooden cantilever bridge below the dzong, a favorite photo spot framed by the river and valley. Inside the dzong, visitors can explore chapels, administrative spaces, and murals that reflect the deep blend of governance and spirituality in Bhutan.",
        "duration": "2 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.4306, 89.4162],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 650,
        "priority": 8
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ed9"),
        "title": "Bumthang Temple Circuit: Jakar & Jambay Highlights",
        "slug": "bumthang-temple-circuit-jakar-jambay-highlights",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "Bumthang is often called Bhutan’s spiritual heartland, with ancient temples, quiet valleys, and deep pilgrimage traditions. This temple circuit-style experience focuses on the Jakar area and key highlights like Jambay Lhakhang, one of Bhutan’s oldest temples, alongside nearby sacred sites that reflect centuries of Buddhist practice. It’s a culture-rich outing with short drives and light walking, perfect for travelers who want Bhutan’s history and living spirituality without a strenuous trek.",
        "duration": "4 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.5492, 90.7460],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 1600,
        "priority": 9
      },
      {
        "_id": new ObjectId("695bd81ec37d6e6abfe25ee0"),
        "title": "Traditional Hot Stone Bath Experience",
        "slug": "traditional-hot-stone-bath-experience",
        "category": "695bd612c37d6e6abfe25ec5",
        "description": "A traditional Bhutanese hot stone bath (dotsho) is a relaxing cultural wellness experience where river stones are heated in a fire and then placed into a wooden tub to warm mineral-rich water. The bath is commonly enjoyed in the evening, especially in colder valleys, and is often paired with herbal infusions or local hospitality. It’s popular for easing muscle fatigue after hiking and offers a cozy, local-style form of rest that many travelers remember as a highlight.",
        "duration": "1.5 Hours",
        "difficulty": "Easy",
        "destinations": ["69535386f382b55ae59bea2f"],
        "image": "/api/uploads/f9e9e516-7e3e-4842-a825-9f3220fed2f1.webp",
        "startDate": null,
        "endDate": null,
        "gallery": [
          "/api/uploads/248eb7aa-1aac-46a7-ad63-5e3e930897dc.webp",
          "/api/uploads/3e109983-b41c-40a4-beb7-02715958fb28.webp",
          "/api/uploads/e0a122dd-2c6f-4644-a2a2-0bdb50f98185.webp",
          "/api/uploads/e18bec21-3fc4-4387-bebe-643edc3965a0.webp",
          "/api/uploads/d95dc2e4-fcd3-43a5-acaf-1162481e136c.webp"
        ],
        "coordinates": [27.4723, 89.6381],
        "createdAt": new Date("2026-01-05T15:26:22.972Z"),
        "updatedAt": new Date("2026-01-10T10:35:35.831Z"),
        "price": 1200,
        "priority": 10
      }
    ];

    // Insert experiences
    const result = await experiencesCollection.insertMany(experiencesData);

    console.log(`Successfully seeded ${result.insertedIds.length} experiences`);
    experiencesData.forEach((exp, index) => {
      console.log(`  ${index + 1}. ${exp.title} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding experiences:", error);
    if (client) await client.close();
    process.exit(1);
  }
}

seed();
