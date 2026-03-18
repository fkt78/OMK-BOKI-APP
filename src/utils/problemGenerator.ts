/**
 * 仕訳問題ジェネレーター
 * テンプレートと金額の組み合わせで数百〜数千問を生成
 */

import {
  JOURNAL_ENTRY_TEMPLATES,
  COMMON_AMOUNTS,
  type JournalEntryTemplate
} from '../data/journalEntries'

export interface JournalProblem {
  id: string
  question: string
  debit: string
  credit: string
  explanation: string
  category: string
  amount: number
}

/**
 * テンプレートから1問を生成
 */
function generateFromTemplate(
  template: JournalEntryTemplate,
  amount: number,
  amount2?: number
): JournalProblem {
  let question = template.question.replace(/\{amount\}/g, amount.toLocaleString())

  // amount2がある場合は2番目の金額も置換（割引料など）
  if (question.includes('{amount2}') && amount2 !== undefined) {
    question = question.replace(/\{amount2\}/g, amount2.toLocaleString())
  } else if (question.includes('{amount2}')) {
    // amount2が未指定の場合はamountの10%程度で代用
    const defaultAmount2 = Math.floor(amount * 0.05)
    question = question.replace(/\{amount2\}/g, defaultAmount2.toLocaleString())
  }

  return {
    id: `${template.id}-${amount}-${Date.now()}`,
    question,
    debit: template.debit,
    credit: template.credit,
    explanation: template.explanation,
    category: template.category,
    amount
  }
}

/**
 * 単一テンプレートから複数問を生成（金額バリエーション）
 */
function getAmountsForTemplate(template: JournalEntryTemplate): number[] {
  if (template.amountOptions && template.amountOptions.length > 0) {
    return template.amountOptions
  }
  return COMMON_AMOUNTS
}

/**
 * 全テンプレートから問題プールを生成
 * 各テンプレート × 各金額 = 大量の問題
 */
export function generateProblemPool(): JournalProblem[] {
  const pool: JournalProblem[] = []
  const seen = new Set<string>()

  for (const template of JOURNAL_ENTRY_TEMPLATES) {
    const amounts = getAmountsForTemplate(template)
    const hasAmount2 = template.question.includes('{amount2}')

    for (const amount of amounts) {
      if (hasAmount2) {
        // 割引料など：amount2はamountの1〜10%程度
        const amount2Options = [
          Math.floor(amount * 0.01),
          Math.floor(amount * 0.02),
          Math.floor(amount * 0.05),
          Math.floor(amount * 0.1)
        ].filter(a => a > 0)
        for (const amount2 of amount2Options.slice(0, 3)) {
          const key = `${template.id}-${amount}-${amount2}`
          if (!seen.has(key)) {
            seen.add(key)
            pool.push(generateFromTemplate(template, amount, amount2))
          }
        }
      } else {
        const key = `${template.id}-${amount}`
        if (!seen.has(key)) {
          seen.add(key)
          pool.push(generateFromTemplate(template, amount))
        }
      }
    }
  }

  return pool
}

/**
 * 問題プールからランダムに問題を抽出
 */
export function getRandomProblems(
  pool: JournalProblem[],
  count: number,
  excludeIds?: Set<string>
): JournalProblem[] {
  const available = excludeIds
    ? pool.filter(p => !excludeIds.has(p.id))
    : [...pool]

  if (available.length <= count) {
    return shuffleArray(available)
  }

  const shuffled = shuffleArray(available)
  return shuffled.slice(0, count)
}

/**
 * カテゴリ別に問題を取得
 */
export function getProblemsByCategory(
  pool: JournalProblem[],
  category: string,
  count: number
): JournalProblem[] {
  const filtered = pool.filter(p => p.category === category)
  return getRandomProblems(filtered, Math.min(count, filtered.length))
}

/**
 * Fisher-Yates シャッフル
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 問題が正解かどうかチェック
 */
export function checkAnswer(
  problem: JournalProblem,
  userDebit: string,
  userCredit: string
): boolean {
  const normalize = (s: string) => s.trim().replace(/\s+/g, '')
  return (
    normalize(userDebit) === normalize(problem.debit) &&
    normalize(userCredit) === normalize(problem.credit)
  )
}
