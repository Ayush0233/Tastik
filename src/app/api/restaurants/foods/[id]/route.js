import { ConnectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content){
    const id = content.params.id;
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true})
    const result =await foodSchema.find({resto_id:id})
    // console.log(id)
    return NextResponse.json({result,success:true})
}
export async function DELETE(request, content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true})
    const result = await foodSchema.deleteOne({_id:id})
    if(result.deletedCount > 0){
        success = true
    }
    return NextResponse.json({result, success})
}