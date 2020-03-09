import express from "express";

import ConnectDB from "./config/connectDB";
import configViewEngine from"./config/viewEngine"
import initRoutes from "./routes/web"
import bodyParser, { urlencoded }  from "body-parser"

let app = express();
//connect to mongo db
ConnectDB();
//config view engine
configViewEngine(app)
app.use(bodyParser.urlencoded({ extended: true }))
let hostname="localhost";
let port =3000;
initRoutes(app)
app.listen(port,()=>{
    console.log("server dang chay ");
});
