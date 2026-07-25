import User from "@/models/User";
import Recipient from "@/models/Recipient";
import Transaction from "@/models/Transaction";

import { evaluateRisk } from "@/lib/riskEngine";
import * as balanceService from "./balanceService";


import crypto from "crypto";

function generateReference(){

return "VB"+

crypto.randomUUID()

.replace(/-/g,"")

.substring(0,16)

.toUpperCase();

}


async function findSender(userId) {
    console.log("Looking for user:", userId);

    const sender = await User.findById(userId);

    console.log("Sender found:");
    console.log(sender);

    if (!sender) {
        throw new Error("Sender not found.");
    }

    return sender;
}
async function findRecipient(userId, recipientName) {

    const recipient = await Recipient.findOne({

        owner: userId,

        $or: [

            {
                name: {
                    $regex: new RegExp(recipientName, "i")
                }
            },

            {
                nickname: {
                    $regex: new RegExp(recipientName, "i")
                }
            }

        ]

    });

    if (!recipient) {

        throw new Error("Recipient not found.");

    }

    return recipient;

}


// console.log("statistics =", sender.statistics);


function checkBalance(sender, amount) {

    if (amount <= 0) {

        throw new Error("Invalid amount.");

    }

    console.log("walletBalance:", sender.statistics?.walletBalance);

    // if (sender.wallet.balance < amount) {

    //     throw new Error("Insufficient balance.");

    // }
    if (sender.statistics.walletBalance < amount) {
    throw new Error("Insufficient balance.");
}
}


async function deductBalance(sender, amount) {

    // sender.wallet.balance -= amount;

    sender.statistics.walletBalance -= amount;

    await sender.save();

}


async function updateStatistics(sender, amount) {

    sender.statistics.totalTransactions += 1;

    sender.statistics.totalSpent += amount;

    await sender.save();

}



async function createTransaction({

    sender,

    recipient,

    amount,

    transcript,

    risk

}) {

    const transaction = await Transaction.create({

        sender: sender._id,

        recipient: recipient._id,

        amount,

       voiceTranscript: transcript,

       aiDecision:
            risk.level === "HIGH"
                ? "BLOCK"
                : risk.level === "MEDIUM"
                ? "CONFIRM"
                : "ALLOW",

        risk: {
            score: risk.score,
            level: risk.level,
            reasons: risk.reasons,
}, 

        status: "PENDING",

        referenceNumber: generateReference()

    });

    return transaction;

}



async function updateRecipient(recipient) {

    // recipient.transactionCount += 1;

    // recipient.lastUsed = new Date();

    // await recipient.save();
    
    recipient.totalTransactions += 1;
    recipient.lastPaidAt = new Date();
    await recipient.save();

}

export async function getRecentRecipients(userId){

    return await Recipient.find({

        owner:userId

    })

    .sort({

        lastUsed:-1

    })

    .limit(5);

}

export async function previewPayment({
    userId,
    recipient,
    amount,
    purpose = "",
    transcript = "",
}) {
    const sender = await findSender(userId);

    console.log("Sender statistics:", sender.statistics);

    const savedRecipient = await findRecipient(
        userId,
        recipient
    );

    checkBalance(sender, amount);

    const risk = await evaluateRisk({
        conversation: transcript,
        amount,
        isNewRecipient: !savedRecipient.isTrusted,
        transactionTime: new Date(),
    });

    return {
        success: true,
        action: "SHOW_TRANSACTION_SUMMARY",

        data: {
            summary: {
                recipient: savedRecipient.name,
                amount,
                bank: savedRecipient.bankName,
                note: purpose,
            },

            risk,

            authentication: {
                amount,
                method: "UPI PIN",
            },

            recipientId: savedRecipient._id,
        },
    };
}

export async function processPayment({

    userId,

    recipient,

    amount,

    transcript = ""

}) {

    const sender = await findSender(userId);

    console.log("Sender statistics:", sender.statistics);

    const savedRecipient = await findRecipient(

        userId,

        recipient

    );

    checkBalance(

        sender,

        amount

    );

    const risk = await evaluateRisk({

        conversation: transcript,

        amount,

        isNewRecipient: !savedRecipient.isTrusted,

        transactionTime: new Date()

    });

if (risk.level === "BLOCK") {

    return {

        success: false,

        action: "BLOCK_TRANSACTION",

        data: {

            risk,

            recipient: savedRecipient.name,

            amount,

            canContinue: false,

        },

    };

}

if (risk.level === "HIGH") {

    return {

        success: true,

        action: "SHOW_SCAM_WARNING",

        data: {

            risk,

            recipient: savedRecipient.name,

            amount,

            canContinue: true,

        },

    };

}


    const transaction = await createTransaction({

        sender,

        recipient: savedRecipient,

        amount,

        transcript,

        risk

    });

    await deductBalance(

        sender,

        amount

    );

    await updateStatistics(

        sender,

        amount

    );

    await updateRecipient(

        savedRecipient

    );

    return {
    success: true,

    action: "PAYMENT_SUCCESS",

    data: {
        recipient: savedRecipient.name,

        amount,

        reference: transaction.referenceNumber,

        time: new Date().toLocaleTimeString(),

        balance: sender.statistics.walletBalance,

        risk,
    },
};

    // return {

    //     success: true,

    //     action: "PAYMENT_SUCCESS",

    //     transaction,

    //     recipient: {

    //         id: savedRecipient._id,

    //         name: savedRecipient.name,

    //         nickname: savedRecipient.nickname,

    //         bank: savedRecipient.bankName,

    //         upiId: savedRecipient.upiId,

    //         accountNumber: savedRecipient.accountNumber,

    //         ifscCode: savedRecipient.ifscCode,

    //         trusted: savedRecipient.isTrusted

    //     },

    //     // remainingBalance:

    //     //     sender.wallet.balance,
        
    //     remainingBalance:
    //         sender.statistics.walletBalance,

    //         risk

    // };


   

}