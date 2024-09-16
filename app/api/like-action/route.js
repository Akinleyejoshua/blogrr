import db from "../db";
import { NextResponse } from "next/server";
import Post from "../models/Post";
import Notification from "../models/Notification";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { id, user_id, type } = await req.json();
  const findPost = await Post.findOne({ _id: id });
  const findUser = await User.findOne({ _id: user_id });

  console.log(id);

  if (type == "like") {
    await Post.findByIdAndUpdate(id, { likes: [...findPost.likes, user_id] });
    const newNotification = new Notification({
      timestamp: Date.now(),
      seen: false,
      msg: `${findUser.username} liked your post`,
      type: "like",
      user_id: user_id,
      content: id,
      path: `post/${findPost._id}?is_comment=${findPost.is_comment}`,
      to: findPost.user_id,
    });

    newNotification.save();
    return new NextResponse(JSON.stringify({ liked: true }));
  } else if (type == "un-like") {
    await Notification.deleteOne({content: id})
    const filterLikes = findPost.likes.filter((item) => item != user_id);
    await Post.findByIdAndUpdate(id, { likes: [...filterLikes] });
    return new NextResponse(JSON.stringify({ liked: false }));
  }
};
