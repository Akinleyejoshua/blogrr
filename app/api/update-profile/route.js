import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
  const { username, email, bio, pwd, img, id, whatsapp } = await req.json();
  const emailExist = await User.findOne({ email }).lean();
  if (emailExist) {
    await User.findByIdAndUpdate(id, {
      username,
      email,
      bio,
      pwd,
      img,
      id,
      whatsapp,
    });
    return new NextResponse(
      JSON.stringify({ updated: true, msg: "email-exist", username, id })
    );
  } else {
    await User.findByIdAndUpdate(id, {
      username,
      email,
      bio,
      pwd,
      img,
      id,
      whatsapp,
    });
    return new NextResponse(JSON.stringify({ updated: true, username, id }));
  }
};
