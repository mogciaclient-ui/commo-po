"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  ["01", "プロフィール", "経歴・自己紹介・人物紹介"], ["02", "ホームページ", "公式サイト・詳しい活動情報"], ["03", "公式SNS", "Instagram・X・YouTubeなど"],
  ["04", "アクセス情報", "事務所の所在地・地図・連絡先"], ["05", "政策・公約", "重点政策や公約の一覧"], ["06", "活動報告", "日々の活動内容"],
  ["07", "活動スケジュール", "街頭活動・イベント日程"], ["08", "まちの声", "地域の意見を送るフォーム"], ["09", "LINE限定特典", "登録者限定の資料・動画"],
  ["10", "お知らせ", "最新のお知らせ一覧"], ["11", "議会レポート", "議会での質問・答弁"], ["12", "政策の進捗", "公約・政策の取り組み状況"],
  ["13", "アンケート", "地域課題について回答"], ["14", "よくある質問", "FAQ・自動応答"], ["15", "お問い合わせ", "質問や連絡を送信"],
  ["16", "動画メッセージ", "本人のメッセージ動画"], ["17", "ニュースレター", "月刊活動レポート"], ["18", "地域イベント", "地域のイベント情報"],
  ["19", "まちの課題マップ", "地域の課題を地図で確認"], ["20", "意見募集", "特定のテーマへの意見提出"], ["21", "活動写真", "写真ギャラリー"],
  ["22", "政策解説BOOK", "政策をまとめたPDF"], ["23", "選挙情報", "選挙日程や制度の案内"], ["24", "投票ガイド", "投票所・投票方法の公的案内"],
  ["25", "議会報告会", "開催日・参加方法"], ["26", "活動ダイジェスト", "1週間・1か月の活動まとめ"], ["27", "地域ニュース", "地域に関する情報"],
  ["28", "防災・暮らし情報", "公的機関の防災情報"], ["29", "政策Q&A", "政策についての質問と回答"], ["30", "まちづくり提案", "地域改善アイデアの投稿"],
  ["31", "アンケート結果", "住民意見の集計結果"], ["32", "取り組み実績", "これまでの活動実績"], ["33", "友だち限定動画", "LINE登録者向けコンテンツ"],
] as const;

const phaseData = {
  before: { label: "選挙前", number: "01", theme: "人物紹介・地域課題・政策を知る", items: [
    ["プロフィールBOOK", "経歴・これまでの活動をまとめたPDF"], ["政策まるわかりBOOK", "重点政策を図解した限定資料"], ["限定インタビュー", "政治を志した経緯などの動画"], ["まちの未来MAP", "地域課題と取り組み案を地図で紹介"], ["5分でわかる政策動画", "政策の概要を短い動画で解説"], ["活動フォトブック", "これまでの地域活動を写真で紹介"], ["地域課題レポート", "人口・交通・子育てなどのデータ資料"], ["政策Q&A集", "よくある疑問への回答集"], ["公開イベント資料", "説明会などで使用した資料を配布"], ["まちの声レポート", "寄せられた意見の匿名集計結果"],
  ]},
  during: { label: "選挙中", number: "02", theme: "公開情報へのアクセス・選挙制度の理解", items: [
    ["選挙公報ガイド", "公的な選挙公報へのリンク集"], ["投票方法ガイド", "投票の流れを図解したPDF"], ["期日前投票ガイド", "期日前投票の制度と確認方法"], ["投票所検索ガイド", "自治体の投票所案内へのリンク"], ["選挙制度Q&A", "投票資格・投票方法などのFAQ"], ["政策比較ワークシート", "各候補の公表政策を整理できるシート"], ["公開討論会アーカイブ", "公開された討論会の視聴案内"], ["選挙日程カレンダー", "公示・告示日や投票日を確認"], ["用語解説BOOK", "比例代表・小選挙区などを解説"], ["選挙情報リンク集", "選挙管理委員会などの公式情報"],
  ]},
  after: { label: "選挙後", number: "03", theme: "活動の可視化・議会報告・継続的な情報提供", items: [
    ["月刊活動レポート", "1か月の活動をまとめたPDF"], ["議会質問まとめBOOK", "議会での質問・答弁を紹介"], ["政策進捗レポート", "公表した政策の進捗を可視化"], ["議会の裏側解説", "議会の仕組みを紹介する動画"], ["活動ダイジェスト動画", "1か月の活動を短くまとめた動画"], ["まちの声・結果報告", "アンケート結果や対応状況"], ["地域課題の改善レポート", "地域課題への対応状況を紹介"], ["議会ニュース解説", "議案・予算・議決結果を解説"], ["月刊フォトレポート", "地域活動の写真と解説"], ["年間活動BOOK", "1年間の取り組みをまとめた資料"],
  ]},
} as const;

