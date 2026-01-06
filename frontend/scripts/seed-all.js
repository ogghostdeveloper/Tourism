import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  "seed-admin-user.js",
  "seed-destinations.js",
  "seed-experience-types.js",
  "seed-experiences.js",
  "seed-hotels.js",
  "seed-tours.js",
  "seed-tour-requests.js",
];

let completed = 0;
let failed = 0;

console.log("🌱 Starting database seeding process...\n");
console.log(`📋 Running ${scripts.length} seed scripts in sequence\n`);

async function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`▶️  Running: ${scriptName}`);
    const child = spawn("node", [path.join(__dirname, scriptName)]);

    let output = "";
    let errorOutput = "";

    child.stdout.on("data", (data) => {
      output += data.toString();
      console.log(data.toString());
    });

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
      console.error(data.toString());
    });

    child.on("close", (code) => {
      if (code !== 0) {
        console.error(`❌ ${scriptName} failed with code ${code}\n`);
        failed++;
        reject(new Error(`${scriptName} failed`));
      } else {
        console.log(`✅ ${scriptName} completed successfully\n`);
        completed++;
        resolve();
      }
    });
  });
}

async function seedAll() {
  try {
    for (const script of scripts) {
      try {
        await runScript(script);
      } catch (error) {
        console.error(`Failed to run ${script}:`, error.message);
        // Continue with next script even if one fails
      }
    }

    console.log("\n🎉 Database seeding process completed!");
    console.log(`✅ Completed: ${completed}/${scripts.length}`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}/${scripts.length}`);
    }

    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("Fatal error during seeding:", error);
    process.exit(1);
  }
}

seedAll();
