import { NextResponse } from "next/server";
import UDB from "@/app/api/udb";

export const POST = async (req) => {
    const {username, email, bio, pwd, img, id} = await req.json();
    const user = new UDB("users");
    const updateUser = await user.updateById(id, {username, email, bio, pwd, img, id});
    return new NextResponse(JSON.stringify({updated: true, ...updateUser}))

}