import UDB from "@/app/api/udb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, pwd } = await req.json();

  const users = new UDB("users");

  const userExist = await users.findOne({ email });

  if (userExist.msg == "found") {
    const updatePwd = users.updateById(userExist._id, { pwd });
    if (updatePwd) {
      return new NextResponse(JSON.stringify({ msg: "recovered" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ msg: "not-found" }));
  }
};
