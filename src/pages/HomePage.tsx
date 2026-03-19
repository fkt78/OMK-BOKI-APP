import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>簿記3級 学習アプリ</h1>
        <p className="subtitle">日商簿記3級合格を目指して、繰り返し学習</p>
        <p className="version-badge">v{__APP_VERSION__}</p>
      </header>

      <nav className="menu-grid">
        <Link to="/dashboard" className="menu-card menu-card--primary">
          <span className="menu-card__icon">📈</span>
          <h2>学習ダッシュボード</h2>
          <p>今日の学習状況・成長グラフ・CSV出力</p>
          <span className="menu-card__badge">NEW</span>
        </Link>

        <Link to="/journal" className="menu-card">
          <span className="menu-card__icon">📝</span>
          <h2>第1問：仕訳練習</h2>
          <p>15問・45点。3,000問以上のパターンで繰り返し練習</p>
          <span className="menu-card__badge">メイン</span>
        </Link>

        <Link to="/q2-terms" className="menu-card">
          <span className="menu-card__icon">📋</span>
          <h2>第2問：用語選択</h2>
          <p>本番形式の4択問題。簿記用語をマスター</p>
          <span className="menu-card__badge">NEW</span>
        </Link>

        <Link to="/q2-account" className="menu-card">
          <span className="menu-card__icon">📐</span>
          <h2>第2問：勘定記入</h2>
          <p>T字勘定の空欄を埋める。本番形式</p>
          <span className="menu-card__badge">NEW</span>
        </Link>

        <Link to="/q2-books" className="menu-card">
          <span className="menu-card__icon">📒</span>
          <h2>第2問：補助簿</h2>
          <p>現金出納帳の記入。本番形式</p>
          <span className="menu-card__badge">NEW</span>
        </Link>

        <Link to="/accounts" className="menu-card">
          <span className="menu-card__icon">📋</span>
          <h2>勘定科目</h2>
          <p>資産・負債・純資産・収益・費用の分類</p>
        </Link>

        <Link to="/trial-balance" className="menu-card">
          <span className="menu-card__icon">📊</span>
          <h2>第3問：精算表・試算表</h2>
          <p>合計試算表の借方・貸方合計を求める</p>
          <span className="menu-card__badge">NEW</span>
        </Link>
      </nav>

      <footer className="home-footer">
        <p>PWA対応：オフラインでも学習可能。ホーム画面に追加してご利用ください。</p>
      </footer>
    </div>
  )
}
