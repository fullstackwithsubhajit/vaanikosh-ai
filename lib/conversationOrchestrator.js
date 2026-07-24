// lib/conversationOrchestrator.js

/**
 * Decides what should happen next.
 * It NEVER performs business logic.
 */

export function determineNextAction(conversationState, aiIntent) {
  const {
    intent,
    recipient,
    amount,
    purpose,
    confirmation = false,
  } = aiIntent;

  const state = conversationState || {};

  switch (intent) {
    case "payment":
      return handlePaymentFlow(state, {
        recipient,
        amount,
        purpose,
        confirmation,
      });

    case "balance":
      return {
        action: "GET_BALANCE",
        payload: {},
      };

    case "history":
      return {
        action: "GET_HISTORY",
        payload: {},
      };

    case "financial_coach":
      return {
        action: "GET_FINANCIAL_ADVICE",
        payload: {},
      };

    case "help":
      return {
        action: "SHOW_HELP",
        payload: {},
      };

    case "greeting":
      return {
        action: "GREETING",
        payload: {},
      };

    default:
      return {
        action: "UNKNOWN",
        payload: {},
      };
  }
}

/**
 * Handles payment conversation flow.
 */
function handlePaymentFlow(state, data) {
  const { recipient, amount, purpose, confirmation } = data;

  if (!recipient) {
    return {
      action: "ASK_RECIPIENT",
      payload: {},
      nextState: {
        currentIntent: "payment",
        stage: "COLLECT_RECIPIENT",
      },
    };
  }

  if (!amount || amount <= 0) {
    return {
      action: "ASK_AMOUNT",
      payload: {
        recipient,
      },
      nextState: {
        currentIntent: "payment",
        stage: "COLLECT_AMOUNT",
        collectedEntities: {
          recipient,
        },
      },
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
      nextState: {
        currentIntent: "payment",
        stage: "WAIT_CONFIRMATION",
        confirmationRequired: true,
        collectedEntities: {
          recipient,
          amount,
          purpose,
        },
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
    nextState: {
      currentIntent: null,
      stage: "COMPLETED",
      confirmationRequired: false,
    },
  };
}