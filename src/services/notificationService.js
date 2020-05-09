import NotificationModel from "./../model/notifycationModel"
let getNotifications =(currentUserId,limit= 10)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId,limit)
            console.log(notifications)
        }catch(error){
            reject(error)
        }
    })
}
module.exports ={
    getNotifications:getNotifications
}
