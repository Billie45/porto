

var secs=document.querySelectorAll('section.sec'),links=document.querySelectorAll('#sbnav a');
document.querySelectorAll('a.cert').forEach(function(cert){
 var row=document.createElement('div'),info=document.createElement('div'),button=document.createElement('a');
 row.className='cert';
 info.className='cert-info';
 info.innerHTML=cert.innerHTML;
 button.className='btn btn-outline-primary btn-sm cert-action';
 button.href=cert.href;
 button.target='_blank';
 button.rel='noopener';
 button.textContent='Show credential';
 row.append(info,button);
 cert.replaceWith(row);
});
function show(){
 var id=(location.hash||'#home').slice(1);
 if(!document.querySelector('section.sec[id="'+id+'"]')) id='home';
 secs.forEach(function(s){s.classList.toggle('show',s.id===id)});
 links.forEach(function(a){
  var on=a.getAttribute('href')==='#'+id;
  a.classList.toggle('active',on);
  if(on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
 });
 window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',show);
show();
links.forEach(function(a){
 a.addEventListener('click',function(){
  if(window.matchMedia('(max-width: 991.98px)').matches&&window.bootstrap){
   var oc=bootstrap.Offcanvas.getInstance(document.getElementById('sb')); if(oc) oc.hide();
  }
 });
});
