/* Shared guide header, navigation, footer and shortcuts */
(()=>{'use strict';
// Reset scroll only for ordinary document navigation. Hash targets (including
// guided steps and procedure selections) keep their native/custom positioning.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('pageshow',()=>{
 if(location.hash)return;
 window.scrollTo({top:0,left:0,behavior:'instant'});
});

const groups=[
['新規登録',[['登録ガイド','guide-a-chat.html'],['WEB登録ガイド','guide-a-web.html'],['郵送登録ガイド','guide-a-paper.html'],['初回費用','guide-a-cost.html']]],
['定期購入',[['毎月の商品購入','guide-b-cost.html'],['お届けスケジュール','guide-b-schedule.html'],['お支払方法','guide-b-payment.html'],['締め日について','guide-b-deadline.html'],['定期購入の停止','guide-b-stop.html'],['６か月連続購入特典','guide-b-bonus.html']]],
['ボーナスプラン',[['ボーナスはどうやって決まるの？','guide-c-reward-basics.html'],['基本条件','guide-c-basic.html'],['ボーナスプラン','guide-c-bonus.html'],['タイトル昇格条件','guide-c-title.html'],['ブランチ','guide-c-branch.html'],['ボーナス・タイトル診断','check.html']]],
['手続き・申請',[['住所・連絡先の変更','guide-d.html#category=0&item=0'],['クレジットカードの登録・変更','guide-d.html#category=1&item=0'],['定期購入の変更・停止・再開','guide-d.html#category=2'],['会員資格・組織に関する手続き','guide-d.html#category=3'],['解約・クーリングオフ','guide-d.html#category=5'],['すべての手続きを見る','guide-d.html']]],
['こんなときどうする？',[['よくある困りごと','guide-e.html']]]
];
/* Provisional manual-page index. Replace each 1P after checking the printed manual.
   Category landing pages, top page and procedures are deliberately excluded. */
