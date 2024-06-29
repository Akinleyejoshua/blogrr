import db from "../db";
import { NextResponse } from "next/server";
import Post from "../models/Post";

db();

export const POST = async (req) => {
  const { _id, title, content, is_comment, id } =
    await req.json();
  const publish = await Post.findByIdAndUpdate(id, {
    user_id: _id,
    title: title,
    content: content,
    is_comment: is_comment,
    timestamp: Date.now(),
  });

  return new NextResponse(JSON.stringify({ posted: true, ...publish._doc }));
};
