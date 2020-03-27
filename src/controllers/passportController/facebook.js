import  passport from "passport";
import  passportFacebook from "passport-facebook";
import  UserModel from "./../../model/userModel";
import {transErrors} from "./../../../lang/vi"
import { transSuccess} from "./../../../lang/vi"
require("dotenv").config()

let FacebookStrategy =passportFacebook.Strategy
let fbAppId =process.env.FB_id;
let fbAppSecret = process.env.FB_secret;
// let fbAppUrl =process.env.FB_url

let initPassportFacebook =()=>{
    passport.use(new FacebookStrategy({
        clientID:"259018325111299",
        clientSecret:"21071aaaad1ce7fbca9383ae88ac373d",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        passReqToCallback:true,
        profileFields:["email","gender","displayName"]
    }
        ,async(req,accessToken,refreshToken,profile,done)=>{
            try{
                let user =await UserModel.findByFacebookUid(profile.id)
                if(user){
                    return done(null,user,req.flash("success",transSuccess.loginSuccess(user.username)))
                }
                console.log(profile)
               let newUserItem = {
                   username:profile.displayName,
                   genner:profile.gender,
                   local:{
                       isActive:true
                   },
                   facebook:{
                       uid:profile.id,
                       token:accessToken,
                      
                   }
               }
               console.log(newUserItem.facebook.email)
               let newUser =await UserModel.createNew(newUserItem)
               return done(null,newUser,req.flash("success",transSuccess.loginSuccess(newUser.username)))
            }  catch(error){
                console.log(error)
                return done(null,false,req.flash("errors",transErrors.server_error))
            }
        }))
    passport.serializeUser((user,done)=>{
        return done(null,user._id)
    })
    passport.deserializeUser((_id,done)=>{
        UserModel.findUserById(_id)
        .then(user =>{
           return done(null,user) 
        })
        .catch(error =>{
            return done(error,null)
        })
    })
}

module.exports=initPassportFacebook