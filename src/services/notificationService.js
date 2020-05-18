
import NotificationModel from "./../model/notificationModel"
import UserModel from "./../model/userModel"
let getNotifications =(currentUserId,limit = 10)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId,limit)
            let getNotifContents  = notifications.map( async(notification)=>{
                let sender = await UserModel.findUserById(notification.senderId)
                return NotificationModel.content.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar)
            })
          resolve(await Promise.all(getNotifContents))
        }
        catch(error){
            reject(error)
        }
    })
    
}

module.exports = {
    getNotifications:getNotifications
}

module.exports ={
    getNotifications:getNotifications
}