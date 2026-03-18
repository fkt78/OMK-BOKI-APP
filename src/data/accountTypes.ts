/**
 * 簿記3級 勘定科目の分類
 */

export type AccountCategory = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'

export interface AccountType {
  name: string
  category: AccountCategory
  categoryName: string
}

export const ACCOUNT_CATEGORIES: Record<AccountCategory, string> = {
  asset: '資産',
  liability: '負債',
  equity: '純資産',
  revenue: '収益',
  expense: '費用'
}

export const ACCOUNTS: AccountType[] = [
  // 資産
  { name: '現金', category: 'asset', categoryName: '資産' },
  { name: '当座預金', category: 'asset', categoryName: '資産' },
  { name: '普通預金', category: 'asset', categoryName: '資産' },
  { name: '売掛金', category: 'asset', categoryName: '資産' },
  { name: '受取手形', category: 'asset', categoryName: '資産' },
  { name: '貸付金', category: 'asset', categoryName: '資産' },
  { name: '前払金', category: 'asset', categoryName: '資産' },
  { name: '前払費用', category: 'asset', categoryName: '資産' },
  { name: '未収収益', category: 'asset', categoryName: '資産' },
  { name: '商品', category: 'asset', categoryName: '資産' },
  { name: '繰越商品', category: 'asset', categoryName: '資産' },
  { name: '備品', category: 'asset', categoryName: '資産' },
  { name: '建物', category: 'asset', categoryName: '資産' },
  { name: '土地', category: 'asset', categoryName: '資産' },
  { name: '車両運搬具', category: 'asset', categoryName: '資産' },
  { name: '減価償却累計額', category: 'asset', categoryName: '資産' }, // 貸方に計上する資産の contra account
  // 負債
  { name: '買掛金', category: 'liability', categoryName: '負債' },
  { name: '支払手形', category: 'liability', categoryName: '負債' },
  { name: '借入金', category: 'liability', categoryName: '負債' },
  { name: '前受金', category: 'liability', categoryName: '負債' },
  { name: '前受収益', category: 'liability', categoryName: '負債' },
  { name: '未払金', category: 'liability', categoryName: '負債' },
  { name: '未払費用', category: 'liability', categoryName: '負債' },
  // 純資産
  { name: '資本金', category: 'equity', categoryName: '純資産' },
  { name: '繰越利益剰余金', category: 'equity', categoryName: '純資産' },
  // 収益
  { name: '売上', category: 'revenue', categoryName: '収益' },
  { name: '受取手数料', category: 'revenue', categoryName: '収益' },
  { name: '受取利息', category: 'revenue', categoryName: '収益' },
  { name: '受取配当金', category: 'revenue', categoryName: '収益' },
  { name: '雑収入', category: 'revenue', categoryName: '収益' },
  // 費用
  { name: '仕入', category: 'expense', categoryName: '費用' },
  { name: '給料', category: 'expense', categoryName: '費用' },
  { name: '旅費交通費', category: 'expense', categoryName: '費用' },
  { name: '通信費', category: 'expense', categoryName: '費用' },
  { name: '消耗品費', category: 'expense', categoryName: '費用' },
  { name: '支払手数料', category: 'expense', categoryName: '費用' },
  { name: '支払利息', category: 'expense', categoryName: '費用' },
  { name: '減価償却費', category: 'expense', categoryName: '費用' },
  { name: '租税公課', category: 'expense', categoryName: '費用' },
  { name: '雑費', category: 'expense', categoryName: '費用' },
  { name: '支払家賃', category: 'expense', categoryName: '費用' },
  { name: '支払保険料', category: 'expense', categoryName: '費用' },
  { name: '貸倒損失', category: 'expense', categoryName: '費用' },
  { name: '貸倒引当金繰入', category: 'expense', categoryName: '費用' },
  { name: '貸倒引当金', category: 'liability', categoryName: '負債' }, // 評価勘定
]

export const getAccountsByCategory = (category: AccountCategory) =>
  ACCOUNTS.filter(a => a.category === category)

export const getAllAccountNames = () => ACCOUNTS.map(a => a.name)
