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

    const sender = await User.findById(userId);

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

function checkBalance(sender, amount) {

    if (amount <= 0) {

        throw new Error("Invalid amount.");

    }

    if (sender.wallet.balance < amount) {

        throw new Error("Insufficient balance.");

    }

}


async function deductBalance(sender, amount) {

    sender.wallet.balance -= amount;

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

        transcript,

        aiDecision: {

            riskScore: risk.score,

            riskLevel: risk.level,

            reasons: risk.reasons

        },

        status: "PENDING",

        referenceNumber: generateReference()

    });

    return transaction;

}



async function updateRecipient(recipient) {

    recipient.transactionCount += 1;

    recipient.lastUsed = new Date();

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


export async function processPayment({

    userId,

    recipient,

    amount,

    transcript = ""

}) {

    const sender = await findSender(userId);

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

    if (risk.level === "HIGH") {

        return {

            success: false,

            action: "BLOCK_TRANSACTION",

            risk

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

        transaction,

        recipient: {

            id: savedRecipient._id,

            name: savedRecipient.name,

            nickname: savedRecipient.nickname,

            bank: savedRecipient.bankName,

            upiId: savedRecipient.upiId,

            accountNumber: savedRecipient.accountNumber,

            ifscCode: savedRecipient.ifscCode,

            trusted: savedRecipient.isTrusted

        },

        remainingBalance:

            sender.wallet.balance,

        risk

    };


    await balanceService.debit(
    sender._id,
    amount
    );

    await balanceService.updateWalletStats(
        sender._id,
        amount
    );

}