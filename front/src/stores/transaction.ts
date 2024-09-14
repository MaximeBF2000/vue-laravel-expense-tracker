import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction, TransactionFilter, TransactionType } from '@/utils/types'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transaction[]>([])

  function addTransaction(transaction: Transaction) {
    transactions.value.push(transaction)
  }

  function editTransaction(transactionId: string, transaction: Transaction) {
    const index = transactions.value.findIndex((transaction) => transaction.id === transactionId)
    if (index !== -1) {
      transactions.value[index] = transaction
    }
  }

  function removeTransaction(transactionId: string) {
    const index = transactions.value.findIndex((transaction) => transaction.id === transactionId)
    if (index !== -1) transactions.value.splice(index, 1)
  }

  function filterTransactionsByType(type: TransactionType) {
    return transactions.value.filter((transaction) => {
      switch (type) {
        case 'income':
          return transaction.amount > 0
        case 'expense':
          return transaction.amount < 0
        case 'zero':
          return transaction.amount === 0
        default:
          return false
      }
    })
  }

  function filterTransactionsByDate(startDate: Date, endDate: Date) {
    return transactions.value.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  function filterTransactionsByAmount(amount: number) {
    return transactions.value.filter((transaction) => transaction.amount === amount)
  }

  function filterTransactionsByName(name: string) {
    return transactions.value.filter((transaction) => transaction.name.includes(name))
  }

  function filterTransactions(filter: TransactionFilter = {}) {
    let filteredTransactions = transactions.value

    if (filter.type) {
      filteredTransactions = filterTransactionsByType(filter.type)
    }

    if (filter.startDate && filter.endDate) {
      filteredTransactions = filterTransactionsByDate(filter.startDate, filter.endDate)
    }

    if (filter.amount) {
      filteredTransactions = filterTransactionsByAmount(filter.amount)
    }

    if (filter.name) {
      filteredTransactions = filterTransactionsByName(filter.name)
    }

    return filteredTransactions
  }

  function getBalance(filter?: TransactionFilter) {
    return filterTransactions(filter).reduce((acc, transaction) => acc + transaction.amount, 0)
  }

  function getMaxAmount() {
    return transactions.value.reduce((max, transaction) => Math.max(max, transaction.amount), 0)
  }

  function getMinAmount() {
    return transactions.value.reduce((min, transaction) => Math.min(min, transaction.amount), 0)
  }

  return {
    transactions,
    addTransaction,
    editTransaction,
    removeTransaction,
    filterTransactions,
    getBalance,
    getMaxAmount,
    getMinAmount
  }
})
