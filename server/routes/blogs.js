import express from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/:userId", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

export default router;
