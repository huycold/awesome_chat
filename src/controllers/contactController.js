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
let addNew =async(req,res)=>{
    try {
        let currenUserId = req.user._id;
        let contactId = req.body.uid
        let newContact = await contact.addNew(currenUserId,contactId)
        // console.log(newContact)
        // console.log(!!newContact)
        return res.status(200).send({success:!!newContact})
    } catch (error) {
        return res.status(500).send(error)
    }
}
let removeRequestContact =async(req,res)=>{
    try {
        let currenUserId = req.user._id;
        let contactId = req.body.uid
        let removeRequest = await contact.removeRequestContact(currenUserId,contactId)
        // console.log(newContact)
        // console.log(!!newContact)
        return res.status(200).send({success:!!removeRequest})
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports ={
    findUsersContact:findUsersContact,
    addNew:addNew,
    removeRequestContact:removeRequestContact
}