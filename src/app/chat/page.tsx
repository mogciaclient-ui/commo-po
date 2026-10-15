"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, ReactNode, useState } from "react";

type Screen = "chat" | "survey" | "thanks" | "monthly";
type ChatStage = "welcome" | "completed";

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, ReactNode> = {
    back:<path d="m15 18-6-6 6-6"/>, reset:<><path d="M20 12a8 8 0 1 1-2.34-5.66L20 8"/><path d="M20 3v5h-5"/></>, arrow:<><path d="M5 12h14M13 6l6 6-6 6"/></>, check:<path d="m5 12 4 4L19 6"/>, calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>, pin:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>, building:<><path d="M4 21V5l8-3 8 3v16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h6"/></>
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

export default function ChatPage(){
  const [screen,setScreen]=useState<Screen>("chat"); const [stage,setStage]=useState<ChatStage>("welcome");
  const reset=()=>{setScreen("chat");setStage("welcome")};
  return <main className="experience-page">
    <header className="experience-header"><Link className="brand" href="/"><span className="brand-mark">C</span><span>commo <b>po</b></span></Link><div className="experience-title"><small>INTERACTIVE DEMO</small><b>チャット体験</b></div><nav><Link href="/menu-ideas">活用アイデア</Link><Link href="/guide">用語ガイド</Link><Link href="/analytics">分析デモ</Link><button onClick={reset}><Icon name="reset" size={15}/>最初から</button></nav></header>
    <section className="experience-layout">
      <aside className="presenter-panel"><p className="eyebrow"><span/> EXPERIENCE FLOW</p><h1>LINEでつながり、<br/>声を聞き、届ける。</h1><p className="presenter-lead">右の画面を操作しながら、友だち追加後のコミュニケーションをご体験ください。</p>
        <ol className="journey-list compact"><li className={screen==="chat"&&stage==="welcome"?"active":""}><span>01</span><div><b>友だち追加</b><p>あいさつとアンケートをご案内</p></div></li><li className={screen==="survey"||screen==="thanks"?"active":""}><span>02</span><div><b>地域の声を聞く</b><p>約3分のアンケートに回答</p></div></li><li className={stage==="completed"||screen==="monthly"?"active":""}><span>03</span><div><b>次の情報を届ける</b><p>お礼、イベント、活動レポート</p></div></li></ol>
        <div className="speaker-note"><b>説明ポイント</b><p>{screen==="monthly"?"メッセージだけでは伝えきれない内容を、読みやすい専用ページにまとめられます。":screen==="survey"||screen==="thanks"?"LINEから離れた印象を与えず、スマートフォンで回答が完結します。":"友だち追加直後に、まず知ってほしい情報やアンケートへ自然に案内できます。"}</p></div>
      </aside>
      <div className="experience-stage"><div className="phone"><div className="phone-speaker"/><div className="phone-screen">
        {screen==="chat"&&<ChatScreen stage={stage} openSurvey={()=>setScreen("survey")} openMonthly={()=>setScreen("monthly")}/>} {screen==="survey"&&<SurveyScreen onBack={()=>setScreen("chat")} onSubmit={(e)=>{e.preventDefault();setScreen("thanks")}}/>} {screen==="thanks"&&<ThanksScreen onReturn={()=>{setStage("completed");setScreen("chat")}}/>} {screen==="monthly"&&<MonthlyScreen onBack={()=>setScreen("chat")}/>} 
      </div><div className="phone-home"/></div><p className="phone-caption"><span className="pulse-dot"/> 画面内のボタンを押して体験できます</p></div>
    </section>
  </main>;
}

function ChatScreen({stage,openSurvey,openMonthly}:{stage:ChatStage;openSurvey:()=>void;openMonthly:()=>void}){
  const [menuOpen,setMenuOpen]=useState(true);
  return <div className="chat-screen">
    <Status time="9:41"/>
    <div className="line-header"><Icon name="back" size={22}/><div><b>山田 太郎 事務所</b><small>公式アカウント</small></div><span>≡</span></div>
    <div className="chat-body"><div className="date-chip">今日</div>
      <Message><div className="bubble">友だち追加ありがとうございます！<br/><br/>地域の皆さまの声を大切にしながら、活動報告やまちの情報をお届けします。どうぞよろしくお願いいたします。</div></Message>
      <Message><div className="bubble card-bubble"><div className="card-image survey-art"><span>VOICE</span><b>あなたの声を<br/>聞かせてください</b></div><div className="card-copy"><b>まちづくりアンケート</b><p>これからの地域づくりについて、皆さまのご意見をお聞かせください。</p><button onClick={openSurvey}>ここにURL <b>›</b></button></div></div></Message>
      {stage==="completed"&&<><Message><div className="bubble">アンケートへのご回答、ありがとうございました！<br/><br/>いただいた声を、これからの活動に活かしてまいります。</div></Message><Message><div className="bubble card-bubble event-card"><div className="event-date"><span>今月の</span><b>まちかど<br/>対話会</b></div><div className="card-copy"><small>今月のイベント</small><b>山田 太郎と語る会</b><p>10月25日（日）14:00〜<br/>青葉市民センター</p></div></div></Message><Message><div className="bubble card-bubble"><div className="card-image monthly-art"><span>OCTOBER</span><b>10月の活動レポート</b></div><div className="card-copy"><b>今月の活動をご報告します</b><p>議会での取り組み、地域訪問、今後の予定をまとめました。</p><button onClick={openMonthly}>ここにURL <b>›</b></button></div></div></Message></>}
    </div>
    <div className="rich-menu-shell">
      <button className="rich-menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>メニュー {menuOpen?"⌄":"⌃"}</button>
      {menuOpen&&<div className="rich-menu-image"><Image src="/images/rich-menu.png" alt="山田 太郎公式LINE リッチメニュー" width={2500} height={1686}/><button className="report-hotspot" onClick={openMonthly} aria-label="活動報告を開く"/></div>}
    </div>
    {!menuOpen&&<div className="chat-input"><span>＋</span><div>メッセージを入力</div><span>☺</span><span>🎙</span></div>}
  </div>
}
function Message({children}:{children:ReactNode}){return <div className="chat-row"><div className="avatar">山</div><div><span className="sender">山田 太郎 事務所</span>{children}<time>10:02</time></div></div>}
function Status({time}:{time:string}){return <div className="statusbar dark-status"><span>{time}</span><span>● ● ▰</span></div>}
function PhoneHeader({title,subtitle,onBack}:{title:string;subtitle:string;onBack:()=>void}){return <div className="web-header"><button onClick={onBack} aria-label="戻る"><Icon name="back" size={22}/></button><div><b>{title}</b><small>{subtitle}</small></div><span>•••</span></div>}

function SurveyScreen({onBack,onSubmit}:{onBack:()=>void;onSubmit:(e:FormEvent<HTMLFormElement>)=>void}){
  return <div className="web-screen"><Status time="9:43"/><PhoneHeader title="まちづくりアンケート" subtitle="山田 太郎 事務所" onBack={onBack}/><div className="survey-hero"><span>YOUR VOICE</span><h3>あなたの声を、<br/>これからのまちへ。</h3><p>所要時間：約3分</p></div>
    <form className="survey-form" onSubmit={onSubmit}>
      <label className="question"><span><i>01</i> お住まいの地域を教えてください</span><select defaultValue=""><option value="" disabled>選択してください</option><option>青葉地区</option><option>中央地区</option><option>西部地区</option><option>その他の地域</option></select></label>
      <label className="question"><span><i>02</i> 年代を教えてください</span><select defaultValue=""><option value="" disabled>選択してください</option><option>20歳未満</option><option>20〜39歳</option><option>40〜59歳</option><option>60歳以上</option><option>回答しない</option></select></label>
      <fieldset className="question"><legend><i>03</i> 性別を教えてください <small>任意</small></legend><label><input type="radio" name="gender"/> 女性</label><label><input type="radio" name="gender"/> 男性</label><label><input type="radio" name="gender"/> 回答しない・その他</label></fieldset>
      <fieldset className="question"><legend><i>04</i> 関心のある政策分野を教えてください <small>複数選択可</small></legend><label><input type="checkbox"/> 子育て・教育</label><label><input type="checkbox"/> 医療・福祉</label><label><input type="checkbox"/> 防災・防犯</label><label><input type="checkbox"/> 交通・移動</label><label><input type="checkbox"/> 地域経済・雇用</label></fieldset>
      <label className="question"><span><i>05</i> 地域で困っていることを教えてください</span><select defaultValue=""><option value="" disabled>選択してください</option><option>道路・交通</option><option>子育て・教育環境</option><option>医療・介護</option><option>防災・防犯</option><option>地域施設・公園</option><option>特にない</option></select></label>
      <fieldset className="question"><legend><i>06</i> 活動やイベントに参加してみたいですか？</legend><label><input type="radio" name="event"/> 参加してみたい</label><label><input type="radio" name="event"/> 内容によっては参加したい</label><label><input type="radio" name="event"/> オンラインなら参加したい</label><label><input type="radio" name="event"/> 今のところ予定はない</label></fieldset>
      <fieldset className="question"><legend><i>07</i> LINEで受け取りたい情報はありますか？ <small>複数選択可</small></legend><label><input type="checkbox"/> 政策の解説</label><label><input type="checkbox"/> 日々の活動報告</label><label><input type="checkbox"/> 地域イベント</label><label><input type="checkbox"/> 防災・暮らし情報</label><label><input type="checkbox"/> 議会での取り組み</label></fieldset>
      <label className="question"><span><i>08</i> 地域へのご意見をお聞かせください <small>任意</small></span><textarea placeholder="例：公園の照明を増やしてほしい" rows={3}/></label>
      <p className="privacy-note">このデモでは回答内容は保存・送信されません。<br/>実際の分析では個人が特定されない集計単位で表示します。</p><button className="submit-button" type="submit">回答を送信する <Icon name="arrow" size={17}/></button>
    </form>
  </div>;
}
function ThanksScreen({onReturn}:{onReturn:()=>void}){return <div className="thanks-screen"><Status time="9:46"/><div className="thanks-content"><div className="thanks-check"><Icon name="check" size={36}/></div><p className="eyebrow centered"><span/> THANK YOU <span/></p><h3>ご回答<br/>ありがとうございます</h3><p>皆さまからいただく声が、よりよい地域づくりへの第一歩です。</p><div className="thanks-divider"/><small>LINEのトーク画面に<br/>お礼のメッセージをお届けしました。</small><button onClick={onReturn}>LINEに戻る <Icon name="arrow" size={18}/></button></div></div>}

function MonthlyScreen({onBack}:{onBack:()=>void}){return <div className="web-screen mini-page">
  <Status time="9:48"/><PhoneHeader title="山田 太郎 通信" subtitle="LINEミニページ" onBack={onBack}/>
  <div className="mini-cover"><div className="cover-placeholder"><span>IMAGE</span><small>候補者写真が入ります</small></div><div className="mini-cover-shade"/><div className="mini-cover-top"><span>TARO YAMADA REPORT</span><b>2026.10</b></div><p>MONTHLY<br/>ACTIVITY</p><h3>暮らしに寄り添う、<br/>新しい政治へ。</h3><small>山田 太郎 事務所｜活動レポート</small></div>
  <div className="mini-toc"><span>今月のレポート</span><b>議会</b><b>地域</b><b>予定</b></div>
  <section className="month-summary"><p className="mini-kicker">THIS MONTH</p><h4>10月の活動を<br/>数字でご報告</h4><div><span><b>12</b><small>地域訪問</small></span><span><b>38</b><small>ご相談</small></span><span><b>3</b><small>議会提案</small></span></div><p>今月も地域を歩き、皆さまから寄せられた声を議会と行政へ届けました。</p></section>
  <article className="mini-article"><p className="mini-kicker">01 / ASSEMBLY</p><h4>通学路の安全対策を<br/>議会で提案しました</h4><p>地域の皆さまと行った現地確認をもとに、見通しの悪い交差点へのカーブミラー設置と、路面表示の改善を提案しました。</p><div className="policy-result"><span>今回の進捗</span><b>危険箇所 3地点を<br/>担当部署と現地確認へ</b></div></article>
  <section className="assembly-topics"><p className="mini-kicker">OTHER TOPICS</p><h4>そのほかの議会活動</h4><div><span>01</span><p><b>放課後の居場所づくり</b>児童クラブの待機解消と、空き教室の活用について質問しました。</p></div><div><span>02</span><p><b>地域交通の見直し</b>高齢者の移動を支える乗合交通の実証運行を提案しました。</p></div><div><span>03</span><p><b>防災備蓄の充実</b>乳幼児や女性の視点を取り入れた備蓄品の更新を要望しました。</p></div></section>
  <div className="activity-photo photo-placeholder"><div><span>IMAGE</span><small>活動写真が入ります</small></div><b>地域の皆さまと現地を確認</b></div><div className="field-note"><div><p className="mini-kicker">02 / COMMUNITY</p><h4>青葉中央小学校区を<br/>歩いて確認</h4><p>保護者・地域の皆さまから、6件のご意見を伺いました。</p></div></div>
  <section className="voice-tracker"><p className="mini-kicker">VOICE &amp; ACTION</p><h4>いただいた声、その後</h4><div className="voice-item"><span>地域の声</span><p>「公園の照明が暗く、夕方は不安です」</p><b>現地確認済み</b><small>担当課へ照度調査を依頼しています</small></div><div className="voice-item"><span>地域の声</span><p>「駅前の駐輪スペースが足りません」</p><b className="progress">協議中</b><small>来年度の整備候補として協議を開始</small></div><div className="voice-item"><span>地域の声</span><p>「子育て相談の窓口が分かりづらい」</p><b className="done">改善</b><small>市の案内ページが整理されました</small></div></section>
  <div className="mini-quote">「現場で聞いた声を、<br/>議会で動く力に変えていきます。」<small>— 山田 太郎</small></div>
  <section className="policy-focus"><p className="mini-kicker">POLICY FOCUS</p><h4>山田 太郎が取り組む<br/>3つの重点政策</h4><div><span>01</span><p><b>子育てを地域全体で支える</b><small>保育・教育・相談を切れ目なく</small></p></div><div><span>02</span><p><b>歩いて暮らせるまちへ</b><small>地域交通と道路の安全を改善</small></p></div><div><span>03</span><p><b>災害に強い地域づくり</b><small>日頃の備えと顔の見える連携</small></p></div></section>
  <section className="schedule-section"><p className="mini-kicker">SCHEDULE</p><h4>今後の活動予定</h4><div><time>10.18<small>SUN</small></time><p><b>秋の河川清掃</b>青葉橋たもと・9:00集合</p></div><div><time>10.25<small>SUN</small></time><p><b>まちかど対話会</b>青葉市民センター・14:00</p></div><div><time>11.03<small>TUE</small></time><p><b>子育て世代の座談会</b>こもれび広場・10:30</p></div></section>
  <div className="next-event"><div className="event-num"><small>OCT</small><b>25</b></div><div><p className="mini-kicker">NEXT EVENT</p><h4>まちかど対話会</h4><p><Icon name="calendar" size={11}/> 14:00–15:30　<Icon name="pin" size={11}/> 青葉市民センター</p></div></div>
  <section className="profile-card"><div className="profile-photo profile-placeholder"><span>PHOTO</span></div><div><p className="mini-kicker">PROFILE</p><h4>山田 太郎</h4><p>暮らしに寄り添う、新しい政治へ。地域の声がまっすぐ届く市政を目指して活動しています。</p></div></section>
  <section className="contact-box"><p className="mini-kicker">CONTACT</p><h4>小さな声も、<br/>お気軽にお寄せください。</h4><p>暮らしの困りごとや地域の気になることを、LINEのトークからお送りいただけます。</p><button onClick={onBack}>LINEでメッセージを送る</button></section>
  <div className="mini-actions"><button><Icon name="building" size={15}/> 政策を見る</button><button onClick={onBack}>LINEに戻る</button></div><p className="mini-footer">TARO YAMADA OFFICE · MONTHLY REPORT<br/>※このページの人物・内容はデモ用の架空情報です</p>
</div>}
