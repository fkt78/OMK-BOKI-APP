/**
 * localStorage に保存した JSON のパース後スキーマ検証
 * （手編集・破損・旧バージョン形式への耐性）
 */

import type { CategoryStats, DailyStats } from './statsStorage'

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

/** 有限かつ 0 以上の整数として解釈（不正時は 0） */
function finiteNonNegInt(n: unknown): number {
  if (typeof n !== 'number' || !Number.isFinite(n)) return 0
  return Math.max(0, Math.floor(n))
}

export function parseCategoryStats(raw: unknown): CategoryStats | undefined {
  if (!isPlainObject(raw)) return undefined
  const attempted = finiteNonNegInt(raw.attempted)
  let correct = finiteNonNegInt(raw.correct)
  if (correct > attempted) correct = attempted
  return { attempted, correct }
}

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/
const CATEGORIES = [
  'journal',
  'terms',
  'accountEntry',
  'cashBook',
  'trialBalance'
] as const

/** 1日分の統計（キーは日付文字列と一致させる） */
export function parseDailyStats(raw: unknown, dateKey: string): DailyStats | null {
  if (!DATE_KEY.test(dateKey)) return null
  if (!isPlainObject(raw)) return null

  const date =
    typeof raw.date === 'string' && DATE_KEY.test(raw.date) ? raw.date : dateKey

  const day: DailyStats = { date }

  for (const c of CATEGORIES) {
    if (!(c in raw)) continue
    const parsed = parseCategoryStats(raw[c])
    if (parsed !== undefined) {
      day[c] = parsed
    }
  }

  return day
}

/** ダッシュボード全体（日付 → 日次統計） */
export function parseDashboardStatsRecord(raw: unknown): Record<string, DailyStats> {
  if (!isPlainObject(raw)) return {}
  const out: Record<string, DailyStats> = {}
  for (const [key, val] of Object.entries(raw)) {
    if (!DATE_KEY.test(key)) continue
    const day = parseDailyStats(val, key)
    if (day) out[key] = day
  }
  return out
}

/** localStorage の生文字列 → 検証済みレコード（parse 失敗時は {}） */
export function safeParseDashboardStats(json: string | null): Record<string, DailyStats> {
  if (json == null || json === '') return {}
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return {}
  }
  return parseDashboardStatsRecord(parsed)
}

/** 仕訳練習の累計進捗 */
export interface JournalSessionProgress {
  totalAttempted: number
  totalCorrect: number
  lastPracticed?: string
}

export function parseJournalSessionProgress(raw: unknown): JournalSessionProgress {
  const empty: JournalSessionProgress = { totalAttempted: 0, totalCorrect: 0 }
  if (!isPlainObject(raw)) return empty

  const totalAttempted = finiteNonNegInt(raw.totalAttempted)
  let totalCorrect = finiteNonNegInt(raw.totalCorrect)
  if (totalCorrect > totalAttempted) totalCorrect = totalAttempted

  let lastPracticed: string | undefined
  if (typeof raw.lastPracticed === 'string' && raw.lastPracticed.length > 0) {
    const t = Date.parse(raw.lastPracticed)
    if (!Number.isNaN(t)) lastPracticed = raw.lastPracticed
  }

  return { totalAttempted, totalCorrect, lastPracticed }
}

export function safeParseJournalProgress(json: string | null): JournalSessionProgress {
  if (json == null || json === '') {
    return { totalAttempted: 0, totalCorrect: 0 }
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return { totalAttempted: 0, totalCorrect: 0 }
  }
  return parseJournalSessionProgress(parsed)
}
