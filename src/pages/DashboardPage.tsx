import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  getAllStats,
  getTodayStats,
  exportToCSV,
  importFromCSV,
  CATEGORY_LABELS,
  type DailyStats,
  type StatsCategory
} from '../utils/statsStorage'
import './DashboardPage.css'

const CATEGORIES: StatsCategory[] = ['journal', 'terms', 'accountEntry', 'cashBook', 'trialBalance']

export function DashboardPage() {
  const [stats, setStats] = useState<DailyStats[]>(() => getAllStats())
  const [importResult, setImportResult] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const refresh = () => {
    setStats(getAllStats())
  }

  const today = getTodayStats()

  const handleExport = () => {
    const csv = exportToCSV()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `簿記学習_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      const { success, errors } = importFromCSV(text)
      setImportResult(
        errors.length > 0
          ? `${success}件取り込み。エラー: ${errors.join('; ')}`
          : `${success}件のデータを取り込みました`
      )
      refresh()
      setTimeout(() => setImportResult(null), 5000)
    }
    reader.readAsText(file, 'UTF-8')
    e.target.value = ''
  }

  /** 日付昇順のまま（上＝古い日・下＝新しい日） */
  const chartData = stats.slice(-14)

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/" className="back-link">← ホーム</Link>
        <h1>学習ダッシュボード</h1>
        <p className="subtitle">今日の学習状況と成長の記録</p>
      </header>

      <main className="dashboard-main">
        <section className="today-section">
          <h2>今日の学習</h2>
          {today ? (
            <table className="stats-table">
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th>解答数</th>
                  <th>正解数</th>
                  <th>正答率</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map(cat => {
                  const s = today[cat]
                  if (!s || s.attempted === 0) return null
                  return (
                    <tr key={cat}>
                      <td>{CATEGORY_LABELS[cat]}</td>
                      <td>{s.attempted}</td>
                      <td>{s.correct}</td>
                      <td>{s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <p className="empty-message">今日はまだ学習記録がありません。問題を解くとここに表示されます。</p>
          )}
        </section>

        <section className="chart-section">
          <h2>直近14日間の学習量</h2>
          <div className="chart-container">
            {chartData.length > 0 ? (
              chartData.map((d) => {
                const attempted = (d.journal?.attempted ?? 0) + (d.terms?.attempted ?? 0) +
                  (d.accountEntry?.attempted ?? 0) + (d.cashBook?.attempted ?? 0) + (d.trialBalance?.attempted ?? 0)
                const correctTotal = (d.journal?.correct ?? 0) + (d.terms?.correct ?? 0) +
                  (d.accountEntry?.correct ?? 0) + (d.cashBook?.correct ?? 0) + (d.trialBalance?.correct ?? 0)
                const maxAttempted = Math.max(...chartData.map(x =>
                  (x.journal?.attempted ?? 0) + (x.terms?.attempted ?? 0) +
                  (x.accountEntry?.attempted ?? 0) + (x.cashBook?.attempted ?? 0) + (x.trialBalance?.attempted ?? 0)
                ), 1)
                const pct = (attempted / maxAttempted) * 100
                return (
                  <div key={d.date} className="chart-row">
                    <span className="chart-date">{d.date.slice(5)}</span>
                    <div className="chart-bar-wrap">
                      <div
                        className="chart-bar"
                        style={{ width: `${pct}%` }}
                        title={`${attempted}問中${correctTotal}問正解`}
                      />
                    </div>
                    <span className="chart-value">{attempted}問</span>
                  </div>
                )
              })
            ) : (
              <p className="empty-message">まだ記録がありません。問題を解くとグラフに表示されます。</p>
            )}
          </div>
        </section>

        <section className="csv-section">
          <h2>データのエクスポート・インポート</h2>
          <div className="csv-buttons">
            <button type="button" className="btn btn-primary" onClick={handleExport}>
              CSVでダウンロード
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => fileInputRef.current?.click()}
            >
              CSVを取り込む
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </div>
          {importResult && <p className="import-result">{importResult}</p>}
          <p className="csv-hint">別のデバイスで学習したデータを取り込むと、成長グラフに反映されます。</p>
        </section>
      </main>
    </div>
  )
}
