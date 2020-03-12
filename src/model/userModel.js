var mongoose = require('mongoose')
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
        toke:String,
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
    findByEmail(email){
        return this.findOne({"local.email":email}).exec();
    }
 }
var UserModel=mongoose.model("user",UserSchema);

UserModel.find().then((data)=>{
    console.log(data)
})
module.exports =UserModel;