import Recipient from "@/models/Recipient";


export async function findRecipient(userId, searchText) {

    if (!searchText) {

        throw new Error("Recipient name is required.");

    }

    const recipient = await Recipient.findOne({

        owner: userId,

        $or: [

            {
                name: {
                    $regex: new RegExp(searchText, "i")
                }
            },

            {
                nickname: {
                    $regex: new RegExp(searchText, "i")
                }
            },

            {
                upiId: {
                    $regex: new RegExp(searchText, "i")
                }
            }

        ]

    });

    return recipient;

}

export async function getRecipientById(id) {

    return await Recipient.findById(id);

}

export async function getRecipients(userId) {

    return await Recipient.find({

        owner: userId

    }).sort({

        transactionCount: -1,

        isFavourite: -1

    });

}

export async function getTrustedRecipients(userId) {

    return await Recipient.find({

        owner: userId,

        isTrusted: true

    });

}

export async function getFavouriteRecipients(userId) {

    return await Recipient.find({

        owner: userId,

        isFavourite: true

    });

}

export async function addRecipient({

    userId,

    name,

    nickname,

    upiId,

    bankName,

    accountNumber,

    ifscCode

}) {

    // Check duplicate UPI
    const existingUpi = await Recipient.findOne({

        owner: userId,

        upiId: upiId.toLowerCase()

    });

    if (existingUpi) {

        throw new Error("Recipient with this UPI ID already exists.");

    }

    // Check duplicate Account Number
    const existingAccount = await Recipient.findOne({

        owner: userId,

        accountNumber

    });

    if (existingAccount) {

        throw new Error("Recipient with this Account Number already exists.");

    }

    const recipient = await Recipient.create({

        owner: userId,

        name,

        nickname,

        upiId,

        bankName,

        accountNumber,

        ifscCode,

        isFavourite: false,

        isTrusted: false,

        transactionCount: 0,

        lastUsed: null

    });

    return recipient;

}


export async function updateRecipient(

    recipientId,

    updateData

) {

    const recipient = await Recipient.findByIdAndUpdate(

        recipientId,

        updateData,

        {

            new: true,

            runValidators: true

        }

    );

    if (!recipient) {

        throw new Error("Recipient not found.");

    }

    return recipient;

}


export async function deleteRecipient(

    recipientId

) {

    const recipient = await Recipient.findByIdAndDelete(

        recipientId

    );

    if (!recipient) {

        throw new Error("Recipient not found.");

    }

    return {

        success: true,

        message: "Recipient deleted successfully."

    };

}

export async function markFavourite(

    recipientId,

    value = true

) {

    return await Recipient.findByIdAndUpdate(

        recipientId,

        {

            isFavourite: value

        },

        {

            new: true

        }

    );

}

export async function markTrusted(

    recipientId,

    value = true

) {

    return await Recipient.findByIdAndUpdate(

        recipientId,

        {

            isTrusted: value

        },

        {

            new: true

        }

    );

}


