import mongoose from "mongoose";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Views from "../models/viewsModel.js";
import Followers from "../models/followersModel.js";
import Comments from "../models/commentModel.js";

export const stats = async (req, res, next) => {
  try {
    const { query } = req.query;
    const { userId } = req.body.user;

    const numofDays = Number(query) || 28;

    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - numofDays);

    const totalPosts = await Posts.find({
      user: userId,
      createdAt: { $gte: startDate, $lte: currentDate },
    }).countDocuments();

    const totalViews = await Views.find({
      user: userId,
      createdAt: { $gte: startDate, $lte: currentDate },
    }).countDocuments();

    const totalWriters = await Users.find({
      accountType: "Writer",
    }).countDocuments();

    const totalFollowers = await Users.findById(userId);

    const viewStats = await Views.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startDate, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          Total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const followersStats = await Followers.aggregate([
      {
        $match: {
          writerId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startDate, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          Total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const last5Followers = await Users.findById(userId).populate({
      path: "followers",
      options: { sort: { _id: -1 } },
      perDocumentLimit: 5,
      populate: {
        path: "followerId",
        select: "name email image accountType followers -password",
      },
    });

    const last5Posts = await Posts.find({ user: userId })
      .limit(5)
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      totalPosts,
      totalViews,
      totalWriters,
      followers: totalFollowers?.followers?.length,
      viewStats,
      followersStats,
      last5Followers: last5Followers?.followers,
      last5Posts,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getFollowers = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit; //2-1 * 8 = 8

    const result = await Users.findById(userId).populate({
      path: "followers",
      options: { sort: { _id: -1 }, limit: limit, skip: skip },
      populate: {
        path: "followerId",
        select: "name email image accountType followers -password",
      },
    });

    const totalFollowers = await Users.findById(userId);

    const numOfPages = Math.ceil(totalFollowers?.followers?.length / limit);

    res.status(200).json({
      data: result?.followers,
      total: totalFollowers?.followers?.length,
      numOfPages,
      page,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPostContent = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    let queryResult = Posts.find({ user: userId }).sort({
      _id: -1,
    });

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    //records count
    const totalPost = await Posts.countDocuments({ user: userId });
    const numOfPage = Math.ceil(totalPost / limit);

    queryResult = queryResult.skip(skip).limit(limit);

    const posts = await queryResult;

    res.status(200).json({
      success: true,
      message: "Content Loaded successfully",
      totalPost,
      data: posts,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { desc, img, title, slug, cat } = req.body;

    if (!(desc || img || title || cat)) {
      return next(
        "All fields are required. Please enter a description, title, category and select image."
      );
    }

    const post = await Posts.create({
      user: userId,
      desc,
      img,
      title,
      slug,
      cat,
    });

    res.status(200).json({
      sucess: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const { desc } = req.body;
    const { userId } = req.body.user;
    const { id } = req.params;

    if (desc === null) {
      return res.status(404).json({ message: "Comment is required." });
    }

    const newComment = new Comments({ desc, user: userId, post: id });

    await newComment.save();

    //updating the post with the comments id
    const post = await Posts.findById(id);

    post.comments.push(newComment._id);

    await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Comment published successfully",
      newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const post = await Posts.findByIdAndUpdate(id, { status }, { new: true });

    res.status(200).json({
      sucess: true,
      message: "Action performed successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};



export const getPosts = async (req, res, next) => {
  try {
    const { cat, writerId } = req.query;

    let query = { status: true };

    if (cat) {
      query.cat = cat;
    } else if (writerId) {
      query.user = writerId;
    }

    let queryResult = Posts.find(query)
      .populate({
        path: "user",
        select: "name image -password",
      })
      .sort({ _id: -1 });
    console.log(queryResult);
    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    //records count
    const totalPost = await Posts.countDocuments(queryResult);

    const numOfPages = Math.ceil(totalPost / limit);

    queryResult = queryResult.skip(skip).limit(limit);

    const posts = await queryResult;

    res.status(200).json({
      success: true,
      totalPost,
      data: posts,
      page,
      numOfPages,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPopularContents = async (req, res, next) => {
  try {
    const posts = await Posts.aggregate([
      {
        $match: {
          status: true,
        },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          img: 1,
          cat: 1,
          views: { $size: "$views" },
          createdAt: 1,
        },
      },
      {
        $sort: { views: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    const writers = await Users.aggregate([
      {
        $match: {
          accountType: { $ne: "User" },
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          followers: { $size: "$followers" },
        },
      },
      {
        $sort: { followers: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: { posts, writers },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Posts.findById(postId).populate({
      path: "user",
      select: "name image -password",
    });

    const newView = await Views.create({
      user: post?.user,
      post: postId,
    });

    post.views.push(newView?._id);

    await Posts.findByIdAndUpdate(postId, post);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const postComments = await Comments.find({ post: postId })
      .populate({
        path: "user",
        select: "name image -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comments.findById(id);

    res.status(200).json({
      success: true,
      message: "Comment loaded successfully",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;

    await Posts.findOneAndDelete({ _id: id, user: userId });

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id, postId } = req.params;

    await Comments.findByIdAndDelete(id);

    //removing commetn id from post
    const result = await Posts.updateOne(
      { _id: postId },
      { $pull: { comments: id } }
    );

    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Comment removed successfully" });
    } else {
      res.status(404).json({ message: "Post or comment not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const publishPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findByIdAndUpdate(
      id,
      { state: "Published" },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "post Published successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const unpublishPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findByIdAndUpdate(
      id,
      { state: "Idle" },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post Unpublished successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getRecentAdminPosts = async (req, res) => {
  try {
    const recentPosts = await Posts.find()
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(10) // Limit to 10 posts
      .populate("user", "name") // Get author name
      .populate("comments", "_id") // Get comments count
      .populate("views", "_id") // Get views count
      .exec();

    const formattedPosts = recentPosts.map((post) => ({
      id: post._id,
      title: post.title,
      author: post.user.name,
      category: post.cat,
      status: post.state,
      views: post.views.length,
      comments: post.comments.length,
      createdAt: post.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formattedPosts,
    });
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const getWriterRecentComments = async (req, res) => {
  try {
    const { id } = req.params;
    const writerId = id;

    // Get the writer's post IDs
    const postIds = await Posts.find({ user: writerId }).distinct("_id");

    // Get the recent comments on these posts
    const recentComments = await Comments.find({ post: { $in: postIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("post", "title")
      .populate("user", "name");

    res.status(200).json({ data: recentComments });
  } catch (error) {
    console.error("Error in getWriterRecentComments:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getWriterRecentPosts = async (req, res) => {
  try {

    const { id } = req.params;
    const writerId = id;

    // Get the writer's recent posts
    const recentPosts = await Posts.find({ user: writerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id title cat state createdAt")
      .lean();

    // Add views and comments count to each post
    const postsWithStats = await Promise.all(
      recentPosts.map(async (post) => {
        const views = await Views.countDocuments({ post: post._id });
        const commentsCount = await Comments.countDocuments({ post: post._id });

        return {
          ...post,
          views,
          commentsCount,
        };
      })
    );

    res.status(200).json({ data: postsWithStats });
  } catch (error) {
    console.error("Error in getWriterRecentPosts:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getWriterPosts = async (req, res) => {
  try {

    const { id } = req.params;
    const writerId = id;

    const recentPosts = await Posts.find({ user: writerId })
      .sort({ createdAt: -1 })
      .lean();

    const postsWithStats = await Promise.all(
      recentPosts.map(async (post) => {
        const views = await Views.countDocuments({ post: post._id });
        const commentsCount = await Comments.countDocuments({ post: post._id });

        return {
          ...post,
          views,
          commentsCount,
        };
      })
    );

    res.status(200).json({ data: postsWithStats });
  } catch (error) {
    console.error("Error in getWriterRecentPosts:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

