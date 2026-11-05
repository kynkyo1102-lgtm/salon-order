const app=document.getElementById("app");function el(t,c,s){const n=document.createElement(t);if(c)n.className=c;if(s)n.textContent=s;return n}function add(t,c,s,parent=app){const n=el(t,c,s);parent.append(n);return n}function updateProcedureBreadcrumb(categoryIndex=null){const nav=document.querySelector(".guide-category-breadcrumb");if(!nav)return;nav.replaceChildren();const root=el("a","","メンバーズガイド");root.href="./ninaguide.html";nav.append(root,el("span","","›"));if(categoryIndex===null){const current=el("span","","手続き・申請");current.setAttribute("aria-current","page");nav.append(current);return}const all=el("button","procedure-crumb-link","手続き・申請");all.type="button";all.onclick=()=>home(categoryIndex);nav.append(all,el("span","","›"));const current=el("span","",groups[categoryIndex].name);current.setAttribute("aria-current","page");nav.append(current)}
function heading(s){add("h2","inner-title",s)}function intro(s){add("p","intro",s)}function link(label,url=login){const a=add("a","eservice-link",label+" ↗");a.href=url;a.target="_blank";a.rel="noopener noreferrer";return a}function row(s,fn,parent){const b=el("button","procedure-link");b.type="button";b.append(el("span","",s),el("span","chevron","›"));b.onclick=fn;parent.append(b)}
function home(openIndex=-1){updateProcedureBreadcrumb();if(location.hash)history.replaceState(null,"",location.pathname+location.search);app.replaceChildren();intro("カテゴリーを開き、ご希望の手続きを選んでください。");procedureNotice(app,"申請前に、公式申請書の注意事項と最新の条件を必ずご確認ください。");const list=add("div","procedure-accordion");groups.forEach((g,i)=>{const section=el("section","procedure-category"),trigger=el("button","procedure-category-trigger"),panel=el("div","procedure-category-panel");trigger.type="button";trigger.setAttribute("aria-expanded",String(i===openIndex));panel.hidden=i!==openIndex;const ic=el("span","category-icon");ic.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true">'+icons[g.icon]+'</svg>';trigger.append(ic,el("span","category-text",g.name),el("span","accordion-toggle"));trigger.onclick=()=>{const opening=panel.hidden;list.querySelectorAll(".procedure-category-panel").forEach(p=>p.hidden=true);list.querySelectorAll(".procedure-category-trigger").forEach(t=>t.setAttribute("aria-expanded","false"));panel.hidden=!opening;trigger.setAttribute("aria-expanded",String(opening))};g.items.forEach((item,j)=>row(item[0],()=>detail(i,j),panel));section.append(trigger,panel);list.append(section)})}
function category(i){home(i)}
function note(s){add("p","method-note",s)}function procedureNotice(parent,text,kind="info"){const n=el("p","procedure-notice is-"+kind,text);parent.append(n);return n}function eservice(s){add("h3","method-title","E-Serviceでの手続き");note("ログイン後、【"+s+"】からお手続きください。");link("E-Serviceにログインする")}
function download(doc){add("h3","method-title","申請書での手続き");add("p","information-label","必要な書類");add("p","document-name",doc);note("申請書はE-Service内の申請書ダウンロードページでご確認ください。");link("E-Serviceにログインする");procedureNotice(app,"ログイン後の申請書ダウンロードページへの行き方は、確認後に掲載します。")}
function docBox(parent,doc){const box=el("div","document-highlight");box.append(el("p","information-label","必要な書類"),el("p","document-name",doc));parent.append(box)}
function documentSteps(parent,doc,fax){docBox(parent,doc);const p=el("p","method-note","E-Serviceの申請書ダウンロードページから書類を取得し、必要事項を記入してください。");parent.append(p);const a=el("a","eservice-link","E-Serviceにログインする ↗");a.href=login;a.target="_blank";a.rel="noopener noreferrer";parent.append(a,el("p","method-note",fax?"申請書を印刷し、必要事項を記入してください。":"印刷して記入した申請書を撮影するか、PDFに直接記入してください。"))}
function copyText(value,button){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(value).then(()=>{button.textContent="コピーしました"}).catch(()=>fallbackCopy(value,button))}else fallbackCopy(value,button)}
function fallbackCopy(value,button){const t=document.createElement("textarea");t.value=value;t.style.position="fixed";t.style.opacity="0";document.body.append(t);t.select();try{document.execCommand("copy");button.textContent="コピーしました"}catch(e){button.textContent="コピーできませんでした"}t.remove()}
function mailSteps(panel,doc,mode,purpose){
 panel.replaceChildren();
 const template=mailTemplates[purpose];
 const subject=template?template.subject:"【"+doc+"】の提出";
 const list=el("ol","mail-steps");panel.append(list);
 function step(title,description){const li=el("li");li.append(el("strong","",title));if(description)li.append(el("p","method-note",description));list.append(li);return li}
 if(mode==="attach"){const li=step("申請書を準備する");documentSteps(li,doc,false);if(purpose==="ブランチを申請したい")li.append(el("p","method-note","申請書の必要事項をすべて記入してください。前振込の場合は振込明細書も用意してください。"))}
 const li=step(mode==="body"?"申請メールを作成する":"メールアプリを開く",mode==="body"?"件名と、申請に必要な項目があらかじめ入力されたメールが開きます。":"申請書を添付してください。");
 li.append(el("p","method-note","宛先："+email));
 const a=el("a","secondary-action",mode==="body"?"申請メールを作成する ↗":"メールアプリを開く ↗");
 a.href="mailto:"+email+"?subject="+encodeURIComponent(subject)+(mode==="body"&&template?"&body="+encodeURIComponent(template.body):"");
 li.append(a);
 if(mode==="body"&&template){
  const details=el("details","mail-fallback");
  const summary=el("summary","","本文がコピーされない場合はこちら");
  const actions=el("div","fallback-actions");
  const subjectButton=el("button","secondary-action","件名をコピー");subjectButton.type="button";subjectButton.onclick=()=>copyText(subject,subjectButton);
  const bodyButton=el("button","secondary-action","本文をコピー");bodyButton.type="button";bodyButton.onclick=()=>copyText(template.body,bodyButton);
  actions.append(subjectButton,bodyButton);details.append(summary,actions);li.append(details);
 }
 step("内容を確認して送信する",mode==="body"?"各項目に必要事項を記入し、内容を確認して送信してください。":purpose==="ブランチを申請したい"?"記入済みのブランチ申請書を添付してください。前振込の場合は振込明細書も添付し、確認して送信してください。":"申請書の添付を確認して送信してください。");
}
function emailUI(panel,doc,purpose){if(!mailTemplates[purpose]){mailSteps(panel,doc,"attach",purpose);return}const choices=el("div","method-choices"),steps=el("div","mail-instructions");panel.append(choices,steps);[["body","メール本文に必要事項を記入する"],["attach","記入済みの申請書を添付する"]].forEach(([v,t],i)=>{const label=el("label","method-choice"),radio=el("input");radio.type="radio";radio.name="mail-method";radio.value=v;radio.checked=i===0;radio.onchange=()=>mailSteps(steps,doc,v,purpose);label.append(radio,document.createTextNode(t));choices.append(label)});mailSteps(steps,doc,"body",purpose)}
function postalUI(doc){add("h3","method-title","郵送で提出する");const panel=add("div","submit-content");const ol=el("ol","mail-steps");panel.append(ol);const first=el("li");first.append(el("strong","","申請書を準備する"));documentSteps(first,doc,true);ol.append(first);const second=el("li");second.append(el("strong","","郵送する"),el("p","method-note","記入した書類を以下の宛先に郵送してください。"));const address=el("address","postal-address",postal);second.append(address,el("p","method-note","※郵送料はお客さま負担となります。"));ol.append(second)}
function faxUI(panel,doc){const ol=el("ol","mail-steps");panel.append(ol);const first=el("li");first.append(el("strong","","申請書を準備する"));documentSteps(first,doc,true);ol.append(first);const second=el("li");second.append(el("strong","","FAXで送信する"),el("p","method-note","記入した申請書を次の番号に送信してください。"),el("p","fax-number","03-6550-8991"));ol.append(second);const third=el("li");third.append(el("strong","","送信結果を確認する"));ol.append(third)}
function submitSelector(doc,purpose){add("h3","method-title","提出方法を選んでください");const options=add("div","submit-options"),panel=add("div","submit-content"),buttons=[];[["email","メールで提出"],["fax","申請書（FAX）で提出"]].forEach(([id,label])=>{const b=el("button","submit-option",label);b.type="button";b.setAttribute("aria-pressed","false");b.onclick=()=>{buttons.forEach(x=>x.setAttribute("aria-pressed",String(x===b)));panel.replaceChildren();if(id==="email")emailUI(panel,doc,purpose);else faxUI(panel,doc)};options.append(b);buttons.push(b)});buttons[0].click();note("※提出方法は本社確認内容に基づいています。詳細は公式案内をご確認ください。")}
function returnRefundGuide(purpose){if(purpose!=="クーリングオフしたい"&&purpose!=="解約したい")return;const cooling=purpose==="クーリングオフしたい";const section=add("section","return-refund-guide");section.append(el("h3","return-refund-title","申請後の返品・返金について"));const cards=el("div","return-refund-cards");section.append(cards);function item(title,description){const card=el("div","return-refund-card");card.append(el("h4","",title),el("p","",description));cards.append(card)}if(cooling){item("申請できる期間","契約書面または初回商品の受領日のうち、遅い日を起算日として20日間です。");item("商品の返品","商品がある場合は、ニナファームジャポン宛に着払いで返送してください。");item("返金","商品代金（税・配送手数料込）は、原則として登録口座へ速やかに返金されます。");}else{item("返品できる商品の条件","退会に伴う返品は、会員登録日から1年以内の解約、商品の引渡しから90日以内、未使用・未開封で再販売できる状態など、申請書に記載された条件をすべて満たす場合に限られます。");item("返品時の送料","返品送料は会員負担です。商品に同梱されていた納品書も一緒に返送してください。");item("返金","返品商品を本社が確認した後、配送手数料を除く商品代金（税込）から振込事務手数料700円（税込）を差し引き、登録口座へ返金されます。");item("定期購入について","解約（退会）に伴い定期購入も停止されます。発送の締切日により、解約後に商品が届く場合があります。")}procedureNotice(section,"2025年12月1日版の公式申請書に基づく概要です。条件や手続きの詳細は最新の公式申請書・会員規約をご確認ください。")}
function pilotAddress(doc,purpose){add("p","procedure-pilot-lead","申請方法を選ぶと、その方法の手順を表示します。");const choices=add("div","submit-options");const result=add("section","procedure-action");const postalOnly=purpose==="マイナンバーを届け出たい"||purpose==="口座振替・自動振込を申し込みたい";const methods=postalOnly?[["postal","郵送で申請"]]:[["email","メールで申請"],["fax","FAXで申請"]];const buttons=[];methods.forEach(([id,label])=>{const button=el("button","submit-option",label);button.type="button";button.setAttribute("aria-pressed","false");button.onclick=()=>{buttons.forEach(x=>x.setAttribute("aria-pressed",String(x===button)));result.replaceChildren();result.append(el("h3","procedure-step-title",id==="email"?"メールで申請する手順":id==="fax"?"FAXで申請する手順":"郵送で申請する手順"));const panel=el("div","submit-content");result.append(panel);if(id==="email")mailSteps(panel,doc,mailTemplates[purpose]?"body":"attach",purpose);else if(id==="fax")faxUI(panel,doc);else{const ol=el("ol","mail-steps");panel.append(ol);const first=el("li");first.append(el("strong","","申請書を準備する"));documentSteps(first,doc,true);ol.append(first);const second=el("li");second.append(el("strong","","郵送する"),el("p","method-note","記入した書類を以下の宛先に郵送してください。"),el("address","postal-address",postal),el("p","method-note","※郵送料はお客さま負担となります。"));ol.append(second)}};choices.append(button);buttons.push(button)});buttons[0].click();if(purpose==="氏名などを変更したい")procedureNotice(app,"氏名変更では、住民票（コピー可）、戸籍全部事項証明書（戸籍謄本・コピー可）、運転免許証のコピー、マイナンバーカード表面のコピーのいずれかも提出してください。","check");returnRefundGuide(purpose);procedureNotice(app,"申請前に、公式申請書の注意事項と最新の条件を必ずご確認ください。")}
function identityDocumentsGuide(doc,purpose){
 add("p","procedure-pilot-lead","本人確認書類は、会員登録後でもメールで提出できます。必要な書類を画像またはPDFでご用意ください。");
 add("p","procedure-pilot-lead","申請方法を選ぶと、その方法の手順を表示します。");
 const choices=add("div","submit-options"),result=add("section","procedure-action"),buttons=[];
 [["email","メールで申請"]].forEach(([id,label])=>{
 const button=el("button","submit-option",label);button.type="button";button.setAttribute("aria-pressed","false");
 button.onclick=()=>{
 buttons.forEach(x=>x.setAttribute("aria-pressed",String(x===button)));result.replaceChildren();
 result.append(el("h3","procedure-step-title",id==="email"?"メールで申請する手順":"FAXで申請する手順"));
 const panel=el("div","submit-content");result.append(panel);
 if(id==="fax"){faxUI(panel,doc);return}
 const ol=el("ol","mail-steps");panel.append(ol);
 const first=el("li");first.append(el("strong","","必要書類を準備する"),el("p","method-note","本人確認書類の画像またはPDFを用意してください。満25歳未満の方は、署名・捺印した貼付用紙も添付してください。"));ol.append(first);
 const second=el("li");second.append(el("strong","","申請メールを作成する"),el("p","method-note","宛先："+email));ol.append(second);
 const template=mailTemplates[purpose],a=el("a","secondary-action","申請メールを作成する ↗");
 a.href="mailto:"+email+"?subject="+encodeURIComponent(template.subject)+"&body="+encodeURIComponent(template.body);second.append(a);
 const details=el("details","mail-fallback");details.append(el("summary","","本文がコピーされない場合はこちら"));
 const actions=el("div","fallback-actions");[["件名をコピー",template.subject],["本文をコピー",template.body]].forEach(([label,value])=>{const b=el("button","secondary-action",label);b.type="button";b.onclick=()=>copyText(value,b);actions.append(b)});details.append(actions);second.append(details);
 const third=el("li");third.append(el("strong","","添付を確認して送信する"),el("p","method-note","会員番号・氏名を記入し、必要書類を添付したことを確認して送信してください。"));ol.append(third);
 };choices.append(button);buttons.push(button)
 });buttons[0].click();
 const section=add("section","family-shipping-guide requirement-visual requirement-documents");
 section.append(el("h3","family-shipping-title","必要書類"));
 const list=el("div","family-shipping-conditions");section.append(list);
 [
 ["満25歳未満の方","本人確認書類と、署名・捺印した本人確認書類貼付用紙が必要です。"],
 ["外国籍の方","在留カードまたは特別永住者証明書のコピーが必要です。"],
 ["法人登録の方","登記事項証明書（登記簿謄本）のコピーなど、公式申請書に指定された書類が必要です。"]
 ].forEach(([title,description])=>{const item=el("div","family-shipping-condition");item.append(el("strong","",title),el("p","",description));list.append(item)});
 section.append(el("h3","family-shipping-title","本人確認書類の例"));
 section.append(el("p","method-note","運転免許証、マイナンバーカードの表面、住民票など。生年月日と住所を確認できる書類をご用意ください。"));
 procedureNotice(section,"従来の健康保険証は2025年12月2日以降使用できません。パスポートには発行時期による制限があります。","check");
 procedureNotice(section,"申請書の住所と本人確認書類の住所が異なる場合は、公共料金の領収書も必要です。最新の公式申請書でご確認ください。");
 procedureNotice(app,"申請前に、最新の本人確認書類貼付用紙の条件と注意事項を必ずご確認ください。");
}
function familyShippingGuide(){
 const section=add("section","family-shipping-guide requirement-visual requirement-eligibility");
 section.append(el("h3","family-shipping-title","申請条件"));
 const list=el("div","family-shipping-conditions");section.append(list);
 const conditions=[
 ["対象となるご家族","代表者と同居し、登録住所が同じご家族が対象です。"],
 ["お支払い方法","クレジットカード決済のみ対象です。口座振替・代金引換、支店・ブランチのおまとめ配送は対象外です。"],
 ["送料","代表者に配送手数料1,000円（税込）がかかります。おまとめ配送の代金合計が30,000円（税込）以上の場合は無料です。"],
 ["反映時期","翌月の配送分から反映したい場合、書類の受付期限は毎月10日です。"],
 ["解除について","代表者の定期購入が停止すると、おまとめ配送も解除されます。"]
 ];
 conditions.forEach(([label,description])=>{const row=el("div","family-shipping-condition");row.append(el("strong","",label),el("p","",description));list.append(row)});
 requirementSection("必要書類",[["名字が異なる場合","続柄を確認できる住民票を提出してください。"]]);
}
function creditCardGuide(doc){
 add("p","procedure-pilot-lead","クレジットカード情報の登録・変更・更新は、E-Serviceからのお手続きがおすすめです。");
 const primary=add("section","subscription-primary");
 primary.append(el("h3","procedure-step-title","E-Serviceで手続きする"));
 primary.append(el("p","method-note","ログイン後、カード情報の登録・更新へお進みください。"));
 const a=el("a","eservice-link","E-Serviceにログインする ↗");a.href=login;a.target="_blank";a.rel="noopener noreferrer";primary.append(a);
 procedureNotice(primary,"ニナファームカードをご利用の方へ：カードの登録・変更はE-Serviceからお手続きください。NiNAはニナファームカード独自のポイントです。");
 const secondary=add("details","subscription-alternative");
 secondary.append(el("summary","subscription-alternative-toggle","書面で申請したい方はこちら"));
 const content=el("div","subscription-alternative-content");secondary.append(content);
 content.append(el("p","method-note","書面で手続きする場合は、「"+doc+"」をご確認のうえ、記載された手順に従って申請してください。"));

 procedureNotice(app,"申請前に、公式申請書の注意事項と最新の条件を必ずご確認ください。");
}
function subscriptionGuide(purpose,doc){
 add("p","procedure-pilot-lead","定期購入の変更・停止・再開は、E-Serviceからお手続きいただけます。");
 const primary=add("section","subscription-primary");
 primary.append(el("h3","procedure-step-title","E-Serviceで手続きする"));
 primary.append(el("p","method-note","ログイン後、「定期購入情報」へお進みください。"));
 const linkButton=el("a","eservice-link","E-Serviceにログインする ↗");linkButton.href=login;linkButton.target="_blank";linkButton.rel="noopener noreferrer";primary.append(linkButton);
 const secondary=add("details","subscription-alternative");
 secondary.append(el("summary","subscription-alternative-toggle","メール・FAXで申請したい方はこちら"));
 const content=el("div","subscription-alternative-content");secondary.append(content);
 content.append(el("p","method-note","「定期購入変更届」に記入して提出します。メールの場合は、申請書の画像またはPDFを添付してください。"));
 const choices=el("div","submit-options"),panel=el("div","submit-content");content.append(choices,panel);
 const buttons=[];
 [["email","メールで申請"],["fax","FAXで申請"]].forEach(([id,label])=>{const button=el("button","submit-option",label);button.type="button";button.setAttribute("aria-pressed","false");button.onclick=()=>{buttons.forEach(x=>x.setAttribute("aria-pressed",String(x===button)));panel.replaceChildren();if(id==="email")mailSteps(panel,doc,"attach",purpose);else faxUI(panel,doc)};choices.append(button);buttons.push(button)});
 buttons[0].click();
 const deadline=add("section","subscription-deadline");
 deadline.append(el("h3","","翌月度から反映する場合の受付期限"));
 const dates=el("div","subscription-deadline-grid");deadline.append(dates);
 const regular=el("div","subscription-deadline-item");regular.append(el("span","","通常の変更・停止・再開"),el("strong","","当月10日まで"));dates.append(regular);
 const special=el("div","subscription-deadline-item");special.append(el("span","","カード・代引きの停止のみ"),el("strong","","当月末の2営業日前まで"));dates.append(special);
 procedureNotice(deadline,"上記は翌月度から反映させるための書面申請の受付期限です。E-Serviceの期限は別途ご確認ください。年末年始などは受付日が異なる場合があります。");
}
function reactivationConditions(){
 const section=add("section","family-shipping-guide requirement-visual requirement-eligibility");
 section.append(el("h3","family-shipping-title","申請条件"));
 const list=el("div","family-shipping-conditions");section.append(list);
 const conditions=[
 ["購入条件","復活を希望する月度に、ボーナス対象商品を20,000ポイント以上購入する必要があります。"],
 ["申請のタイミング","購入した月度中に申請すると、その月度からの復活につながります。後の月度に申請した場合、過去の月度にはさかのぼって復活しません。"],
 ["復活時期","申請が受理された月度から会員資格が復活します。過去の月度にはさかのぼりません。"],
 ["有効期間","購入月度と申請月度が異なる場合も、有効期間は最後の購入月度から6か月間です。"]
 ];
 conditions.forEach(([name,description])=>{const item=el("div","family-shipping-condition");item.append(el("strong","",name),el("p","",description));list.append(item)});
 procedureNotice(section,"例えば4月に購入し6月に申請が受理された場合、復活は6月からで、4月・5月の権利は戻りません。","check");
 procedureNotice(section,"支店・ブランチの復活には、本店の会員資格が有効であることなどの追加条件があります。");
}
function requirementSection(title,items){
 const section=add("section","family-shipping-guide requirement-section requirement-visual");
 section.classList.add(/書類|記入事項/.test(title)?"requirement-documents":"requirement-eligibility");
 section.append(el("h3","family-shipping-title",title));
 const list=el("div","family-shipping-conditions");section.append(list);
 items.forEach(([label,description])=>{const row=el("div","family-shipping-condition");row.append(el("strong","",label),el("p","",description));list.append(row)});
 return section;
}
function transferAndEntityGuide(purpose){
 if(purpose==="ポジションを譲渡・相続したい"){
  const conditions=requirementSection("申請条件",[
   ["対象者","個人名義の譲渡・相続は、二親等以内の血縁関係に限られます。"],
   ["相続の期限","死亡による相続は、当該会員の死亡日から3か月以内に手続きを完了する必要があります。"],
   ["再登録の制限","譲渡・相続後の再登録は6か月経過しなければ登録できません。審査結果によっては変更できない場合があります。"]
  ]);
  conditions.classList.add("requirement-visual","requirement-eligibility");
  const docs=requirementSection("必要書類・記入事項",[
   ["申請書","「譲渡・相続」欄にチェックを入れ、譲渡・相続理由を記入してください。"],
   ["会員登録申請書","譲渡・相続する方は新たな会員番号となるため、会員登録申請書に必要事項をすべて記入して提出してください。"]
  ]);
  docs.classList.add("requirement-visual","requirement-documents");
  const selector=el("div","requirement-document-filter");
  selector.append(el("p","requirement-filter-title","名義に応じた必要書類"));
  const options=el("div","requirement-filter-options"),details=el("div","requirement-filter-result");
  const variants=[
   ["個人名義","二親等以内の血縁関係がわかる書類を提出してください。戸籍全部事項証明書（戸籍謄本・コピー可）、または続柄記載の住民票（コピー可）。"],
   ["法人名義","登記事項証明書（登記簿謄本・コピー可）を提出してください。証明書に名前がない方は、社員であることを証明できる公の書面も必要です。"]
  ];
  const buttons=[];
  variants.forEach(([label,description],index)=>{
   const button=el("button","requirement-filter-button",label);button.type="button";
   button.onclick=()=>{buttons.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));details.replaceChildren();const row=el("div","requirement-filter-detail");row.append(el("strong","",label+"の場合"),el("p","",description));details.append(row)};
   options.append(button);buttons.push(button);if(index===0)button.setAttribute("aria-pressed","true");else button.setAttribute("aria-pressed","false");
  });
  selector.append(options,details);docs.append(selector);buttons[0].click();
  const extra=el("div","requirement-extra");extra.append(el("strong","","満25歳未満の方"),el("p","","本人確認書類貼付用紙と本人確認書類も提出してください。"));docs.append(extra);
 }else if(purpose==="法人登録したい"){
  requirementSection("必要書類・記入事項",[
   ["申請書","「法人・個人変更」欄にチェックを入れ、変更後の法人名・住所・連絡先を記入してください。"],
   ["登記事項証明書","登記事項証明書（登記簿謄本・コピー可）。証明書に名前が記載されていない場合は、社員であることを証明できる公の書面も必要です。"],
   ["口座振替依頼書","個人登録から法人登録へ変更する場合は、口座振替依頼書も提出してください。"]
  ]);
 }else{
  requirementSection("必要書類・記入事項",[
   ["申請書","「法人・個人変更」欄にチェックを入れ、変更後の個人名・住所・連絡先を記入してください。"],
   ["口座振替依頼書","登録者個人の口座振替依頼書を提出してください。"]
  ]);
 }
}
function branchApplicationGuide(doc,purpose){
 add("p","procedure-pilot-lead","ブランチ申請は、記入済みの申請書をメールまたはFAXで提出します。メール本文だけでの申請はできません。");
 pilotAddress(doc,purpose);
 requirementSection("申請条件",[
  ["申請できる時期","タイトルを達成し、確定した月度の翌月度から、既定の配置数まで申請できます。"],
  ["紹介者と配置","ブランチの紹介者は本店となります。上位者を指定した場合は、その会員を基点とした自動配置になります。"]
 ]);
 requirementSection("必要書類・記入事項",[
  ["ブランチ申請書","申請日、今回申請する新しい会員番号、氏名・法人名、連絡先、支払方法、上位者指定欄、配送希望時間帯などを記入してください。"],
  ["お支払い方法","クレジットカード決済・前振込・代金引換から選択します。カード決済は事前のカード登録、前振込は事前の振込が必要です。"],
  ["前振込の場合","振込明細書を添付してください。申請書の案内に従い、申込者と同じ名義で振り込んでください。"]
 ]);
}
function salonShoppingGuide(purpose){
 add("p","procedure-pilot-lead","商品・販促品のご購入は、まずお近くのサロンをご利用ください。E-Serviceからもご注文いただけます。");
 const section=add("section","salon-shopping-guide");
 const title=el("h3","method-title","購入先を選ぶ");section.append(title);
 const nationwide=el("div","salon-shopping-choice");
 nationwide.append(el("strong","","全国のサロンを探す"));
 nationwide.append(el("p","method-note","全国のサロン検索ページへのリンクは、公式の掲載先を確認してから追加します。"));
 section.append(nationwide);
 const south=el("div","salon-shopping-choice");
 south.append(el("strong","","プラッス ドゥ ニナ 南熊本店"));
 south.append(el("p","method-note","このメンバーズガイドを制作している南熊本店のサイトです。"));
 const local=el("a","eservice-link","南熊本店のサイトを見る ↗");local.href="./index.html";south.append(local);
 section.append(south);
 const online=el("div","salon-shopping-choice");
 online.append(el("strong","","E-Serviceで購入する"));
 online.append(el("p","method-note","E-Serviceにログインし、ショッピングからご注文ください。"));
 const a=el("a","eservice-link","E-Serviceにログインする ↗");a.href=login;a.target="_blank";a.rel="noopener noreferrer";online.append(a);
 section.append(online);app.append(section);
}
function renderDetail(i,j){const [purpose,doc,type]=groups[i].items[j];app.replaceChildren();updateProcedureBreadcrumb(i);heading(purpose);if(type==="card"){creditCardGuide(doc);return}if(purpose==="定期購入の内容を変更したい"||purpose==="定期購入を停止したい"||purpose==="定期購入を再開したい"){subscriptionGuide(purpose,doc);return}if(purpose==="本人確認書類を提出したい"){identityDocumentsGuide(doc,purpose);return}if(purpose==="会員資格を復活したい"){pilotAddress(doc,purpose);reactivationConditions();return}if(purpose==="家族の定期購入をまとめたい"){pilotAddress(doc,purpose);familyShippingGuide();return}if(purpose==="ブランチを申請したい"){branchApplicationGuide(doc,purpose);return}if(purpose==="ポジションを譲渡・相続したい"||purpose==="法人登録したい"||purpose==="法人から個人登録へ変更したい"){pilotAddress(doc,purpose);transferAndEntityGuide(purpose);return}if(type!=="card"&&type!=="subscription"&&type!=="shopping"){pilotAddress(doc,purpose);return}if(purpose==="氏名などを変更したい")note("氏名変更では、住民票（コピー可）、戸籍全部事項証明書（戸籍謄本・コピー可）、運転免許証のコピー、マイナンバーカード表面のコピーのいずれかも提出してください。");if(purpose==="クーリングオフしたい")note("クーリングオフは20日以内です。返品する商品は本社へ着払いで返送してください。");if(type==="card"){eservice("カード情報登録・更新へ");note("※「ニナファームカード」の場合は、E-Serviceよりご登録ください。");note("「クレジット決済番号届出書」で登録すると、特典およびNiNAの付与が受けられません。");const sec=add("section","detail-divider");add("p","method-note","書面での手続きが必要な場合の書類： "+doc,sec)}else if(type==="subscription"){eservice("定期購入情報へ");const sec=add("section","detail-divider");add("p","method-note","書面での手続きが必要な場合の書類： "+doc,sec)}else if(type==="shopping"){salonShoppingGuide(purpose)}else{if(purpose==="マイナンバーを届け出たい"||purpose==="口座振替・自動振込を申し込みたい"){postalUI(doc)}else{submitSelector(doc,purpose)}}if(purpose==="法人登録したい"||purpose==="本人確認書類を提出したい")add("p","method-note","本人確認書類の提出が必要となる場合があります。必要書類・提出方法は公式案内をご確認ください。");procedureNotice(app,"申請前に、公式申請書の注意事項と最新の条件を必ずご確認ください。","check")}
function detail(i,j){renderDetail(i,j);app.querySelectorAll(".procedure-notice").forEach(n=>{if(n.textContent==="申請前に、公式申請書の注意事項と最新の条件を必ずご確認ください。"||n.textContent==="申請前に、最新の本人確認書類貼付用紙の条件と注意事項を必ずご確認ください。")n.remove()});procedureNotice(app,"申請前に、公式申請書の注意事項と最新の条件を必ずご確認ください。");const footer=add("div","procedure-bottom-back");const b=el("button","inner-back","← 手続き一覧に戻る");b.type="button";b.onclick=()=>home(i);footer.append(b)}
function openInitialCategory(){const match=location.hash.match(/^#category=([0-9]+)(?:&item=([0-9]+))?$/);if(match){const i=Number(match[1]),j=match[2]===undefined?null:Number(match[2]);if(Number.isInteger(i)&&i>=0&&i<groups.length){if(j!==null&&Number.isInteger(j)&&j>=0&&j<groups[i].items.length){detail(i,j);return}category(i);return}}home()}
window.addEventListener("hashchange",openInitialCategory);
openInitialCategory();