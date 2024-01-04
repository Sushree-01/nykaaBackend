const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        minlength:1,
        maxlength:50
    },
    picture:{
        type:String,
        validate:{
            validator:function(v){
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
        }
    },
    description:String,
    gender:{
        type:String,
        enum:['male','female']
    },
    category:{
        type:String,
        enum:['makeup','skincare','haircare']
    },
    price:Number,
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

const ProductModel=mongoose.model("posts",productSchema);

module.exports={
    ProductModel
};
