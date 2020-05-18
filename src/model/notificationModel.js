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
   
    isRead:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Number,
        default:Date.now
    }
})
NotificationSchema.statics={
    createNew(item){
        return this.create(item);
    },
    removeRequestNotification(senderId,receiverId,type){
        return this.remove({
            //dieukien and
          $and:[
            {"senderId":senderId},
            {"receiverId":receiverId},
            {"type":type}
            
          ]
        }).exec()
       },
    getByUserIdAndLimit(userId,limit){
        return this.find({
            "receverId":userId
        }).sort({"createAt":-1}).limit(limit).exec()
    }
    
}
const NOTIFICATION_CONTENT  = {
    getContent :(notificationType,isRead,userId,username,userAvatar)=>{
        if(notificationType === NOTIFICATION_TYPES.ADD_CONTACT){
            return `<span data-uid="${userId}">
            <img class="avatar-small" src="../images/users/${userAvatar}" alt=""> 
            <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
        </span><br><br><br>`
        }
    }
}
const NOTIFICATION_TYPES = {
    ADD_CONTACT:"add_contact"
}
let NotificationModel = mongoose.model("notification",NotificationSchema)
module.exports ={
    model: NotificationModel,
    types:NOTIFICATION_TYPES,
    content:NOTIFICATION_CONTENT};