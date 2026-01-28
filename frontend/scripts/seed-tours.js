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

    console.log("Seeding tours with updated data...");

    const toursCollection = db.collection("tours");

    // Clear existing tours
    console.log("Cleaning existing tours collection...");
    await toursCollection.deleteMany({});

    const toursData = [
      {
        "_id": new ObjectId("695c2f10c37d6e6abfe26001"),
        "title": "Classic Bhutan Highlights: Paro • Thimphu • Punakha",
        "slug": "classic-bhutan-highlights-paro-thimphu-punakha",
        "category": "695bd6c8c37d6e6abfe25ec7",
        "description": "A balanced first-timer itinerary covering Bhutan’s classic western circuit—Paro’s valley heritage and hikes, Thimphu’s culture and city life, and Punakha’s riverside dzongs and valley walks. This package blends iconic landmarks, gentle hikes, and authentic Bhutanese experiences with comfortable pacing.",
        "duration": "7 Days / 6 Nights",
        "price": 3200,
        "priority": 2,
        "highlights": [
          "Tiger’s Nest (Taktsang) hike",
          "Buddha Dordenma viewpoint",
          "Punakha Dzong & riverside scenery",
          "Dochula Pass & 108 chortens",
          "Traditional hot stone bath"
        ],
        "days": [
          {
            "day": 1,
            "title": "Arrival in Paro • Transfer to Thimphu",
            "description": "Arrive in Paro and meet your guide. Drive to Thimphu through river valleys and mountain scenery. Evening at leisure to settle in.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "travel", "travel": { "from": "69535550f382b55ae59bea31", "to": "69535386f382b55ae59bea2f" }, "order": 0 }
            ]
          },
          {
            "day": 2,
            "title": "Thimphu Culture • Memorial Chorten",
            "description": "Explore Thimphu’s cultural highlights and join locals for a relaxed kora at the Memorial Chorten.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ec8", "order": 0 }
            ]
          },
          {
            "day": 3,
            "title": "Buddha Dordenma • Scenic Walks",
            "description": "Visit the Buddha Dordenma and enjoy a gentle nature walk in the Kuenselphodrang area with panoramic views over the Thimphu Valley.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed5", "order": 0 }
            ]
          },
          {
            "day": 4,
            "title": "Thimphu to Punakha via Dochula Pass",
            "description": "Drive to Punakha stopping at Dochula Pass for the 108 chortens and Himalayan views on clear days.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "travel", "travel": { "from": "69535386f382b55ae59bea2f", "to": "695353b9f382b55ae59bea30" }, "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed3", "order": 1 }
            ]
          },
          {
            "day": 5,
            "title": "Punakha Dzong • Riverside Walk",
            "description": "Visit the majestic Punakha Dzong and enjoy a relaxed riverside walk at the Pho Chhu and Mo Chhu confluence area.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed2", "order": 0 }
            ]
          },
          {
            "day": 6,
            "title": "Khamsum Chorten Hike • Hot Stone Bath",
            "description": "Hike to Khamsum Yulley Namgyal Chorten for valley views, then unwind with a traditional hot stone bath in the evening.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed4", "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ee0", "order": 1 }
            ]
          },
          {
            "day": 7,
            "title": "Punakha to Paro • Departure",
            "description": "Drive back to Paro for your onward flight. If time permits, enjoy a short stop for photos and local crafts shopping.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "travel", "travel": { "from": "695353b9f382b55ae59bea30", "to": "69535550f382b55ae59bea31" }, "order": 0 }
            ]
          }
        ],
        "image": "/api/uploads/bd7ef6ac-dec3-40d2-ba70-62500413d4d1.webp",
        "createdAt": new Date("2026-01-24T04:10:00.000Z"),
        "updatedAt": new Date("2026-01-24T04:10:00.000Z")
      },

      {
        "_id": new ObjectId("695c2f10c37d6e6abfe26002"),
        "title": "Paro & Thimphu Short Escape",
        "slug": "paro-thimphu-short-escape",
        "category": "695bd6c8c37d6e6abfe25ec7",
        "description": "A compact, high-impact itinerary ideal for short visits—covering Paro’s essential heritage and the capital’s signature cultural experiences, with time reserved for the iconic Tiger’s Nest hike.",
        "duration": "5 Days / 4 Nights",
        "price": 2400,
        "priority": 3,
        "highlights": [
          "Tiger’s Nest hike",
          "Paro Dzong & wooden bridge",
          "Memorial Chorten kora",
          "Buddha Dordenma viewpoint"
        ],
        "days": [
          {
            "day": 1,
            "title": "Arrival in Paro • Evening in the Valley",
            "description": "Arrive in Paro, meet your guide, and enjoy a calm first evening in the Paro Valley to acclimatize.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": []
          },
          {
            "day": 2,
            "title": "Paro Heritage: Dzong & Bridge",
            "description": "Explore Paro’s cultural landmarks including Paro Dzong and the traditional wooden cantilever bridge.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed8", "order": 0 }
            ]
          },
          {
            "day": 3,
            "title": "Tiger’s Nest (Taktsang) Hike",
            "description": "A full-day hike to Bhutan’s most iconic monastery—Tiger’s Nest—set dramatically on a cliff above the Paro Valley.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed1", "order": 0 }
            ]
          },
          {
            "day": 4,
            "title": "Paro to Thimphu • Memorial Chorten",
            "description": "Drive to Thimphu. In the evening, join locals for a peaceful kora and prayer wheels at the Memorial Chorten.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "travel", "travel": { "from": "69535550f382b55ae59bea31", "to": "69535386f382b55ae59bea2f" }, "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ec8", "order": 1 }
            ]
          },
          {
            "day": 5,
            "title": "Buddha Dordenma • Departure via Paro",
            "description": "Visit Buddha Dordenma for panoramic views. Drive back to Paro for departure.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed5", "order": 0 },
              { "type": "travel", "travel": { "from": "69535386f382b55ae59bea2f", "to": "69535550f382b55ae59bea31" }, "order": 1 }
            ]
          }
        ],
        "image": "/api/uploads/bd7ef6ac-dec3-40d2-ba70-62500413d4d1.webp",
        "createdAt": new Date("2026-01-24T04:10:00.000Z"),
        "updatedAt": new Date("2026-01-24T04:10:00.000Z")
      },

      {
        "_id": new ObjectId("695c2f10c37d6e6abfe26003"),
        "title": "Wellness & Culture Retreat: Thimphu • Punakha",
        "slug": "wellness-culture-retreat-thimphu-punakha",
        "category": "695bd6c8c37d6e6abfe25ec7",
        "description": "A slower-paced retreat focused on Bhutan’s calming side—forest walks, temple visits, warm valley landscapes, and a traditional hot stone bath. Ideal for travelers who want culture without rushing.",
        "duration": "6 Days / 5 Nights",
        "price": 2700,
        "priority": 4,
        "highlights": [
          "Kuenselphodrang nature walks",
          "Dochula Pass chortens",
          "Punakha Dzong & riverside serenity",
          "Khamsum chorten hike",
          "Traditional hot stone bath"
        ],
        "days": [
          {
            "day": 1,
            "title": "Arrival in Paro • Transfer to Thimphu",
            "description": "Arrive in Paro and drive to Thimphu. Evening free for rest and acclimatization.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "travel", "travel": { "from": "69535550f382b55ae59bea31", "to": "69535386f382b55ae59bea2f" }, "order": 0 }
            ]
          },
          {
            "day": 2,
            "title": "Thimphu: Buddha Dordenma & Forest Calm",
            "description": "Visit Buddha Dordenma and enjoy gentle walks through pine forests and viewpoints over Thimphu Valley.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed5", "order": 0 }
            ]
          },
          {
            "day": 3,
            "title": "Thimphu: Memorial Chorten & Easy City Culture",
            "description": "A relaxed cultural day with the Memorial Chorten and time for local cafes, crafts, and gentle exploration.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ec8", "order": 0 }
            ]
          },
          {
            "day": 4,
            "title": "Thimphu to Punakha • Dochula Pass",
            "description": "Scenic drive to Punakha via Dochula Pass and its 108 chortens. Arrive in the warmer valley and relax.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "travel", "travel": { "from": "69535386f382b55ae59bea2f", "to": "695353b9f382b55ae59bea30" }, "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed3", "order": 1 }
            ]
          },
          {
            "day": 5,
            "title": "Punakha: Dzong & Riverside Walk • Evening Hot Stone Bath",
            "description": "Explore Punakha Dzong and enjoy a riverside walk. Finish with a traditional hot stone bath to unwind.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed2", "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ee0", "order": 1 }
            ]
          },
          {
            "day": 6,
            "title": "Khamsum Chorten Hike • Return to Paro • Departure",
            "description": "Morning hike to Khamsum chorten. Drive back to Paro for departure.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed4", "order": 0 },
              { "type": "travel", "travel": { "from": "695353b9f382b55ae59bea30", "to": "69535550f382b55ae59bea31" }, "order": 1 }
            ]
          }
        ],
        "image": "/api/uploads/bd7ef6ac-dec3-40d2-ba70-62500413d4d1.webp",
        "createdAt": new Date("2026-01-24T04:10:00.000Z"),
        "updatedAt": new Date("2026-01-24T04:10:00.000Z")
      },

      {
        "_id": new ObjectId("695c2f10c37d6e6abfe26004"),
        "title": "Punakha Valley Explorer",
        "slug": "punakha-valley-explorer",
        "category": "695bd6c8c37d6e6abfe25ec7",
        "description": "A Punakha-focused itinerary for travelers who love valley scenery, gentle hikes, and riverside culture. Includes the region’s most photogenic dzong, hilltop chortens, and relaxed pacing in Bhutan’s warmer lowlands.",
        "duration": "5 Days / 4 Nights",
        "price": 2300,
        "priority": 5,
        "highlights": [
          "Dochula Pass on the way to Punakha",
          "Punakha Dzong",
          "Khamsum chorten hike",
          "Valley relaxation and riverside views"
        ],
        "days": [
          {
            "day": 1,
            "title": "Arrival in Paro • Transfer to Punakha (via Dochula)",
            "description": "Arrive in Paro and drive toward Punakha with a scenic stop at Dochula Pass for the 108 chortens.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "travel", "travel": { "from": "69535550f382b55ae59bea31", "to": "695353b9f382b55ae59bea30" }, "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed3", "order": 1 }
            ]
          },
          {
            "day": 2,
            "title": "Punakha Dzong • Riverside Walk",
            "description": "Discover Punakha Dzong and enjoy a relaxing riverside stroll near the confluence of the two rivers.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed2", "order": 0 }
            ]
          },
          {
            "day": 3,
            "title": "Khamsum Yulley Namgyal Chorten Hike",
            "description": "A beautiful half-day hike through rice fields and forest to a hilltop chorten with sweeping valley views.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed4", "order": 0 }
            ]
          },
          {
            "day": 4,
            "title": "Leisure Day • Optional Hot Stone Bath",
            "description": "A free day to enjoy the Punakha Valley at your pace—short walks, café time, and an optional traditional hot stone bath.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ee0", "order": 0 }
            ]
          },
          {
            "day": 5,
            "title": "Return to Paro • Departure",
            "description": "Drive back to Paro for your onward flight and final valley views.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "travel", "travel": { "from": "695353b9f382b55ae59bea30", "to": "69535550f382b55ae59bea31" }, "order": 0 }
            ]
          }
        ],
        "image": "/api/uploads/bd7ef6ac-dec3-40d2-ba70-62500413d4d1.webp",
        "createdAt": new Date("2026-01-24T04:10:00.000Z"),
        "updatedAt": new Date("2026-01-24T04:10:00.000Z")
      },

      {
        "_id": new ObjectId("695c2f10c37d6e6abfe26005"),
        "title": "Luxury Lodges Journey: Amankora Trail (Paro • Thimphu • Punakha)",
        "slug": "luxury-lodges-journey-amankora-trail",
        "category": "695bd6c8c37d6e6abfe25ec7",
        "description": "A premium, lodge-based tour linking three Amankora properties across western Bhutan. Designed for comfort-first travelers who still want the essentials: Tiger’s Nest, Thimphu culture, Dochula, and Punakha’s valley serenity—wrapped in a slow, refined pace.",
        "duration": "8 Days / 7 Nights",
        "price": 6800,
        "priority": 6,
        "highlights": [
          "Stay at Amankora Paro, Thimphu, and Punakha",
          "Tiger’s Nest hike with flexible pacing",
          "Private-feel cultural touring",
          "Dochula Pass and Punakha Valley scenery",
          "Traditional hot stone bath"
        ],
        "days": [
          {
            "day": 1,
            "title": "Arrival in Paro • Amankora Paro Check-in",
            "description": "Arrive in Paro and settle into Amankora Paro. A calm evening to acclimatize with lodge comforts.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": []
          },
          {
            "day": 2,
            "title": "Paro Heritage: Dzong & Bridge",
            "description": "A comfortable cultural day visiting Paro Dzong and the traditional wooden bridge, with time for scenic stops.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed8", "order": 0 }
            ]
          },
          {
            "day": 3,
            "title": "Tiger’s Nest Hike (Flexible Pace)",
            "description": "A full-day excursion to Tiger’s Nest with flexible pacing and ample rest breaks for a premium experience.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed1", "order": 0 }
            ]
          },
          {
            "day": 4,
            "title": "Paro to Thimphu • Forest Lodge Serenity",
            "description": "Drive to Thimphu and check in to Amankora Thimphu set in a blue pine forest.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "travel", "travel": { "from": "69535550f382b55ae59bea31", "to": "69535386f382b55ae59bea2f" }, "order": 0 }
            ]
          },
          {
            "day": 5,
            "title": "Thimphu: Memorial Chorten & Buddha Dordenma",
            "description": "A curated Thimphu day including Memorial Chorten and the Buddha Dordenma viewpoint with light walking.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ec8", "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed5", "order": 1 }
            ]
          },
          {
            "day": 6,
            "title": "Thimphu to Punakha • Dochula Pass",
            "description": "Drive to Punakha via Dochula Pass for the 108 chortens. Check in to Amankora Punakha across the suspension bridge.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "travel", "travel": { "from": "69535386f382b55ae59bea2f", "to": "695353b9f382b55ae59bea30" }, "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed3", "order": 1 }
            ]
          },
          {
            "day": 7,
            "title": "Punakha: Dzong & Valley Calm • Hot Stone Bath",
            "description": "Visit Punakha Dzong and enjoy a relaxed valley day. End with a traditional hot stone bath for deep relaxation.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed2", "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ee0", "order": 1 }
            ]
          },
          {
            "day": 8,
            "title": "Return to Paro • Departure",
            "description": "Drive back to Paro for your onward flight.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "travel", "travel": { "from": "695353b9f382b55ae59bea30", "to": "69535550f382b55ae59bea31" }, "order": 0 }
            ]
          }
        ],
        "image": "/api/uploads/bd7ef6ac-dec3-40d2-ba70-62500413d4d1.webp",
        "createdAt": new Date("2026-01-24T04:10:00.000Z"),
        "updatedAt": new Date("2026-01-24T04:10:00.000Z")
      },

      {
        "_id": new ObjectId("695c2f10c37d6e6abfe26006"),
        "title": "West Bhutan Grand Tour (Extra Time, Better Pace)",
        "slug": "west-bhutan-grand-tour-extra-time-better-pace",
        "category": "695bd6c8c37d6e6abfe25ec7",
        "description": "A longer western Bhutan itinerary that adds breathing room—more time in each valley, a gentler rhythm for hikes, and extra evenings to enjoy Bhutan’s calm. Great for travelers who dislike rushing but still want the core cultural icons.",
        "duration": "9 Days / 8 Nights",
        "price": 3600,
        "priority": 7,
        "highlights": [
          "Two nights in Paro for better acclimatization",
          "Tiger’s Nest hike with recovery time",
          "Thimphu culture and viewpoints",
          "Punakha valley walks and chortens",
          "Traditional hot stone bath"
        ],
        "days": [
          {
            "day": 1,
            "title": "Arrival in Paro • Easy Evening",
            "description": "Arrive in Paro, meet your guide, and take a gentle evening to settle in.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": []
          },
          {
            "day": 2,
            "title": "Paro Dzong & Valley Heritage",
            "description": "A cultural day in Paro featuring fortress architecture, river scenery, and traditional bridges.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed8", "order": 0 }
            ]
          },
          {
            "day": 3,
            "title": "Tiger’s Nest Hike",
            "description": "Full-day hike to Tiger’s Nest monastery. Return to Paro for a restful evening.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed1", "order": 0 }
            ]
          },
          {
            "day": 4,
            "title": "Paro to Thimphu • Settle into the Capital",
            "description": "Drive to Thimphu and enjoy a relaxed afternoon. Optional market and café time.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "travel", "travel": { "from": "69535550f382b55ae59bea31", "to": "69535386f382b55ae59bea2f" }, "order": 0 }
            ]
          },
          {
            "day": 5,
            "title": "Thimphu: Memorial Chorten • City Culture",
            "description": "Experience the daily devotional rhythm at Memorial Chorten and enjoy the capital’s cultural atmosphere.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ec8", "order": 0 }
            ]
          },
          {
            "day": 6,
            "title": "Buddha Dordenma • Kuenselphodrang Walks",
            "description": "Panoramic views and gentle forest paths overlooking Thimphu Valley.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bedcec37d6e6abfe25ecb",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed5", "order": 0 }
            ]
          },
          {
            "day": 7,
            "title": "Thimphu to Punakha via Dochula",
            "description": "Drive to Punakha with a scenic stop at Dochula’s 108 chortens.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "travel", "travel": { "from": "69535386f382b55ae59bea2f", "to": "695353b9f382b55ae59bea30" }, "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed3", "order": 1 }
            ]
          },
          {
            "day": 8,
            "title": "Punakha Dzong • Khamsum Chorten • Hot Stone Bath",
            "description": "A full Punakha highlight day combining dzong culture, a scenic chorten hike, and a relaxing hot stone bath.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bed7cc37d6e6abfe25eca",
            "items": [
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed2", "order": 0 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ed4", "order": 1 },
              { "type": "experience", "experienceId": "695bd81ec37d6e6abfe25ee0", "order": 2 }
            ]
          },
          {
            "day": 9,
            "title": "Return to Paro • Departure",
            "description": "Drive back to Paro for your onward flight.",
            "image": "/api/uploads/e176faea-50b3-4912-a740-1f439597dedf.webp",
            "hotelId": "695bec73c37d6e6abfe25ec9",
            "items": [
              { "type": "travel", "travel": { "from": "695353b9f382b55ae59bea30", "to": "69535550f382b55ae59bea31" }, "order": 0 }
            ]
          }
        ],
        "image": "/api/uploads/bd7ef6ac-dec3-40d2-ba70-62500413d4d1.webp",
        "createdAt": new Date("2026-01-24T04:10:00.000Z"),
        "updatedAt": new Date("2026-01-24T04:10:00.000Z")
      }
    ];

    // Insert tours
    const result = await toursCollection.insertMany(toursData);

    console.log(`Successfully seeded ${result.insertedIds.length} tours`);
    toursData.forEach((tour, index) => {
      console.log(`  ${index + 1}. ${tour.title} (ID: ${result.insertedIds[index]})`);
    });

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding tours:", error);
    if (client) await client.close();
    process.exit(1);
  }
}

seed();
