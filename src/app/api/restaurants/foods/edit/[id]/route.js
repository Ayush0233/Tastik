import { ConnectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content){
    let id = content.params.id;
    let success = false;
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true});
    const result = await foodSchema.findOne({_id:id})
    if(result){
        success=true
    }
    return NextResponse.json({result,success});
}

export async function PUT(request, content){
    let id = content.params.id;
    const payload = await request.json()
    let success = false;
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true});
    const result = await foodSchema.findOneAndUpdate({_id:id},payload)
    console.log(result)
    if(result){
        success=true;
    }
    return NextResponse.json({result, success})
}