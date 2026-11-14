/* Central source index for guide references.
   Empty arrays mean no reference note is shown on the page. */
(()=>{
'use strict';
const GUIDE_REFERENCES={
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
const refs=GUIDE_REFERENCES[filename];
if(!refs||!refs.length)return;
const main=document.querySelector('main');
if(!main)return;
main.querySelectorAll('.guide-reference-note').forEach(el=>el.remove());
const note=document.createElement('p');
note.className='guide-reference-note';
note.setAttribute('aria-label','参照資料');
refs.forEach((ref,index)=>{
 if(index)note.append(document.createTextNode(' ／ '));
 const label=document.createElement('span');
 const type=ref.type==='manual'?'メンバーズマニュアル':ref.type==='original'?'当サイト独自'+(ref.title?'：'+ref.title:''):(ref.title||'参考資料');
 let detail=type;
 if(ref.pages&&ref.pages.length)detail+=' '+ref.pages.join('・')+'P';
 if(ref.edition)detail+='（'+ref.edition+'）';
 label.textContent=detail;
 if(ref.url){
  const link=document.createElement('a');link.href=ref.url;link.textContent=detail;link.target='_blank';link.rel='noopener noreferrer';note.append(link);
 }else note.append(label);
});
const returnLink=main.querySelector('.guide-bottom-return');
if(returnLink)main.insertBefore(note,returnLink);else main.append(note);
})();
