import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { JournalPracticePage } from './pages/JournalPracticePage'
import { TermsQuizPage } from './pages/TermsQuizPage'
import { AccountsPage } from './pages/AccountsPage'
import { AccountEntryPage } from './pages/AccountEntryPage'
import { CashBookPage } from './pages/CashBookPage'
import { TrialBalancePage } from './pages/TrialBalancePage'
import { DashboardPage } from './pages/DashboardPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPracticePage />} />
        <Route path="/q2-terms" element={<TermsQuizPage />} />
        <Route path="/q2-account" element={<AccountEntryPage />} />
        <Route path="/q2-books" element={<CashBookPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/trial-balance" element={<TrialBalancePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
