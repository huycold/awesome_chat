import {contact} from "./../services/index"
import user from "./../model/userModel"
let findUsersContact =async(req,res)=>{
    try {
        let currenUserId = req.user._id;
        let keyword = req.params.keyword;
        // console.log(currenUserId)
        // console.log(keyword)
        let users =await contact.findUsersContact(currenUserId,keyword)
        // console.log(users)
        return res.render("main/contact/sections/findUsersContact",{users})
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports ={
    findUsersContact:findUsersContact
}