const manualPageRefs={
 'guide-a-chat.html':'1P','guide-a-compare.html':'1P','guide-a-cost.html':'1P',
 'guide-a-web.html':'1P','guide-a-paper.html':'1P','guide-a-registration-steps.html':'1P',
 'guide-b-cost.html':'1P','guide-b-schedule.html':'1P','guide-b-payment.html':'1P',
 'guide-b-deadline.html':'1P','guide-b-stop.html':'1P','guide-b-bonus.html':'1P',
 'guide-c-basic.html':'1P','guide-c-title.html':'1P','guide-c-branch.html':'1P',
 'guide-c-branch-white-preview.html':'1P',
 'guide-c-bonus-first-start.html':'1P','guide-c-bonus-5-active.html':'1P',
 'guide-c-bonus-10-active.html':'1P','guide-c-bonus-basic-commission.html':'1P',
 'guide-c-bonus-mega-match.html':'1P','guide-c-bonus-double-mega-match.html':'1P',
 'guide-c-bonus-leadership.html':'1P','guide-c-bonus-amf.html':'1P',
 'guide-c-bonus-cullinan-amf.html':'1P'
};
function addManualReference(){
 const filename=decodeURIComponent(location.pathname.split('/').pop());
 const page=manualPageRefs[filename];
 if(!page)return;
 const main=document.querySelector('main');
 if(!main)return;
 const existing=[...main.querySelectorAll('.manual-ref')].find(el=>/メンバーズマニュアル/.test(el.textContent));
 if(existing){existing.textContent='メンバーズマニュアル'+page+'参照（ページ番号は仮）';return;}
 const note=document.createElement('p');
 note.className='guide-manual-reference';
 note.textContent='メンバーズマニュアル'+page+'参照（ページ番号は仮）';
 main.append(note);
}
function addCategoryBreadcrumb(){
 const filename=decodeURIComponent(location.pathname.split('/').pop());
 const category=filename.startsWith('guide-a-')?'新規登録':filename.startsWith('guide-b-')&&filename!=='guide-b.html'?'定期購入':null;
 if(!category)return;
 const main=document.querySelector('main');
 if(!main||main.querySelector('.guide-category-breadcrumb,.bonus-breadcrumb'))return;
 const title=main.querySelector('h1');
 if(!title)return;
 const nav=document.createElement('nav');
 nav.className='guide-category-breadcrumb';
 nav.setAttribute('aria-label','パンくずリスト');
 const home=document.createElement('a');home.href='./ninaguide.html';home.textContent='メンバーズガイド';
 const sep1=document.createElement('span');sep1.setAttribute('aria-hidden','true');sep1.textContent='›';
 const group=document.createElement('a');group.href='./ninaguide.html#'+(category==='新規登録'?'registration':'regular');group.textContent=category;
 const sep2=document.createElement('span');sep2.setAttribute('aria-hidden','true');sep2.textContent='›';
 const current=document.createElement('span');current.setAttribute('aria-current','page');current.textContent=title.textContent.trim();
 nav.append(home,sep1,group,sep2,current);
 main.insertBefore(nav,main.firstChild);
}
function addBottomReturnLink(){
 const filename=decodeURIComponent(location.pathname.split('/').pop());
 if(filename==='ninaguide.html'||filename==='index.html')return;
 const main=document.querySelector('main');if(!main)return;
 let href='./ninaguide.html',label='ガイドトップに戻る';
 if(filename.startsWith('guide-d-')||filename==='guide-procedures.html'){href='./guide-d.html';label='手続き一覧に戻る'}
 else if(filename.startsWith('guide-myplan-')){href='./guide-myplan.html';label='マイプランを探そう！に戻る'}
 else if(filename.startsWith('guide-c-bonus-')){href='./guide-c-bonus.html';label='ボーナスプラン一覧に戻る'}
 // Avoid duplicating an existing bottom return link with the same destination.
 const lastLinks=[...main.querySelectorAll('a[href]')].slice(-5);
 if(lastLinks.some(a=>a.getAttribute('href')===href&&/戻る/.test(a.textContent)))return;
 const nav=document.createElement('nav');nav.className='guide-bottom-return';nav.setAttribute('aria-label','ページ下部の戻り先');
 const a=document.createElement('a');a.href=href;a.textContent='‹ '+label;nav.append(a);
 main.append(nav);
}
function init(){
 const header=document.createElement('header');header.className='guide-shared-header';
 header.innerHTML='<div class="guide-shared-brand"><a class="guide-shared-logo" href="https://kynkyo1102-lgtm.github.io/mksalon-order/">Place de Nina</a><span class="guide-shared-shop">南熊本店</span></div><button class="guide-shared-menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="guide-shared-site-menu"><span class="guide-shared-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span></button><nav class="guide-shared-menu" id="guide-shared-site-menu" aria-label="サイトメニュー" hidden><a class="guide-shared-primary" href="./ninaguide.html">メンバーズガイド トップ</a><div id="guide-shared-groups"></div><details class="guide-shared-group guide-shared-accordion guide-shared-secondary"><summary class="guide-shared-group-title">その他のコンテンツ</summary><div class="guide-shared-accordion-content"><a href="./ninaguide-salons.html">全国のサロンを探す</a><a href="./guide-myplan.html">マイプランを探そう！</a><a href="https://kynkyo1102-lgtm.github.io/mksalon-order/">サロンページへ</a></div></details></nav>';
 const groupWrap=header.querySelector('#guide-shared-groups');
 for(const [label,links] of groups){const group=document.createElement('details');group.className='guide-shared-group guide-shared-accordion';const title=document.createElement('summary');title.className='guide-shared-group-title';title.textContent=label;group.append(title);const content=document.createElement('div');content.className='guide-shared-accordion-content';for(const [name,path] of links){const link=document.createElement('a');link.className='guide-shared-sub';link.href='./'+path;link.textContent=name;content.append(link)}group.append(content);groupWrap.append(group)}
 const accordions=[...header.querySelectorAll('.guide-shared-accordion')];
 accordions.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)accordions.forEach(other=>{if(other!==item)other.open=false})}));
 const menuStyle=document.createElement('style');menuStyle.textContent='.guide-shared-accordion{padding:0!important;margin:0!important;border-top:1px solid #e5eaf0}.guide-shared-accordion>summary{cursor:pointer;list-style:none;display:flex!important;align-items:center;justify-content:space-between;padding:14px 5px!important;color:#004AAD!important;font-size:15px!important;font-weight:700!important}.guide-shared-accordion>summary::-webkit-details-marker{display:none}.guide-shared-accordion>summary:after{content:"＋";font-size:19px;font-weight:400;color:#6b8298}.guide-shared-accordion[open]>summary:after{content:"−"}.guide-shared-accordion-content{padding:0 0 10px}.guide-shared-accordion-content a{padding:8px 10px!important;margin-left:8px!important;font-size:14px!important}.guide-shared-menu .guide-shared-secondary{margin-top:0!important;padding-top:0!important}.guide-shared-accordion>summary:focus-visible{outline:2px solid #80b9ff;outline-offset:2px}';document.head.append(menuStyle);
 document.body.prepend(header);
 const toggle=header.querySelector('.guide-shared-menu-toggle'),menu=header.querySelector('.guide-shared-menu');
 const setOpen=open=>{menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')};
 toggle.addEventListener('click',()=>setOpen(menu.hidden));
 document.addEventListener('click',e=>{if(!menu.hidden&&!header.contains(e.target))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setOpen(false);toggle.focus()}});
 addCategoryBreadcrumb();
 addManualReference();
 addBottomReturnLink();
 const footer=document.createElement('footer');footer.className='guide-shared-footer';footer.innerHTML='<p>当サイトはプラッス ドゥ ニナ 南熊本店が制作した非公式ガイドです。正式な内容は公式資料をご確認ください。</p>';document.body.append(footer);
 const floating=document.createElement('nav');floating.className='guide-shared-floating';floating.setAttribute('aria-label','便利なリンク');floating.innerHTML='<a class="guide-shared-eservice" href="https://share.google/YMkDp6tvydCq1D08A" target="_blank" rel="noopener noreferrer">E-Service</a><a class="guide-shared-diagnosis" href="./check.html">ボーナス診断</a>';document.body.append(floating);
 const position=()=>{const rect=footer.getBoundingClientRect();const overlap=Math.max(0,window.innerHeight-rect.top);floating.style.bottom=(18+overlap)+'px'};
 window.addEventListener('scroll',position,{passive:true});window.addEventListener('resize',position);position();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();