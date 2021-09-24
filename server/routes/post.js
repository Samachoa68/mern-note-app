const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

//  @Route Get /api/posts
//  @desc Get posts
//  @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error internal server" });
  }
});

//  @Route Post /api/posts
//  @desc Create post
//  @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "The tittle required" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    // console.log(newPost);
    await newPost.save();
    res.json({ success: true, message: "Happy learning now", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error internal server" });
  }
});

//  @Route Put /api/posts
//  @desc Update post
//  @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "The tittle required" });

  try {
    let updatePostData = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const updatePostCondition = { _id: req.params.id, user: req.userId };

    const updatePost = await Post.findByIdAndUpdate(
      updatePostCondition,
      updatePostData,
      { new: true }
    );
    if (!updatePost)
      res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error internal server",
    });
  }
});

//  @Route Delete /api/posts
//  @desc delete post
//  @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletePostCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findByIdAndDelete(deletePostCondition);
    if (!deletePost)
      res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.json({
      success: true,
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error internal server",
    });
  }
});

module.exports = router;
