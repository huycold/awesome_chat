import session from "express-session"
// import connectMongo from "connect-mongo"
// require("dotenv").config();
// let MongoStore =connectMongo(session);


// let sessionStore = new MongoStore({
//     URL:`mongodb://localhost/awesome_chat`,
//     autoReconnect:true
// })

let configSession =(app)=>{
    app.use(session({
        key:"express.sid",
        secret:"mySecret",
        // store:sessionStore,
        resave:true,
        saveUninitialized:false,
        cookie:{
            maxAge:24*60*60*1000
        }
    }))
}
module.exports = configSession