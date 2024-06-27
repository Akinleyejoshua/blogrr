import UDB from "@/app/api/udb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const {username} = await req.json();
    const user = new UDB("users");

    const findUser = await user.findOne({username: username});

    if (findUser.msg == "found"){
        return new NextResponse(JSON.stringify({msg: "found", ...findUser}))
    } else {
        return new NextResponse(JSON.stringify({msg: "not-found"}));
    }
}