import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TRIAL_BALANCE_PROBLEMS } from '../data/trialBalanceProblems'
import { recordStats } from '../utils/statsStorage'
import './TrialBalancePage.css'

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function TrialBalancePage() {
  const [problems, setProblems] = useState(() => shuffleArray(TRIAL_BALANCE_PROBLEMS))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userTotals, setUserTotals] = useState({ debit: 0, credit: 0 })
  const [showResult, setShowResult] = useState(false)

  const handleInputChange = (field: 'debit' | 'credit', value: string) => {
    if (showResult) return
    const num = value === '' ? 0 : parseInt(value.replace(/,/g, ''), 10)
    if (value !== '' && isNaN(num)) return
    setUserTotals(prev => ({ ...prev, [field]: num }))
  }

  const checkAnswer = () => {
    const correct =
      userTotals.debit === correctDebit && userTotals.credit === correctCredit
    recordStats('trialBalance', correct)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(i => i + 1)
      setUserTotals({ debit: 0, credit: 0 })
      setShowResult(false)
    } else {
      setProblems(shuffleArray(TRIAL_BALANCE_PROBLEMS))
      setCurrentIndex(0)
      setUserTotals({ debit: 0, credit: 0 })
      setShowResult(false)
    }
  }

  const handleRetry = () => {
    setProblems(shuffleArray(TRIAL_BALANCE_PROBLEMS))
    setCurrentIndex(0)
    setUserTotals({ debit: 0, credit: 0 })
    setShowResult(false)
  }

  const problem = problems[currentIndex]
  const correctDebit = problem.rows
    .filter(r => r.side === 'debit')
    .reduce((s, r) => s + r.amount, 0)
  const correctCredit = problem.rows
    .filter(r => r.side === 'credit')
    .reduce((s, r) => s + r.amount, 0)
  const isCorrect =
    showResult &&
    userTotals.debit === correctDebit &&
    userTotals.credit === correctCredit

  return (
    <div className="trial-balance-page">
      <header className="tb-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <h1>第3問：試算表</h1>
        <div className="progress-info">
          <span>問題 {currentIndex + 1} / {problems.length}</span>
        </div>
      </header>

      <main className="tb-main">
        <div className="tb-instruction">
          <p>次の各勘定の残高について、借方合計と貸方合計を求めなさい。</p>
          <p className="tb-hint">勘定科目の性質（資産・費用→借方、負債・純資産・収益→貸方）から判断してください。</p>
        </div>

        <div className="tb-table-box">
          <h3>{problem.title}</h3>
          <table className="tb-table">
            <thead>
              <tr>
                <th>勘定科目</th>
                <th>借方</th>
                <th>貸方</th>
              </tr>
            </thead>
            <tbody>
              {problem.rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.accountName}</td>
                  <td className="num">
                    {row.side === 'debit' ? row.amount.toLocaleString() : ''}
                  </td>
                  <td className="num">
                    {row.side === 'credit' ? row.amount.toLocaleString() : ''}
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td>合計</td>
                <td>
                  <input
                    type="text"
                    value={userTotals.debit > 0 ? userTotals.debit.toLocaleString() : ''}
                    onChange={e => handleInputChange('debit', e.target.value)}
                    disabled={showResult}
                    placeholder="借方合計"
                    className={
                      showResult && userTotals.debit !== correctDebit
                        ? 'input-wrong'
                        : ''
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={userTotals.credit > 0 ? userTotals.credit.toLocaleString() : ''}
                    onChange={e => handleInputChange('credit', e.target.value)}
                    disabled={showResult}
                    placeholder="貸方合計"
                    className={
                      showResult && userTotals.credit !== correctCredit
                        ? 'input-wrong'
                        : ''
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {showResult && (
          <div className={`result-message result-${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              '✓ 正解です！'
            ) : (
              <>
                ✗ 不正解です。
                正解：借方 {correctDebit.toLocaleString()}円、
                貸方 {correctCredit.toLocaleString()}円
              </>
            )}
          </div>
        )}

        <div className="action-buttons">
          {!showResult ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                checkAnswer()
              }}
            >
              採点する
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              {currentIndex < problems.length - 1 ? '次の問題' : 'もう一度'}
            </button>
          )}
        </div>
      </main>

      <div className="quick-actions">
        <button type="button" className="btn btn-outline" onClick={handleRetry}>
          新しい問題セット
        </button>
      </div>
    </div>
  )
}
