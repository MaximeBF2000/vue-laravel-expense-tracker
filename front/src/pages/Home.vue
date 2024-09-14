<template>
  <div class="w-2/3 mx-auto flex flex-col items-center">
    <div class="text-5xl my-16 text-center">Vue / Laravel - Expense Tracker</div>

    <div class="w-full mb-20">
      <AddTransactionForm />
    </div>

    <TransactionItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
      class="mb-6"
    />

    <div
      v-if="transactions.length === 0"
      class="flex flex-col items-center gap-5 text-center text-gray-500 mt-10"
    >
      <CircleDollarSignIcon class="w-12 h-12" />
      <p>No transactions yet</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddTransactionForm from '@/components/AddTransactionForm.vue'
import TransactionItem from '@/components/TransactionItem.vue'
import { useTransactionStore } from '@/stores/transaction'
import { CircleDollarSignIcon } from 'lucide-vue-next'
import type { Transaction } from '@/utils/types'

const { transactions, addTransaction, $subscribe } = useTransactionStore()

function getInitialTransactions() {
  JSON.parse(
    localStorage.getItem('vue_laravel_expense_tracker:transactions') || '{}'
  ).transactions?.forEach((transaction: Transaction) => {
    addTransaction(transaction)
  })
}

getInitialTransactions()

$subscribe((_, state) => {
  localStorage.setItem('vue_laravel_expense_tracker:transactions', JSON.stringify(state))
})
</script>

<style scoped></style>