const miniPageIdeas = [
  { number: "01", tag: "定期発信", title: "月刊活動レポート", description: "1か月の議会活動、地域訪問、今後の予定を写真と数字で紹介。", contents: ["今月の活動", "まちの声への対応", "来月の予定"] },
  { number: "02", tag: "人物紹介", title: "プロフィールページ", description: "経歴だけでなく、政治を志した理由や大切にしている考えを伝える。", contents: ["経歴・略歴", "本人メッセージ", "活動写真"] },
  { number: "03", tag: "政策", title: "重点政策ページ", description: "重点政策をテーマごとに整理し、課題・提案・目指す未来を図解。", contents: ["地域の課題", "政策の内容", "実現までの道筋"] },
  { number: "04", tag: "活動報告", title: "議会レポート", description: "議会での質問や答弁、議案への考え方を分かりやすくまとめる。", contents: ["質問の要点", "行政の回答", "次のアクション"] },
  { number: "05", tag: "イベント", title: "イベント案内ページ", description: "対話会や報告会の日程、会場、参加方法をひとつのページに掲載。", contents: ["日時・会場", "当日の内容", "参加方法"] },
  { number: "06", tag: "地域の声", title: "アンケート結果ページ", description: "寄せられた回答をグラフや要点で紹介し、その後の対応も報告。", contents: ["回答結果", "主なご意見", "今後の対応"] },
  { number: "07", tag: "実績", title: "政策進捗ページ", description: "公表した政策ごとに、現在地と具体的な取り組み状況を見える化。", contents: ["進捗ステータス", "これまでの成果", "次の目標"] },
  { number: "08", tag: "地域情報", title: "防災・暮らし情報", description: "防災、支援制度、相談窓口など、日常に役立つ公的情報を整理。", contents: ["緊急時の案内", "行政サービス", "公式リンク"] },
  { number: "09", tag: "地域課題", title: "まちの課題マップ", description: "交通、公園、防災などの地域課題を場所と一緒に紹介する。", contents: ["課題の場所", "現地写真", "対応状況"] },
  { number: "10", tag: "動画", title: "動画メッセージページ", description: "本人の短い動画と、要点をまとめた文章をセットで届ける。", contents: ["メッセージ動画", "内容の要約", "関連情報"] },
  { number: "11", tag: "限定配信", title: "友だち限定資料ページ", description: "政策BOOKや活動資料など、LINE登録者向けコンテンツをまとめる。", contents: ["限定PDF", "解説動画", "バックナンバー"] },
  { number: "12", tag: "参加", title: "まちづくり提案ページ", description: "地域改善のアイデアを募集し、投稿まで迷わず進めるよう案内。", contents: ["募集テーマ", "提案の例", "投稿フォーム"] },
] as const;

type Phase = keyof typeof phaseData;

export default function MenuIdeasPage() {
  const [phase, setPhase] = useState<Phase>("before");
  const active = phaseData[phase];

  return <main className="ideas-page">
    <header className="topbar ideas-topbar"><Link className="brand" href="/"><span className="brand-mark">C</span><span>commo <b>po</b></span></Link><nav className="top-nav"><Link href="/chat">チャット体験</Link><Link href="/menu-ideas" aria-current="page">活用アイデア</Link><Link href="/guide">用語ガイド</Link><Link href="/analytics">分析デモ</Link></nav></header>
    <section className="ideas-section">
      <div className="ideas-section-head"><div><p>01 / MENU IDEAS</p><h2>目的から選べる<br/>メニューアイデア</h2></div></div>
      <div className="ideas-table-head"><span>No.</span><span>メニュー名</span><span>タップしたときの内容</span></div>
      <div className="ideas-list">{menuItems.map(([number, name, description]) => <article key={number}><span>{number}</span><h3>{name}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="phase-section"><div className="phase-intro"><p>02 / CONTENT IDEAS</p><h2>時期に合わせた<br/>限定コンテンツ案</h2><small>選挙の前・期間中・その後で、知りたい情報や届け方は変わります。</small></div><div className="phase-content">
      <div className="phase-tabs" role="tablist" aria-label="時期を選択">{(Object.keys(phaseData) as Phase[]).map((key) => <button key={key} role="tab" aria-selected={phase === key} onClick={() => setPhase(key)}><span>{phaseData[key].number}</span>{phaseData[key].label}</button>)}</div>
      <div className="phase-heading"><span>{active.label}のテーマ</span><h3>{active.theme}</h3></div>
      <div className="phase-grid">{active.items.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><h4>{name}</h4><p>{description}</p></div></article>)}</div>
      {phase === "during" && <aside className="election-note"><b>選挙中の考え方</b><p>特定候補への投票を条件とする特典や、投票行動への見返りになるものを避け、誰でも確認できる公的情報を中心にする構成が扱いやすいです。</p></aside>}
    </div></section>
    <section className="mini-ideas-section">
      <div className="mini-ideas-head"><div><p>03 / LINE MINI PAGE</p><h2>LINEミニページ案</h2></div><p>メッセージだけでは伝えきれない情報を、写真・図・文章で読みやすくまとめるページです。</p></div>
      <div className="mini-ideas-grid">{miniPageIdeas.map((idea) => <article key={idea.number}><div className="mini-idea-meta"><span>{idea.number}</span><small>{idea.tag}</small></div><h3>{idea.title}</h3><p>{idea.description}</p><div>{idea.contents.map((content) => <span key={content}>{content}</span>)}</div></article>)}</div>
    </section>
    <section className="ideas-cta"><div><p>実際の見え方も確認できます</p><h2>山田 太郎 公式LINEの<br/>デモ画面へ</h2></div><Link href="/chat">チャット体験を開く →</Link></section>
  </main>;
}
