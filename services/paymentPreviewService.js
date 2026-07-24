export async function previewPayment({
    userId,
    recipient,
    amount,
    purpose = "",
    transcript = "",
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

            recipient: savedRecipient,
        },
    };
}