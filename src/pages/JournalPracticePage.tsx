import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  generateProblemPool,
  getRandomProblems,
  checkAnswer,
  type JournalProblem
} from '../utils/problemGenerator'
import { recordStats } from '../utils/statsStorage'
import { getAllAccountNames } from '../data/accountTypes'
import './JournalPracticePage.css'

const PROBLEMS_PER_SESSION = 15
const STORAGE_KEY = 'boki3-journal-progress'

interface SessionProgress {
  totalAttempted: number
  totalCorrect: number
  lastPracticed?: string
}

/** プールと問題を一括生成（pool と problems の整合を保つ） */
function createNewSession(): { pool: JournalProblem[]; problems: JournalProblem[] } {
  const problemPool = generateProblemPool()
  return {
    pool: problemPool,
    problems: getRandomProblems(problemPool, PROBLEMS_PER_SESSION)
  }
}

export function JournalPracticePage() {
  /**
   * useEffect + loadProblems での初回読み込みは React Strict Mode で effect が2回走り、
   * 入力中に loadProblems が再度実行されて借方・貸方が空に戻る（問題1だけ入力できないように見える）。
   * 初回は useState の遅延初期化のみで1回だけ生成する。
   */
  const [session, setSession] = useState(createNewSession)
  const { problems } = session
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userDebit, setUserDebit] = useState('')
  const [userCredit, setUserCredit] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const lastCountedIndexRef = useRef<number>(-1)
  const [showExplanation, setShowExplanation] = useState(false)
  /** 借方・貸方未入力で採点したときの案内（datalist 選択で onChange が飛ぶ環境対策でボタンは常に有効） */
  const [inputHint, setInputHint] = useState<string | null>(null)
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
    setSession(createNewSession())
    setCurrentIndex(0)
    setUserDebit('')
    setUserCredit('')
    setResult(null)
    setSessionCorrect(0)
    setAnsweredCount(0)
    lastCountedIndexRef.current = -1
    setShowExplanation(false)
    setInputHint(null)
  }, [])

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

    const d = userDebit.trim()
    const c = userCredit.trim()
    if (!d || !c) {
      setInputHint('借方と貸方の両方に入力してください')
      return
    }
    setInputHint(null)

    const correct = checkAnswer(problems[currentIndex], d, c)
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
    recordStats('journal', correct)
  }

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(i => i + 1)
      setUserDebit('')
      setUserCredit('')
      setResult(null)
      setShowExplanation(false)
      setInputHint(null)
    } else {
      loadProblems()
    }
  }

  const handleRetry = () => {
    setUserDebit('')
    setUserCredit('')
    setResult(null)
    setShowExplanation(false)
    setInputHint(null)
  }

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

        <form
          key={current.id}
          className="answer-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="journal-entry">
            <div className="entry-side entry-debit">
              <label htmlFor={`debit-${current.id}`}>借方</label>
              <input
                id={`debit-${current.id}`}
                type="text"
                value={userDebit}
                onChange={e => {
                  setUserDebit(e.target.value)
                  setInputHint(null)
                }}
                onInput={e => {
                  setUserDebit(e.currentTarget.value)
                  setInputHint(null)
                }}
                placeholder="勘定科目を入力"
                list="accounts-list"
                disabled={result !== null}
                autoComplete="off"
                enterKeyHint="next"
              />
            </div>
            <div className="entry-divider">/</div>
            <div className="entry-side entry-credit">
              <label htmlFor={`credit-${current.id}`}>貸方</label>
              <input
                id={`credit-${current.id}`}
                type="text"
                value={userCredit}
                onChange={e => {
                  setUserCredit(e.target.value)
                  setInputHint(null)
                }}
                onInput={e => {
                  setUserCredit(e.currentTarget.value)
                  setInputHint(null)
                }}
                placeholder="勘定科目を入力"
                list="accounts-list"
                disabled={result !== null}
                autoComplete="off"
                enterKeyHint="done"
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

          {inputHint && result === null && (
            <p className="input-hint" role="status">
              {inputHint}
            </p>
          )}

          <div className="action-buttons">
            {result === null ? (
              <button
                type="submit"
                className="btn btn-primary"
              >
                採点する
              </button>
            ) : (
              <>
                {result === 'incorrect' && (
                  <button type="button" className="btn btn-secondary" onClick={handleRetry}>
                    もう一度
                  </button>
                )}
                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  {isLast ? '次の15問へ' : '次の問題'}
                </button>
              </>
            )}
          </div>
        </form>
      </main>

      <div className="quick-actions">
        <button type="button" className="btn btn-outline" onClick={loadProblems}>
          新しい問題セット（15問）
        </button>
      </div>
    </div>
  )
}
