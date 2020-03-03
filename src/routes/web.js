import express from "express";
import {home,auth} from "./../controllers/index"
let router = express.Router();
let initRoutes =(app)=>{
   router.get("/login",auth)
   router.get("/master",home);
  
    return app.use("/",router)
}
module.exports=initRoutes;