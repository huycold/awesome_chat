var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/awesome_chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
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
   } ,
   findAllByUser(userId){
      return this.find({
        $or:[
            {"userId":userId},
            {"contactId":userId}
        ]
      }).exec()
   }

}
var ContactModel=mongoose.model("contact",ContactSchema);
// ContactModel.createNew({
//     userId:"huy",
//     contactId:"123"
// })
// ContactModel.find()
// .then((data)=>{
//     console.log(data)
// })
module.exports =ContactModel