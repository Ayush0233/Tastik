import mongoose from "mongoose"
import { unauthorized } from "next/navigation"

const restaurantModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true
    }, 
    city:{
        type:String,
        required:true
    }, 
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },


})
export const restaurantSchema = mongoose.models.restaruants || mongoose.model("restaruants",restaurantModel)