/* Shared guide header, navigation, footer and shortcuts */
(()=>{'use strict';
const groups=[
['新規登録',[['登録方法を比較','guide-a-compare.html'],['WEB登録の流れ','guide-a-web.html'],['郵送登録の流れ','guide-a-paper.html'],['初回費用','guide-a-cost.html']]],
['定期購入',[['毎月の商品購入','guide-b-cost.html'],['お届けスケジュール','guide-b-schedule.html'],['お支払方法','guide-b-payment.html'],['締め日について','guide-b-deadline.html'],['定期購入の停止','guide-b-stop.html'],['６か月連続購入特典','guide-b-bonus.html']]],
['ボーナスプラン',[['基本条件','guide-c-basic.html'],['ボーナスプラン','guide-c-bonus.html'],['タイトル昇格条件','guide-c-title.html'],['ブランチ','guide-c-branch.html'],['ボーナス・タイトル診断','check.html']]],
['手続き・申請',[['住所・連絡先の変更','guide-d.html#category=0&item=0'],['クレジットカードの登録・変更','guide-d.html#category=1&item=0'],['定期購入の変更・停止・再開','guide-d.html#category=2'],['会員資格・組織に関する手続き','guide-d.html#category=3'],['解約・クーリングオフ','guide-d.html#category=5'],['すべての手続きを見る','guide-d.html']]],
['こんなときどうする？',[['よくある困りごと','guide-e.html']]]
];
function init(){
 const header=document.createElement('header');header.className='guide-shared-header';
 header.innerHTML='<div class="guide-shared-brand"><a class="guide-shared-logo" href="https://kynkyo1102-lgtm.github.io/mksalon-order/">Place de Nina</a><span class="guide-shared-shop">南熊本店</span></div><button class="guide-shared-menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="guide-shared-site-menu"><span class="guide-shared-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span></button><nav class="guide-shared-menu" id="guide-shared-site-menu" aria-label="サイトメニュー" hidden><a class="guide-shared-primary" href="./ninaguide.html">メンバーズガイド トップ</a><div id="guide-shared-groups"></div><div class="guide-shared-secondary"><a href="./ninaguide-salons.html">全国のサロンを探す</a><a href="https://kynkyo1102-lgtm.github.io/mksalon-order/">サロンページへ</a></div></nav>';
 const groupWrap=header.querySelector('#guide-shared-groups');
 for(const [label,links] of groups){const group=document.createElement('div');group.className='guide-shared-group';const title=document.createElement('span');title.className='guide-shared-group-title';title.textContent=label;group.append(title);for(const [name,path] of links){const a=document.createElement('a');a.className='guide-shared-sub';a.href='./'+path;a.textContent=name;group.append(a)}groupWrap.append(group)}
 document.body.prepend(header);
 const toggle=header.querySelector('.guide-shared-menu-toggle'),menu=header.querySelector('.guide-shared-menu');
 const setOpen=open=>{menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')};
 toggle.addEventListener('click',()=>setOpen(menu.hidden));
 document.addEventListener('click',e=>{if(!menu.hidden&&!header.contains(e.target))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setOpen(false);toggle.focus()}});
 const footer=document.createElement('footer');footer.className='guide-shared-footer';footer.innerHTML='<p>当サイトはプラッス ドゥ ニナ 南熊本店が制作した非公式ガイドです。正式な内容は公式資料をご確認ください。</p>';document.body.append(footer);
 const floating=document.createElement('nav');floating.className='guide-shared-floating';floating.setAttribute('aria-label','便利なリンク');floating.innerHTML='<a class="guide-shared-eservice" href="https://www.ninapharm.co.jp/e-service/" target="_blank" rel="noopener noreferrer">E-Service</a><a class="guide-shared-diagnosis" href="./check.html">ボーナス診断</a>';document.body.append(floating);
 const position=()=>{const rect=footer.getBoundingClientRect();const overlap=Math.max(0,window.innerHeight-rect.top);floating.style.bottom=(18+overlap)+'px'};
 window.addEventListener('scroll',position,{passive:true});window.addEventListener('resize',position);position();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();