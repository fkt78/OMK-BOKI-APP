import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { JournalPracticePage } from './pages/JournalPracticePage'
import { TermsQuizPage } from './pages/TermsQuizPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPracticePage />} />
        <Route path="/q2-terms" element={<TermsQuizPage />} />
        <Route path="/q2-account" element={
          <PlaceholderPage
            title="第2問：勘定記入"
            description="T字勘定の空欄を埋める問題。準備中です。"
          />
        } />
        <Route path="/q2-books" element={
          <PlaceholderPage
            title="第2問：補助簿"
            description="現金出納帳・仕入帳・売上帳などの記入。準備中です。"
          />
        } />
        <Route path="/accounts" element={
          <PlaceholderPage
            title="勘定科目"
            description="資産・負債・純資産・収益・費用の分類を学習します。"
          />
        } />
        <Route path="/trial-balance" element={
          <PlaceholderPage
            title="第3問：精算表・試算表"
            description="第3問対策。精算表や試算表の作成を練習します。準備中です。"
          />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
