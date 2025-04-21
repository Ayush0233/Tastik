import { ConnectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restomodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true})
    const data = await restaurantSchema.find();
    console.log(data);  
    return NextResponse.json({data,success:true})
}

export async function POST(request){
    let payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(ConnectionStr,{useNewUrlParser:true});
    //use it for Login
    if(payload.login){
            result = await restaurantSchema.findOne({email:payload.email,password:payload.password})
            if(result){
                success = true
            }
    }else{
// use it for Singup
        const restaruant = new restaurantSchema(payload);
         result = await restaruant.save();
         if(result){
            success = true;
         }
    }
    
    return NextResponse.json({result, success});
}