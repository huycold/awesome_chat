import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from"./config/viewEngine"
let app = express();
//connect to mongo db
ConnectDB();
//config view engine
configViewEngine(app)
let hostname="localhost";
let port =3000;
app.get("/login",function(req,res,next){
    res.render("auth/loginRegister")
})
app.get("/master",function(req,res,next){
    res.render("main/master")
})
app.listen(port,()=>{
    console.log("server dang chay ");
});
