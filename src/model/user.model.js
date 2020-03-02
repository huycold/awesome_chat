import mongoose from "mongoose";
let Schema =mongoose.Schema;
let UserSchema = new Schema({
    username:String,
    gender:{type:String,default:"male"},
    phone:{type:Number,default:null},
    address:{type:String,default:null},
    avatar:{type:String,default:"avatar-default.jpg"},
    role:{type:String,default:"user"},
    local:{
        email:{type:String, trim:true},
        password:String,
        isActive:{type:Boolean,default:false},
        verifyToken:String
    },
    facebook:{
        uid:String,
        toke:String,
        email:{type:String,trim:true}
    },
    google:{
        uid:String,
        token:String,
        email:{type:String,trim:true}
    },
    createdAt:{type:Number,default:Date.now},
    updatedAt:{type:Number,defauld:null},
    deletedAt:{type:Number,default:null}
});
module.export=mongoose.model("user",UserSchema);