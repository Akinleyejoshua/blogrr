import db from "../db";
import { NextResponse } from "next/server";
import Post from "../models/Post";
import Notification from "../models/Notification";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { _id, title, content, is_comment, main_post_id } = await req.json();

  if (is_comment) {
    const user = await User.findOne({ _id: _id }).lean();

    const publish = new Post({
      user_id: _id,
      main_post_id: main_post_id,
      title: "",
      content: content,
      is_comment: true,
      timestamp: Date.now(),
      likes: [],
    });

    if (publish.save()) {
      const mainPost = await Post.findOne({ _id: main_post_id }).lean();

      if (mainPost) {
        if (mainPost?.user_id != _id) {
          const newNotification = new Notification({
            timestamp: Date.now(),
            seen: false,
            msg: `${user.username} commented on your post`,
            title: title,
            type: "comment",
            user_id: user._id,
            content: publish._id,
            path: `/post/${publish._id}?is_comment=true`,
            to: mainPost?.user_id,
          });

          newNotification.save();
        }
      }
      return new NextResponse(
        JSON.stringify({ posted: true, ...publish._doc })
      );
    }
  } else {
    const publish = new Post({
      user_id: _id,
      main_post_id: main_post_id,
      title: title,
      content: content,
      is_comment: false,
      timestamp: Date.now(),
      likes: [],
    });

    if (publish.save()) {
      return new NextResponse(
        JSON.stringify({ posted: true, ...publish._doc })
      );
    }
  }
};
