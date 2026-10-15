import Link from "next/link";

const items = [
  ["01", "LINE公式アカウントとは？", "支援者や地域の方へ、情報を直接届けられる公式の発信窓口です。普段使っているLINEに届くため、見てもらいやすいのが特長です。", "一斉配信・個別チャット・自動応答"],
  ["02", "リッチメニューとは？", "トーク画面の下に表示する大きなメニューです。政策、プロフィール、活動予定など、見てほしい情報へ迷わず案内できます。", "後から追加・いつでも変更可能"],
  ["03", "アンケートとは？", "地域の課題や関心ごとを、スマートフォンで気軽に回答してもらう仕組みです。双方向のコミュニケーションを生み出します。", "関心に合わせた情報発信にも活用"],
  ["04", "LINEミニページとは？", "LINEのメッセージから開ける、スマートフォン向けの小さなWebページです。月次報告や政策紹介を、写真や図と一緒に読みやすく届けられます。", "URLを見せず自然にページへ案内"],
  ["05", "アンケート分析とは？", "回答を地域・年代・関心テーマ別などに集計し、住民の声の傾向や変化を把握する仕組みです。", "分析結果からAIが配信文の下書きを作成"],
];

export default function GuidePage() {
  return <main className="guide-page">
    <header className="topbar dark-topbar"><Link className="brand footer-brand" href="/"><span className="brand-mark">C</span><span>commo <b>po</b></span></Link><nav className="top-nav"><Link href="/chat">チャット体験</Link><Link href="/menu-ideas">活用アイデア</Link><Link href="/guide" aria-current="page">用語ガイド</Link><Link href="/analytics">分析デモ</Link></nav></header>
    <section className="guide-page-head"><h1>LINE活用の基本</h1></section>
    <section className="standalone-guide">{items.map(([number, title, description, note]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{description}</p><small>{note}</small></div></article>)}</section>
    <section className="analysis-guide"><div className="analysis-guide-title"><span>05 / ANALYTICS</span><h2>アンケートから、<br/>次の配信まで。</h2><p>回答を集計・分類し、地域の傾向を確認。分析結果に合わせてAIが配信文の下書きを作ります。</p></div><div className="analysis-guide-body"><article><span>アンケート項目</span><ul><li>居住地域</li><li>年代・性別</li><li>関心のある政策分野</li><li>地域で困っていること</li><li>活動・イベントへの参加意向</li><li>受け取りたい情報・自由意見</li></ul></article><article><span>分析できること</span><ul><li>地域・年代・テーマ別の傾向</li><li>自由意見の分類と頻出テーマ</li><li>週・月単位の変化</li><li>配信・イベントの反応</li><li>未回答や対応漏れの確認</li><li>AIによる次の活動提案</li></ul></article><article><span>AI配信文</span><ul><li>政策説明・活動報告</li><li>街頭演説・集会の案内</li><li>アンケート依頼</li><li>行政・地域情報</li><li>質問への回答</li><li>LINE向けの要約・文体調整</li></ul></article></div><Link className="analysis-demo-link" href="/analytics">分析画面のデモを見る →</Link></section>
    <div className="guide-cta"><p>実際の流れを見てみましょう</p><Link href="/chat">チャット体験を開く →</Link></div>
  </main>;
}
