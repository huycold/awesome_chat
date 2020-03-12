import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from"./config/viewEngine"
import initRoutes from "./routes/web"
import bodyParser  from "body-parser"
import connectFlash from "connect-flash"
import configSession from "./config/session"
let app = express();
//connect to mongo db
ConnectDB();
//configSession
configSession(app)
//config view engine

configViewEngine(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(connectFlash())
let hostname="localhost";
let port =3000;
initRoutes(app)
app.listen(port,()=>{
    console.log("server dang chay ");
});
