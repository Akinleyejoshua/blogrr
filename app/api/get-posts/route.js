import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";
import Post from "../models/Post";

db();

export const POST = async (req) => {
  const findPosts = await Post.find({ is_comment: false });

  if (findPosts) {
    const findUsers = await User.find();
    const findComments = await Post.find({ is_comment: true });
    const data = [];
    let commentData = [];

    findPosts.forEach(async (item, i) => {
      let user = findUsers.find((user) => user._id == item.user_id);
      const comments = findComments.filter(
        (comment) =>
          comment.main_post_id == item._id && comment.user_id == user._id
      );

      if (comments.length > 0) {
        comments.forEach((item) => {
          let commentUsers = findUsers.find((user) => user._id == item.user_id);
          let subComments = findPosts.filter(
            (comment) => comment.main_post_id == item?._id
          );

          commentData.push({
            ...item._doc,
            username: commentUsers.username,
            email: commentUsers.email,
            img: commentUsers.img,
            user_id: commentUsers._id,
            comments: subComments,
          });
        });
      } else {
        commentData = [];
      }

      data.push({
        ...item._doc,
        username: user.username,
        email: user.email,
        img: user.img,
        user_id: user._id,
        comments: commentData,
      });
      commentData = [];

    });

    return new NextResponse(JSON.stringify(data));
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
