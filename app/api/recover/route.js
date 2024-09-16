import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";
import Notification from "../models/Notification";

db();

export const POST = async (req) => {
  const { email, pwd } = await req.json();

  const userExist = await User.findOne({ email }).lean();

  if (userExist) {
    const updatePwd = await User.findByIdAndUpdate(userExist._id, { pwd });
    if (updatePwd) {
      const newNotification = new Notification({
        timestamp: Date.now(),
        seen: false,
        msg: "This account was recovered",
        type: "recover",
        user_id: userExist._id,
      });

      newNotification.save();
      return new NextResponse(JSON.stringify({ msg: "recovered" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
