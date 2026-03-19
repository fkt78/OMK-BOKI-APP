import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  generateProblemPool,
  getRandomProblems,
  checkAnswer,
  type JournalProblem
} from '../utils/problemGenerator'
import { getAllAccountNames } from '../data/accountTypes'
import './JournalPracticePage.css'

const PROBLEMS_PER_SESSION = 15
const STORAGE_KEY = 'boki3-journal-progress'

interface SessionProgress {
  totalAttempted: number
  totalCorrect: number
  lastPracticed?: string
}

export function JournalPracticePage() {
  const [pool, setPool] = useState<JournalProblem[]>([])
  const [problems, setProblems] = useState<JournalProblem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userDebit, setUserDebit] = useState('')
  const [userCredit, setUserCredit] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const lastCountedIndexRef = useRef<number>(-1)
  const [showExplanation, setShowExplanation] = useState(false)
  const [progress, setProgress] = useState<SessionProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : { totalAttempted: 0, totalCorrect: 0 }
    } catch {
      return { totalAttempted: 0, totalCorrect: 0 }
    }
  })

  const accountNames = getAllAccountNames()

  const loadProblems = useCallback(() => {
    const problemPool = generateProblemPool()
    setPool(problemPool)
    const newProblems = getRandomProblems(problemPool, PROBLEMS_PER_SESSION)
    setProblems(newProblems)
    setCurrentIndex(0)
    setUserDebit('')
    setUserCredit('')
    setResult(null)
    setSessionCorrect(0)
    setAnsweredCount(0)
    lastCountedIndexRef.current = -1
    setShowExplanation(false)
  }, [])

  useEffect(() => {
    if (pool.length === 0) {
      loadProblems()
    }
  }, [pool.length, loadProblems])

  const saveProgress = useCallback((correct: boolean) => {
    setProgress(prev => {
      const next = {
        ...prev,
        totalAttempted: prev.totalAttempted + 1,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
        lastPracticed: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const handleSubmit = () => {
    if (!problems[currentIndex] || result !== null) return

    const correct = checkAnswer(
      problems[currentIndex],
      userDebit,
      userCredit
    )
    setResult(correct ? 'correct' : 'incorrect')
    setShowExplanation(true)
    // 同じ問題のリトライでは answeredCount を増やさない
    if (lastCountedIndexRef.current !== currentIndex) {
      lastCountedIndexRef.current = currentIndex
      setAnsweredCount(c => c + 1)
    }
    if (correct) {
      setSessionCorrect(c => c + 1)
    }
    saveProgress(correct)
  }

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(i => i + 1)
      setUserDebit('')
      setUserCredit('')
      setResult(null)
      setShowExplanation(false)
    } else {
      loadProblems()
    }
  }

  const handleRetry = () => {
    setUserDebit('')
    setUserCredit('')
    setResult(null)
    setShowExplanation(false)
  }

  if (problems.length === 0) return null

  const current = problems[currentIndex]
  const isLast = currentIndex === problems.length - 1

  return (
    <div className="journal-practice">
      <header className="practice-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <div className="progress-info">
          <span className="progress-text">
            問題 {currentIndex + 1} / {problems.length}
          </span>
          <span className="session-score">
            正解: {sessionCorrect} / {answeredCount}
          </span>
        </div>
        <div className="total-progress">
          累計: {progress.totalCorrect} / {progress.totalAttempted} 正解
          {progress.totalAttempted > 0 && (
            <span className="accuracy">
              ({Math.round((progress.totalCorrect / progress.totalAttempted) * 100)}%)
            </span>
          )}
        </div>
      </header>

      <main className="practice-main">
        <div className="question-card">
          <span className="category-badge">{current.category}</span>
          <p className="question-text">{current.question}</p>
        </div>

        <div className="answer-form">
          <div className="journal-entry">
            <div className="entry-side entry-debit">
              <label>借方</label>
              <input
                type="text"
                value={userDebit}
                onChange={e => setUserDebit(e.target.value)}
                placeholder="勘定科目を入力"
                list="accounts-list"
                disabled={result !== null}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                autoComplete="off"
              />
            </div>
            <div className="entry-divider">/</div>
            <div className="entry-side entry-credit">
              <label>貸方</label>
              <input
                type="text"
                value={userCredit}
                onChange={e => setUserCredit(e.target.value)}
                placeholder="勘定科目を入力"
                list="accounts-list"
                disabled={result !== null}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                autoComplete="off"
              />
            </div>
          </div>
          <datalist id="accounts-list">
            {accountNames.map(name => (
              <option key={name} value={name} />
            ))}
          </datalist>

          {result && (
            <div className={`result-message result-${result}`}>
              {result === 'correct' ? (
                <>✓ 正解です！</>
              ) : (
                <>
                  ✗ 不正解。正解は {current.debit} / {current.credit}
                </>
              )}
            </div>
          )}

          {showExplanation && (
            <div className="explanation">
              <strong>解説：</strong>{current.explanation}
            </div>
          )}

          <div className="action-buttons">
            {result === null ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSubmit()
                }}
                disabled={!userDebit.trim() || !userCredit.trim()}
              >
                採点する
              </button>
            ) : (
              <>
                {result === 'incorrect' && (
                  <button className="btn btn-secondary" onClick={handleRetry}>
                    もう一度
                  </button>
                )}
                <button className="btn btn-primary" onClick={handleNext}>
                  {isLast ? '次の15問へ' : '次の問題'}
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <div className="quick-actions">
        <button className="btn btn-outline" onClick={loadProblems}>
          新しい問題セット（15問）
        </button>
      </div>
    </div>
  )
}
