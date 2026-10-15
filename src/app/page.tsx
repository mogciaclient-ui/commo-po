import Link from "next/link";

export default function Home() {
  return <main className="site-shell landing-page">
    <header className="topbar">
      <Link className="brand" href="/"><span className="brand-mark">C</span><span>commo <b>po</b></span></Link>
      <nav className="top-nav"><Link href="/chat">チャット体験</Link><Link href="/menu-ideas">活用アイデア</Link><Link href="/guide">用語ガイド</Link><Link href="/analytics">分析デモ</Link></nav>
    </header>
    <section className="hero landing-hero">
      <div className="hero-copy"><p className="eyebrow"><span /> POLITICAL COMMUNICATION</p><h1>地域の声と、<br /><em>もっと近くに。</em></h1><p className="hero-lead">LINEを活用した政治・地域活動の情報発信を、実際の操作に近い画面で疑似体験できます。</p></div>
      <div className="hero-aside"><div className="quote-mark">“</div><p>一方的な発信から、<br />声が届くコミュニケーションへ。</p></div>
    </section>
    <section className="route-choices">
      <Link href="/chat" className="route-card primary-route"><span>01 / EXPERIENCE</span><h2>チャット体験</h2><p>友だち追加、アンケート、回答後のお礼、活動レポートまでをスマートフォン画面で体験。</p><b>体験をはじめる →</b></Link>
      <Link href="/guide" className="route-card"><span>02 / GUIDE</span><h2>用語ガイド</h2><p>LINE公式アカウント、リッチメニュー、アンケート、LINEミニページを簡潔に解説。</p><b>ガイドを見る →</b></Link>
      <Link href="/menu-ideas" className="route-card ideas-route"><span>03 / IDEAS</span><h2>活用アイデア</h2><p>リッチメニュー33項目と、選挙前・選挙中・選挙後のコンテンツ案を一覧で確認。</p><b>アイデアを見る →</b></Link>
      <Link href="/analytics" className="route-card analytics-route"><span>04 / ANALYTICS</span><h2>分析デモ</h2><p>アンケート回答を地域・年代・テーマ別に分析し、AI配信文の作成まで体験。</p><b>分析画面を見る →</b></Link>
    </section>
  </main>;
}
