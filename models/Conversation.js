import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

speaker:{
type:String,
enum:["USER","AI"],
required:true
},

content:{
type:String,
required:true
},

intent:{
type:String,
default:""
},

timestamp:{
type:Date,
default:Date.now
}

});

const conversationSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

language:{
type:String,
default:"en"
},

status:{
type:String,
enum:[
"ACTIVE",
"COMPLETED"
],
default:"ACTIVE"
},

messages:[
messageSchema
]

},
{
timestamps:true
}
);

const Conversation =
mongoose.models.Conversation ||
mongoose.model(
"Conversation",
conversationSchema
);

export default Conversation;