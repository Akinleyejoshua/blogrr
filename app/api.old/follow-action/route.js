import UDB from "@/app/api/udb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { id, type, user_id } = await req.json();

  const user = new UDB("users");
  const followedUser = await user.findOne({ _id: id });
  const followingUser = await user.findOne({ _id: user_id });

  if (type == "follow") {
    const alreadyFollowed = followedUser.following.find(
      (item) => item == user_id
    );

    if (alreadyFollowed === undefined) {
      await user.updateById(user_id, {
        following: [...followedUser.following, id],
      });

      await user.updateById(id, {
        followers: [...followingUser.following, user_id],
      });
    }

    return new NextResponse(JSON.stringify({ followed: true }));
  } else if (type == "un-follow") {
    const removeFollowing = followedUser.following.filter((item) => item != id);

    const removeFollowers = followingUser.followers.filter(
      (item) => item !== user_id
    );

    await user.updateById(user_id, {
      following: [...removeFollowing],
    });

    await user.updateById(id, {
      followers: [...removeFollowers],
    });

    return new NextResponse(JSON.stringify({ un_followed: true }));
  }
};
