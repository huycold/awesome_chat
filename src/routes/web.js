import express from "express";
import{authValida} from "./../validation/index"
import {home,auth} from "./../controllers/index"
let router = express.Router();
let initRoutes =(app)=>{
   router.get("/",home.getHome)
   router.post("/register",authValida.register,auth.postRegister)
   router.get("/login-register",auth.getLoginRegister);
  
    return app.use("/",router)
}
module.exports=initRoutes;