import { NextResponse } from "next/server";
import UDB from "@/app/api/udb";

const editOnlyRequired = async (id, name, value) => {
    const userUpdate = await user.findByIdAndUpdate(id, {
      [name]: value,
    });
  
    return userUpdate;
  };

export const POST = async (req) => {
    const {username, email, bio, pwd, img, id} = await req.json();

    username !== "" && editOnlyRequired(id, "username", username);
    email !== "" && editOnlyRequired(id, "email", email);
    bio !== "" && editOnlyRequired(id, "bio", bio);
    pwd !== "" && editOnlyRequired(id, "pwd", pwd);
    img !== "" && editOnlyRequired(id, "img", img);

    const user = new UDB("users");
    const userExist = await user.findOne({_id: id})

    return new NextResponse(JSON.stringify({updated: true, ...userExist}))

}