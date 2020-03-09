import {validationResult} from "express-validator/check"
let getLoginRegister =(req,res)=>{
    return res.render("auth/master")
}
let postRegister =(req,res)=>{
    let errorArray= [];

    console.log(validationResult(req).isEmpty())
    // console.log(validationResult(req).array())
    console.log(validationResult(req).mapped())
    // console.log(validationResult(req).formatWith())
    // console.log(validationResult(req).throw())
    let validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped())
       
        errors.forEach(item =>{
            errorArray.push(item.msg)
        })
        console.log(errorArray)
    }
}
module.exports = {
    getLoginRegister:getLoginRegister,
    postRegister:postRegister
}