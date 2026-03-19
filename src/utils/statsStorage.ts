/**
 * 学習統計の記録・CSV出力・取り込み
 */

export type StatsCategory = 'journal' | 'terms' | 'accountEntry' | 'cashBook' | 'trialBalance'

export interface CategoryStats {
  attempted: number
  correct: number
}

export interface DailyStats {
  date: string
  journal?: CategoryStats
  terms?: CategoryStats
  accountEntry?: CategoryStats
  cashBook?: CategoryStats
  trialBalance?: CategoryStats
}

const STORAGE_KEY = 'boki3-dashboard-stats'

function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function loadAll(): Record<string, DailyStats> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAll(data: Record<string, DailyStats>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/** 1問の結果を記録 */
export function recordStats(category: StatsCategory, correct: boolean) {
  const date = getToday()
  const all = loadAll()
  const day = all[date] ?? { date }
  const cat = day[category] ?? { attempted: 0, correct: 0 }
  day[category] = {
    attempted: cat.attempted + 1,
    correct: cat.correct + (correct ? 1 : 0)
  }
  all[date] = day
  saveAll(all)
}

/** 全データを取得（日付昇順） */
export function getAllStats(): DailyStats[] {
  const all = loadAll()
  return Object.values(all).sort((a, b) => a.date.localeCompare(b.date))
}

/** 今日の統計を取得 */
export function getTodayStats(): DailyStats | null {
  const all = loadAll()
  return all[getToday()] ?? null
}

/** CSV形式でエクスポート */
export function exportToCSV(): string {
  const stats = getAllStats()
  const headers = ['日付', '仕訳_解答数', '仕訳_正解数', '用語_解答数', '用語_正解数', '勘定記入_解答数', '勘定記入_正解数', '補助簿_解答数', '補助簿_正解数', '試算表_解答数', '試算表_正解数']
  const rows = stats.map(d => [
    d.date,
    d.journal?.attempted ?? 0,
    d.journal?.correct ?? 0,
    d.terms?.attempted ?? 0,
    d.terms?.correct ?? 0,
    d.accountEntry?.attempted ?? 0,
    d.accountEntry?.correct ?? 0,
    d.cashBook?.attempted ?? 0,
    d.cashBook?.correct ?? 0,
    d.trialBalance?.attempted ?? 0,
    d.trialBalance?.correct ?? 0
  ])
  const lines = [headers.join(','), ...rows.map(r => r.join(','))]
  return '\uFEFF' + lines.join('\n')
}

/** CSVからインポート（既存データにマージ） */
export function importFromCSV(csvText: string): { success: number; errors: string[] } {
  const errors: string[] = []
  const lines = csvText.trim().split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) {
    errors.push('データがありません')
    return { success: 0, errors }
  }
  const all = loadAll()
  let success = 0
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim())
    if (cols.length < 11) {
      errors.push(`${i + 1}行目: 列数が不足しています`)
      continue
    }
    const date = cols[0]
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push(`${i + 1}行目: 日付形式が不正です (${date})`)
      continue
    }
    const day = all[date] ?? { date }
    const num = (s: string) => Math.max(0, parseInt(s, 10) || 0)
    day.journal = mergeStats(day.journal, { attempted: num(cols[1]), correct: num(cols[2]) })
    day.terms = mergeStats(day.terms, { attempted: num(cols[3]), correct: num(cols[4]) })
    day.accountEntry = mergeStats(day.accountEntry, { attempted: num(cols[5]), correct: num(cols[6]) })
    day.cashBook = mergeStats(day.cashBook, { attempted: num(cols[7]), correct: num(cols[8]) })
    day.trialBalance = mergeStats(day.trialBalance, { attempted: num(cols[9]), correct: num(cols[10]) })
    all[date] = day
    success++
  }
  saveAll(all)
  return { success, errors }
}

function mergeStats(_a?: CategoryStats, b?: CategoryStats): CategoryStats {
  return {
    attempted: b?.attempted ?? 0,
    correct: b?.correct ?? 0
  }
}

export const CATEGORY_LABELS: Record<StatsCategory, string> = {
  journal: '仕訳練習',
  terms: '用語選択',
  accountEntry: '勘定記入',
  cashBook: '補助簿',
  trialBalance: '試算表'
}
