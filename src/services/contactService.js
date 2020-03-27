import ContactModel from "./../model/contactModel"
import UserModel from "./../model/userModel"
import _ from "lodash" //lam viec voi mang loc ra cac phan tu trung nhau 
let findUsersContact =(currentUserId,keyword)=>{
   return new Promise(async(resolve,reject)=>{
        let deprecatedUserIds =[];//mang nhung id da la ban be
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
module.exports ={
    findUsersContact:findUsersContact
}