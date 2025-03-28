import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";
import Post from "../models/Post";

db();

export const POST = async (req) => {
  const { id, is_comment, user_id } = await req.json();

  try {
    const post = await Post.findOne({ _id: id });
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
      const totalComments = 0;

      comments.forEach((item, i) => {
        let commentUsers = users.find((user) => user?._id == item?.user_id);
        let subComments = findSubComments.filter(
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

      const postViews = post.views.find(item => item == user_id);
      if (postViews == undefined && user_id != "" && user_id != null){
        await Post.findByIdAndUpdate(id, {views: [...post.views, user_id]})
      }

      return new NextResponse(
        JSON.stringify({
          ...post._doc,
          followers: user.followers,
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
