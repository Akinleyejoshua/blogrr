import db from "../db";
import { NextResponse } from "next/server";
import Post, { findOne } from "../models/Post";

db();

export const POST = async (req) => {
  const { id, user_id, type } = await req.json();
  const findPost = await Post.findOne({ _id: id });

  console.log(id);

  if (type == "like") {
    await Post.findByIdAndUpdate(id, { likes: [...findPost.likes, user_id] });
    return new NextResponse(JSON.stringify({ liked: true }));
  } else if (type == "un-like") {
    const filterLikes = findPost.likes.filter((item) => item != user_id);
    await Post.findByIdAndUpdate(id, { likes: [...filterLikes] });
    return new NextResponse(JSON.stringify({ liked: false }));
  }
};
