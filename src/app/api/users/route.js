import { ConnectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true});
    const data = await userSchema.find();
    return NextResponse.json({data ,success:true})
}
export async function POST(request) {
    let payload = await request.json();
    let success = false;
    await mongoose.connect(ConnectionStr,{useNewUrlParser: true})
    let user  = new userSchema(payload)
    let result = await user.save();
    // console.log(result)
    if(result){
        success = true;
    }   
    return NextResponse.json({result, success});
}