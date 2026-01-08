import express from "express";
import { createServer as createViteServer } from "vite";
import contactHandler from "../api/contact.js";

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// API route handler
app.post("/api/contact", async (req, res) => {
  // Convert Express req/res to Vercel-compatible format
  const vercelReq = {
    method: req.method,
    body: req.body,
    headers: req.headers,
    socket: req.socket,
  };

  const vercelRes = {
    status: (code) => {
      res.status(code);
      return vercelRes;
    },
    json: (data) => {
      res.json(data);
    },
  };

  await contactHandler(vercelReq, vercelRes);
});

// Create Vite server in middleware mode
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "spa",
});

// Use vite's connect instance as middleware
app.use(vite.middlewares);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/contact`);
});
