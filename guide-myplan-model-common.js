/* Shared, identical My Plan model-generation code. Keep loaded before page-specific script. */

const yen=n=>n.toLocaleString("ja-JP")+"円",pts=n=>(n/10000).toLocaleString("ja-JP",{maximumFractionDigits:1})+"万PT";
const ranges=[10000,40000,100000];
let selected=0, candidates=[];
function generate(goal){
 if(goal===1000000){return [{lapis:true,large:true,gold:true,ax:3000000,ar:3000000,bl:3000000,br:3000000,left:6010000,right:6010000,abasic:300000,bbasic:300000,own:601000,mega:898000,doubleMega:29800,leadership:120200,total:1649000,secondary:[{name:"Cさん",parent:"あなた",left:1500000,right:1490000,basic:149000,title:"サファイヤ"},{name:"Dさん",parent:"Aさん",left:1500000,right:1490000,basic:149000,title:"サファイヤ"},{name:"Eさん",parent:"Bさん",left:1500000,right:1490000,basic:149000,title:"サファイヤ"},{name:"Fさん",parent:"あなた",left:1500000,right:1490000,basic:149000,title:"サファイヤ"}]}];}
 if(goal===500000){return [{lapis:true,large:true,ax:2010000,ar:1010000,bl:2010000,br:1010000,left:3030000,right:3030000,abasic:101000,bbasic:101000,own:303000,mega:202000,doubleMega:30000,leadership:45450,total:580450,secondary:[{name:"Cさん",parent:"Aさん",left:1000000,right:1000000,basic:100000,title:"サファイヤ"},{name:"Dさん",parent:"Aさん",left:500000,right:500000,basic:50000,title:"ラピス"},{name:"Eさん",parent:"Bさん",left:1000000,right:1000000,basic:100000,title:"サファイヤ"},{name:"Fさん",parent:"Bさん",left:500000,right:500000,basic:50000,title:"ラピス"}]}];}
 if(goal===200000){return [{lapis:true,sapphire:true,ax:490000,ar:500000,bl:490000,br:500000,left:1000000,right:1000000,abasic:49000,bbasic:49000,own:100000,mega:98000,doubleMega:9600,total:207600,secondary:[{name:"Cさん",parent:"Aさん",left:240000,right:240000,basic:24000},{name:"Dさん",parent:"Aさん",left:250000,right:240000,basic:24000},{name:"Eさん",parent:"Bさん",left:240000,right:240000,basic:24000},{name:"Fさん",parent:"Bさん",left:250000,right:240000,basic:24000}]}];}
 if(goal===100000){return [{lapis:true,ax:250000,ar:250000,bl:250000,br:250000,left:510000,right:510000,abasic:25000,bbasic:25000,own:51000,mega:50000,doubleMega:4800,total:105800,secondary:[{name:"Cさん",parent:"Aさん",left:120000,right:120000,basic:12000},{name:"Dさん",parent:"Aさん",left:120000,right:120000,basic:12000},{name:"Eさん",parent:"Bさん",left:120000,right:120000,basic:12000},{name:"Fさん",parent:"Bさん",left:120000,right:120000,basic:12000}]}];}

 if(goal===40000){const ax=100000,ar=100000,bl=100000,br=100000,left=210000,right=210000,abasic=10000,bbasic=10000,own=21000,mega=20000,doubleMega=0;return [{ax,ar,bl,br,left,right,abasic,bbasic,own,mega,doubleMega,total:own+mega}];}

 const found=[],seen=new Set();
 // A/B each have their own two group totals; the parent's side also includes A/B's own 00 position.
 // Each scenario assumes 2 active direct referrals and a 10% basic rate.
 const modes=goal===10000?["Aさん・Bさんが同じくらい育つ","片方のグループが少し大きい","紹介した2人もボーナスを受け取る"]:["Aさん・Bさんが同じくらい育つ","片方のグループが少し大きい","紹介した2人もボーナスを受け取る","Aさん・Bさんの実績を伸ばす"];
 for(const mode of modes){
  let best=null,dist=Infinity;
  const step=goal>=300000?10000:5000;
  const max=goal>=600000?6500000:goal>=300000?3500000:650000;
  for(let a=30000;a<=max;a+=step){
   // A and B each have at least 30,000 PT on the smaller side.
   for(const fraction of [0.8,0.9,1,1.1,1.2]){
    const b=Math.max(30000,Math.round(a*fraction/step)*step);
    if(b>max)continue;
    // A/B own basic uses their respective smaller group PT.
    const abasic=Math.round(a*.1),bbasic=Math.round(b*.1);
    for(const extra of [0,0.1,0.2,0.3,0.4]){
     const ax=a,ar=a+Math.round(a*extra/step)*step;
     const bl=b,br=b+Math.round(b*(mode==="片方のグループが少し大きい"?Math.min(0.5,extra+0.1):extra)/step)*step;
     const left=10000+ax+ar,right=10000+bl+br;
     const own=Math.round(Math.min(left,right)*.1);
     // Mega Match applies only for Crystal+; its eligibility is assumed in 5万円+ scenarios.
     const mega=goal===10000?0:abasic+bbasic;
     const total=own+mega;
     if(total<goal||total>=goal+(goal===10000?10000:10000))continue;
     const ratio=mega/(total||1),balance=Math.min(left,right)/Math.max(left,right);
     const objective=mode==="Aさん・Bさんが同じくらい育つ"?Math.abs(balance-1)+Math.abs(fraction-1)*.05:mode==="緩やかな左右差型"?Math.abs(balance-.78)+Math.abs(fraction-.9)*.02:mode==="紹介した2人もボーナスを受け取る"?Math.abs(ratio-.38)+Math.abs(balance-.9)*.1:Math.abs(ratio-.48)+Math.abs(balance-.88)*.1;
     if(Math.max(ax,ar)/Math.min(ax,ar)>1.5||Math.max(bl,br)/Math.min(bl,br)>1.5)continue;const key=[ax,ar,bl,br].join("/");
     if(!seen.has(key)&&objective<dist){dist=objective;best={mode,ax,ar,bl,br,left,right,abasic,bbasic,own,mega,total,key}}
    }
   }
  }
  if(best){seen.add(best.key);found.push(best)}
 }
 return found;
}
