import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Rabbit API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
