import multer from "multer";
import app from "./../config/app"
import {transErrors} from "./../../lang/vi"
import uuidv4 from "uuid/v4"
import fsExtra from "fs-extra"
import{transSuccess} from"./../../lang/vi"
import {user} from "./../services/userService"
let storageAvatar =multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"src/public/images/users")
  }  ,
  filename:(req,file,callback)=>{
      let math =["image/png","image/jpg","image/jpeg"] ;
      if(math.indexOf(file.minetype)=== -1){
           return callback(transErrors.avatar_type,null)
        }
        let avatarName = `$(Date.now())-${uuidv4()}-${file.originalname}`
        callback (null,avatarName)
  }
})
let avatarUploadFile =multer({
    storage:storageAvatar,
    limits:{fileSize:180576}
}).single("avatar")
let updateAvatar =(req,res)=>{
    avatarUploadFile(req,res,async(error)=>{
        if(error){
            console.log(error)
        }
        try {
           let updateUserItem ={
               avatar:req.file.filename,
               updateAt:Date.now()
           } 
       let userUpdate= await user.updateUser(req.user._id,updateUserItem)
           await fsExtra.remove(`$(app.avatar_directory)/$(userUpdate.avatar)`)
           let result={
               message:transSuccess.avatar_updated,
               imageSrc:`/images/users/$(req.file.filenam)`
           }
           return  res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    })
}
module.exports={
    updateAvatar:updateAvatar
}