"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

const regions = ["全地域", "青葉地区", "中央地区", "西部地区"] as const;
const ages = ["全年代", "20〜39歳", "40〜59歳", "60歳以上"] as const;
const genders = ["すべて", "女性", "男性", "回答しない・その他"] as const;
const baseTopics = [
  { name: "子育て・教育", value: 72, color: "#1d78d4" },
  { name: "防災・防犯", value: 64, color: "#4f94d6" },
  { name: "交通・移動", value: 58, color: "#75abe0" },
  { name: "医療・福祉", value: 47, color: "#9ac3e8" },
  { name: "地域経済", value: 35, color: "#bdd8ef" },
] as const;

export default function AnalyticsPage() {
  const [region, setRegion] = useState<(typeof regions)[number]>("全地域");
  const [age, setAge] = useState<(typeof ages)[number]>("全年代");
  const [gender, setGender] = useState<(typeof genders)[number]>("すべて");
  const [draftType, setDraftType] = useState("活動報告");

  const report = useMemo(() => {
    const regionIndex = regions.indexOf(region);
    const ageIndex = ages.indexOf(age);
    const genderIndex = genders.indexOf(gender);
    const count = Math.max(86, 1248 - regionIndex * 213 - ageIndex * 126 - genderIndex * 74);
    const adjustments = [ageIndex * 2, regionIndex * 4, genderIndex * 2, ageIndex * 4, regionIndex * 2];
    const topics = baseTopics.map((topic, index) => ({ ...topic, value: Math.min(92, Math.max(18, topic.value + adjustments[index] - (regionIndex + genderIndex) * (index % 2))) })).toSorted((a, b) => b.value - a.value);
    return { count, topics, responseRate: Math.max(31, 64 - regionIndex * 5 - ageIndex * 3), eventIntent: Math.min(68, 36 + ageIndex * 5 + regionIndex * 2) };
  }, [region, age, gender]);

  const target = `${region}・${age}・${gender}`;
  const topTopic = report.topics[0].name;

  return <main className="analytics-page">
    <header className="topbar analytics-topbar"><Link className="brand" href="/"><span className="brand-mark">C</span><span>commo <b>po</b></span></Link><nav className="top-nav"><Link href="/chat">チャット体験</Link><Link href="/menu-ideas">活用アイデア</Link><Link href="/guide">用語ガイド</Link><Link href="/analytics" aria-current="page">分析デモ</Link></nav></header>
    <div className="analytics-shell">
      <div className="analytics-main">
        <section className="analytics-filters" aria-label="分析条件"><label>居住地域<select value={region} onChange={(event) => setRegion(event.target.value as (typeof regions)[number])}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label><label>年代<select value={age} onChange={(event) => setAge(event.target.value as (typeof ages)[number])}>{ages.map((item) => <option key={item}>{item}</option>)}</select></label><label>性別<select value={gender} onChange={(event) => setGender(event.target.value as (typeof genders)[number])}>{genders.map((item) => <option key={item}>{item}</option>)}</select></label></section>

        <section className="analytics-kpis" id="summary"><article><small>回答数</small><b>{report.count.toLocaleString()}<i>件</i></b><span>選択条件での集計</span></article><article><small>回答率</small><b>{report.responseRate}<i>%</i></b><span>前月比 +4.2pt</span></article><article><small>参加意向</small><b>{report.eventIntent}<i>%</i></b><span>活動・イベントへの関心</span></article><article><small>最多関心</small><strong>{topTopic}</strong><span>回答テーマの第1位</span></article></section>

        <div className="analytics-grid" id="themes">
          <section className="dashboard-card topic-card"><div className="dashboard-card-head"><div><small>INTEREST THEMES</small><h3>関心のある政策分野</h3></div><span>複数回答</span></div><div className="topic-bars">{report.topics.map((topic) => <div key={topic.name}><p><span>{topic.name}</span><b>{topic.value}%</b></p><i><span style={{ width: `${topic.value}%`, background: topic.color }}/></i></div>)}</div></section>
          <section className="dashboard-card segment-card"><div className="dashboard-card-head"><div><small>SEGMENTS</small><h3>回答者の構成</h3></div></div><div className="donut" style={{ "--value": `${report.responseRate * 3.6}deg` } as CSSProperties}><div><b>{report.responseRate}%</b><span>継続配信を希望</span></div></div><ul><li><span className="blue-dot"/>暮らし情報を希望 <b>42%</b></li><li><span className="mid-dot"/>活動報告を希望 <b>34%</b></li><li><span className="light-dot"/>イベント情報を希望 <b>24%</b></li></ul></section>
        </div>

        <section className="dashboard-card ai-insights" id="insights"><div className="ai-title"><span>AI</span><div><small>AI ANALYSIS</small><h3>次の活動への提案</h3></div><time>更新：デモ表示</time></div><div className="insight-grid"><article><span>01</span><div><b>{topTopic}への関心が高まっています</b><p>{target}では、関連する回答が多く見られます。次回の配信で取り組み状況を紹介するのがおすすめです。</p></div></article><article><span>02</span><div><b>地域別の説明会を検討</b><p>自由意見では「具体的な進捗を知りたい」という声が増えています。少人数の対話会につなげられます。</p></div></article><article><span>03</span><div><b>未回答の質問をまとめて案内</b><p>似た質問をFAQとして整理し、LINEミニページで公開すると継続的な案内に活用できます。</p></div></article></div></section>

        <section className="message-builder" id="message"><div className="message-settings"><p>AI MESSAGE DRAFT</p><h3>配信文の下書きを作成</h3><small>分析結果と確定済み情報をもとに、確認・編集できる文章案を表示します。</small><fieldset><legend>配信目的</legend>{["活動報告", "政策説明", "イベント案内", "アンケート依頼"].map((item) => <button type="button" className={draftType === item ? "selected" : ""} onClick={() => setDraftType(item)} key={item}>{item}</button>)}</fieldset><dl><div><dt>対象</dt><dd>{target}</dd></div><div><dt>テーマ</dt><dd>{topTopic}</dd></div><div><dt>トーン</dt><dd>丁寧で親しみやすい</dd></div></dl></div><div className="message-preview"><div><span>AIによる下書き</span><small>送信前に必ず内容を確認</small></div><p>こんにちは、山田太郎事務所です。<br/><br/>アンケートでは、{region === "全地域" ? "地域の皆さま" : region + "の皆さま"}から「{topTopic}」について多くの声をいただきました。<br/><br/>{draftType}として、現在の取り組みと今後の予定を分かりやすくまとめました。ぜひご覧ください。</p><button type="button">内容をコピー</button></div></section>
        <aside className="privacy-panel"><b>集計・配信に関する考え方</b><p>個人が特定されない集計単位で表示し、回答数が少ない分類は非表示にします。このデモでは、個人の支持傾向や投票行動の予測は行いません。</p></aside>
      </div>
    </div>
  </main>;
}
