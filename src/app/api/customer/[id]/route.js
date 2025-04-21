import { ConnectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import { restaurantSchema } from "@/app/lib/restomodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    let id = content.params.id;
    console.log(id)
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true})
    const details = await  restaurantSchema.findOne({_id:id})
    const foodItems = await foodSchema.find({resto_id:id})
    return NextResponse.json({details,foodItems,success:true})
}