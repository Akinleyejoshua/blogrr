import db from "../db";
import { NextResponse } from "next/server";
import Post from "../models/Post";

db();

export const POST = async (req) => {
  const { _id, title, content, is_comment, main_post_id, id } =
    await req.json();
  const publish = await Post.findByIdAndUpdate(id, {
    user_id: _id,
    main_post_id: main_post_id,
    title: title,
    content: content,
    is_comment: is_comment,
    timestamp: Date.now(),
  });

  return new NextResponse(JSON.stringify({ posted: true, ...publish._doc }));
};
