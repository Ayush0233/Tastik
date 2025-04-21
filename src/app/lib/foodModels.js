import mongoose from "mongoose"

const FoodsModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    resto_id:mongoose.Schema.Types.ObjectId,
    resto_name:{
        type:String,
        required:true
    },
});
export const foodSchema = mongoose.models.foods || mongoose.model("foods",FoodsModel)