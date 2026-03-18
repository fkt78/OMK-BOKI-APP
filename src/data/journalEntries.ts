/**
 * 簿記3級 仕訳パターン（テンプレート）
 * 金額のバリエーションで数百問を生成可能
 */

export interface JournalEntryTemplate {
  id: string
  question: string // {amount} が金額のプレースホルダー
  debit: string
  credit: string
  explanation: string
  category: string
  /** 使用する金額の候補（円） */
  amountOptions?: number[]
}

// よく使う金額パターン（円）
export const COMMON_AMOUNTS = [
  1_000, 2_000, 3_000, 5_000, 8_000, 10_000, 15_000, 20_000, 25_000, 30_000,
  40_000, 50_000, 60_000, 80_000, 100_000, 120_000, 150_000, 200_000, 250_000,
  300_000, 400_000, 500_000, 600_000, 800_000, 1_000_000
]

export const JOURNAL_ENTRY_TEMPLATES: JournalEntryTemplate[] = [
  // === 現金・預金取引 ===
  { id: 'cash-001', question: '商品￥{amount}を現金で購入した。', debit: '仕入', credit: '現金', explanation: '商品の仕入は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-002', question: '商品￥{amount}を現金で売り上げ、代金は現金で受け取った。', debit: '現金', credit: '売上', explanation: '現金の受取は資産の増加（借方）、売上は収益の増加（貸方）。', category: '現金取引' },
  { id: 'cash-003', question: '現金￥{amount}を元入れして開業した。', debit: '現金', credit: '資本金', explanation: '元入れは資本の増加。現金の増加（借方）、資本金の増加（貸方）。', category: '現金取引' },
  { id: 'cash-004', question: '銀行から現金￥{amount}を借り入れた。', debit: '現金', credit: '借入金', explanation: '借入は負債の増加。現金の増加（借方）、借入金の増加（貸方）。', category: '現金取引' },
  { id: 'cash-005', question: '借入金￥{amount}を現金で返済した。', debit: '借入金', credit: '現金', explanation: '借入金の返済は負債の減少（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-006', question: '買掛金￥{amount}を現金で支払った。', debit: '買掛金', credit: '現金', explanation: '買掛金の支払いは負債の減少（借方）、現金の減少（貸方）。', category: '現金取引' },
  { id: 'cash-007', question: '売掛金￥{amount}を現金で回収した。', debit: '現金', credit: '売掛金', explanation: '売掛金の回収は債権の消滅。現金の増加（借方）、売掛金の減少（貸方）。', category: '現金取引' },
  { id: 'cash-008', question: '給料￥{amount}を現金で支払った。', debit: '給料', credit: '現金', explanation: '給料は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-009', question: '受取手数料￥{amount}を現金で受け取った。', debit: '現金', credit: '受取手数料', explanation: '受取手数料は収益の増加。現金の増加（借方）、受取手数料の増加（貸方）。', category: '現金取引' },
  { id: 'cash-010', question: '現金￥{amount}を普通預金に預け入れた。', debit: '普通預金', credit: '現金', explanation: '預金は資産同士の振替。普通預金の増加（借方）、現金の減少（貸方）。', category: '現金取引' },
  { id: 'cash-011', question: '普通預金から現金￥{amount}を引き出した。', debit: '現金', credit: '普通預金', explanation: '預金からの引出は資産同士の振替。', category: '現金取引' },
  { id: 'cash-012', question: '備品￥{amount}を現金で購入した。', debit: '備品', credit: '現金', explanation: '備品の購入は資産の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-013', question: '消耗品￥{amount}を現金で購入した。', debit: '消耗品費', credit: '現金', explanation: '消耗品は費用として計上。消耗品費の増加（借方）、現金の減少（貸方）。', category: '現金取引' },
  { id: 'cash-014', question: '旅費交通費￥{amount}を現金で支払った。', debit: '旅費交通費', credit: '現金', explanation: '旅費交通費は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-015', question: '通信費￥{amount}を現金で支払った。', debit: '通信費', credit: '現金', explanation: '通信費は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-016', question: '現金￥{amount}を貸し付けた。', debit: '貸付金', credit: '現金', explanation: '貸付は債権の発生。貸付金の増加（借方）、現金の減少（貸方）。', category: '現金取引' },
  { id: 'cash-017', question: '貸付金￥{amount}を現金で回収した。', debit: '現金', credit: '貸付金', explanation: '貸付金の回収は債権の消滅。現金の増加（借方）、貸付金の減少（貸方）。', category: '現金取引' },
  { id: 'cash-018', question: '雑費￥{amount}を現金で支払った。', debit: '雑費', credit: '現金', explanation: '雑費は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-019', question: '租税公課￥{amount}を現金で支払った。', debit: '租税公課', credit: '現金', explanation: '租税公課は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '現金取引' },
  { id: 'cash-020', question: '雑収入￥{amount}を現金で受け取った。', debit: '現金', credit: '雑収入', explanation: '雑収入は収益の増加。現金の増加（借方）、雑収入の増加（貸方）。', category: '現金取引' },

  // === 掛取引 ===
  { id: 'credit-001', question: '商品￥{amount}を掛けで仕入れた。', debit: '仕入', credit: '買掛金', explanation: '掛け仕入は仕入（費用）の増加と買掛金（負債）の増加。', category: '掛取引' },
  { id: 'credit-002', question: '商品￥{amount}を掛けで売り上げた。', debit: '売掛金', credit: '売上', explanation: '掛け売上は売掛金（資産）の増加と売上（収益）の増加。', category: '掛取引' },
  { id: 'credit-003', question: '買掛金￥{amount}を現金で支払った。', debit: '買掛金', credit: '現金', explanation: '買掛金の支払いは負債の減少（借方）、現金の減少（貸方）。', category: '掛取引' },
  { id: 'credit-004', question: '売掛金￥{amount}を現金で回収した。', debit: '現金', credit: '売掛金', explanation: '売掛金の回収は現金の増加（借方）、売掛金の減少（貸方）。', category: '掛取引' },
  { id: 'credit-005', question: '買掛金￥{amount}を当座預金から支払った。', debit: '買掛金', credit: '当座預金', explanation: '当座預金からの支払いは買掛金の減少と当座預金の減少。', category: '掛取引' },
  { id: 'credit-006', question: '売掛金￥{amount}を当座預金で回収した。', debit: '当座預金', credit: '売掛金', explanation: '当座預金での回収は当座預金の増加と売掛金の減少。', category: '掛取引' },

  // === 手形取引 ===
  { id: 'note-001', question: '商品￥{amount}を掛けで売り上げ、代金は約束手形で受け取った。', debit: '受取手形', credit: '売上', explanation: '手形での売上は受取手形（資産）の増加と売上（収益）の増加。', category: '手形取引' },
  { id: 'note-002', question: '商品￥{amount}を掛けで仕入れ、代金は約束手形を振り出して支払った。', debit: '仕入', credit: '支払手形', explanation: '手形での仕入は仕入（費用）の増加と支払手形（負債）の増加。', category: '手形取引' },
  { id: 'note-003', question: '受取手形￥{amount}を満期前に現金で割り引いた（手形の譲渡）。', debit: '現金', credit: '受取手形', explanation: '手形割引（簡略処理）。受取手形の減少と現金の増加。', category: '手形取引', amountOptions: [10000, 50000, 100000] },
  { id: 'note-004', question: '受取手形￥{amount}を銀行で割り引き、当座預金に振り込まれた。', debit: '当座預金', credit: '受取手形', explanation: '手形割引（簡略処理）。受取手形の減少と当座預金の増加。', category: '手形取引', amountOptions: [50000, 100000, 200000] },
  { id: 'note-005', question: '支払手形￥{amount}を当座預金から支払った。', debit: '支払手形', credit: '当座預金', explanation: '支払手形の決済は支払手形（負債）の減少と当座預金の減少。', category: '手形取引' },
  { id: 'note-006', question: '受取手形￥{amount}が満期日に当座預金に振り込まれた。', debit: '当座預金', credit: '受取手形', explanation: '手形の満期決済は当座預金の増加と受取手形の減少。', category: '手形取引' },
  { id: 'note-007', question: '買掛金￥{amount}の支払いとして、約束手形を振り出した。', debit: '買掛金', credit: '支払手形', explanation: '買掛金の手形振出による決済。買掛金の減少と支払手形の増加。', category: '手形取引' },
  { id: 'note-008', question: '売掛金￥{amount}の回収として、約束手形を受け取った。', debit: '受取手形', credit: '売掛金', explanation: '売掛金の手形での回収。受取手形の増加と売掛金の減少。', category: '手形取引' },

  // === 固定資産 ===
  { id: 'fixed-001', question: '備品￥{amount}を現金で購入した。', debit: '備品', credit: '現金', explanation: '備品の購入は資産の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '固定資産' },
  { id: 'fixed-002', question: '建物￥{amount}を現金で購入した。', debit: '建物', credit: '現金', explanation: '建物の購入は資産の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '固定資産' },
  { id: 'fixed-003', question: '土地￥{amount}を現金で購入した。', debit: '土地', credit: '現金', explanation: '土地の購入は資産の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '固定資産' },
  { id: 'fixed-004', question: '車両運搬具￥{amount}を現金で購入した。', debit: '車両運搬具', credit: '現金', explanation: '車両の購入は資産の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '固定資産' },
  { id: 'fixed-005', question: '備品￥{amount}を掛けで購入した。', debit: '備品', credit: '買掛金', explanation: '備品の掛け購入は備品（資産）の増加と買掛金（負債）の増加。', category: '固定資産' },

  // === 前払・前受・未払・未収 ===
  { id: 'accrual-001', question: '翌期分の家賃￥{amount}を現金で前払いした。', debit: '前払費用', credit: '現金', explanation: '前払家賃は前払費用（資産）の増加と現金の減少。', category: '前払・前受' },
  { id: 'accrual-002', question: '商品￥{amount}の注文を受け、手付金として現金を受け取った。', debit: '現金', credit: '前受金', explanation: '手付金は前受金（負債）の増加。現金の増加（借方）、前受金の増加（貸方）。', category: '前払・前受' },
  { id: 'accrual-003', question: '前払費用￥{amount}のうち、当期分を費用に振り替えた。', debit: '支払家賃', credit: '前払費用', explanation: '前払費用の当期消費は費用の増加と前払費用の減少。※支払家賃は雑費等で代用可', category: '前払・前受', amountOptions: [10000, 50000, 100000] },
  { id: 'accrual-004', question: '前受金￥{amount}のうち、当期の売上に振り替えた。', debit: '前受金', credit: '売上', explanation: '前受金の当期収益計上は前受金の減少と売上の増加。', category: '前払・前受' },
  { id: 'accrual-005', question: '期末において、未払の給料￥{amount}を計上した。', debit: '給料', credit: '未払費用', explanation: '未払給料は給料（費用）の増加と未払費用（負債）の増加。', category: '未払・未収' },
  { id: 'accrual-006', question: '期末において、未収の受取手数料￥{amount}を計上した。', debit: '未収収益', credit: '受取手数料', explanation: '未収収益は未収収益（資産）の増加と受取手数料（収益）の増加。', category: '未払・未収' },
  { id: 'accrual-007', question: '期末において、前受けの受取手数料￥{amount}を計上した。', debit: '受取手数料', credit: '前受収益', explanation: '前受収益の当期計上は受取手数料の減少と前受収益の減少。', category: '未払・未収' },
  { id: 'accrual-008', question: '期末において、前払いの保険料￥{amount}を計上した。', debit: '支払保険料', credit: '前払費用', explanation: '前払保険料の当期消費は保険料（費用）の増加と前払費用の減少。※支払保険料は雑費で代用', category: '未払・未収', amountOptions: [10000, 20000, 50000] },

  // === 商品売買（三分法） ===
  { id: 'inventory-001', question: '期首の繰越商品￥{amount}を仕訳した。', debit: '繰越商品', credit: '仕入', explanation: '期首商品の繰越。繰越商品（資産）の増加、仕入（費用）の減少（貸方）。', category: '商品売買' },
  { id: 'inventory-002', question: '期末の商品棚卸高￥{amount}を仕訳した。', debit: '仕入', credit: '繰越商品', explanation: '期末商品の繰越。仕入（費用）の減少（借方）、繰越商品（資産）の増加。', category: '商品売買' },
  { id: 'inventory-003', question: '商品￥{amount}を現金で仕入れた。', debit: '仕入', credit: '現金', explanation: '商品の仕入は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '商品売買', amountOptions: [20000, 50000, 100000] },

  // === 貸倒れ ===
  { id: 'bad-debt-001', question: '売掛金￥{amount}が回収不能となり、貸倒れとして処理した。', debit: '貸倒損失', credit: '売掛金', explanation: '貸倒れは貸倒損失（費用）の増加と売掛金（資産）の減少。', category: '貸倒れ' },
  { id: 'bad-debt-002', question: '貸倒引当金を設定している場合、売掛金￥{amount}が貸倒れとなった。', debit: '貸倒引当金', credit: '売掛金', explanation: '貸倒引当金設定時は貸倒引当金の取り崩しと売掛金の減少。', category: '貸倒れ' },
  { id: 'bad-debt-003', question: '期末において、貸倒引当金を売掛金の￥{amount}に対して計上した。', debit: '貸倒引当金繰入', credit: '貸倒引当金', explanation: '貸倒引当金の設定は貸倒引当金繰入（費用）と貸倒引当金（負債的評価勘定）の増加。', category: '貸倒れ', amountOptions: [5000, 10000, 20000] },

  // === 減価償却 ===
  { id: 'depreciation-001', question: '備品について、減価償却費￥{amount}を計上した。', debit: '減価償却費', credit: '備品', explanation: '直接法：減価償却費（費用）の増加と備品（資産）の減少。', category: '減価償却' },
  { id: 'depreciation-002', question: '備品について、減価償却費￥{amount}を計上した（間接法）。', debit: '減価償却費', credit: '減価償却累計額', explanation: '間接法：減価償却費（費用）の増加と減価償却累計額（備品の contra）の増加。', category: '減価償却' },
  { id: 'depreciation-003', question: '建物について、減価償却費￥{amount}を計上した。', debit: '減価償却費', credit: '建物', explanation: '直接法による建物の減価償却。', category: '減価償却' },

  // === 受取利息・支払利息 ===
  { id: 'interest-001', question: '貸付金の利息￥{amount}を現金で受け取った。', debit: '現金', credit: '受取利息', explanation: '受取利息は収益の増加。現金の増加（借方）、受取利息の増加（貸方）。', category: '利息' },
  { id: 'interest-002', question: '借入金の利息￥{amount}を現金で支払った。', debit: '支払利息', credit: '現金', explanation: '支払利息は費用の増加（借方）、現金の支払いは資産の減少（貸方）。', category: '利息' },
  { id: 'interest-003', question: '当座預金の利息￥{amount}が当座預金に振り込まれた。', debit: '当座預金', credit: '受取利息', explanation: '預金利息は当座預金の増加と受取利息の増加。', category: '利息', amountOptions: [100, 500, 1000, 2000, 5000] },

  // === 手数料 ===
  { id: 'fee-001', question: '銀行の振込手数料￥{amount}を当座預金から支払った。', debit: '支払手数料', credit: '当座預金', explanation: '支払手数料は費用の増加（借方）、当座預金の減少（貸方）。', category: '手数料', amountOptions: [100, 200, 300, 500] },
  { id: 'fee-002', question: '手形の割引料￥{amount}を支払った。', debit: '支払手数料', credit: '現金', explanation: '割引料は支払手数料（費用）として計上。', category: '手数料', amountOptions: [500, 1000, 2000, 5000] },

  // === その他 ===
  { id: 'other-001', question: '商品￥{amount}を当座預金で仕入れた。', debit: '仕入', credit: '当座預金', explanation: '当座預金での仕入。仕入（費用）の増加と当座預金（資産）の減少。', category: 'その他', amountOptions: [50000, 100000, 200000] },
  { id: 'other-002', question: '資本金￥{amount}を当座預金に預け入れて開業した。', debit: '当座預金', credit: '資本金', explanation: '開業時の元入れ。当座預金の増加と資本金の増加。', category: 'その他' },
  { id: 'other-003', question: '受取配当金￥{amount}を普通預金に振り込まれた。', debit: '普通預金', credit: '受取配当金', explanation: '受取配当金は収益の増加。普通預金の増加（借方）、受取配当金の増加（貸方）。', category: 'その他', amountOptions: [5000, 10000, 20000, 50000] },
  { id: 'other-004', question: '未払金￥{amount}を現金で支払った。', debit: '未払金', credit: '現金', explanation: '未払金の支払いは負債の減少（借方）、現金の減少（貸方）。', category: 'その他' },
  { id: 'other-005', question: '商品￥{amount}を仕入れ、代金は買掛金とした。', debit: '仕入', credit: '買掛金', explanation: '掛け仕入。仕入（費用）の増加と買掛金（負債）の増加。', category: 'その他' },

  // === 追加パターン（問題数増強） ===
  { id: 'extra-001', question: '商品￥{amount}を普通預金で売り上げ、代金は普通預金に振り込まれた。', debit: '普通預金', credit: '売上', explanation: '普通預金での売上。普通預金の増加と売上の増加。', category: '現金取引' },
  { id: 'extra-002', question: '前払金￥{amount}を現金で支払った。', debit: '前払金', credit: '現金', explanation: '前払金は資産の増加（借方）、現金の減少（貸方）。', category: '現金取引' },
  { id: 'extra-003', question: '前払金￥{amount}の商品を受け取り、前払金を仕入に振り替えた。', debit: '仕入', credit: '前払金', explanation: '前払金の商品受取。仕入の増加と前払金の減少。', category: '掛取引' },
  { id: 'extra-004', question: '前受金￥{amount}の商品を納品し、前受金を売上に振り替えた。', debit: '前受金', credit: '売上', explanation: '前受金の商品納品。前受金の減少と売上の増加。', category: '掛取引' },
  { id: 'extra-005', question: '備品￥{amount}を普通預金で購入した。', debit: '備品', credit: '普通預金', explanation: '備品の購入は資産の増加、普通預金の支払いは資産の減少。', category: '固定資産' },
  { id: 'extra-006', question: '建物￥{amount}を掛けで購入した。', debit: '建物', credit: '買掛金', explanation: '建物の掛け購入。建物（資産）の増加と買掛金（負債）の増加。', category: '固定資産' },
  { id: 'extra-007', question: '車両運搬具￥{amount}を掛けで購入した。', debit: '車両運搬具', credit: '買掛金', explanation: '車両の掛け購入。車両運搬具（資産）の増加と買掛金（負債）の増加。', category: '固定資産' },
  { id: 'extra-008', question: '土地￥{amount}を普通預金で購入した。', debit: '土地', credit: '普通預金', explanation: '土地の購入は資産の増加、普通預金の支払いは資産の減少。', category: '固定資産' },
  { id: 'extra-009', question: '期末において、未払の通信費￥{amount}を計上した。', debit: '通信費', credit: '未払費用', explanation: '未払通信費は通信費（費用）の増加と未払費用（負債）の増加。', category: '未払・未収' },
  { id: 'extra-010', question: '期末において、未払の旅費交通費￥{amount}を計上した。', debit: '旅費交通費', credit: '未払費用', explanation: '未払旅費は旅費交通費（費用）の増加と未払費用（負債）の増加。', category: '未払・未収' },
  { id: 'extra-011', question: '受取手形￥{amount}を裏書譲渡し、買掛金の支払いに充てた。', debit: '買掛金', credit: '受取手形', explanation: '手形の裏書譲渡。買掛金の減少と受取手形の減少。', category: '手形取引' },
  { id: 'extra-012', question: '車両運搬具について、減価償却費￥{amount}を計上した。', debit: '減価償却費', credit: '車両運搬具', explanation: '直接法による車両の減価償却。', category: '減価償却' },
  { id: 'extra-013', question: '建物について、減価償却費￥{amount}を計上した（間接法）。', debit: '減価償却費', credit: '減価償却累計額', explanation: '間接法による建物の減価償却。', category: '減価償却' },
  { id: 'extra-014', question: '普通預金から現金￥{amount}を引き出した。', debit: '現金', credit: '普通預金', explanation: '預金からの引出は資産同士の振替。', category: '現金取引' },
  { id: 'extra-015', question: '当座預金に現金￥{amount}を預け入れた。', debit: '当座預金', credit: '現金', explanation: '現金の預入は当座預金の増加と現金の減少。', category: '現金取引' },
  { id: 'extra-016', question: '受取手形￥{amount}を現金で割り引いた（簡略法）。', debit: '現金', credit: '受取手形', explanation: '手形割引の簡略法。受取手形の減少と現金の増加。', category: '手形取引', amountOptions: [50000, 100000, 200000] },
  { id: 'extra-017', question: '買掛金￥{amount}を小切手を振り出して支払った。', debit: '買掛金', credit: '当座預金', explanation: '小切手振出は当座預金の減少。買掛金の減少と当座預金の減少。', category: '手形取引' },
  { id: 'extra-018', question: '売掛金￥{amount}を小切手で回収した。', debit: '当座預金', credit: '売掛金', explanation: '小切手での回収は当座預金の増加と売掛金の減少。', category: '手形取引' },
  { id: 'extra-019', question: '商品￥{amount}を現金で仕入れ、支払運賃は仕入に含めて計上した。', debit: '仕入', credit: '現金', explanation: '仕入に運賃を含める場合。仕入（費用）の増加と現金の減少。', category: '商品売買', amountOptions: [25000, 55000, 105000] },
  { id: 'extra-020', question: '繰越利益剰余金￥{amount}を資本金に振り替えた。', debit: '繰越利益剰余金', credit: '資本金', explanation: '利益の資本金への組み入れ。繰越利益剰余金の減少と資本金の増加。', category: 'その他', amountOptions: [100000, 500000, 1000000] },
]
