/* Open a step when navigating from the table of contents or a direct #step link. */
(function(){
  function openTarget(){
    const id=decodeURIComponent(location.hash.slice(1));
    if(!/^step\d+$/.test(id))return;
    const target=document.getElementById(id);
    if(target && target.matches('details.registration-step'))target.open=true;
  }
  document.addEventListener('DOMContentLoaded',openTarget);
  window.addEventListener('hashchange',openTarget);
  document.addEventListener('click',function(event){
    const link=event.target.closest('a[href^="#step"]');
    if(!link)return;
    const target=document.getElementById(link.getAttribute('href').slice(1));
    if(target && target.matches('details.registration-step'))target.open=true;
  });
})();
