import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { email, pwd } = await req.json();

  const userExist = await User.findOne({ email }).lean();

  if (userExist) {
    if (userExist.pwd === pwd) {
      return new NextResponse(
        JSON.stringify({msg: "found", ...userExist })
      );
    } else {
      return new NextResponse(JSON.stringify({ msg: "wrong-data" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
