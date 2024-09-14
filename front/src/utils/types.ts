export type Transaction = {
  id: string
  name: string
  amount: number
  createdAt: Date
}

export type TransactionType = 'income' | 'expense' | 'zero'

export type TransactionFilter = {
  type?: TransactionType
  startDate?: Date
  endDate?: Date
  amount?: number
  name?: string
}
