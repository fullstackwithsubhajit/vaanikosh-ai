import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

type:{
type:String,
enum:[
"TRANSACTION",
"SCAM",
"COACH",
"SECURITY"
],
required:true
},

title:{
type:String,
required:true
},

message:{
type:String,
required:true
},

priority:{
type:String,
enum:[
"LOW",
"MEDIUM",
"HIGH"
],
default:"LOW"
},

isRead:{
type:Boolean,
default:false
}

},
{
timestamps:true
}
);

const Notification =
mongoose.models.Notification ||
mongoose.model(
"Notification",
notificationSchema
);

export default Notification;