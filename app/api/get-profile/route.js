import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";
import Notification from "../models/Notification";

db();

export const POST = async (req) => {
    const {username, id} = await req.json();

    try {
        const findUser = await User.findOne({username: username}).lean();
        const userWhoViewed = await User.findOne({_id: id}).lean();

        if (findUser){
            if (findUser._id != id){
                const newNotification = new Notification({
                    timestamp: Date.now(),
                    seen: false,
                    msg: `${userWhoViewed.username} viewed your profile`,
                    title: "",
                    type: "profile",
                    user_id: userWhoViewed._id,
                    content: "",
                    path: `/@${userWhoViewed.username}`,
                    to: findUser._id,
                  });
        
                  newNotification.save();
            }
           
            return new NextResponse(JSON.stringify({msg: "found", ...findUser}))
        } else {
            return new NextResponse(JSON.stringify({msg: "not-found"}));
        }
    } catch (err){
        console.log(err)
        return new NextResponse(JSON.stringify({msg: "not-found"}));

    }
   
}