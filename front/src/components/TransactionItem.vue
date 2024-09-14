<template>
  <div class="bg-white border rounded px-4 py-8 w-full">
    <div class="flex items-center gap-3">
      <div class="w-[80px]">
        <div
          v-if="transaction.amount > 0"
          class="bg-green-300 text-green-700 px-2 py-1 rounded w-fit"
        >
          + {{ transaction.amount }}
        </div>
        <div v-if="transaction.amount < 0" class="bg-red-300 text-red-700 px-2 py-1 rounded w-fit">
          {{ transaction.amount }}
        </div>
        <div v-if="transaction.amount === 0" class="bg-gray-300 px-2 py-1 rounded w-fit">
          {{ transaction.amount }}
        </div>
      </div>

      <div class="flex-1">{{ transaction.name }}</div>

      <div class="flex items-center gap-3">
        <PencilIcon class="w-5 h-5 text-gray-500 cursor-pointer" @click="editTransaction" />
        <Trash2Icon class="w-5 h-5 text-red-500 cursor-pointer" @click="deleteTransaction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, Trash2Icon } from 'lucide-vue-next'
import type { Transaction } from '@/utils/types'
import { useTransactionStore } from '@/stores/transaction'

const { transaction } = defineProps<{ transaction: Transaction }>()

const { editTransaction: editTransactionStore, removeTransaction } = useTransactionStore()

const editTransaction = () => {
  const newName = prompt('Enter new transaction name')
  const newAmount = prompt('Enter new transaction amount')
  const newTransaction = {
    ...transaction,
    name: newName ? newName : transaction.name,
    amount: newAmount ? parseFloat(newAmount) : transaction.amount
  }

  editTransactionStore(transaction.id, newTransaction)
}

const deleteTransaction = () => {
  if (confirm('Are you sure you want to delete this transaction?')) {
    removeTransaction(transaction.id)
  }
}
</script>

<style scoped></style>
