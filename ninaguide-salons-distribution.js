(function(){
const map=document.getElementById('salon-map');
const total=document.getElementById('salon-total-count');
const regions=document.getElementById('salon-pref-count');
const info=document.getElementById('salon-map-selection');
const select=document.getElementById('salon-pref-select');
if(!map||!select)return;
function refresh(){
 const options=Array.from(select.options).filter(o=>o.value);
 const counts=new Map(options.map(o=>[o.value,Number((o.textContent.match(/（(\d+)店舗）/)||[])[1]||0)]));
 total.textContent=Array.from(counts.values()).reduce((a,b)=>a+b,0);
 regions.textContent=counts.size;
 map.querySelectorAll('path[data-name]').forEach(path=>{
  const n=counts.get(path.getAttribute('data-name'))||0;
  path.classList.remove('count-one','count-two','count-many');
  if(n)path.classList.add(n>=4?'count-many':n>=2?'count-two':'count-one');
 });
 const selected=select.value;
 info.textContent=selected?selected+'｜'+(counts.get(selected)||0)+'店舗のサロンが掲載されています。':'地図の青い都道府県を選んでみてください。';
}
const observer=new MutationObserver(refresh);
observer.observe(map,{childList:true});
select.addEventListener('change',refresh);
refresh();
})();