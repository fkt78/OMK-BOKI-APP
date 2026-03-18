import { Link } from 'react-router-dom'

interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
        ← ホーム
      </Link>
      <h1 style={{ marginTop: 24 }}>{title}</h1>
      <p style={{ color: 'var(--text)', marginTop: 12 }}>{description}</p>
      <p style={{ color: 'var(--text)', opacity: 0.8, marginTop: 16 }}>
        準備中です。まずは仕訳練習で基礎を固めましょう！
      </p>
    </div>
  )
}
