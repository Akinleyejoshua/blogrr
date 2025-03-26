import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const GET = async (req) => {
  try {
    const findUsers = await User.find().lean();

    if (findUsers) {
      return new NextResponse(JSON.stringify({ msg: "found", findUsers }));
    } else {
      return new NextResponse(JSON.stringify({ msg: "not-found" }));
    }
  } catch (err) {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
