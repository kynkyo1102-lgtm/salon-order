document.addEventListener('DOMContentLoaded',function(){
const steps=Array.from(document.querySelectorAll('.registration-step'));
if(!steps.length)return;
const isWeb=document.body.dataset.registrationType==='web';
const actionCount=isWeb?6:4;
const postSteps=steps.slice(actionCount);
const actionSteps=steps.slice(0,actionCount);
const messages=isWeb?[
'まずは登録前の準備だよ。\n概要書面・カード・口座情報をそろえてね。必要な書類も確認しよう。',
'準備ができたら、公式のWEB登録受付ページを開いてね。下のリンクから進めるよ。',
'受付ページで「オンラインで会員登録される方はこちら」を選んでね。',
'メールアドレスを送信しよう。案内メールが届くように受信設定も確認してね。',
'届いたメールのURLから登録画面へ。紹介者や上位者の情報は間違えないように入力してね。',
'受付が完了したら、該当する方は本人確認書類などの写真データを提出してね。',
'ここからは本社の審査・登録処理だよ。審査についての注意も確認してね。',
'商品や契約書面、会員証が届くまでの流れを確認しよう。クーリングオフの期間も大切だよ。'
]:[
'最初に紹介者から概要書面を受け取って、説明を確認しよう。',
'申請書に必要事項を記入して、所定の箇所に捺印してね。',
'商品代金を事前に振り込もう。金額と振込先は下で確認してね。',
'振込明細書のコピーと必要書類をそろえて、申請書を郵送しよう。',
'書類が本社に届いたら審査・登録処理が行われるよ。返金についての注意も確認してね。',
'商品・契約書面と会員証が届く流れだよ。活動開始とクーリングオフ期間も確認しよう。'
];
const intro=document.querySelector('.walkthrough-intro');
if(intro)intro.textContent='ミトコンドリアちゃんと一緒に、ひとつずつ確認しながら進めよう。';
const tools=document.querySelector('.walkthrough-tools');
if(tools)tools.remove();
actionSteps.forEach(function(step){
 const label=step.querySelector('.walkthrough-check');if(label)label.remove();
 const content=step.querySelector('.registration-step-content');if(!content)return;
 const details=document.createElement('details');details.className='walkthrough-more';
 const summary=document.createElement('summary');summary.textContent='詳しい説明・注意事項を見る';
 const body=document.createElement('div');body.className='walkthrough-more-body';
 while(content.firstChild)body.append(content.firstChild);
 details.append(summary,body);
 const n=Number(step.dataset.step);
 const checks=isWeb?[
 ['概要書面','クレジットカード','銀行口座情報'],
 ['公式の受付ページを開く'],
 ['オンライン会員登録を選ぶ'],
 ['メールアドレスを送信する'],
 ['受信メールのURLを開く','紹介者・上位者の情報を確認','必要事項を入力して決済'],
 ['該当する場合は本人確認書類を提出'],
 ['審査・登録処理の流れを確認'],
 ['商品・契約書面の到着を確認','会員証と活動開始の条件を確認']
 ]:[
 ['概要書面を受け取る','説明を確認する'],
 ['申請書に記入する','捺印する'],
 ['登録点数と金額を確認','振込先を確認して振り込む'],
 ['振込明細書のコピーを用意','必要書類をそろえて郵送'],
 ['審査・登録処理の流れを確認'],
 ['商品・契約書面の到着を確認','会員証と活動開始の条件を確認']
 ];
 const list=document.createElement('div');list.className='walkthrough-actions';
 checks[n-1].forEach(function(t){const l=document.createElement('label');l.className='walkthrough-action';const cb=document.createElement('input');cb.type='checkbox';l.append(cb,document.createTextNode(t));list.append(l)});
 content.append(list,details);
});
const panel=document.createElement('section');
panel.className='walkthrough-chat';
panel.setAttribute('aria-label','ミトコンドリアちゃんの手順案内');
panel.innerHTML='<div class="walkthrough-chat-head"><span id="chat-step-count"></span><span>手順を確認しながら進もう</span></div><div class="walkthrough-chat-track"><div class="walkthrough-chat-fill" id="chat-fill"></div></div><div class="walkthrough-chat-message"><div class="walkthrough-chat-mascot"><img src="./assets/mitochondria-chan.svg" alt="ミトコンドリアちゃん"></div><div class="walkthrough-chat-bubble" id="chat-message" aria-live="polite"></div></div><div class="walkthrough-current" id="chat-current"></div><div class="walkthrough-navigation"><button class="walkthrough-back" id="chat-back" type="button">← 戻る</button><button class="walkthrough-next" id="chat-next" type="button">次へ進む →</button></div>';
if(intro)intro.after(panel);
const current=panel.querySelector('#chat-current');
actionSteps.forEach(function(step){current.append(step)});
const completion=document.createElement('section');
completion.className='walkthrough-completion';
completion.hidden=true;
completion.innerHTML='<div class="walkthrough-complete-mark" aria-hidden="true">✓</div><h2>登録手続きが完了しました！</h2><p class="walkthrough-complete-note">申請の手続きが終わりました。登録の確定は本社の審査後となります。</p><h3>このあとの流れ</h3>';
postSteps.forEach(function(step){
 const article=document.createElement('article');article.className='walkthrough-after-item';
 const heading=step.querySelector('.section-card-title');
 const content=step.querySelector('.registration-step-content');
 if(heading)article.append(heading);
 if(content)article.append(content);
 completion.append(article);
});
const restart=document.createElement('button');restart.type='button';restart.className='walkthrough-restart';restart.textContent='最初から確認する';completion.append(restart);
panel.append(completion);
let index=0;
function render(scroll){
actionSteps.forEach(function(step,i){step.classList.toggle('active',i===index)});
const finished=index===actionCount;
current.hidden=finished;
completion.hidden=!finished;
panel.querySelector('.walkthrough-chat-message').hidden=finished;
panel.querySelector('.walkthrough-navigation').hidden=finished;
panel.querySelector('#chat-step-count').textContent=(finished?'手続き完了':'STEP '+(index+1)+' / '+actionCount);
panel.querySelector('#chat-fill').style.width=((index+1)/actionCount*100)+'%';
panel.querySelector('#chat-message').textContent=finished?'':messages[index];
panel.querySelector('#chat-back').disabled=index===0;
panel.querySelector('#chat-next').textContent=index===actionCount-1?'手続きを完了する →':'次へ進む →';
if(scroll)panel.scrollIntoView({behavior:'smooth',block:'start'});
}
panel.querySelector('#chat-back').addEventListener('click',function(){if(index>0){index--;render(true)}});
panel.querySelector('#chat-next').addEventListener('click',function(){if(index<actionCount){index++;render(true)}});
restart.addEventListener('click',function(){index=0;render(true)});
document.body.classList.add('chat-ready');
const hash=location.hash.match(/^#step(\d+)$/);
if(hash){const n=Number(hash[1]);if(n>=1&&n<=actionCount)index=n-1}
render(false);
});
