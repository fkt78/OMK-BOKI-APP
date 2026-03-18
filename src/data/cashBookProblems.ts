/**
 * 簿記3級 第2問：補助簿（現金出納帳）問題
 */

export interface CashBookRow {
  date: string
  description: string
  income: number | null
  expense: number | null
  balance: number
}

export interface CashBookProblem {
  id: string
  openingBalance: number
  transactions: Array<{
    date: string
    description: string
    type: 'income' | 'expense'
    amount: number
  }>
  answer: CashBookRow[]
}

export const CASH_BOOK_PROBLEMS: CashBookProblem[] = [
  {
    id: 'cash-001',
    openingBalance: 50000,
    transactions: [
      { date: '4/5', description: '売上', type: 'income', amount: 30000 },
      { date: '4/10', description: '買掛金支払', type: 'expense', amount: 20000 },
      { date: '4/15', description: '売掛金回収', type: 'income', amount: 40000 },
      { date: '4/20', description: '給料支払', type: 'expense', amount: 35000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', income: null, expense: null, balance: 50000 },
      { date: '4/5', description: '売上', income: 30000, expense: null, balance: 80000 },
      { date: '4/10', description: '買掛金支払', income: null, expense: 20000, balance: 60000 },
      { date: '4/15', description: '売掛金回収', income: 40000, expense: null, balance: 100000 },
      { date: '4/20', description: '給料支払', income: null, expense: 35000, balance: 65000 }
    ]
  },
  {
    id: 'cash-002',
    openingBalance: 80000,
    transactions: [
      { date: '5/1', description: '借入金', type: 'income', amount: 100000 },
      { date: '5/8', description: '備品購入', type: 'expense', amount: 45000 },
      { date: '5/15', description: '売上', type: 'income', amount: 55000 },
      { date: '5/22', description: '借入金返済', type: 'expense', amount: 50000 }
    ],
    answer: [
      { date: '5/1', description: '前月繰越', income: null, expense: null, balance: 80000 },
      { date: '5/1', description: '借入金', income: 100000, expense: null, balance: 180000 },
      { date: '5/8', description: '備品購入', income: null, expense: 45000, balance: 135000 },
      { date: '5/15', description: '売上', income: 55000, expense: null, balance: 190000 },
      { date: '5/22', description: '借入金返済', income: null, expense: 50000, balance: 140000 }
    ]
  },
  {
    id: 'cash-003',
    openingBalance: 120000,
    transactions: [
      { date: '6/3', description: '売上', type: 'income', amount: 28000 },
      { date: '6/10', description: '仕入', type: 'expense', amount: 60000 },
      { date: '6/18', description: '売掛金回収', type: 'income', amount: 90000 },
      { date: '6/25', description: '諸経費支払', type: 'expense', amount: 15000 }
    ],
    answer: [
      { date: '6/1', description: '前月繰越', income: null, expense: null, balance: 120000 },
      { date: '6/3', description: '売上', income: 28000, expense: null, balance: 148000 },
      { date: '6/10', description: '仕入', income: null, expense: 60000, balance: 88000 },
      { date: '6/18', description: '売掛金回収', income: 90000, expense: null, balance: 178000 },
      { date: '6/25', description: '諸経費支払', income: null, expense: 15000, balance: 163000 }
    ]
  }
]
