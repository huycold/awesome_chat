var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/awesome_chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    senderId:String,
    receiverId:String,
    type:String,
    isRead:{type:Boolean,default:false},
    createdAt:{type:Number,default:Date.now}
})
NotificationSchema.statics={
    createNew(item){
        return this.create(item);
    },
    removeRequestContactNotification(senderId,receiverId,type){
        return this.remove({
         $and:[
             {
                "senderId":senderId 
             },
             {
                 "receiverId":receiverId
             },
             {
                 "type":type
             }
         ]
        }).exec()
       },
       getByUserIdAndLimit(userId,limit){
           return this.find({
            "receiverId":userId
           }).sort({"createAt":-1}).limit(limit).exec()
       }
}
const NOTIFICATION_TYPE= {
    ADD_CONTACT:"add_contact"
}
var NotificationModel=mongoose.model("notification",NotificationSchema);
module.exports ={
    model:NotificationModel,
    type:NOTIFICATION_TYPE
}
