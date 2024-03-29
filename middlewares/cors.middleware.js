import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path: ".env"});
const frontend_port = process.env.FRONTEND_PORT;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://jubmeng-rainbow-frontend.vercel.app",
  ],
  credentials: true,
  methods: "POST, OPTIONS, GET, PUT, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization", "user_id", "username"],
  exposedHeaders: ["user_id", "username"],
};

export const customCORS = cors(corsOptions);
