import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { email, pwd, username } = await req.json();

  const userExist = await User.findOne({ email }).lean();
  if (userExist) {
    return new NextResponse(
      JSON.stringify({
        msg: "already-exist",
      })
    );
  } else {
    const addUser = await User({
      email,
      pwd,
      username,
    });
    if (addUser.save()) {
      return new NextResponse(JSON.stringify({created: true, ...addUser}));
    }
  }

  // return new NextResponse(JSON.stringify({}));
};
