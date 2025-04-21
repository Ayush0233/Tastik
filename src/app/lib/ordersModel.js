import mongoose from "mongoose"



const OrdersModel = new mongoose.Schema({
     user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
     },
     foodItem_id:{
        type:String,
        required:true,
     },
     resto_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
     },
     resto_name:{
        type:String,
        required:true
     },
     deliveryBoy_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
     },
     status:{
        type:String,
     },
     amount:{
        type:Number,
     }
})

export const OrderSchema = mongoose.models.orders || mongoose.model("orders",OrdersModel)