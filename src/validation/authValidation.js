import {check} from"express-validator/check"
import {transValidation} from "./../../lang/vi"
let register =[
    check("email",transValidation.email_err)
    .isEmail()
    .trim(),
    check("gender",transValidation.gender_err)
    .isIn(["male","female"]),
    check("password",transValidation.password_err)
    .isLength({min:8}),
    check("password_confirmation",transValidation.password_cf)
    .custom((value,{req})=>{
        return value ===req.body.password
    })
    
];

module.exports={
    register:register
}