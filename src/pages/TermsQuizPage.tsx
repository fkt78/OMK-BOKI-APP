import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TERM_QUESTIONS } from '../data/termQuestions'
import { recordStats } from '../utils/statsStorage'
import './TermsQuizPage.css'

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function TermsQuizPage() {
  const [questions, setQuestions] = useState(() => shuffleArray(TERM_QUESTIONS))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState({ correct: 0, answered: 0 })

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return
    const current = questions[currentIndex]
    if (!current) return
    const isCorrect = index === current.correctIndex
    recordStats('terms', isCorrect)
    setSelectedIndex(index)
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      answered: prev.answered + 1
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelectedIndex(null)
    } else {
      setQuestions(shuffleArray(TERM_QUESTIONS))
      setCurrentIndex(0)
      setSelectedIndex(null)
    }
  }

  const handleRetry = () => {
    setQuestions(shuffleArray(TERM_QUESTIONS))
    setCurrentIndex(0)
    setSelectedIndex(null)
    setScore({ correct: 0, answered: 0 })
  }

  const current = questions[currentIndex]
  const isCorrect = selectedIndex === current.correctIndex
  const showResult = selectedIndex !== null

  return (
    <div className="terms-quiz">
      <header className="quiz-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <div className="progress-info">
          <span className="progress-text">
            問題 {currentIndex + 1} / {questions.length}
          </span>
          <span className="session-score">
            正解: {score.correct} / {score.answered}
          </span>
        </div>
      </header>

      <main className="quiz-main">
        <div className="question-card">
          <span className="category-badge">{current.category}</span>
          <p className="question-text">{current.question}</p>
        </div>

        <div className="options">
          {current.options.map((option, index) => {
            const isSelected = selectedIndex === index
            const isCorrectOption = index === current.correctIndex
            let buttonClass = 'option-btn'
            if (showResult) {
              if (isCorrectOption) buttonClass += ' option-correct'
              else if (isSelected && !isCorrectOption) buttonClass += ' option-incorrect'
            } else if (isSelected) {
              buttonClass += ' option-selected'
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleSelect(index)}
                disabled={showResult}
              >
                {option}
              </button>
            )
          })}
        </div>

        {showResult && (
          <>
            <div className={`result-message result-${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '✓ 正解です！' : `✗ 不正解。正解は「${current.options[current.correctIndex]}」`}
            </div>
            <div className="explanation">
              <strong>解説：</strong>{current.explanation}
            </div>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? '次の問題' : 'もう一度最初から'}
            </button>
          </>
        )}
      </main>

      <div className="quick-actions">
        <button className="btn btn-outline" onClick={handleRetry}>
          新しい問題セット
        </button>
      </div>
    </div>
  )
}
