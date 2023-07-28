import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import BlogRoutes from "./routes/blogs.js";
import User from "./models/User.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["https://inked-pages.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/blogs", BlogRoutes);

app.put("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name must not be empty." });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user's profile." });
  }
});

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
