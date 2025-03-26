import db from "../db";
import { NextResponse } from "next/server";
import Notification from "../models/Notification";
import User from "../models/User";
import Post from "../models/Post";

db();

export const POST = async (req) => {
  const { action, user_id, seen, notif_id } = await req.json();
  if (action == "get") {
    const data = [];
    const userNotifications = await Notification.find({ to: user_id }).lean();
    const users = await User.find().lean();
    const posts = await Post.find().lean();

    userNotifications.forEach((item, i) => {
      if (item.type == "like") {
        const findPost = posts.find((id) => id._id == item.content);
        const findUser = users.find((id) => id._id == item.user_id);
        data.push({
          ...item,
          post: findPost,
          user: findUser,
        });
      }

      if (item.type == "follow") {
        const findUser = users.find((id) => id._id == item.user_id);
        data.push({
          ...item,
          user: findUser,
        });
      }

      if (item.type == "profile") {
        const findUser = users.find((id) => id._id == item.user_id);
        data.push({
          ...item,
          user: findUser,
        });
      }

      if (item.type == "tagged") {
        const findPost = posts.find((id) => id._id == item.content);
        const findUser = users.find((id) => id._id == item.user_id);
        data.push({
          ...item,
          post: findPost,
          user: findUser,
        });
      }
      if (item.type == "comment") {
        const findPost = posts.find((id) => id._id == item.content);
        const findUser = users.find((id) => id._id == item.user_id);
        data.push({
          ...item,
          post: findPost,
          user: findUser,
        });
      }

      if (item.type == "signin") {
        const findUser = users.find((id) => id._id == item.user_id);
        data.push({
          ...item,
          user: findUser,
        });
      }
    });
    return new NextResponse(JSON.stringify(data || []));
  } else if (action == "seen") {
    await Notification.find({ to: user_id }).updateMany({ seen: seen });
    return new NextResponse(JSON.stringify({ seen: true }));
  }
};
