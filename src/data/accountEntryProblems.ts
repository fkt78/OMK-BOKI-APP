/**
 * 簿記3級 第2問：勘定記入問題
 * T字勘定の空欄を埋める
 */

export interface AccountEntryRow {
  date: string
  description: string
  debit: number | null
  credit: number | null
}

export interface AccountEntryProblem {
  id: string
  accountName: string
  transactions: Array<{
    date: string
    description: string
    debit?: number
    credit?: number
  }>
  answer: AccountEntryRow[]
}

export const ACCOUNT_ENTRY_PROBLEMS: AccountEntryProblem[] = [
  {
    id: 'acc-001',
    accountName: '現金',
    transactions: [
      { date: '4/1', description: '前月繰越', debit: 50000 },
      { date: '4/5', description: '売上', debit: 30000 },
      { date: '4/10', description: '買掛金支払', credit: 20000 },
      { date: '4/15', description: '給料支払', credit: 25000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: 50000, credit: null },
      { date: '4/5', description: '売上', debit: 30000, credit: null },
      { date: '4/10', description: '買掛金支払', debit: null, credit: 20000 },
      { date: '4/15', description: '給料支払', debit: null, credit: 25000 }
    ]
  },
  {
    id: 'acc-002',
    accountName: '買掛金',
    transactions: [
      { date: '4/1', description: '前月繰越', credit: 40000 },
      { date: '4/8', description: '仕入', credit: 50000 },
      { date: '4/10', description: '現金支払', debit: 20000 },
      { date: '4/20', description: '小切手支払', debit: 30000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: null, credit: 40000 },
      { date: '4/8', description: '仕入', debit: null, credit: 50000 },
      { date: '4/10', description: '現金支払', debit: 20000, credit: null },
      { date: '4/20', description: '小切手支払', debit: 30000, credit: null }
    ]
  },
  {
    id: 'acc-003',
    accountName: '売掛金',
    transactions: [
      { date: '4/1', description: '前月繰越', debit: 60000 },
      { date: '4/12', description: '売上', debit: 40000 },
      { date: '4/18', description: '現金回収', credit: 50000 },
      { date: '4/25', description: '手形で回収', credit: 30000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: 60000, credit: null },
      { date: '4/12', description: '売上', debit: 40000, credit: null },
      { date: '4/18', description: '現金回収', debit: null, credit: 50000 },
      { date: '4/25', description: '手形で回収', debit: null, credit: 30000 }
    ]
  },
  {
    id: 'acc-004',
    accountName: '当座預金',
    transactions: [
      { date: '4/1', description: '前月繰越', debit: 100000 },
      { date: '4/6', description: '売掛金回収', debit: 80000 },
      { date: '4/14', description: '買掛金支払', credit: 60000 },
      { date: '4/22', description: '借入金', debit: 100000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: 100000, credit: null },
      { date: '4/6', description: '売掛金回収', debit: 80000, credit: null },
      { date: '4/14', description: '買掛金支払', debit: null, credit: 60000 },
      { date: '4/22', description: '借入金', debit: 100000, credit: null }
    ]
  },
  {
    id: 'acc-005',
    accountName: '借入金',
    transactions: [
      { date: '4/1', description: '前月繰越', credit: 200000 },
      { date: '4/15', description: '現金返済', debit: 50000 },
      { date: '4/22', description: '新規借入', credit: 100000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: null, credit: 200000 },
      { date: '4/15', description: '現金返済', debit: 50000, credit: null },
      { date: '4/22', description: '新規借入', debit: null, credit: 100000 }
    ]
  }
]
