import db from "../db";
import { NextResponse } from "next/server";
import Post from "../models/Post";

db();

export const POST = async (req) => {
    const {_id, title, content, is_comment, main_post_id} = await req.json();
    if (is_comment){
        const publish = new Post({
            user_id: _id,
            main_post_id: main_post_id,
            title: "",
            content: content,
            is_comment: true,
            timestamp: Date.now(),
            likes: [],
        })

        if (publish.save()){
            return new NextResponse(JSON.stringify({posted: true, ...publish._doc}))
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
        })

        if (publish.save()){
            return new NextResponse(JSON.stringify({posted: true, ...publish._doc}))
        }
    }
}