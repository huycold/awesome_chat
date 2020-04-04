import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from"./config/viewEngine"
import initRoutes from "./routes/web"
import bodyParser  from "body-parser"
import connectFlash from "connect-flash"
import session from "./config/session"
import passport from "passport";
import http from "http"
import socketio from "socket.io"
import initSockets from "./sockets/index"
import configSocket from "./config/configSocket"
import cookieParser from "cookie-parser"
import passportSocket from "passport.socketio"

let app = express();



//init server with socket.io
let server =http.createServer(app)
let io = socketio(server)
// //connect to mongo db
ConnectDB();
// //configSession
session.config(app)
// //config view engine

configViewEngine(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(connectFlash())
//
app.use(cookieParser())
//config passport
app.use(passport.initialize());
app.use(passport.session())

initRoutes(app)
configSocket(io,cookieParser,session.sessionStore)
initSockets(io)
// io.on("connection",(socket)=>{
//   socket.on("add-new-contact",(data)=>{
//       console.log(data)
//       console.log(socket.request.user)
//       // console.log("socketio")
//   })
// })

server.listen(3000,()=>{
    console.log("server is running");
});

