import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
    const {id} = await req.json();

    const user = await User.findOne({_id: id});
    const users = await User.find();
    const followers = [];
    const following = [];
    
    user.followers.forEach(item => {
        const userItem = users.find(user => user._id == item)
        followers.push({
            ...userItem._doc,
        })
    })

    user.following.forEach(item => {
        const userItem = users.find(user => user._id == item)
        following.push({
            ...userItem._doc,
        })
    })

    return new NextResponse(JSON.stringify({following, followers}));
}