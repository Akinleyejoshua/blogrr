import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";
import Notification from "../models/Notification";

db();

export const POST = async (req) => {
  const { email, pwd } = await req.json();

  const userExist = await User.findOne({ email }).lean();

  if (userExist) {
    if (userExist.pwd === pwd) {
      const newNotification = new Notification({
        timestamp: Date.now(),
        seen: false,
        msg: "This account logged in",
        type: "signin",
        user_id: userExist._id,
        to: userExist._id,
      });

      newNotification.save();
      return new NextResponse(JSON.stringify({ msg: "found", ...userExist }));
    } else {
      return new NextResponse(JSON.stringify({ msg: "wrong-data" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
