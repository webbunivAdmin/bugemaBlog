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
    const { id }= req.params;
    const writerId = id;
    const writer = await Users.findById(writerId);
    if (!writer) return res.status(404).json({ message: "Writer not found" });

    const totalPosts = await Posts.countDocuments({ user: writerId });
    const totalViews = await Views.countDocuments({ user: writerId });
    const totalComments = await Comments.countDocuments({ user: writerId });
    const draftPosts = await Posts.countDocuments({ user: writerId, state: "Pending" });

    const avgReadTime = 5;

    const viewsGrowth = await Views.countDocuments({
      user: writerId,
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    const newComments = await Comments.countDocuments({
      post: { $in: await Posts.find({ user: writerId }).distinct("_id") },
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });

    const viewsOverTime = await Views.aggregate([
      { $match: { user: writerId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topPosts = await Posts.aggregate([
      { $match: { user: writerId } },
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
    res.status(500).json({ message: "Server Error", error });
  }
};
