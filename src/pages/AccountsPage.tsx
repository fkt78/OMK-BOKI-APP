import { Link } from 'react-router-dom'
import { ACCOUNTS, ACCOUNT_CATEGORIES, type AccountCategory } from '../data/accountTypes'
import './AccountsPage.css'

const CATEGORY_ORDER: AccountCategory[] = ['asset', 'liability', 'equity', 'revenue', 'expense']

export function AccountsPage() {
  return (
    <div className="accounts-page">
      <header className="accounts-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <h1>勘定科目一覧</h1>
        <p className="subtitle">資産・負債・純資産・収益・費用の5つのグループに分類</p>
      </header>

      <main className="accounts-main">
        {CATEGORY_ORDER.map(category => {
          const accounts = ACCOUNTS.filter(a => a.category === category)
          if (accounts.length === 0) return null
          return (
            <section key={category} className="account-section">
              <h2 className="category-title">{ACCOUNT_CATEGORIES[category]}</h2>
              <ul className="account-list">
                {accounts.map(account => (
                  <li key={account.name} className="account-item">
                    <span className="account-name">{account.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </main>

      <div className="accounts-footer">
        <p>借方：資産・費用の増加 / 貸方：負債・純資産・収益の増加</p>
      </div>
    </div>
  )
}
