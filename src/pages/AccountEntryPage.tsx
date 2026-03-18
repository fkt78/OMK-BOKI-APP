import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ACCOUNT_ENTRY_PROBLEMS,
  type AccountEntryProblem,
  type AccountEntryRow
} from '../data/accountEntryProblems'
import './AccountEntryPage.css'

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function AccountEntryPage() {
  const [problems, setProblems] = useState<AccountEntryProblem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AccountEntryRow[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, answered: 0 })

  useEffect(() => {
    setProblems(shuffleArray(ACCOUNT_ENTRY_PROBLEMS))
    setCurrentIndex(0)
    setShowResult(false)
    setScore({ correct: 0, answered: 0 })
  }, [])

  useEffect(() => {
    if (problems.length > 0) {
      const problem = problems[currentIndex]
      setUserAnswers(
        problem.answer.map(row => ({
          date: row.date,
          description: row.description,
          debit: null,
          credit: null
        }))
      )
      setShowResult(false)
    }
  }, [problems, currentIndex])

  const handleInputChange = (rowIndex: number, field: 'debit' | 'credit', value: string) => {
    if (showResult) return
    const num = value === '' ? null : parseInt(value.replace(/,/g, ''), 10)
    if (value !== '' && isNaN(num!)) return
    setUserAnswers(prev =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [field]: num } : row
      )
    )
  }

  const checkAnswer = () => {
    const problem = problems[currentIndex]
    const correct = problem.answer.every((row, i) => {
      const user = userAnswers[i]
      if (!user) return false
      const debitMatch = (user.debit ?? null) === (row.debit ?? null)
      const creditMatch = (user.credit ?? null) === (row.credit ?? null)
      return debitMatch && creditMatch
    })
    setShowResult(true)
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      answered: prev.answered + 1
    }))
  }

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setProblems(shuffleArray(ACCOUNT_ENTRY_PROBLEMS))
      setCurrentIndex(0)
    }
    setShowResult(false)
  }

  const handleRetry = () => {
    setProblems(shuffleArray(ACCOUNT_ENTRY_PROBLEMS))
    setCurrentIndex(0)
    setShowResult(false)
    setScore({ correct: 0, answered: 0 })
  }

  if (problems.length === 0) return null

  const problem = problems[currentIndex]
  const isCorrect = showResult &&
    problem.answer.every((row, i) => {
      const user = userAnswers[i]
      if (!user) return false
      return (user.debit ?? null) === (row.debit ?? null) &&
        (user.credit ?? null) === (row.credit ?? null)
    })

  const formatNum = (n: number | null) =>
    n === null ? '' : n.toLocaleString()

  return (
    <div className="account-entry-page">
      <header className="entry-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <div className="progress-info">
          <span>問題 {currentIndex + 1} / {problems.length}</span>
          <span>正解: {score.correct} / {score.answered}</span>
        </div>
      </header>

      <main className="entry-main">
        <div className="transactions-box">
          <h3>次の取引について、{problem.accountName}勘定に記入しなさい。</h3>
          <p className="transactions-hint">取引の内容から、借方・貸方のどちらに記入するか考えて入力してください。</p>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>摘要</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {problem.transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td className="num">{t.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="t-account-box">
          <h3>{problem.accountName}</h3>
          <table className="t-account-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>摘要</th>
                <th>借方</th>
                <th>貸方</th>
              </tr>
            </thead>
            <tbody>
              {userAnswers.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>
                    <input
                      type="text"
                      value={formatNum(row.debit)}
                      onChange={e => handleInputChange(i, 'debit', e.target.value)}
                      disabled={showResult}
                      className={showResult && row.debit !== problem.answer[i].debit ? 'input-wrong' : ''}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formatNum(row.credit)}
                      onChange={e => handleInputChange(i, 'credit', e.target.value)}
                      disabled={showResult}
                      className={showResult && row.credit !== problem.answer[i].credit ? 'input-wrong' : ''}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showResult && (
          <div className={`result-message result-${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✓ 正解です！' : '✗ 不正解です。正しい金額を確認してください。'}
          </div>
        )}

        <div className="action-buttons">
          {!showResult ? (
            <button className="btn btn-primary" onClick={checkAnswer}>
              採点する
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              {currentIndex < problems.length - 1 ? '次の問題' : 'もう一度'}
            </button>
          )}
        </div>
      </main>

      <div className="quick-actions">
        <button className="btn btn-outline" onClick={handleRetry}>
          新しい問題セット
        </button>
      </div>
    </div>
  )
}
