const salons=[{"name":"ニナファームジャポン札幌店","address":"北海道札幌市東区北15条東1丁目1-28　サニープレイス151","hours":"①10：00～18：00","closed":"日、祝日","owner":"","notes":"②（火曜のみ）13：00～18：00"},{"name":"プラッスドゥニナ札幌中央店","address":"北海道札幌市中央区南6条西15丁目2－7 窪田ビル1Ｆ","hours":"11：00～16：00","closed":"日・月・火","owner":"新谷　暢敏さん","notes":""},{"name":"プラッスドゥニナ旭山記念公園店","address":"北海道札幌市中央区界川1丁目5-6","hours":"（※1）","closed":"不定休","owner":"小西　美由紀さん","notes":"（※1）サロンをご利用の際は、下記メールアドレス宛へ事前に連絡をお願いいたします。 / メールアドレス：info@huithub.com / オープン　2024年11月16日"},{"name":"プラッスドゥニナ札幌月寒店","address":"北海道札幌市豊平区月寒東4条16丁目1-3　月寒Ｔ・Ｂ103","hours":"11：00～17：00","closed":"日・月・火","owner":"本多　抽紀江さん","notes":"オープン　2026年5月30日"},{"name":"プラッスドゥニナ旭川春光店","address":"北海道旭川市春光6条7丁目8-17","hours":"11：00～17：00","closed":"日・月・火","owner":"本多　抽紀江さん","notes":"オープン　2025年7月27日"},{"name":"プラッスドゥニナ秋田山王店","address":"秋田県秋田市山王6丁目11‐3","hours":"11：30～17：00","closed":"月","owner":"五十嵐　れい子さん","notes":""},{"name":"プラッスドゥニナ仙台泉店","address":"宮城県黒川郡大和町杜の丘2-18-6","hours":"11：00～16：00","closed":"火、木、日、祝日","owner":"佐々木　美佳さん","notes":"移転オープン　2026年8月1日"},{"name":"プラッスドゥニナ岐阜東栄店","address":"岐阜県岐阜市東栄町1-22　ビジネスプラザ22東棟一階南","hours":"10：00～18：00","closed":"水（4・5・9・10・11・12月）、土（毎週）","owner":"畠山　直也さん","notes":""},{"name":"プラッスドゥニナ四日市富田店","address":"三重県四日市市富田3‐22‐14","hours":"10：00～17：00","closed":"土、日、祝日","owner":"兼島　麻衣さん","notes":""},{"name":"プラッスドゥニナ栗東店","address":"滋賀県栗東市安養寺1丁目2-7　Lポート103","hours":"10：00～17：00","closed":"水、木、日、祝日","owner":"吉川　真理さん","notes":""},{"name":"プラッスドゥニナ湖南中央店","address":"滋賀県湖南市中央1丁目44-1 市兵衛第1ビル 1101","hours":"10：00～17：00","closed":"日、月、金","owner":"竪山　絵里さん","notes":"オープン　2026年8月26日"},{"name":"プラッスドゥニナ京都丹後店","address":"京都府宮津市宮本383","hours":"10：00～17：00","closed":"日、祝日","owner":"澤木　恭子さん","notes":""},{"name":"プラッスドゥニナ京都宇治小倉店","address":"京都府宇治市小倉町西浦78番3‐1‐B","hours":"10：00～17：00","closed":"日、祝日","owner":"中村　典子さん","notes":""},{"name":"プラッスドゥニナ宇治東店","address":"京都府宇治市五ヶ庄戸ノ内7-70","hours":"11：00～17：00","closed":"月、土、日、祝日","owner":"谷内　民江さん","notes":"オープン　2025年5月27日"},{"name":"プラッスドゥニナ京都石清水店","address":"京都府八幡市八幡旦所23","hours":"10：30～18：00","closed":"火、日","owner":"岡田　由起子さん","notes":"※祝日は11：00～17：00"},{"name":"プラッスドゥニナ京都烏丸御池店","address":"京都府京都市中京区三条通新町西入ル釜座町35","hours":"10：00～16：00","closed":"日、祝日","owner":"南　喜晴さん","notes":""},{"name":"プラッスドゥニナ京都洛東店","address":"京都府京都市山科区川田岡ノ西1-7　レオ松本101","hours":"11：00～17：30","closed":"日、水","owner":"長野　真理さん","notes":"オープン　2026年7月1日"},{"name":"プラッスドゥニナ奈良王寺店","address":"奈良県北葛城郡王寺町王寺2-6-1 まさごBuilding 3階","hours":"10：00～16：00","closed":"木、日、祝日","owner":"長山　功佑さん","notes":""},{"name":"プラッスドゥニナ大阪天満橋店","address":"大阪市北区天満4-3-5　中之島岡田ビル2階C号室","hours":"10：00～17：00","closed":"水、土、日","owner":"深見　玲欧南さん","notes":""},{"name":"プラッスドゥニナ神戸岡本店","address":"兵庫県神戸市東灘区田中町1‐15‐5　コマツビル本山201","hours":"10：00～17：00","closed":"日、水","owner":"柳生　晃子さん","notes":""},{"name":"プラッスドゥニナ兵庫加古川店","address":"兵庫県加古川市平岡町新在家1362-1　ロワイヤル森田1階2号","hours":"10：00～16：00","closed":"1～3月、6～8月  ：月、水、金、日","owner":"岡村　美由紀さん","notes":"4・5月、9～12月：月、水、木、金、日"},{"name":"プラッスドゥニナ宝塚清荒神店","address":"兵庫県宝塚市清荒神1丁目-11-1 「糀荒神kitchin」隣","hours":"10：00～17：00","closed":"月","owner":"吉田　抽香里さん","notes":"阪急電鉄宝塚線「清荒神駅」より徒歩10秒 / オープン　2025年7月16日"},{"name":"プラッスドゥニナ岡山瀬戸店","address":"岡山県岡山市東区瀬戸町瀬戸398‐3-2F","hours":"11：00～16：00","closed":"日、月、木、祝日","owner":"光畑　ゆかりさん","notes":""},{"name":"プラッスドゥニナ広島祇園店","address":"広島県広島市安佐南区長束1-34-22　長束ビル203","hours":"11：00～17：30","closed":"水、日、祝日","owner":"佐々木　康人さん","notes":""},{"name":"プラッスドゥニナ広島段原店","address":"広島県広島市南区段原南2丁目8　山田ビル　1階","hours":"11：00～15：00","closed":"日、祝日、火、水","owner":"松本　久美さん","notes":"オープン　2026年10月4日"},{"name":"プラッスドゥニナ山口周南店","address":"山口県周南市粟屋890-2","hours":"11：00～18：00","closed":"火、土、日、祝日","owner":"山崎　恵子さん","notes":""},{"name":"プラッスドゥニナ山口中央店","address":"山口県山口市中央1丁目3‐2","hours":"10：00～18：00","closed":"日、水","owner":"今澤　美和さん","notes":""},{"name":"ニナファームジャポン福岡オフィス","address":"福岡県福岡市博多区博多駅前3-13-1　林英ビル4F","hours":"10：00～17：00","closed":"土、日、祝日","owner":"","notes":""},{"name":"プラッスドゥニナ南久留米店","address":"福岡県久留米市野中町北屋敷1302-21","hours":"11：00～18：00","closed":"第3月曜日、土、日、祝日","owner":"川原　英樹さん","notes":""},{"name":"プラッスドゥニナ福岡平尾店","address":"福岡県福岡市中央区平尾2-17-15","hours":"11：00～19：00","closed":"水、木、金","owner":"酒瀬川　恭子さん","notes":""},{"name":"プラッスドゥニナ福岡糸島店","address":"福岡県糸島市前原西4丁目14-26","hours":"10：00～16：00","closed":"木、日、祝日","owner":"平尾　愛美さん","notes":""},{"name":"プラッスドゥニナ佐賀三日月店","address":"佐賀県小城市三日月町長神田2335-5","hours":"11：00～18：00","closed":"土、日、祝日","owner":"古賀　雄二さん","notes":""},{"name":"プラッスドゥニナ鳥栖店","address":"佐賀県鳥栖市元町1247-5　吉竹第2ビル5F","hours":"11：00～18：00","closed":"水、土、日、祝日","owner":"幸若　直樹さん","notes":""},{"name":"プラッスドゥニナ大分日田インター前店","address":"大分県日田市清岸寺町1137‐1","hours":"11：00～17：00","closed":"土、日、祝日","owner":"安心院　惇さん","notes":""},{"name":"プラッスドゥニナ長崎大村店","address":"長崎県大村市古賀島町1441-2-C","hours":"11：00～17：00","closed":"日、祝日、第2、4土曜日","owner":"岩本　進利さん","notes":""},{"name":"プラッスドゥニナ南熊本店","address":"熊本県熊本市南区田迎4丁目9-36　KSビル1F","hours":"11：00～17：00","closed":"水、土、日、祝日","owner":"幸若　直樹さん","notes":""},{"name":"プラッスドゥニナ熊本菊陽店","address":"熊本県菊池郡菊陽町津久礼157-6","hours":"13：00～18：00","closed":"月、水、金、日","owner":"中別府　裕子さん","notes":""},{"name":"プラッスドゥニナ宮崎都城店","address":"宮崎県都城市北原町1103-2　北原ビル1F","hours":"11：00～17：00","closed":"金、土、日、祝日","owner":"田坂　千秋さん","notes":""},{"name":"プラッスドゥニナ宮崎神宮外苑店","address":"宮崎県宮崎市南方町大迫254-3","hours":"11：00～17：00","closed":"火、木、土、日、祝日","owner":"堀切健二さん","notes":""},{"name":"プラッスドゥニナ鹿児島中央店","address":"鹿児島県鹿児島市下荒田3-3-10","hours":"11：00～17：00","closed":"月、火、日、祝日","owner":"豊村　和代さん","notes":""}];
const prefectures=['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
const groups={};for(const salon of salons){const p=prefectures.find(p=>salon.address.startsWith(p))||(salon.address.startsWith('大阪市')?'大阪府':null);if(p)(groups[p]??=[]).push(salon)}
const select=document.getElementById('salon-pref-select'),selected=document.getElementById('selected'),list=document.getElementById('list');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
for(const p of prefectures){if(!groups[p])continue;const option=document.createElement('option');option.value=p;option.textContent=p+'（'+groups[p].length+'店舗）';select.append(option)}
let active='';
function showList(){
 selected.hidden=false;
 const stores=groups[active]||[];
 selected.textContent=active+'（'+stores.length+'店舗）';
 list.innerHTML='<p class="citycaption">サロンを選ぶと、営業時間や住所などの詳細が表示されます。</p><div class="store-grid">'+stores.map((s,i)=>'<button type="button" class="store-card" data-store="'+i+'"><span class="store-card-top"><span class="store-card-index">SALON '+String(i+1).padStart(2,'0')+'</span><span class="store-card-pref">'+esc(active)+'</span></span><span class="store-card-main"><strong>'+esc(s.name)+'</strong><span class="store-address"><span aria-hidden="true">⌖</span> '+esc(s.address)+'</span></span><span class="store-card-bottom"><span class="store-card-hours">営業時間　'+esc(s.hours||'要確認')+'</span><span class="store-card-action">詳細を見る <span aria-hidden="true">↗</span></span></span></button>').join('')+'</div>';
 list.querySelectorAll('[data-store]').forEach(b=>b.addEventListener('click',()=>showStore(stores[Number(b.dataset.store)])));
}
function showStore(s){selected.hidden=false;selected.textContent='サロン情報';const fields=[['住所',s.address],['営業時間',s.hours||'要確認'],['定休日',s.closed||'要確認']];if(s.owner)fields.push(['オーナー',s.owner]);if(s.notes)fields.push(['備考',s.notes]);list.innerHTML='<button type="button" id="backStores" class="store-back">← '+esc(active)+'のサロン一覧に戻る</button><article class="store-detail"><div class="store-detail-heading"><span class="store-detail-kicker">SALON INFORMATION</span><h3>'+esc(s.name)+'</h3></div><div class="store-detail-body">'+fields.map(([label,value])=>'<div class="store-detail-row"><span class="store-detail-label">'+esc(label)+'</span><span class="store-detail-value">'+esc(value)+'</span></div>').join('')+'<a class="store-map-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.address)+'">Googleマップで場所を確認 ↗</a></div></article>';document.getElementById('backStores').addEventListener('click',showList);if(matchMedia('(max-width:750px)').matches)selected.scrollIntoView({behavior:'smooth',block:'start'})}
select.addEventListener('change',()=>{active=select.value;if(active)showList();else{selected.hidden=true;selected.textContent='';list.textContent='都道府県を選ぶとサロン一覧が表示されます。'}});



/* Prefecture-shaped map based on the locally hosted CC0 simplified Japan SVG. */
async function renderSalonMap(){
 const host=document.getElementById('salon-map');if(!host)return;
 try{
  const response=await fetch('./assets/japan-prefectures-deformed.svg');
  if(!response.ok)throw new Error('Map unavailable');
  const raw=await response.text();
  const doc=new DOMParser().parseFromString(raw,'image/svg+xml');
  if(doc.querySelector('parsererror'))throw new Error('Invalid map');
  const svg=doc.documentElement;
  svg.removeAttribute('width');svg.removeAttribute('height');
  svg.setAttribute('role','img');svg.setAttribute('aria-label','都道府県別のサロン分布図');
  svg.querySelectorAll('#prefecture-fills path[data-name]').forEach(path=>{
   const p=path.getAttribute('data-name'),n=(groups[p]||[]).length;
   path.setAttribute('class','salon-map-pref'+(n?' has-salon':''));
   path.setAttribute('tabindex',n?'0':'-1');
   path.setAttribute('role','button');
   path.setAttribute('aria-label',p+'、'+n+'店舗');
   const title=doc.createElementNS('http://www.w3.org/2000/svg','title');
   title.textContent=p+'：'+n+'店舗';path.prepend(title);
   const choose=()=>{if(!n)return;select.value=p;active=p;showList();updateSalonMapActive();document.querySelector('.salon-results').scrollIntoView({behavior:'smooth',block:'start'})};
   path.addEventListener('click',choose);
   path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}});
  });
  host.replaceChildren(document.adoptNode(svg));
  updateSalonMapActive();
 }catch(err){
  host.textContent='地図を読み込めませんでした。下の都道府県検索をご利用ください。';
 }
}
function updateSalonMapActive(){
 document.querySelectorAll('#salon-map .salon-map-pref').forEach(path=>{
  path.classList.toggle('is-active',path.getAttribute('data-name')===active);
 });
}
renderSalonMap();
select.addEventListener('change',updateSalonMapActive);
