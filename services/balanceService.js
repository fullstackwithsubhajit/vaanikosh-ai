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

  return user.wallet.balance;
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

  user.wallet.balance += amount;

  await user.save();

  return user.wallet.balance;
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

  if (user.wallet.balance < amount) {
    throw new Error("Insufficient balance.");
  }

  user.wallet.balance -= amount;

  await user.save();

  return user.wallet.balance;
}


export async function debitWithStats(userId, amount) {
  if (amount <= 0) {
    throw new Error("Invalid amount.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.wallet.balance < amount) {
    throw new Error("Insufficient balance.");
  }

  user.wallet.balance -= amount;

  if (!user.statistics) {
    user.statistics = {};
  }

  user.statistics.totalTransactions =
    (user.statistics.totalTransactions || 0) + 1;

  user.statistics.totalSpent =
    (user.statistics.totalSpent || 0) + amount;

  await user.save();

  return {
    balance: user.wallet.balance,
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

        valid:user.wallet.balance >= amount,

        balance:user.wallet.balance

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

        balance:user.wallet.balance,

        totalSpent:user.statistics.totalSpent,

        totalTransactions:user.statistics.totalTransactions

    };

}