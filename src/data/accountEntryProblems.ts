/**
 * 簿記3級 第2問：勘定記入問題
 * T字勘定の空欄を埋める
 */

export interface AccountEntryRow {
  date: string
  description: string
  debit: number | null
  credit: number | null
  /** 不正解時の解説（借方・貸方のどちらに記入すべきかとその理由） */
  explanation?: string
}

/** 取引の事実のみ（借方・貸方は非表示で、学習者が判断する） */
export interface TransactionFact {
  date: string
  description: string
  amount: number
}

export interface AccountEntryProblem {
  id: string
  accountName: string
  /** 取引の事実（日付・摘要・金額のみ。借方・貸方は学習者が判断） */
  transactions: TransactionFact[]
  answer: AccountEntryRow[]
}

export const ACCOUNT_ENTRY_PROBLEMS: AccountEntryProblem[] = [
  {
    id: 'acc-001',
    accountName: '現金',
    transactions: [
      { date: '4/1', description: '前月繰越', amount: 50000 },
      { date: '4/5', description: '売上', amount: 30000 },
      { date: '4/10', description: '買掛金支払', amount: 20000 },
      { date: '4/15', description: '給料支払', amount: 25000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: 50000, credit: null, explanation: '現金（資産）の残高は借方に記入します。' },
      { date: '4/5', description: '売上', debit: 30000, credit: null, explanation: '現金の増加は借方に記入します。' },
      { date: '4/10', description: '買掛金支払', debit: null, credit: 20000, explanation: '現金の減少は貸方に記入します。' },
      { date: '4/15', description: '給料支払', debit: null, credit: 25000, explanation: '現金の減少は貸方に記入します。' }
    ]
  },
  {
    id: 'acc-002',
    accountName: '買掛金',
    transactions: [
      { date: '4/1', description: '前月繰越', amount: 40000 },
      { date: '4/8', description: '仕入', amount: 50000 },
      { date: '4/10', description: '現金支払', amount: 20000 },
      { date: '4/20', description: '小切手支払', amount: 30000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: null, credit: 40000, explanation: '買掛金（負債）の残高は貸方に記入します。' },
      { date: '4/8', description: '仕入', debit: null, credit: 50000, explanation: '買掛金の増加は貸方に記入します。' },
      { date: '4/10', description: '現金支払', debit: 20000, credit: null, explanation: '買掛金の減少は借方に記入します。' },
      { date: '4/20', description: '小切手支払', debit: 30000, credit: null, explanation: '買掛金の減少は借方に記入します。' }
    ]
  },
  {
    id: 'acc-003',
    accountName: '売掛金',
    transactions: [
      { date: '4/1', description: '前月繰越', amount: 60000 },
      { date: '4/12', description: '売上', amount: 40000 },
      { date: '4/18', description: '現金回収', amount: 50000 },
      { date: '4/25', description: '手形で回収', amount: 30000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: 60000, credit: null, explanation: '売掛金（資産）の残高は借方に記入します。' },
      { date: '4/12', description: '売上', debit: 40000, credit: null, explanation: '売掛金の増加（掛け売上）は借方に記入します。' },
      { date: '4/18', description: '現金回収', debit: null, credit: 50000, explanation: '売掛金の減少（回収）は貸方に記入します。' },
      { date: '4/25', description: '手形で回収', debit: null, credit: 30000, explanation: '売掛金の減少（回収）は貸方に記入します。' }
    ]
  },
  {
    id: 'acc-004',
    accountName: '当座預金',
    transactions: [
      { date: '4/1', description: '前月繰越', amount: 100000 },
      { date: '4/6', description: '売掛金回収', amount: 80000 },
      { date: '4/14', description: '買掛金支払', amount: 60000 },
      { date: '4/22', description: '借入金', amount: 100000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: 100000, credit: null, explanation: '当座預金（資産）の残高は借方に記入します。' },
      { date: '4/6', description: '売掛金回収', debit: 80000, credit: null, explanation: '当座預金の増加は借方に記入します。' },
      { date: '4/14', description: '買掛金支払', debit: null, credit: 60000, explanation: '当座預金の減少は貸方に記入します。' },
      { date: '4/22', description: '借入金', debit: 100000, credit: null, explanation: '当座預金の増加（借入金の振込）は借方に記入します。' }
    ]
  },
  {
    id: 'acc-005',
    accountName: '借入金',
    transactions: [
      { date: '4/1', description: '前月繰越', amount: 200000 },
      { date: '4/15', description: '現金返済', amount: 50000 },
      { date: '4/22', description: '新規借入', amount: 100000 }
    ],
    answer: [
      { date: '4/1', description: '前月繰越', debit: null, credit: 200000, explanation: '借入金（負債）の残高は貸方に記入します。' },
      { date: '4/15', description: '現金返済', debit: 50000, credit: null, explanation: '借入金の減少（返済）は借方に記入します。' },
      { date: '4/22', description: '新規借入', debit: null, credit: 100000, explanation: '借入金の増加は貸方に記入します。' }
    ]
  }
]
