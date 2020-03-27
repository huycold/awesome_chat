var mongoose = require('mongoose');
var bcrypt = require("bcrypt")
mongoose.connect('mongodb://localhost/awesome_chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let Schema =mongoose.Schema;
let UserSchema = new Schema({
    username:String,
    gender:{type:String,default:"male"},
    phone:{type:Number,default:null},
    address:{type:String,default:null},
    avatar:{type:String,default:"avatar-default.jpg"},
    role:{type:String,default:"user"},
    local:{
        email:{type:String, trim:true},
        password:String,
        isActive:{type:Boolean,default:false},
        verifyToken:String
    },
    facebook:{
        uid:String,
        token:String,
        email:{type:String,trim:true}
    },
    google:{
        uid:String,
        token:String,
        email:{type:String,trim:true}
    },
    createdAt:{type:Number,default:Date.now},
    updatedAt:{type:Number,defauld:null},
    deletedAt:{type:Number,default:null}
});
UserSchema.statics={
    createNew(item){
        return this.create(item);
    } ,
    updateUser(id,item){
        return this.findByIdAndUpdate(id,item).exec();
    },
    findByEmail(email){
        return this.findOne({"local.email":email}).exec();
    },
    findUserById(_id){
        return this.findById(_id).exec();
    },
    findByFacebookUid(uid){
    return this.findOne({"facebook.uid":uid}).exec()
    },
    // tim user de tim kiem ban be
    findUserForAddContact(deprecatedUserIds,keyword){
        return this.find({
            $and:[
               {"_id":{$nin:deprecatedUserIds}},
               {"local.isActive":true},
               {$or:[
                   {"username":{$regex:keyword}},
                   {"local.email":{$regex:keyword}},
                   {"facebook.email":{$regex:keyword}},
                   {"google.email":{$regex:keyword}}
               ]}
            ]
        },
        // hien thi ra cac thong tin tra ve cho client
        {_id:1,username:1,address:1,avater:1}).exec()
    }
 }
 UserSchema.methods={
     comparePassword(password){
         return bcrypt.compare(password,this.local.password)// return promise so sanh password
     }
    }
var UserModel=mongoose.model("user",UserSchema);

// UserModel.find().then((data)=>{
//     console.log(data)
// })
console.log(UserModel._id)
module.exports =UserModel;