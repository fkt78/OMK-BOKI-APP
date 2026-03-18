import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>簿記3級 学習アプリ</h1>
        <p className="subtitle">日商簿記3級合格を目指して、繰り返し学習</p>
      </header>

      <nav className="menu-grid">
        <Link to="/journal" className="menu-card menu-card--primary">
          <span className="menu-card__icon">📝</span>
          <h2>仕訳練習</h2>
          <p>第1問対策。2,000問以上のパターンで繰り返し練習</p>
          <span className="menu-card__badge">メイン</span>
        </Link>

        <Link to="/accounts" className="menu-card menu-card--disabled">
          <span className="menu-card__icon">📋</span>
          <h2>勘定科目</h2>
          <p>資産・負債・純資産・収益・費用の分類を学習</p>
          <span className="menu-card__badge">準備中</span>
        </Link>

        <Link to="/trial-balance" className="menu-card menu-card--disabled">
          <span className="menu-card__icon">📊</span>
          <h2>精算表・試算表</h2>
          <p>第3問対策。総合問題の練習</p>
          <span className="menu-card__badge">準備中</span>
        </Link>

        <Link to="/closing" className="menu-card menu-card--disabled">
          <span className="menu-card__icon">📑</span>
          <h2>決算整理</h2>
          <p>繰延・見越・減価償却などの練習</p>
          <span className="menu-card__badge">準備中</span>
        </Link>
      </nav>

      <footer className="home-footer">
        <p>PWA対応：オフラインでも学習可能。ホーム画面に追加してご利用ください。</p>
      </footer>
    </div>
  )
}
