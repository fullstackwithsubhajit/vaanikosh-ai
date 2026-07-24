// services/balanceService.js

import User from "@/models/User";

/**
 * Get current wallet balance
 */
export async function getBalance(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user.statistics.walletBalance;
}

/**
 * Credit wallet
 */
export async function credit(userId, amount) {
  if (amount <= 0) {
    throw new Error("Invalid amount.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  user.statistics.walletBalance += amount;

  await user.save();

  return user.statistics.walletBalance;
}

/**
 * Debit wallet
 */
export async function debit(userId, amount) {
  if (amount <= 0) {
    throw new Error("Invalid amount.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.statistics.walletBalance < amount) {
    throw new Error("Insufficient balance.");
  }

  user.statistics.walletBalance -= amount;

  await user.save();

  return user.statistics.walletBalance;
}


export async function debitWithStats(userId, amount) {
  if (amount <= 0) {
    throw new Error("Invalid amount.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.statistics.walletBalance < amount) {
    throw new Error("Insufficient balance.");
  }

  user.statistics.walletBalance -= amount;

  if (!user.statistics) {
    user.statistics = {};
  }

  user.statistics.totalTransactions =
    (user.statistics.totalTransactions || 0) + 1;

  user.statistics.totalSpent =
    (user.statistics.totalSpent || 0) + amount;

  await user.save();

  return {
    balance: user.statistics.walletBalance,
    statistics: user.statistics,
  };
}



/**
 * Check whether payment is possible
 */
export async function validateBalance(userId, amount){

    const user = await User.findById(userId);

    if(!user){

        throw new Error("User not found.");

    }

    return {

        valid:user.statistics.walletBalance >= amount,

        balance:user.statistics.walletBalance

    };

}
/**
 * Update wallet statistics
 */
export async function updateWalletStats(userId, amount) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.statistics) {
    user.statistics = {};
  }

  user.statistics.totalTransactions =
    (user.statistics.totalTransactions || 0) + 1;

  user.statistics.totalSpent =
    (user.statistics.totalSpent || 0) + amount;

  await user.save();

  return user.statistics;
}


export async function getWalletSummary(userId) {

    const user = await User.findById(userId);

    return {

        balance:user.statistics.walletBalance,

        totalSpent:user.statistics.totalSpent,

        totalTransactions:user.statistics.totalTransactions

    };

}