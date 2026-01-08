import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testConnection() {
  console.log("🔍 Testing Neon Database Connection...\n");

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ ERROR: DATABASE_URL is not set in .env file");
    console.log("\n📝 Please add your Neon connection string to .env:");
    console.log("   DATABASE_URL=postgresql://...\n");
    process.exit(1);
  }

  try {
    // Connect to database
    const sql = neon(databaseUrl);

    // Test query
    console.log("📡 Connecting to database...");
    const result =
      await sql`SELECT version(), current_database(), current_user`;

    console.log("✅ Connection successful!\n");
    console.log("📊 Database Info:");
    console.log(`   Database: ${result[0].current_database}`);
    console.log(`   User: ${result[0].current_user}`);
    console.log(
      `   PostgreSQL Version: ${result[0].version.split(" ")[0]} ${
        result[0].version.split(" ")[1]
      }\n`
    );

    // Check if table exists
    console.log("🔍 Checking for contact_submissions table...");
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'contact_submissions'
      )
    `;

    if (tableCheck[0].exists) {
      console.log("✅ Table exists");

      // Get row count
      const count = await sql`SELECT COUNT(*) FROM contact_submissions`;
      console.log(`📝 Total submissions: ${count[0].count}\n`);

      // Show recent submissions
      if (parseInt(count[0].count) > 0) {
        console.log("📋 Recent submissions:");
        const recent = await sql`
          SELECT id, name, email, created_at 
          FROM contact_submissions 
          ORDER BY created_at DESC 
          LIMIT 5
        `;
        recent.forEach((row) => {
          console.log(
            `   #${row.id}: ${row.name} (${row.email}) - ${new Date(
              row.created_at
            ).toLocaleString()}`
          );
        });
      }
    } else {
      console.log("⚠️  Table does not exist yet");
      console.log(
        "   It will be created automatically on first form submission\n"
      );
    }

    console.log("\n✨ Database is ready to use!");
  } catch (error) {
    console.error("\n❌ Connection failed!");
    console.error("Error:", error instanceof Error ? error.message : error);
    console.log("\n🔧 Troubleshooting:");
    console.log("   1. Check that your DATABASE_URL is correct");
    console.log("   2. Ensure your Neon database is active");
    console.log("   3. Verify network connectivity\n");
    process.exit(1);
  }
}

testConnection();
