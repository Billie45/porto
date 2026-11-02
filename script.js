

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

var openProjectViewer;
var projectMedia={
 retinal:{
  title:'Retinal blood vessel segmentation with a modified VGA-Net',
  content:'<iframe class="project-pdf" src="project/retinal_blood/1747-Article%20Text-9169-1-10-20260709%20(1).pdf" title="Retinal blood vessel segmentation journal article"></iframe>'
 },
 waste:{
  title:'Waste detection model',
  images:[
   'project/waste_detection/0.jpg',
   'project/waste_detection/1.jpg',
   'project/waste_detection/2.jpg',
   'project/waste_detection/3.png'
  ],
  imageAlt:'Waste detection model preview'
 },
 application:{
  title:'Application recap system',
  images:[
   'project/application_recap/0.jpeg',
   'project/application_recap/1.jpeg',
   'project/application_recap/2.jpeg',
   'project/application_recap/3.jpeg',
   'project/application_recap/4.jpeg',
   'project/application_recap/5.jpeg'
  ],
  imageAlt:'Application recap system screen'
 }
};
function renderProjectCarousel(container,project){
 container.innerHTML='<div class="project-carousel">' +
  '<button class="project-carousel-button project-carousel-prev" type="button" aria-label="Previous image">&#8592;</button>' +
  '<img class="project-image project-carousel-image" alt="">' +
  '<button class="project-carousel-button project-carousel-next" type="button" aria-label="Next image">&#8594;</button>' +
  '<div class="project-carousel-counter" aria-live="polite"></div>' +
  '</div>';
 var image=container.querySelector('.project-carousel-image');
 var counter=container.querySelector('.project-carousel-counter');
 var index=0;
 function showImage(){
  image.src=project.images[index];
  image.alt=project.imageAlt+' '+(index+1);
  counter.textContent=(index+1)+' / '+project.images.length;
 }
 container.querySelector('.project-carousel-prev').addEventListener('click',function(){
  index=(index-1+project.images.length)%project.images.length;
  showImage();
 });
 container.querySelector('.project-carousel-next').addEventListener('click',function(){
  index=(index+1)%project.images.length;
  showImage();
 });
 showImage();
}
function closeProjectViewer(viewer,restoreFocus){
 if(!viewer) return;
 viewer.classList.remove('is-open');
 viewer.setAttribute('aria-hidden','true');
 window.setTimeout(function(){
  if(!viewer.classList.contains('is-open')) viewer.querySelector('.project-viewer-content').innerHTML='';
 },500);
 var trigger=document.querySelector('[aria-controls="'+viewer.id+'"]');
 if(trigger){
  trigger.setAttribute('aria-expanded','false');
  trigger.textContent='Expand';
 }
 if(openProjectViewer===viewer) openProjectViewer=null;
 if(restoreFocus&&trigger) trigger.focus();
}
document.querySelectorAll('.project-expand').forEach(function(button){
 button.addEventListener('click',function(){
  var project=projectMedia[button.dataset.project];
  if(!project) return;
  var viewer=document.getElementById(button.getAttribute('aria-controls'));
  if(openProjectViewer===viewer){
   closeProjectViewer(viewer,true);
   return;
  }
  if(openProjectViewer&&openProjectViewer!==viewer) closeProjectViewer(openProjectViewer,false);
  viewer.querySelector('.project-viewer-title').textContent=project.title;
  if(project.images) renderProjectCarousel(viewer.querySelector('.project-viewer-content'),project);
  else viewer.querySelector('.project-viewer-content').innerHTML=project.content;
  viewer.setAttribute('aria-hidden','false');
  button.setAttribute('aria-expanded','true');
  button.textContent='Minimize';
  openProjectViewer=viewer;
  window.requestAnimationFrame(function(){
   viewer.classList.add('is-open');
   button.focus();
  });
 });
});
document.addEventListener('keydown',function(event){
 if(event.key==='Escape'&&openProjectViewer) closeProjectViewer(openProjectViewer,true);
});
