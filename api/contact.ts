import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// CORS headers for local development and production
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "OK" });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are accepted",
    });
  }

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

    // Get database connection string from environment
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
        ${
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress ||
          "unknown"
        },
        ${req.headers["user-agent"] || "unknown"}
      )
      RETURNING id, created_at
    `;

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: {
        id: result[0].id,
        submittedAt: result[0].created_at,
      },
    });
  } catch (error: unknown) {
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
}
