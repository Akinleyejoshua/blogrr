import db from "../db";
import { NextResponse } from "next/server";
import User from "../models/User";

db();

export const POST = async (req) => {
    const {id} = await req.json();

    const findUser = await User.findOne({_id: id}).lean();

    if (findUser){
        return new NextResponse(JSON.stringify({msg: "found", ...findUser}))
    } else {
        return new NextResponse(JSON.stringify({msg: "not-found"}));
    }
}