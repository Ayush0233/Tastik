import { ConnectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restomodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(ConnectionStr, {useNewUrlParser:true})
    let result = await restaurantSchema.find()
    result = result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1)) // to fetch the cities name from resto data
    result = [...new Set(result)]// to identify the unique cities

    return NextResponse.json({result,success:true})
}