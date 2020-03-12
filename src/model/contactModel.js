import mongoose from "mongoose";
let Schema =mongoose.Schema;
let ContactSchema = new Schema({
    userId:String,
    contactId:String,
    status:{type:Boolean,default:false},
    createdAt:{type:Number,default:Date.now},
    updatedAt:{type:Number,defauld:null},
    deletedAt:{type:Number,default:null}
});
ContactSchema.statics={
   createNew(item){
       return this.create(item);
   } 
}
module.export=mongoose.model("contact",ContactSchema);