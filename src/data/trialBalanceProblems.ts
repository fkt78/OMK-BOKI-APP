/**
 * 簿記3級 第3問：試算表・精算表問題
 */

export interface TrialBalanceRow {
  accountName: string
  debit: number
  credit: number
}

export interface TrialBalanceProblem {
  id: string
  title: string
  rows: TrialBalanceRow[]
}

/** 合計試算表のサンプル（借方・貸方の合計が一致） */
export const TRIAL_BALANCE_PROBLEMS: TrialBalanceProblem[] = [
  {
    id: 'tb-001',
    title: '合計試算表',
    rows: [
      { accountName: '現金', debit: 80000, credit: 0 },
      { accountName: '売掛金', debit: 120000, credit: 0 },
      { accountName: '備品', debit: 150000, credit: 0 },
      { accountName: '買掛金', debit: 0, credit: 60000 },
      { accountName: '借入金', debit: 0, credit: 100000 },
      { accountName: '資本金', debit: 0, credit: 200000 },
      { accountName: '売上', debit: 0, credit: 180000 },
      { accountName: '仕入', debit: 100000, credit: 0 },
      { accountName: '給料', debit: 50000, credit: 0 }
    ]
  },
  {
    id: 'tb-002',
    title: '合計試算表',
    rows: [
      { accountName: '現金', debit: 50000, credit: 0 },
      { accountName: '当座預金', debit: 200000, credit: 0 },
      { accountName: '売掛金', debit: 80000, credit: 0 },
      { accountName: '商品', debit: 120000, credit: 0 },
      { accountName: '買掛金', debit: 0, credit: 90000 },
      { accountName: '資本金', debit: 0, credit: 250000 },
      { accountName: '売上', debit: 0, credit: 150000 },
      { accountName: '仕入', debit: 80000, credit: 0 },
      { accountName: '支払手数料', debit: 10000, credit: 0 }
    ]
  }
]
