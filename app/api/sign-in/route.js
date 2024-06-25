import UDB from "@/app/api/udb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, pwd } = await req.json();

  const users = new UDB("users");

  const userExist = await users.findOne({ email });

  if (userExist.msg == "found") {
    if (userExist.pwd === pwd) {
      return new NextResponse(
        JSON.stringify({ ...userExist })
      );
    } else {
      return new NextResponse(JSON.stringify({ msg: "wrong-data" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
