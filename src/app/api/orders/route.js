import { ConnectionStr } from "@/app/lib/db";
import { OrderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restomodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let userId = request.nextUrl.searchParams.get('id');    
    await mongoose.connect(ConnectionStr, {useNewUrlParser:true})
    let success = false;
    let result = await OrderSchema.find({user_id:userId});
    if(result){
        let restoData = await Promise.all(
            result.map(async(item)=>{
                let restInfo = {};
                restInfo.data = await restaurantSchema.find({_id:item.resto_id});
                restInfo.amount = item.amount;
                restInfo.status=item.status;
                return restInfo;
            })
        )
        result = restoData
        success = true;
    }

    return NextResponse.json({result,success});
}

export  async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(ConnectionStr, {useNewUrlParser:true})
    let success = false;
    let orderObj = new OrderSchema(payload);
    let result = await orderObj.save();
    console.log(result)
    if(result) {
        success = true;
    }
    return NextResponse.json({result,success});
}