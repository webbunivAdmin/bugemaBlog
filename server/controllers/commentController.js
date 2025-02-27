// controllers/commentController.js
import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";

export const getRecentComments = async (req, res) => {
  try {
    const recentComments = await Comments.find()
      .sort({ createdAt: -1 }) // Most recent first
      .limit(10) // Limit to 10 recent comments
      .populate("user", "name image") // Get user name and image
      .populate("post", "title slug") // Get post title and slug
      .exec();

    res.status(200).json({
      success: true,
      data: recentComments,
    });
  } catch (error) {
    console.error("Error fetching recent comments:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};
