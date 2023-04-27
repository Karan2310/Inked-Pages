import express from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getMyBlogs,
} from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/:userId", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);
router.get("/:id", getBlog);
router.get("/user/:userId", getMyBlogs);

export default router;
