/**
 * 簿記3級 第2問：用語選択問題
 * 本番形式の4択問題
 */

export interface TermQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  category: string
}

export const TERM_QUESTIONS: TermQuestion[] = [
  // 仕訳・勘定の基礎
  {
    id: 'term-001',
    question: '借方には（　）の増加が記入される。',
    options: ['資産と費用', '負債と純資産', '収益', '負債と収益'],
    correctIndex: 0,
    explanation: '借方には資産・費用の増加を記入する。貸方には負債・純資産・収益の増加を記入する。',
    category: '仕訳の基礎'
  },
  {
    id: 'term-002',
    question: '貸方には（　）の増加が記入される。',
    options: ['資産と費用', '負債と純資産と収益', '資産', '費用'],
    correctIndex: 1,
    explanation: '貸方には負債・純資産・収益の増加を記入する。',
    category: '仕訳の基礎'
  },
  {
    id: 'term-003',
    question: '仕訳では、借方と貸方の金額は必ず（　）である。',
    options: ['借方の方が大きい', '貸方の方が大きい', '等しい', '異なっていてもよい'],
    correctIndex: 2,
    explanation: '複式簿記の原則により、借方合計と貸方合計は常に一致する。',
    category: '仕訳の基礎'
  },
  {
    id: 'term-004',
    question: '元帳とは、仕訳を（　）勘定科目ごとに整理した帳簿である。',
    options: ['借方', '貸方', '各', '日付'],
    correctIndex: 2,
    explanation: '元帳（総勘定元帳）は、仕訳を勘定科目ごとに分類・転記した帳簿。',
    category: '帳簿'
  },
  {
    id: 'term-005',
    question: '補助簿は（　）を補助するための帳簿である。',
    options: ['仕訳帳', '総勘定元帳', '試算表', '精算表'],
    correctIndex: 1,
    explanation: '補助簿は総勘定元帳の内容を補足するための明細帳簿。',
    category: '帳簿'
  },

  // 補助簿の種類
  {
    id: 'term-006',
    question: '現金の出入りを記録する補助簿を（　）という。',
    options: ['仕入帳', '売上帳', '現金出納帳', '当座預金出納帳'],
    correctIndex: 2,
    explanation: '現金出納帳は現金取引の明細を日付順に記録する補助簿。',
    category: '補助簿'
  },
  {
    id: 'term-007',
    question: '仕入取引の明細を記録する補助簿を（　）という。',
    options: ['仕入帳', '売上帳', '現金出納帳', '買掛金元帳'],
    correctIndex: 0,
    explanation: '仕入帳は商品の仕入取引を記録する補助簿。',
    category: '補助簿'
  },
  {
    id: 'term-008',
    question: '売上取引の明細を記録する補助簿を（　）という。',
    options: ['仕入帳', '売上帳', '売掛金元帳', '商品有高帳'],
    correctIndex: 1,
    explanation: '売上帳は商品の売上取引を記録する補助簿。',
    category: '補助簿'
  },
  {
    id: 'term-009',
    question: '商品の受払いと在庫を記録する補助簿を（　）という。',
    options: ['仕入帳', '売上帳', '商品有高帳', '買掛金元帳'],
    correctIndex: 2,
    explanation: '商品有高帳は商品の仕入・売上・在庫を記録する補助簿。',
    category: '補助簿'
  },
  {
    id: 'term-010',
    question: '買掛金の明細を記録する補助簿を（　）という。',
    options: ['仕入帳', '買掛金元帳', '売掛金元帳', '現金出納帳'],
    correctIndex: 1,
    explanation: '買掛金元帳は取引先別の買掛金の増減を記録する補助簿。',
    category: '補助簿'
  },

  // 伝票
  {
    id: 'term-011',
    question: '3伝票制の伝票は、入金伝票・出金伝票・（　）の3種類である。',
    options: ['振替伝票', '仕入伝票', '売上伝票', '受取伝票'],
    correctIndex: 0,
    explanation: '3伝票制は入金・出金・振替の3種類。振替伝票は現金を伴わない取引に使用。',
    category: '伝票'
  },
  {
    id: 'term-012',
    question: '現金の増加する取引で使用する伝票は（　）である。',
    options: ['入金伝票', '出金伝票', '振替伝票', '仕入伝票'],
    correctIndex: 0,
    explanation: '入金伝票は現金が増加する取引（売上・回収など）に使用。',
    category: '伝票'
  },
  {
    id: 'term-013',
    question: '現金を伴わない取引で使用する伝票は（　）である。',
    options: ['入金伝票', '出金伝票', '振替伝票', '仕入伝票'],
    correctIndex: 2,
    explanation: '振替伝票は掛け取引など、現金の増減を伴わない取引に使用。',
    category: '伝票'
  },

  // 決算・精算
  {
    id: 'term-014',
    question: '決算整理前の残高試算表を（　）という。',
    options: ['精算表', '合計試算表', '残高試算表', '試算表'],
    correctIndex: 3,
    explanation: '試算表は決算整理前の残高を集計したもの。精算表は決算整理を加えたもの。',
    category: '決算'
  },
  {
    id: 'term-015',
    question: '前払費用は（　）に計上される。',
    options: ['負債', '費用', '資産', '収益'],
    correctIndex: 2,
    explanation: '前払費用は将来の費用の前払いで、まだ提供されていない役務に対する権利。資産に計上。',
    category: '決算整理'
  },
  {
    id: 'term-016',
    question: '未払費用は（　）に計上される。',
    options: ['資産', '費用', '負債', '収益'],
    correctIndex: 2,
    explanation: '未払費用は当期に発生した費用で未払いのもの。負債に計上。',
    category: '決算整理'
  },
  {
    id: 'term-017',
    question: '前受収益は（　）に計上される。',
    options: ['資産', '費用', '負債', '収益'],
    correctIndex: 2,
    explanation: '前受収益は将来の収益の前受けで、まだ提供していない役務に対する債務。負債に計上。',
    category: '決算整理'
  },
  {
    id: 'term-018',
    question: '未収収益は（　）に計上される。',
    options: ['資産', '費用', '負債', '収益'],
    correctIndex: 0,
    explanation: '未収収益は当期に発生した収益で未収のもの。資産に計上。',
    category: '決算整理'
  },
  {
    id: 'term-019',
    question: '減価償却の（　）では、備品の勘定残高を直接減らす。',
    options: ['間接法', '直接法', '定率法', '定額法'],
    correctIndex: 1,
    explanation: '直接法は固定資産の勘定残高を直接減額する。間接法は減価償却累計額を用いる。',
    category: '減価償却'
  },
  {
    id: 'term-020',
    question: '貸倒引当金は（　）の評価勘定である。',
    options: ['売掛金', '買掛金', '受取手形', '売掛金と受取手形'],
    correctIndex: 3,
    explanation: '貸倒引当金は売掛金・受取手形などの回収不能見込み額を引当てる。',
    category: '貸倒れ'
  },
]
