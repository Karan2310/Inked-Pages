import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBlog = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  const { title, desc } = req.body;
  const newBlog = new Blog({
    title,
    desc,
    authorName: user.name,
    authorId: userId,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, desc } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json("Blog deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
