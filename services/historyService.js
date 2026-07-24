// services/historyService.js

import Transaction from "@/models/Transaction";

/**
 * Get recent transactions
 */
export async function getTransactionHistory(
  userId,
  filters = {}
) {
  const query = {
    sender: userId,
  };

  // Date Filter
  if (filters.startDate || filters.endDate) {
    query.createdAt = {};

    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.createdAt.$lte = new Date(filters.endDate);
    }
  }

  // Status Filter
  if (filters.status) {
    query.status = filters.status;
  }

  const transactions = await Transaction.find(query)
    .populate(
        "recipient",
        "name nickname bankName upiId"
    )
    .sort({ createdAt: -1 });

  return {
    success: true,
    count: transactions.length,
    transactions,
  };
}

/**
 * Last N transactions
 */
export async function getRecentTransactions(
  userId,
  limit = 5
) {
  return await Transaction.find({
    sender: userId,
  })
    .populate("recipient")
    .sort({ createdAt: -1 })
    .limit(limit);
}

/**
 * Spending Summary
 */
export async function getSpendingSummary(userId) {
  const transactions = await Transaction.find({
    sender: userId,
    status: "SUCCESS",
  });

  const totalSpent = transactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const highestTransaction =
    transactions.length > 0
      ? Math.max(...transactions.map(tx => tx.amount))
      : 0;

  const averageSpent =
    transactions.length > 0
      ? totalSpent / transactions.length
      : 0;

  return {
    success: true,
    totalTransactions: transactions.length,
    totalSpent,
    highestTransaction,
    averageSpent,
  };
}

/**
 * Monthly Summary
 */
export async function getMonthlySummary(userId) {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const transactions = await Transaction.find({
    sender: userId,
    createdAt: {
      $gte: start,
    },
    status: "SUCCESS",
  });

  const totalSpent = transactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  return {
    success: true,
    month: start.toLocaleString("default", {
      month: "long",
    }),
    totalTransactions: transactions.length,
    totalSpent,
  };
}

/**
 * Financial Coach Data
 */
export async function getFinancialCoachData(userId) {
  const summary = await getSpendingSummary(userId);

  const recentTransactions = await getRecentTransactions(userId, 10);

  return {
    success: true,
    summary,
    transactions: recentTransactions.map((tx) => ({
      amount: tx.amount,
      purpose: tx.purpose,
      status: tx.status,
      date: tx.createdAt,
      risk: tx.risk?.level || "LOW",
      recipient: tx.recipient?.name || "Unknown",
    })),
  };
}


export async function getTransactionByReference(referenceNumber) {
  return await Transaction.findOne({
    referenceNumber,
  }).populate(
    "recipient",
    "name nickname bankName upiId"
  );
}
