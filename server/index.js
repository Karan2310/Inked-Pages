import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import BlogRoutes from "./routes/blogs.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

app.use(
  cors({
    origin: "https://inked-pages.vercel.app/",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8001, () => {
  console.log("Server listening on port 8001");
});

app.use("/auth", authRoutes);
app.use("/blogs", BlogRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(8001, () => {
      console.log("Server listening on port 8001");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
