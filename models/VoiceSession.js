import mongoose from "mongoose";

const voiceSessionSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

conversation:{
type:mongoose.Schema.Types.ObjectId,
ref:"Conversation"
},

language:{
type:String,
default:"en"
},

transcript:{
type:String,
default:""
},

detectedIntent:{
type:String,
default:""
},

aiResponse:{
type:String,
default:""
},

riskScore:{
type:Number,
default:0
},

duration:{
type:Number,
default:0
},

status:{
type:String,
enum:[
"STARTED",
"COMPLETED",
"FAILED"
],
default:"STARTED"
}

},
{
timestamps:true
}
);

const VoiceSession =
mongoose.models.VoiceSession ||
mongoose.model(
"VoiceSession",
voiceSessionSchema
);

export default VoiceSession;