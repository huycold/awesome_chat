import express from "express";
import passport from "passport"
import{authValidat} from "./../validation/index"
import {home,auth,user,contact} from "./../controllers/index"
import initPassportLocal from "../controllers/passportController/local"
import initPassportFacebook from "../controllers/passportController/facebook"
initPassportLocal()
initPassportFacebook()
let router = express.Router();
let initRoutes =(app)=>{
   router.get("/",auth.checkLoggedIn,home.getHome)
   router.get("/auth/facebook",passport.authenticate("facebook",{scope:["email"]}))
   router.get("/auth/facebook/callback",passport.authenticate("facebook",{
       successRedirect:"/",
       failureRedirect:"login-register"
   }))
   router.post("/register",auth.checkLoggedOut,authValidat.register,auth.postRegister)
   router.get("/login-register",auth.checkLoggedOut,auth.getLoginRegister);
   router.get("/login",auth.checkLoggedOut,auth.login)
   router.post("/login",auth.checkLoggedOut,passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login-register",
        successFlash:true,
        failureFlash:true
    }))
    router.get("/logout",auth.checkLoggedIn,auth.getLogout);
    router.put("/user/update-avatar",auth.checkLoggedIn,user.updateAvatar);
    router.get("/contact/find-users/:keyword",auth.checkLoggedIn,contact.findUsersContact)
    return app.use("/",router)
}
module.exports=initRoutes;