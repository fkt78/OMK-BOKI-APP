import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { JournalPracticePage } from './pages/JournalPracticePage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPracticePage />} />
        <Route path="/accounts" element={
          <PlaceholderPage
            title="勘定科目"
            description="資産・負債・純資産・収益・費用の分類を学習します。"
          />
        } />
        <Route path="/trial-balance" element={
          <PlaceholderPage
            title="精算表・試算表"
            description="第3問対策。精算表や試算表の作成を練習します。"
          />
        } />
        <Route path="/closing" element={
          <PlaceholderPage
            title="決算整理"
            description="繰延・見越・減価償却・貸倒引当金などの決算整理を学習します。"
          />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
