import db from "../db";
import { NextResponse } from "next/server";
import Post from "../models/Post";

db();

export const POST = async (req) => {
    const {id} = await req.json();

    await Post.findByIdAndDelete(id);

    // const comments = await Post.find({is_comment: true});
    // comments.forEach(async item => {
    //     await Post.deleteOne({main_post_id: item.main_post_id})
    // })

    return new NextResponse(JSON.stringify({deleted: true}));
}