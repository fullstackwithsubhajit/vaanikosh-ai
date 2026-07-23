import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
{
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Recipient",
        required:true
    },

    amount:{
        type:Number,
        required:true,
        min:1
    },

    purpose:{
        type:String,
        default:""
    },

    transactionType:{
        type:String,
        enum:[
            "VOICE",
            "UPI",
            "QR",
            "BANK_TRANSFER"
        ],
        default:"VOICE"
    },

    status:{
        type:String,
        enum:[
            "PENDING",
            "SUCCESS",
            "FAILED",
            "CANCELLED"
        ],
        default:"PENDING"
    },

    referenceNumber:{
        type:String,
        unique:true
    },

    voiceTranscript:{
        type:String,
        default:""
    },

    aiDecision:{
        type:String,
        enum:[
            "ALLOW",
            "CONFIRM",
            "BLOCK"
        ],
        default:"ALLOW"
    },

    risk:{
        score:{
            type:Number,
            default:0
        },

        level:{
            type:String,
            enum:[
                "LOW",
                "MEDIUM",
                "HIGH"
            ],
            default:"LOW"
        },

        reasons:[
            String
        ]
    }

},
{
    timestamps:true
}
);

transactionSchema.index({
sender:1,
createdAt:-1
});

const Transaction =
mongoose.models.Transaction ||
mongoose.model(
"Transaction",
transactionSchema
);

export default Transaction;