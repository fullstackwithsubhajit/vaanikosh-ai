"use client";

import UserBubble from "./UserBubble";
import AssistantBubble from "./AssistantBubble";

import RiskCard from "../transaction/RiskCard";
import TransactionSummary from "../transaction/TransactionSummary";
import AuthenticationCard from "../transaction/AuthenticationCard";
import RecipientSelectionCard from "../transaction/RecipientSelectionCard";
import BalanceCard from "../transaction/BalanceCard";
import HistoryCard from "../transaction/HistoryCard";
import SuccessCard from "../transaction/SuccessCard";
import ScamWarningCard from "../transaction/ScamWarningCard";

export default function ConversationItem({
  item,
  confirmPayment,
  continueAfterWarning,
  cancelTransaction,
}) {
    switch (item.type) {

        case "user":
            return <UserBubble data={item.data} />;

        case "assistant":
            return <AssistantBubble data={item.data} />;

        case "balance":
            return <BalanceCard data={item.data} />;

        case "history":
            return <HistoryCard data={item.data} />;

        case "summary":
            return <TransactionSummary data={item.data} />;

        case "risk":
            return <RiskCard data={item.data} />;

        case "recipientSelection":
            return <RecipientSelectionCard data={item.data} />;

        case "authentication":
                return (
                <AuthenticationCard
                    data={item.data}
                    onAuthenticate={() =>
                    confirmPayment({
                    conversationId: item.data.conversationId,
                    authentication: item.data,
                })
            }
        />
    );

       case "scam":
            return (
            <ScamWarningCard
                data={item.data}
                onContinue={() => continueAfterWarning(item.data)}
                onCancel={cancelTransaction}
            />
    );

        case "success":
            return <SuccessCard data={item.data} />;

        default:
            return null;
    }

}