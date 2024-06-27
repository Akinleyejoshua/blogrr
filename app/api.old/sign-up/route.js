import { NextResponse } from "next/server";
import UDB from "@/app/api/udb";

export const POST = async (req) => {
  const { email, pwd, username } = await req.json();
  const users = new UDB("users");
  const userExist = await users.findOne({ email });
  if (userExist.msg == "found") {
    return new NextResponse(
      JSON.stringify({
        msg: "already-exist",
      })
    );
  } else {
    const addUser = await users.add({
      email,
      pwd,
      username,
      img: "",
      following: [],
      followers: [],
      bio: "",

    });
    if (addUser.created) {
      return new NextResponse(JSON.stringify(addUser));
    }
  }

  return new NextResponse(JSON.stringify({}));
};
