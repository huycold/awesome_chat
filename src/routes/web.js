import express from "express";
import passport from "passport"
import{authValida} from "./../validation/index"
import {home,auth} from "./../controllers/index"
import initPassportLocal from "../controllers/passportController/local"
initPassportLocal()
let router = express.Router();
let initRoutes =(app)=>{
   router.get("/",home.getHome)
   router.post("/register",authValida.register,auth.postRegister)
   router.get("/login-register",auth.getLoginRegister);
   router.get("/login",auth.login)
    router.post("/login",passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login-register",
        successFlash:true,
        failureFlash:true
    }))
    return app.use("/",router)
}
module.exports=initRoutes;