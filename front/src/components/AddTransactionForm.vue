<template>
  <form class="" @submit.prevent="addTransaction">
    <div class="w-full flex items-center gap-3">
      <input
        id="transactionInput"
        name="transactionInput"
        type="text"
        class="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring focus:ring-blue-500/30"
        placeholder="Enter transaction amount"
        v-model="transactionInput"
        ref="transactionInputRef"
      />
      <input
        id="transactionAmount"
        name="transactionAmount"
        type="number"
        class="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring focus:ring-blue-500/30"
        placeholder="Enter transaction amount"
        v-model="transactionAmount"
      />
      <button
        class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700 text-white font-bold whitespace-nowrap py-2 px-4 rounded transition"
        type="submit"
      >
        Add transaction
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const { addTransaction: addTransactionStore } = useTransactionStore()

const transactionInput = ref('')
const transactionInputRef = useTemplateRef('transactionInputRef')
const transactionAmount = ref(0)

const resetForm = () => {
  transactionInput.value = ''
  transactionAmount.value = 0
  transactionInputRef.value?.focus()
}

const addTransaction = () => {
  if (!transactionInput.value) return

  addTransactionStore({
    id: crypto.randomUUID(),
    name: transactionInput.value,
    amount: transactionAmount.value,
    createdAt: new Date()
  })

  resetForm()
}
</script>

<style scoped></style>
