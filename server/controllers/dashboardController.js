import mongoose from 'mongoose';
import Users from "../models/userModel.js";
import Posts from "../models/postModel.js";
import Comments from "../models/commentModel.js";
import Followers from "../models/followersModel.js";
import Views from "../models/viewsModel.js";

// Admin Dashboard Stats
export const getAdminStats = async (req, res) => {
  try {
    const totalPosts = await Posts.countDocuments();
    const totalViews = await Views.countDocuments();
    const totalWriters = await Users.countDocuments({ accountType: "Writer" });
    const totalFollowers = await Followers.countDocuments();
    const postsThisWeek = await Posts.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    const viewsGrowth = await Views.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    const activeWriters = await Posts.distinct("user", {
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    }).length;

    const followerGrowth = await Followers.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    const viewsOverTime = await Views.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const postsByCategory = await Posts.aggregate([
      {
        $group: {
          _id: "$cat",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      totalPosts,
      totalViews,
      totalWriters,
      totalFollowers,
      postsThisWeek,
      viewsGrowth,
      activeWriters,
      followerGrowth,
      viewsOverTime,
      postsByCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getWriterStats = async (req, res) => {
  try {
    const { id: writerId } = req.params;

    // Validate the writerId
    if (!mongoose.Types.ObjectId.isValid(writerId)) {
      return res.status(400).json({ message: "Invalid writer ID" });
    }

    // Check if the writer exists
    const writer = await Users.findById(writerId);
    if (!writer) return res.status(404).json({ message: "Writer not found" });

    // Only consider posts associated with this writer
    const totalPosts = await Posts.countDocuments({ user: writerId });
    const draftPosts = await Posts.countDocuments({ user: writerId, state: "Pending" });
    
    // Total Views and Comments only on the writer's posts
    const postIds = await Posts.find({ user: writerId }).distinct("_id");
    const totalViews = await Views.countDocuments({ post: { $in: postIds } });
    const totalComments = await Comments.countDocuments({ post: { $in: postIds } });
    
    // Average Read Time (You might want to calculate this more dynamically)
    const avgReadTime = 5;

    // Views Growth over the past 7 days
    const viewsGrowth = await Views.countDocuments({
      post: { $in: postIds },
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    // New Comments over the past 7 days
    const newComments = await Comments.countDocuments({
      post: { $in: postIds },
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    // Views Over Time for this writer's posts
    const viewsOverTime = await Views.aggregate([
      { $match: { post: { $in: postIds } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top 5 Posts by Views for this writer
    const topPosts = await Posts.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(writerId) } },
      {
        $lookup: {
          from: "views",
          localField: "_id",
          foreignField: "post",
          as: "views",
        },
      },
      {
        $project: {
          title: 1,
          views: { $size: "$views" },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      writerName: writer.name,
      totalPosts,
      totalViews,
      totalComments,
      avgReadTime,
      draftPosts,
      viewsGrowth,
      newComments,
      viewsOverTime,
      topPosts,
    });
  } catch (error) {
    console.error("Error in getWriterStats:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

