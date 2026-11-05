/* Guide search: curated page index, Japanese normalization, synonyms and relevance. */
(()=>{
'use strict';
const form=document.getElementById('search'),input=document.getElementById('q'),box=document.getElementById('results');
if(!form||!input||!box)return;
const pages=[
['新規登録の方法','新規登録','登録方法を確認して自分に合った方法を選べます','guide-a-chat.html','入会 会員登録 申し込み はじめる'],
['WEB登録ガイド','新規登録','オンラインで会員登録する手順','guide-a-web.html','web ネット インターネット スマホ 申込'],
['郵送登録ガイド','新規登録','書類を使った登録方法','guide-a-paper.html','紙 郵便 書面 申込'],
['登録方法を比較','新規登録','WEB登録と郵送登録の違いを比較','guide-a-compare.html','比較 どっち おすすめ'],
['初回費用','新規登録','登録時に必要な費用を確認','guide-a-cost.html','登録料 金額 いくら お金'],
['毎月の商品購入','定期購入','毎月の購入や定期購入の基本','guide-b-cost.html','商品 注文 購入 定期便'],
['お届けスケジュール','定期購入','商品が届くタイミングを確認','guide-b-schedule.html','配送 配達 発送 届く いつ'],
['お支払方法','定期購入','購入代金の支払い方法を確認','guide-b-payment.html','支払い 決済 クレジットカード カード 口座 引落'],
['締め日について','定期購入','注文や購入の締め切りを確認','guide-b-deadline.html','締切 期限 いつまで'],
['定期購入の停止','定期購入','定期購入を止めたいときの案内','guide-b-stop.html','休止 中止 やめる 解約 ストップ'],
['６か月連続購入特典','定期購入','継続購入の特典について','guide-b-bonus.html','6ヶ月 6か月 継続 特典'],
['ボーナスはどうやって決まるの？','ボーナスプラン','ボーナスが決まる仕組みの入口','guide-c-reward-basics.html','報酬 収入 仕組み 計算 ポイント pt'],
['ボーナスの基本条件','ボーナスプラン','報酬を受け取るための基本条件','guide-c-basic.html','アクティブ 条件 pt ポイント'],
['ボーナスプラン一覧','ボーナスプラン','各種ボーナスの仕組みを一覧から確認','guide-c-bonus.html','報酬 紹介料 メガマッチ ダブルメガ'],
['タイトル昇格条件','ボーナスプラン','クリスタル・ラピスなどのタイトル条件','guide-c-title.html','ランク 昇格 役職 クリスタル ラピス サファイア エメラルド ゴールド'],
['ブランチ','ボーナスプラン','ブランチの仕組みを確認','guide-c-branch.html','支店 3点登録 組織 配置'],
['ボーナス・タイトル診断','ボーナスプラン','条件を選んでボーナスやタイトルを確認','check.html','診断 チェック 計算 シミュレーション'],
['メガマッチ','ボーナスプラン','左右グループに基づくボーナス','guide-c-bonus-mega-match.html','メガ マッチ バイナリー 左右 少ない側'],
['ダブルメガマッチ','ボーナスプラン','ダブルメガマッチの仕組み','guide-c-bonus-double-mega-match.html','ダブルメガ 二次紹介 報酬'],
['紹介ボーナス','ボーナスプラン','直接紹介に関する報酬','guide-c-bonus-basic-commission.html','紹介料 直紹介 紹介手数料'],
['キャップ調整','ボーナスプラン','ボーナスの調整や実際の支給額の注意点','guide-cap-adjustment.html','上限 調整 振込 手数料 支給'],
['マイプランを探そう！','その他のコンテンツ','目標金額から組織とボーナスの例を見る','guide-myplan.html','目標 金額 月収 収入 組織図 パターン シミュレーション'],
['手続き・申請一覧','手続き・申請','変更・申請・提出などの手続きを探す','guide-d.html','手続 申請 届出 変更 書類'],
['住所・連絡先の変更','手続き・申請','住所・電話番号など登録情報の変更','guide-d.html#category=0&item=0','引越し 引っ越し 住所変更 電話 氏名 名義 登録事項変更届'],
['クレジットカードの登録・変更','手続き・申請','カード情報の更新や変更','guide-d.html#category=1&item=0','決済 カード 有効期限 更新 支払い'],
['定期購入の変更・停止・再開','手続き・申請','定期購入に関する変更手続き','guide-d.html#category=2','定期便 停止 再開 休止 配送'],
['会員資格・組織に関する手続き','手続き・申請','資格復活や組織に関する申請','guide-d.html#category=3','会員資格 復活 停止 紹介者変更'],
['解約・クーリングオフ','手続き・申請','契約をやめるときの申請案内','guide-d.html#category=5','退会 返品 返金 キャンセル クーリングオフ'],
['本人確認書類の提出','手続き・申請','本人確認書類の提出方法を調べる','guide-d.html','身分証 明書 免許証'],
['マイナンバー届出','手続き・申請','クリスタル以上への昇格時に必要な個人番号の届出。書類は郵送で提出','guide-d.html#category=7&item=0','個人番号 マイナンバーカード マイナンバー届出書 税番号 郵送 クリスタル 昇格'],
['定期購入おまとめ配送','手続き・申請','家族の定期購入をまとめて配送する手続き','guide-d.html','家族 同梱 おまとめ'],
['よくある質問','こんなときどうする？','よくある困りごとと回答を確認','guide-e.html','困った faq 質問 トラブル'],
['全国のサロンを探す','その他のコンテンツ','全国のサロンを地域から探す','ninaguide-salons.html','サロン 店舗 地図 都道府県 近く 場所']
];
const aliases=[['支払','決済','お支払','引落'],['登録','入会','申し込み','申込'],['解約','退会','やめる'],['配送','発送','配達','届く'],['住所','引越し','引っ越し'],['ボーナス','報酬','収入'],['ポイント','pt'],['カード','クレジット'],['変更','更新'],['停止','休止','中止'],['手続き','申請','届出'],['紹介','リクルート']];
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[\s　・／\/\-ー_!！?？。、（）()]+/g,'');
const terms=q=>q.trim().split(/[\s　]+/).filter(Boolean).map(norm);
const expand=t=>{const out=new Set([t]);for(const group of aliases){if(group.some(w=>norm(w)===t))group.forEach(w=>out.add(norm(w)))}return [...out]};
const records=pages.map(([title,category,description,url,keywords])=>({title,category,description,url,keywords,titleN:norm(title),catN:norm(category),descN:norm(description),keyN:norm(keywords)}));
const escapeHTML=s=>s.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let lastQuery='';
function render(query){
 lastQuery=query;
 box.replaceChildren();
 const q=query.trim();if(!q){box.hidden=true;return}
 box.hidden=false;
 const words=terms(q),full=norm(q);
 const ranked=records.map(item=>{
  let score=0,matched=0;
  for(const word of words){
   const variants=expand(word);
   let best=0;
   for(const t of variants){
    if(!t)continue;
    const exact=t===word;
    if(item.titleN===t)best=Math.max(best,exact?110:65);
    else if(item.titleN.includes(t))best=Math.max(best,exact?65:38);
    if(item.catN.includes(t))best=Math.max(best,exact?22:12);
    if(item.keyN.includes(t))best=Math.max(best,exact?28:18);
    if(item.descN.includes(t))best=Math.max(best,exact?14:8);
   }
   if(best){matched++;score+=best}
  }
  if(item.titleN===full)score+=100;
  if(item.titleN.includes(full))score+=35;
  if(matched!==words.length)score=0;
  return {...item,score};
 }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title,'ja')).slice(0,12);
 const heading=document.createElement('div');heading.className='guide-search-result-heading';
 const count=document.createElement('strong');count.textContent=ranked.length?('検索結果 '+ranked.length+'件'):'該当するページが見つかりませんでした';
 const clear=document.createElement('button');clear.type='button';clear.className='guide-search-clear';clear.textContent='閉じる';clear.addEventListener('click',()=>{input.value='';render('')});
 heading.append(count,clear);box.append(heading);
 if(!ranked.length){const p=document.createElement('p');p.className='guide-search-empty';p.textContent='別の言葉で試してみてください。例：住所変更、クレジットカード、ボーナス、解約';box.append(p);return}
 const list=document.createElement('div');list.className='guide-search-result-list';
 for(const item of ranked){const a=document.createElement('a');a.className='guide-search-result';a.href='./'+item.url;
 const category=document.createElement('span');category.className='guide-search-result-category';category.textContent=item.category;
 const title=document.createElement('strong');title.textContent=item.title;
 const desc=document.createElement('span');desc.className='guide-search-result-description';desc.textContent=item.description;
 const arrow=document.createElement('span');arrow.className='guide-search-result-arrow';arrow.textContent='›';
 a.append(category,title,desc,arrow);list.append(a)}
 box.append(list);
}
form.addEventListener('submit',e=>{e.preventDefault();render(input.value)});
let debounce;input.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(()=>render(input.value),180)});
document.querySelectorAll('[data-query]').forEach(button=>button.addEventListener('click',()=>{input.value=button.dataset.query;render(input.value)}));
})();