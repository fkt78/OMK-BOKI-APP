import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CASH_BOOK_PROBLEMS,
  type CashBookProblem,
  type CashBookRow
} from '../data/cashBookProblems'
import './CashBookPage.css'

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function CashBookPage() {
  const [problems, setProblems] = useState<CashBookProblem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<CashBookRow[]>([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setProblems(shuffleArray(CASH_BOOK_PROBLEMS))
    setCurrentIndex(0)
    setShowResult(false)
  }, [])

  useEffect(() => {
    if (problems.length > 0) {
      const problem = problems[currentIndex]
      setUserAnswers(
        problem.answer.map((row, i) => ({
          date: row.date,
          description: row.description,
          income: i === 0 ? null : null,
          expense: i === 0 ? null : null,
          balance: i === 0 ? problem.openingBalance : 0
        }))
      )
      setShowResult(false)
    }
  }, [problems, currentIndex])

  const handleInputChange = (
    rowIndex: number,
    field: 'income' | 'expense' | 'balance',
    value: string
  ) => {
    if (showResult) return
    const num = value === '' ? null : parseInt(value.replace(/,/g, ''), 10)
    if (value !== '' && (isNaN(num!) || num! < 0)) return
    setUserAnswers(prev =>
      prev.map((row, i) =>
        i === rowIndex
          ? { ...row, [field]: num ?? (field === 'balance' ? 0 : null) }
          : row
      )
    )
  }

  const checkAnswer = () => {
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setProblems(shuffleArray(CASH_BOOK_PROBLEMS))
      setCurrentIndex(0)
    }
    setShowResult(false)
  }

  const handleRetry = () => {
    setProblems(shuffleArray(CASH_BOOK_PROBLEMS))
    setCurrentIndex(0)
    setShowResult(false)
  }

  if (problems.length === 0) return null

  const problem = problems[currentIndex]
  const isCorrect =
    showResult &&
    problem.answer.every((row, i) => {
      const user = userAnswers[i]
      if (!user) return false
      return (
        (user.income ?? null) === (row.income ?? null) &&
        (user.expense ?? null) === (row.expense ?? null) &&
        user.balance === row.balance
      )
    })

  const formatNum = (n: number | null) =>
    n === null || n === 0 ? '' : n.toLocaleString()

  return (
    <div className="cash-book-page">
      <header className="cash-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <h1>現金出納帳</h1>
        <div className="progress-info">
          <span>問題 {currentIndex + 1} / {problems.length}</span>
        </div>
      </header>

      <main className="cash-main">
        <div className="transactions-box">
          <h3>次の取引を現金出納帳に記入しなさい。</h3>
          <p className="opening">前月繰越残高：{problem.openingBalance.toLocaleString()}円</p>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>摘要</th>
                <th>収入</th>
                <th>支出</th>
              </tr>
            </thead>
            <tbody>
              {problem.transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.type === 'income' ? t.amount.toLocaleString() : ''}</td>
                  <td>{t.type === 'expense' ? t.amount.toLocaleString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cash-book-box">
          <h3>現金出納帳</h3>
          <table className="cash-book-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>摘要</th>
                <th>収入</th>
                <th>支出</th>
                <th>残高</th>
              </tr>
            </thead>
            <tbody>
              {userAnswers.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>
                    {i === 0 ? (
                      ''
                    ) : (
                      <input
                        type="text"
                        value={formatNum(row.income)}
                        onChange={e => handleInputChange(i, 'income', e.target.value)}
                        disabled={showResult}
                        className={
                          showResult && row.income !== problem.answer[i].income
                            ? 'input-wrong'
                            : ''
                        }
                      />
                    )}
                  </td>
                  <td>
                    {i === 0 ? (
                      ''
                    ) : (
                      <input
                        type="text"
                        value={formatNum(row.expense)}
                        onChange={e => handleInputChange(i, 'expense', e.target.value)}
                        disabled={showResult}
                        className={
                          showResult && row.expense !== problem.answer[i].expense
                            ? 'input-wrong'
                            : ''
                        }
                      />
                    )}
                  </td>
                  <td>
                    {i === 0 ? (
                      <span>{row.balance.toLocaleString()}</span>
                    ) : (
                      <input
                        type="text"
                        value={formatNum(row.balance)}
                        onChange={e => handleInputChange(i, 'balance', e.target.value)}
                        disabled={showResult}
                        className={
                          showResult && row.balance !== problem.answer[i].balance
                            ? 'input-wrong'
                            : ''
                        }
                      />
                    )}
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
