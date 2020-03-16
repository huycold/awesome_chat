import express from "express";
import passport from "passport"
import{authValida} from "./../validation/index"
import {home,auth} from "./../controllers/index"
import initPassportLocal from "../controllers/passportController/local"
initPassportLocal()
let router = express.Router();
let initRoutes =(app)=>{
   router.get("/",auth.checkLoggedIn,home.getHome)
   router.post("/register",auth.checkLoggedOut,authValida.register,auth.postRegister)
   router.get("/login-register",auth.checkLoggedOut,auth.getLoginRegister);
   router.get("/login",auth.checkLoggedOut,auth.login)
   router.post("/login",auth.checkLoggedOut,passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login-register",
        successFlash:true,
        failureFlash:true
    }))
    router.get("/logout",auth.checkLoggedIn,auth.getLogout);
    return app.use("/",router)
}
module.exports=initRoutes;