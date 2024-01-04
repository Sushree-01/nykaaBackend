const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        minlength:1,
        maxlength:50
    },
    avatar:{
        type:String,
        validate:{
            validator:function(v){
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
        }
    },
    email:{
        type:String,
        unique:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    },
    password:String,
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

const UserModel=mongoose.model("users",userSchema);

module.exports={
    UserModel
};
