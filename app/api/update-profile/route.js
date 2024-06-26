import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
    const {username, email, bio, pwd, img, id} = await req.json();
    const updateUser = await User.findByIdAndUpdate(id, {username, email, bio, pwd, img, id});
    return new NextResponse(JSON.stringify({updated: true, username, id}))

}