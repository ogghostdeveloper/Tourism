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

    console.log("Seeding hotels with updated data...");

    const hotelsCollection = db.collection("hotels");

    // Clear existing hotels
    console.log("Cleaning existing hotels collection...");
    await hotelsCollection.deleteMany({});

    const hotelsData = [
      {
        "_id": new ObjectId("695bec73c37d6e6abfe25ec9"),
        "name": "Amankora (Paro)",
        "slug": "amankora-paro",
        "location": "Near Drukgyel Dzong",
        "description": "Amankora Paro is a luxurious Bhutanese lodge nestled in pine forests, blending rustic charm with modern design, offering serene suites with wood-burning stoves and terrazzo baths, plus a spa, yoga studio, fine dining, and easy access to iconic sites like the Tiger's Nest Monastery for hiking and cultural immersion. It serves as a tranquil base for exploring the Paro Valley, featuring panoramic views of mountains and ancient Dzong ruins, embodying Bhutan's peaceful spirit.",
        "destination": "69535550f382b55ae59bea31",
        "rating": 4.3,
        "priceRange": "Luxury",
        "rooms": 10,
        "amenities": [
          "gourmet dining",
          "personalized guides",
          "laundry",
          "WiFi",
          "unique cultural activities"
        ],
        "image": "/api/uploads/03346f13-7fa0-4216-80e0-f1c56404a529.webp",
        "gallery": [
          "/api/uploads/7948eac3-ba02-4189-b19e-c5657ff6beb0.webp",
          "/api/uploads/0217ea4b-0019-4571-b9fa-fb8659b3d3bb.webp",
          "/api/uploads/97be0a41-d227-4ffd-a09c-b2acd13ffbe4.webp",
          "/api/uploads/b080f27f-54ce-4417-b441-c85cc63a0ec1.webp",
          "/api/uploads/5b1aa093-7ef9-41e9-a70f-51a3503a638d.webp",
          "/api/uploads/3296974f-8bd8-4e8a-8c37-921ca96ca94f.webp",
          "/api/uploads/95f88f1d-2792-44bc-a488-0848ec5e41f4.webp",
          "/api/uploads/eb81c532-db11-4b4d-b4f6-505f415df9f4.webp"
        ],
        "coordinates": [27.4969, 89.3219],
        "createdAt": new Date("2026-01-05T16:53:07.433Z"),
        "updatedAt": new Date("2026-01-20T13:22:34.600Z"),
        "price": 1000,
        "priority": 11
      },
      {
        "_id": new ObjectId("695bed7cc37d6e6abfe25eca"),
        "name": "Amankora (Punakha)",
        "slug": "amankora-punakha",
        "location": "Near punakha bridge",
        "description": "Amankora Punakha is a luxurious, tranquil Bhutanese lodge set in a subtropical valley amidst rice paddies and orange orchards, accessed via a suspension bridge over the Mo Chhu river, featuring traditional architecture with preserved wall paintings, modern suites with wood-burning stoves, a spa, and curated experiences like visits to Punakha Dzong, offering a blend of cultural immersion and natural serenity. ",
        "destination": "695353b9f382b55ae59bea30",
        "rating": 5,
        "priceRange": "Luxury",
        "rooms": 20,
        "amenities": [
          "traditional bukhari stoves",
          "terrazzo baths",
          "yoga",
          "steam room",
          "treatment room"
        ],
        "image": "/api/uploads/b2fd247c-4c15-4a81-a482-2aee707f1127.webp",
        "gallery": [
          "/api/uploads/a2395b59-de33-4b84-9dbe-74a1cb1a70e9.webp",
          "/api/uploads/4a1763d3-022c-45b1-8304-ad8fbb2e7d05.webp",
          "/api/uploads/f26badd6-31e8-4826-b0db-9b134a5da85b.webp",
          "/api/uploads/2a356e87-560a-41d7-bbf4-b5aa207def3a.webp",
          "/api/uploads/15a30776-3edc-4ef6-8f73-373618e96c34.webp",
          "/api/uploads/e3071b2c-204e-4e83-9cdb-1500f58f545e.webp"
        ],
        "coordinates": [27.6239, 89.8352],
        "createdAt": new Date("2026-01-05T16:57:32.496Z"),
        "updatedAt": new Date("2026-01-20T13:22:43.882Z"),
        "price": 1000,
        "priority": 18
      },
      {
        "_id": new ObjectId("695bedcec37d6e6abfe25ecb"),
        "name": "Amankora (Thimphu)",
        "slug": "amankora-thimphu",
        "location": "Near Serbithang",
        "description": "Amankora Thimphu is a luxurious, dzong-inspired lodge nestled in a serene blue pine forest overlooking Bhutan's capital, offering 16 private suites that blend traditional architecture with modern comforts like wood-burning stoves and terrazzo tubs, providing a peaceful retreat close to Thimphu's cultural sites and natural beauty. It's known for its tranquil setting, high-quality service, authentic cultural experiences (like archery and monastery visits), and its role as the first of Amankora's five lodges in Bhutan. ",
        "destination": "69535386f382b55ae59bea2f",
        "rating": 5,
        "priceRange": "Luxury",
        "rooms": 12,
        "amenities": [],
        "image": "/api/uploads/71291345-1491-4a44-81ef-29fa0e614552.webp",
        "gallery": [
          "/api/uploads/0c62f873-50b6-4e55-aed6-c8ed0f55a126.webp",
          "/api/uploads/a2e46e7f-425a-456e-96c3-99970668a1d6.webp",
          "/api/uploads/abbd0111-d759-48eb-89e4-8bf9e16ab269.webp",
          "/api/uploads/1b157343-cda5-432c-b267-d929fc0d26e5.webp",
          "/api/uploads/4c13b37a-a7f9-41e2-b7d4-ec6181e6b7c9.webp"
        ],
        "coordinates": [27.4786, 89.612],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 1000,
        "priority": 21
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f01"),
        "name": "Six Senses Paro",
        "slug": "six-senses-paro",
        "location": "Paro Valley (near Paro town)",
        "description": "Six Senses Paro is a high-end wellness-focused lodge in the Paro Valley, designed around Bhutanese aesthetics with modern comfort. It is popular for its spa and holistic programs, serene valley views, and convenient access to Paro’s cultural sites and hiking routes, making it a restorative base for exploring western Bhutan.",
        "destination": "69535550f382b55ae59bea31",
        "rating": 4.7,
        "priceRange": "Luxury",
        "rooms": 20,
        "amenities": [
          "spa & wellness",
          "WiFi",
          "restaurant",
          "yoga sessions",
          "concierge tours"
        ],
        "image": "/api/uploads/03346f13-7fa0-4216-80e0-f1c56404a529.webp",
        "gallery": [
          "/api/uploads/7948eac3-ba02-4189-b19e-c5657ff6beb0.webp",
          "/api/uploads/0217ea4b-0019-4571-b9fa-fb8659b3d3bb.webp",
          "/api/uploads/97be0a41-d227-4ffd-a09c-b2acd13ffbe4.webp",
          "/api/uploads/b080f27f-54ce-4417-b441-c85cc63a0ec1.webp",
          "/api/uploads/5b1aa093-7ef9-41e9-a70f-51a3503a638d.webp",
          "/api/uploads/3296974f-8bd8-4e8a-8c37-921ca96ca94f.webp",
          "/api/uploads/95f88f1d-2792-44bc-a488-0848ec5e41f4.webp",
          "/api/uploads/eb81c532-db11-4b4d-b4f6-505f415df9f4.webp"
        ],
        "coordinates": [27.4319, 89.4200],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 950,
        "priority": 12
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f02"),
        "name": "COMO Uma Paro",
        "slug": "como-uma-paro",
        "location": "Paro Valley (towards Tiger’s Nest trail area)",
        "description": "COMO Uma Paro is a luxury boutique retreat known for its clean design, attentive service, and wellness offerings. It’s frequently chosen by travelers looking for a calm, upscale stay with great views of the Paro Valley and easy access to major highlights like Paro Dzong and the Tiger’s Nest hike.",
        "destination": "69535550f382b55ae59bea31",
        "rating": 4.6,
        "priceRange": "Luxury",
        "rooms": 29,
        "amenities": [
          "spa & massage",
          "heated indoor pool",
          "WiFi",
          "restaurant",
          "guided excursions"
        ],
        "image": "/api/uploads/03346f13-7fa0-4216-80e0-f1c56404a529.webp",
        "gallery": [
          "/api/uploads/7948eac3-ba02-4189-b19e-c5657ff6beb0.webp",
          "/api/uploads/0217ea4b-0019-4571-b9fa-fb8659b3d3bb.webp",
          "/api/uploads/97be0a41-d227-4ffd-a09c-b2acd13ffbe4.webp",
          "/api/uploads/b080f27f-54ce-4417-b441-c85cc63a0ec1.webp",
          "/api/uploads/5b1aa093-7ef9-41e9-a70f-51a3503a638d.webp",
          "/api/uploads/3296974f-8bd8-4e8a-8c37-921ca96ca94f.webp",
          "/api/uploads/95f88f1d-2792-44bc-a488-0848ec5e41f4.webp",
          "/api/uploads/eb81c532-db11-4b4d-b4f6-505f415df9f4.webp"
        ],
        "coordinates": [27.4300, 89.4450],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 900,
        "priority": 13
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f03"),
        "name": "Le Méridien Thimphu",
        "slug": "le-meridien-thimphu",
        "location": "City center, Thimphu",
        "description": "Le Méridien Thimphu is a modern upscale hotel in the heart of Bhutan’s capital, offering convenient access to shops, cafes, museums, and major landmarks. It’s well-suited for travelers who want city comfort with reliable amenities, comfortable rooms, and easy logistics for day trips around the Thimphu Valley.",
        "destination": "69535386f382b55ae59bea2f",
        "rating": 4.4,
        "priceRange": "Luxury",
        "rooms": 78,
        "amenities": [
          "restaurant",
          "bar",
          "WiFi",
          "gym",
          "concierge"
        ],
        "image": "/api/uploads/71291345-1491-4a44-81ef-29fa0e614552.webp",
        "gallery": [
          "/api/uploads/0c62f873-50b6-4e55-aed6-c8ed0f55a126.webp",
          "/api/uploads/a2e46e7f-425a-456e-96c3-99970668a1d6.webp",
          "/api/uploads/abbd0111-d759-48eb-89e4-8bf9e16ab269.webp",
          "/api/uploads/1b157343-cda5-432c-b267-d929fc0d26e5.webp",
          "/api/uploads/4c13b37a-a7f9-41e2-b7d4-ec6181e6b7c9.webp"
        ],
        "coordinates": [27.4722, 89.6390],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 650,
        "priority": 14
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f04"),
        "name": "Taj Tashi Thimphu",
        "slug": "taj-tashi-thimphu",
        "location": "Upper Thimphu (near city viewpoints)",
        "description": "Taj Tashi Thimphu is a grand luxury hotel built in a Bhutanese dzong-inspired style, blending traditional architecture with high-end hospitality. Known for warm service, elegant rooms, and strong dining options, it’s a favorite for travelers who want a premium stay with a distinctly Bhutanese feel in the capital.",
        "destination": "69535386f382b55ae59bea2f",
        "rating": 4.6,
        "priceRange": "Luxury",
        "rooms": 66,
        "amenities": [
          "spa",
          "fine dining",
          "WiFi",
          "bar",
          "laundry"
        ],
        "image": "/api/uploads/71291345-1491-4a44-81ef-29fa0e614552.webp",
        "gallery": [
          "/api/uploads/0c62f873-50b6-4e55-aed6-c8ed0f55a126.webp",
          "/api/uploads/a2e46e7f-425a-456e-96c3-99970668a1d6.webp",
          "/api/uploads/abbd0111-d759-48eb-89e4-8bf9e16ab269.webp",
          "/api/uploads/1b157343-cda5-432c-b267-d929fc0d26e5.webp",
          "/api/uploads/4c13b37a-a7f9-41e2-b7d4-ec6181e6b7c9.webp"
        ],
        "coordinates": [27.4912, 89.6335],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 800,
        "priority": 15
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f05"),
        "name": "Dhensa Boutique Resort (Punakha)",
        "slug": "dhensa-boutique-resort-punakha",
        "location": "Hillside above Punakha Valley",
        "description": "Dhensa Boutique Resort is a peaceful hillside property overlooking Punakha’s lush valley, popular for its tranquil atmosphere, scenic views, and boutique-style service. It’s a comfortable choice for travelers who want a quiet retreat between cultural visits like Punakha Dzong and valley hikes, with a focus on relaxation and nature.",
        "destination": "695353b9f382b55ae59bea30",
        "rating": 4.5,
        "priceRange": "Upper Mid",
        "rooms": 24,
        "amenities": [
          "valley views",
          "restaurant",
          "WiFi",
          "spa services",
          "guided walks"
        ],
        "image": "/api/uploads/b2fd247c-4c15-4a81-a482-2aee707f1127.webp",
        "gallery": [
          "/api/uploads/a2395b59-de33-4b84-9dbe-74a1cb1a70e9.webp",
          "/api/uploads/4a1763d3-022c-45b1-8304-ad8fbb2e7d05.webp",
          "/api/uploads/f26badd6-31e8-4826-b0db-9b134a5da85b.webp",
          "/api/uploads/2a356e87-560a-41d7-bbf4-b5aa207def3a.webp",
          "/api/uploads/15a30776-3edc-4ef6-8f73-373618e96c34.webp",
          "/api/uploads/e3071b2c-204e-4e83-9cdb-1500f58f545e.webp"
        ],
        "coordinates": [27.5860, 89.8700],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 420,
        "priority": 16
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f06"),
        "name": "Zhingkham Resort (Punakha)",
        "slug": "zhingkham-resort-punakha",
        "location": "Above Punakha Dzong viewpoint area",
        "description": "Zhingkham Resort is well-known for its elevated views over the Punakha Valley and the drama setting near Punakha Dzong. It offers a comfortable mid-range stay for travelers who want easy access to key Punakha attractions while enjoying a quieter hillside atmosphere with scenic sunrise and sunset moments.",
        "destination": "695353b9f382b55ae59bea30",
        "rating": 4.1,
        "priceRange": "Mid",
        "rooms": 40,
        "amenities": [
          "valley views",
          "restaurant",
          "WiFi",
          "parking",
          "room service"
        ],
        "image": "/api/uploads/b2fd247c-4c15-4a81-a482-2aee707f1127.webp",
        "gallery": [
          "/api/uploads/a2395b59-de33-4b84-9dbe-74a1cb1a70e9.webp",
          "/api/uploads/4a1763d3-022c-45b1-8304-ad8fbb2e7d05.webp",
          "/api/uploads/f26badd6-31e8-4826-b0db-9b134a5da85b.webp",
          "/api/uploads/2a356e87-560a-41d7-bbf4-b5aa207def3a.webp",
          "/api/uploads/15a30776-3edc-4ef6-8f73-373618e96c34.webp",
          "/api/uploads/e3071b2c-204e-4e83-9cdb-1500f58f545e.webp"
        ],
        "coordinates": [27.5970, 89.8785],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 220,
        "priority": 17
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f07"),
        "name": "Hotel Olathang (Paro)",
        "slug": "hotel-olathang-paro",
        "location": "Near Paro airport / Paro Valley",
        "description": "Hotel Olathang is a well-established property in Paro known for its spacious grounds and convenient location close to Paro airport. Often used as a comfortable base for valley sightseeing, it provides a practical mix of Bhutanese ambience, easy logistics, and reliable services for cultural touring in western Bhutan.",
        "destination": "69535550f382b55ae59bea31",
        "rating": 4.0,
        "priceRange": "Mid",
        "rooms": 59,
        "amenities": [
          "restaurant",
          "WiFi",
          "garden area",
          "parking",
          "laundry"
        ],
        "image": "/api/uploads/03346f13-7fa0-4216-80e0-f1c56404a529.webp",
        "gallery": [
          "/api/uploads/7948eac3-ba02-4189-b19e-c5657ff6beb0.webp",
          "/api/uploads/0217ea4b-0019-4571-b9fa-fb8659b3d3bb.webp",
          "/api/uploads/97be0a41-d227-4ffd-a09c-b2acd13ffbe4.webp",
          "/api/uploads/b080f27f-54ce-4417-b441-c85cc63a0ec1.webp",
          "/api/uploads/5b1aa093-7ef9-41e9-a70f-51a3503a638d.webp",
          "/api/uploads/3296974f-8bd8-4e8a-8c37-921ca96ca94f.webp",
          "/api/uploads/95f88f1d-2792-44bc-a488-0848ec5e41f4.webp",
          "/api/uploads/eb81c532-db11-4b4d-b4f6-505f415df9f4.webp"
        ],
        "coordinates": [27.4048, 89.4256],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 180,
        "priority": 19
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f08"),
        "name": "Naksel Boutique Hotel & Spa (Paro)",
        "slug": "naksel-boutique-hotel-and-spa-paro",
        "location": "Forest hillside, Paro Valley",
        "description": "Naksel Boutique Hotel & Spa is a nature-forward boutique stay set on a forested hillside in Paro, offering a quieter alternative to town-based hotels. It is often appreciated for its spa services, peaceful surroundings, and Bhutanese-inspired interiors, making it a good fit for travelers who want relaxation between cultural sightseeing days.",
        "destination": "69535550f382b55ae59bea31",
        "rating": 4.2,
        "priceRange": "Upper Mid",
        "rooms": 40,
        "amenities": [
          "spa",
          "WiFi",
          "restaurant",
          "forest views",
          "airport transfer"
        ],
        "image": "/api/uploads/03346f13-7fa0-4216-80e0-f1c56404a529.webp",
        "gallery": [
          "/api/uploads/7948eac3-ba02-4189-b19e-c5657ff6beb0.webp",
          "/api/uploads/0217ea4b-0019-4571-b9fa-fb8659b3d3bb.webp",
          "/api/uploads/97be0a41-d227-4ffd-a09c-b2acd13ffbe4.webp",
          "/api/uploads/b080f27f-54ce-4417-b441-c85cc63a0ec1.webp",
          "/api/uploads/5b1aa093-7ef9-41e9-a70f-51a3503a638d.webp",
          "/api/uploads/3296974f-8bd8-4e8a-8c37-921ca96ca94f.webp",
          "/api/uploads/95f88f1d-2792-44bc-a488-0848ec5e41f4.webp",
          "/api/uploads/eb81c532-db11-4b4d-b4f6-505f415df9f4.webp"
        ],
        "coordinates": [27.4552, 89.4104],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 300,
        "priority": 20
      },
      {
        "_id": new ObjectId("695c1a11c37d6e6abfe25f09"),
        "name": "Pema by Realm (Thimphu)",
        "slug": "pema-by-realm-thimphu",
        "location": "City center, Thimphu",
        "description": "Pema by Realm is a centrally located hotel in Thimphu offering comfortable rooms, warm Bhutanese hospitality, and easy access to the city’s main streets, markets, and cultural stops. It’s a practical option for travelers who want to stay within walking distance of urban conveniences while still having a calm place to return to after sightseeing.",
        "destination": "69535386f382b55ae59bea2f",
        "rating": 4.2,
        "priceRange": "Mid",
        "rooms": 27,
        "amenities": [
          "WiFi",
          "restaurant",
          "laundry",
          "airport transfer",
          "front desk service"
        ],
        "image": "/api/uploads/71291345-1491-4a44-81ef-29fa0e614552.webp",
        "gallery": [
          "/api/uploads/0c62f873-50b6-4e55-aed6-c8ed0f55a126.webp",
          "/api/uploads/a2e46e7f-425a-456e-96c3-99970668a1d6.webp",
          "/api/uploads/abbd0111-d759-48eb-89e4-8bf9e16ab269.webp",
          "/api/uploads/1b157343-cda5-432c-b267-d929fc0d26e5.webp",
          "/api/uploads/4c13b37a-a7f9-41e2-b7d4-ec6181e6b7c9.webp"
        ],
        "coordinates": [27.4710, 89.6362],
        "createdAt": new Date("2026-01-05T16:58:54.449Z"),
        "updatedAt": new Date("2026-01-20T13:22:52.865Z"),
        "price": 200,
        "priority": 22
      }
    ];

    // Insert hotels
    const result = await hotelsCollection.insertMany(hotelsData);

    console.log(`Successfully seeded ${result.insertedIds.length} hotels`);
    hotelsData.forEach((hotel, index) => {
      console.log(`  ${index + 1}. ${hotel.name} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding hotels:", error);
    if (client) await client.close();
    process.exit(1);
  }
}

seed();
