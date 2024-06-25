import UDB from "@/app/api/udb";
import { NextResponse } from "next/server";

export const OPTIONS = async (req) => {
  const { email, pwd } = await req.json();

  const users = new UDB("users");

  const userExist = await users.findOne({ email });

  if (userExist.msg == "found") {
    if (userExist.pwd === pwd) {
      return new NextResponse(JSON.stringify({ ...userExist })).status(200);
    } else {
      return new NextResponse(JSON.stringify({ msg: "wrong-data" })).status(200);
    }
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" })).status(200);
  }
};
