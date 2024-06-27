import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { id, type, user_id } = await req.json();

  try {
    const followedUser = await User.findOne({ _id: id }).lean();
    const followingUser = await User.findOne({ _id: user_id }).lean();
  
    if (type == "follow") {
      const alreadyFollowed = followedUser.following.find(
        (item) => item == user_id
      );

      console.log(alreadyFollowed);
    
      if (alreadyFollowed == undefined) {
        await User.findByIdAndUpdate(user_id, {
          following: [...followedUser.following, id],
        });
  
        await User.findByIdAndUpdate(id, {
          followers: [...followingUser.following, user_id],
        });
      }
  
      return new NextResponse(JSON.stringify({ followed: true }));
    } else if (type == "un-follow") {
      const removeFollowing = followedUser.following.filter((item) => item != id);
  
      const removeFollowers = followingUser.followers.filter(
        (item) => item !== user_id
      );
  
      await User.findByIdAndUpdate(user_id, {
        following: [...removeFollowing],
      });
  
      await User.findByIdAndUpdate(id, {
        followers: [...removeFollowers],
      });
  
      return new NextResponse(JSON.stringify({ un_followed: true }));
    }
  } catch (err){

  }

  
};
