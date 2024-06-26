import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";
import Post from "../models/Post";

db();

export const POST = async (req) => {
  const { id, is_comment } = await req.json();

  try {
    const post = await Post.findOne({ _id: id, is_comment: is_comment });
    const user = await User.findOne({ _id: post?.user_id });
    const users = await User.find();

    const comments = await Post.find({
      main_post_id: post?._id,
      is_comment: true,
    });

    const findSubComments = await Post.find({
      is_comment: true,
    });

    if (post) {
      const commentData = [];

      comments.forEach((item, i) => {
        let commentUsers = users.find((user) => user?._id == item?.user_id);
        let subComments = findSubComments.filter(
          (comment) => comment.main_post_id == item?._id
        );

        console.log(subComments);

        commentData.push({
          ...item._doc,
          username: commentUsers.username,
          email: commentUsers.email,
          img: commentUsers.img,
          user_id: commentUsers._id,
          comments: subComments,
        });
      });

      return new NextResponse(
        JSON.stringify({
          ...post._doc,
          username: user.username,
          email: user.email,
          img: user.img,
          user_id: user._id,
          comments: commentData,
        })
      );
    } else {
      return new NextResponse(JSON.stringify({ msg: "not-found" }));
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
