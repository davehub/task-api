import express from "express";
import cors from "cors";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();
const PORT = 3000;

// Configuration CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL ||"*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
  // middeware
  app.use(cors(corsOptions));
  app.use(express.json());

  const tasksHandler = require("./api/tasks").default;

  app.all("/api/tasks", async (req: VercelRequest, res: VercelResponse) => {
    await tasksHandler(req, res);
  });


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
