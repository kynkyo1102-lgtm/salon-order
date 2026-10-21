document.addEventListener('DOMContentLoaded',function(){
  const boxes=Array.from(document.querySelectorAll('.registration-step .walkthrough-check input'));
  const label=document.getElementById('walkthrough-progress');
  function update(){
    const done=boxes.filter(function(box){return box.checked}).length;
    if(label)label.textContent=done+' / '+boxes.length+' 件確認済み（ページを閉じるとリセット）';
  }
  boxes.forEach(function(box){box.addEventListener('change',update)});
  update();
});
