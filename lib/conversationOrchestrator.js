// lib/conversationOrchestrator.js

export function determineNextAction(state, intentData) {
  const {
    intent,
    recipient,
    amount,
    purpose,
    confirmation = false,
  } = intentData;

  switch (intent) {
    case "payment":
      if (!recipient) {
        return {
          action: "ASK_RECIPIENT",
        };
      }

      if (!amount || amount <= 0) {
        return {
          action: "ASK_AMOUNT",
        };
      }

      if (!confirmation) {
        return {
          action: "ASK_CONFIRMATION",
          payload: {
            recipient,
            amount,
            purpose,
          },
        };
      }

      return {
        action: "EXECUTE_PAYMENT",
        payload: {
          recipient,
          amount,
          purpose,
        },
      };

    case "balance":
      return {
        action: "GET_BALANCE",
      };

    case "history":
      return {
        action: "GET_HISTORY",
      };

    case "financial_coach":
      return {
        action: "GET_FINANCIAL_ADVICE",
      };

    case "help":
      return {
        action: "SHOW_HELP",
      };

    case "greeting":
      return {
        action: "GREETING",
      };

    default:
      return {
        action: "UNKNOWN",
      };
  }
}