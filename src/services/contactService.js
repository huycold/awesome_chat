import ContactModel from "./../model/contactModel"
import UserModel from "./../model/userModel"
import NotificationModel from "./../model/notificationModel"
import _ from "lodash" //lam viec voi mang loc ra cac phan tu trung nhau 
let findUsersContact =(currentUserId,keyword)=>{
   return new Promise(async(resolve,reject)=>{
        let deprecatedUserIds =[currentUserId];//mang nhung id da la ban be
        let contactsByUser =await ContactModel.findAllByUser(currentUserId)
        contactsByUser.forEach((contact)=>{
            deprecatedUserIds.push(contact.userId)
            deprecatedUserIds.push(contact.contactId)
        })
        // console.log(contactsByUser)
        // console.log(deprecatedUserIds)
        deprecatedUserIds =_.uniqBy(deprecatedUserIds)
        // console.log(deprecatedUserIds)
        let users =await UserModel.findUserForAddContact(deprecatedUserIds,keyword)
        resolve(users)
   })
}
let addNew  =(currentUserId,contactId)=>{
    return new Promise(async(resolve,reject)=>{
        let contactExitst =await ContactModel.checkExists(currentUserId,contactId)
        if(contactExitst){
            return reject(false)

        }
        let newContactItem = {
            userId:currentUserId,
            contactId:contactId
        }
        let newContact = await ContactModel.createNew(newContactItem)
        //createNotification
        let notificationItem = {
            senderId:currentUserId,
            receiverId:contactId,
            type:NotificationModel.types.ADD_CONTACT
        }
        await NotificationModel.model.createNew(notificationItem)
        resolve(newContact)
        
    })
}
let removeRequestContact =(currentUserId,contactId)=>{
    return new Promise(async(resolve,reject)=>{
       let removeRequest = await ContactModel.removeRequestContact(currentUserId,contactId)
       if(removeRequest.result.n===0){
           return reject(false)
       }
       //removeNotification
       await NotificationModel.model.removeRequestNotification(currentUserId,contactId,NotificationModel.types.ADD_CONTACT)
       resolve(true)
    })
}
module.exports ={
    findUsersContact:findUsersContact,
    addNew:addNew,
    removeRequestContact:removeRequestContact
}