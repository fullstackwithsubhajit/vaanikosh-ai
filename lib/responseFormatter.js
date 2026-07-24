// lib/responseFormatter.js

/**
 * Standard success response
 */
export function success(action, data = {}, meta = {}) {
  return {
    success: true,
    action,
    data,
    meta,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Standard error response
 */
export function failure(action, message, errors = []) {
  return {
    success: false,
    action,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Standard conversation response
 */
export function conversation(action, message, payload = {}) {
  return {
    success: true,
    action,
    requiresReply: true,
    message,
    payload,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Payment success response
 */
export function paymentSuccess(transaction) {
  return success("PAYMENT_SUCCESS", {
    transactionId: transaction._id,
    recipient: transaction.recipientName,
    amount: transaction.amount,
    status: transaction.status,
    riskLevel: transaction.riskLevel,
    createdAt: transaction.createdAt,
  });
}

/**
 * Balance response
 */
export function balance(balance) {
  return success("BALANCE_RESULT", {
    balance,
  });
}

/**
 * Transaction history response
 */
export function history(transactions) {
  return success("HISTORY_RESULT", {
    count: transactions.length,
    transactions,
  });
}

/**
 * Risk response
 */
export function risk(result) {
  return success("RISK_RESULT", result);
}

/**
 * Recipient response
 */
export function recipient(recipient) {
  return success("RECIPIENT_RESULT", recipient);
}