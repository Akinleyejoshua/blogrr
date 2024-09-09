import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { id, type, user_id } = await req.json();
  // console.log(id, user_id)

  try {
    const followedUser = await User.findOne({ _id: id }).lean();
    const followingUser = await User.findOne({ _id: user_id }).lean();

    // console.log(type);

    if (type == "follow") {
      const alreadyFollowed = followedUser.following.find((item) => item == id);
      const alreadyFollowers = followedUser.followers.find((item) => item == id)

      // console.log(alreadyFollowed);

      if (alreadyFollowed == undefined && alreadyFollowers == undefined) {
        await User.findByIdAndUpdate(user_id, {
          following: [...followingUser.following, id],
        });

        await User.findByIdAndUpdate(id, {
          followers: [...followedUser.followers, user_id],
        });
      }

      return new NextResponse(JSON.stringify({ followed: true }));
    } else if (type == "un-follow") {
      const removeFollowing = followedUser.following.filter(
        (item) => item != user_id
      );

      const removeFollowers = followingUser.followers.filter(
        (item) => item !== id
      );

      await User.findByIdAndUpdate(user_id, {
        following: [...removeFollowing],
      });

      await User.findByIdAndUpdate(id, {
        followers: [...removeFollowers],
      });

      return new NextResponse(JSON.stringify({ un_followed: true }));
    }
  } catch (err) {
    console.log(err);
  }
};
