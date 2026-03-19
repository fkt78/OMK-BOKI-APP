/**
 * 簿記3級 第3問：試算表・精算表問題
 * 勘定科目と残高のみ表示。借方・貸方の判断は学習者が行う
 */

export interface TrialBalanceRow {
  accountName: string
  amount: number
  /** 借方か貸方か（採点用。表示には出さない） */
  side: 'debit' | 'credit'
}

export interface TrialBalanceProblem {
  id: string
  title: string
  rows: TrialBalanceRow[]
}

/** 勘定科目と残高のみ表示。借方・貸方は学習者が判断して合計を求める */
export const TRIAL_BALANCE_PROBLEMS: TrialBalanceProblem[] = [
  {
    id: 'tb-001',
    title: '合計試算表',
    rows: [
      { accountName: '現金', amount: 80000, side: 'debit' },
      { accountName: '売掛金', amount: 120000, side: 'debit' },
      { accountName: '備品', amount: 150000, side: 'debit' },
      { accountName: '買掛金', amount: 60000, side: 'credit' },
      { accountName: '借入金', amount: 100000, side: 'credit' },
      { accountName: '資本金', amount: 200000, side: 'credit' },
      { accountName: '売上', amount: 180000, side: 'credit' },
      { accountName: '仕入', amount: 100000, side: 'debit' },
      { accountName: '給料', amount: 50000, side: 'debit' }
    ]
  },
  {
    id: 'tb-002',
    title: '合計試算表',
    rows: [
      { accountName: '現金', amount: 50000, side: 'debit' },
      { accountName: '当座預金', amount: 200000, side: 'debit' },
      { accountName: '売掛金', amount: 80000, side: 'debit' },
      { accountName: '商品', amount: 120000, side: 'debit' },
      { accountName: '買掛金', amount: 90000, side: 'credit' },
      { accountName: '資本金', amount: 250000, side: 'credit' },
      { accountName: '売上', amount: 150000, side: 'credit' },
      { accountName: '仕入', amount: 80000, side: 'debit' },
      { accountName: '支払手数料', amount: 10000, side: 'debit' }
    ]
  },
  {
    id: 'tb-003',
    title: '合計試算表',
    rows: [
      { accountName: '現金', amount: 120000, side: 'debit' },
      { accountName: '普通預金', amount: 300000, side: 'debit' },
      { accountName: '受取手形', amount: 80000, side: 'debit' },
      { accountName: '支払手形', amount: 150000, side: 'credit' },
      { accountName: '資本金', amount: 280000, side: 'credit' },
      { accountName: '繰越利益剰余金', amount: 50000, side: 'credit' },
      { accountName: '売上', amount: 320000, side: 'credit' },
      { accountName: '仕入', amount: 180000, side: 'debit' },
      { accountName: '給料', amount: 60000, side: 'debit' },
      { accountName: '消耗品費', amount: 8000, side: 'debit' }
    ]
  }
]
