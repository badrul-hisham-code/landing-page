import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact API endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Validation error",
        message: "Name, email, and message are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Validation error",
        message: "Please provide a valid email address",
      });
    }

    // Get database connection string
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      console.error("DATABASE_URL is not configured");
      return res.status(500).json({
        error: "Server configuration error",
        message: "Database connection is not configured",
      });
    }

    // Connect to Neon database
    const sql = neon(databaseUrl);

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT
      )
    `;

    // Insert the contact form data
    const result = await sql`
      INSERT INTO contact_submissions (name, email, message, ip_address, user_agent)
      VALUES (
        ${name},
        ${email},
        ${message},
        ${req.ip || "localhost"},
        ${req.get("user-agent") || "unknown"}
      )
      RETURNING id, created_at
    `;

    console.log(`✅ Contact form submission saved: ID ${result[0].id}`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: {
        id: result[0].id,
        submittedAt: result[0].created_at,
      },
    });
  } catch (error) {
    console.error("Database error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return res.status(500).json({
      error: "Server error",
      message: "Failed to save your message. Please try again later.",
      details:
        process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📡 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
