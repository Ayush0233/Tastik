import { ConnectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import { restaurantSchema } from "@/app/lib/restomodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET() {
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true});
    const data = await foodSchema.find(); 
    return NextResponse.json({data,success:true });
  }
export  async function POST(request){
    const payload = await request.json(); // request takes dara from form and covert it into the json format and store in payload
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true}); //for building connection
    const food = new foodSchema(payload); // creating new food object
    const result = await food.save(); //to save the data in database
    return NextResponse.json({result,success:true}); //returning the result in json format
}