/* Central index for printed Members Manual references.
   Edit only this file when the manual is revised.
   Add page numbers to the array for each article, e.g. [12] or [12, 13].
   Keep [] while the page number has not been checked. */
(()=>{
'use strict';
const MANUAL_EDITION=''; // Example: '2026年11月改訂'
const MANUAL_REFERENCES={
 'guide-a-chat.html':[],
 'guide-a-compare.html':[],
 'guide-a-cost.html':[],
 'guide-a-web.html':[],
 'guide-a-paper.html':[],
 'guide-a-registration-steps.html':[],
 'guide-b-cost.html':[],
 'guide-b-schedule.html':[],
 'guide-b-payment.html':[],
 'guide-b-deadline.html':[],
 'guide-b-stop.html':[],
 'guide-b-bonus.html':[],
 'guide-c-basic.html':[],
 'guide-c-title.html':[],
 'guide-c-branch.html':[],
 'guide-c-bonus-first-start.html':[],
 'guide-c-bonus-5-active.html':[],
 'guide-c-bonus-10-active.html':[],
 'guide-c-bonus-basic-commission.html':[],
 'guide-c-bonus-mega-match.html':[],
 'guide-c-bonus-double-mega-match.html':[],
 'guide-c-bonus-leadership.html':[],
 'guide-c-bonus-amf.html':[],
 'guide-c-bonus-cullinan-amf.html':[],
 'guide-c-payment.html':[],
 'guide-c-bonus.html':[],
 'guide-c-reward-basics.html':[]
};
const filename=decodeURIComponent(location.pathname.split('/').pop()||'');
if(!Object.prototype.hasOwnProperty.call(MANUAL_REFERENCES,filename))return;
const main=document.querySelector('main');
if(!main)return;

// Remove only old numbered references; keep general official-document cautions.
main.querySelectorAll('.manual-ref').forEach(el=>{
 if(/メンバーズマニュアル\s*1P参照/.test(el.textContent.trim()))el.remove();
});
main.querySelectorAll('.guide-manual-reference').forEach(el=>el.remove());

const box=document.createElement('aside');
box.className='guide-manual-reference';
box.setAttribute('aria-label','メンバーズマニュアルの参照ページ');
const title=document.createElement('span');
title.className='guide-manual-reference-title';
title.textContent=MANUAL_EDITION
 ?'メンバーズマニュアル（'+MANUAL_EDITION+'）'
 :'メンバーズマニュアル';
const page=document.createElement('span');
page.className='guide-manual-reference-pages';
const pageNumbers=MANUAL_REFERENCES[filename];
page.textContent=pageNumbers.length
 ?'参照：'+pageNumbers.map(n=>String(n)+'P').join('・')
 :'参照ページ：未設定';
box.append(title,page);
const returnLink=main.querySelector('.guide-bottom-return');
if(returnLink)main.insertBefore(box,returnLink);
else main.append(box);
})();