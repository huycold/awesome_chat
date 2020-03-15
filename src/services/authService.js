import userModel from "../model/userModel"
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4"
import {transErrors, transSuccess} from "./../../lang/vi"
// import {transSuccess} from "./../../lang/vi"
import sendMail from "./../config/mailer"
import {transMail} from "./../../lang/vi"

let saltRounds = 7;
let register =(email,gender,password,protocol,host)=>{
    return new Promise(async(resolve,reject)=>{
    let userByEmail =await userModel.findByEmail(email);
    if(userByEmail){
        {
            if(!userByEmail.local.isActive){
                return reject(transErrors.isNotActive)
            }
        }
        return reject(transErrors.account_err)
    }
    let salt = bcrypt.genSaltSync(saltRounds)
    let userItem ={
        username:email.split("@")[0],
        gender:gender,
        local:{
            email:email,
            password:bcrypt.hashSync(password,salt),
            verifyToken:uuidv4()
        }
    }
    let user =await userModel.create(userItem)
    let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`
    //send email
    sendMail(email,transMail.subject,transMail.template(linkVerify))
    .then(success=>{
        resolve(transSuccess.userCreated(user.local.email))
    })
    .catch(async(error)=>{
        // await userModel.removeById(user._id);

        console.log(error)
        // reject(transMail.send_failed)
    })
        
    })
    
}
module.exports = {
    register:register
};