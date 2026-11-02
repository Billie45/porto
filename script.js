
var skillData=[
 {name:'Machine learning',icon:'fa-solid fa-brain',category:'Models and computer vision',tech:[
  {name:'Python',icon:'devicon-python-plain colored'},
  {name:'TensorFlow',icon:'devicon-tensorflow-original colored'},
  {name:'Keras',icon:'devicon-keras-plain colored'},
  {name:'scikit-learn',icon:'devicon-scikitlearn-plain colored'},
  {name:'NumPy',icon:'devicon-numpy-original colored'},
  {name:'OpenCV',icon:'devicon-opencv-plain colored'},
  {name:'Computer vision',icon:'fa-solid fa-eye'},
  {name:'GAN',icon:'fa-solid fa-wand-magic-sparkles'}
 ]},
 {name:'Data engineering',icon:'fa-solid fa-database',category:'Data systems and pipelines',tech:[
  {name:'SQL',icon:'fa-solid fa-database'},
  {name:'MySQL',icon:'devicon-mysql-original colored'},
  {name:'Data cleaning',icon:'fa-solid fa-filter'},
  {name:'Pandas',icon:'devicon-pandas-plain colored'},
  {name:'Git',icon:'devicon-git-plain colored'},
  {name:'GitHub',icon:'devicon-github-original colored'},
  {name:'Linux',icon:'devicon-linux-plain colored'}
 ]},
 {name:'Data analysis',icon:'fa-solid fa-chart-column',category:'Insights and visualization',tech:[
  {name:'SQL',icon:'fa-solid fa-database'},
  {name:'Spreadsheets',icon:'fa-solid fa-table-cells'},
  {name:'Tableau',icon:'fa-solid fa-chart-line'},
  {name:'Pandas',icon:'devicon-pandas-plain colored'},
  {name:'Matplotlib',icon:'fa-solid fa-chart-area'},
  {name:'Data visualization',icon:'fa-solid fa-chart-pie'}
 ]},
 {name:'Embedded programming',icon:'fa-solid fa-microchip',category:'IoT and microcontrollers',tech:[
  {name:'C/C++',icon:'devicon-cplusplus-plain colored'},
  {name:'Arduino',icon:'devicon-arduino-plain colored'},
  {name:'Internet of Things',icon:'fa-solid fa-wifi'}
 ]},
 {name:'Web development',icon:'fa-solid fa-code',category:'Applications and services',tech:[
  {name:'PHP',icon:'devicon-php-plain colored'},
  {name:'Laravel',icon:'devicon-laravel-original colored'},
  {name:'HTML',icon:'devicon-html5-plain colored'},
  {name:'CSS',icon:'devicon-css3-plain colored'},
  {name:'JavaScript',icon:'devicon-javascript-plain colored'}
 ]}
];
var skillsTrack=document.querySelector('.skills-carousel-track');
var skillDotsContainer=document.querySelector('.skills-carousel-dots');
function getSkillIcon(tech){
 return tech.icon||'fa-solid fa-code';
}
if(skillsTrack&&skillDotsContainer){
 skillData.forEach(function(skill,index){
  var card=document.createElement('article');
  card.className='card skill-card';
  card.innerHTML='<div class="card-body"><div class="skill-category-icon"><i class="'+getSkillIcon(skill)+'" title="'+skill.name+'" aria-label="'+skill.name+'"></i></div><h3 class="mb-1">'+skill.name+'</h3><p class="skill-category">'+skill.category+'</p><div class="skill-tech-grid">'+skill.tech.map(function(tech){
   return '<div class="skill-tech"><i class="'+getSkillIcon(tech)+'" title="'+tech.name+'" aria-label="'+tech.name+'"></i><span>'+tech.name+'</span></div>';
  }).join('')+'</div></div>';
  skillsTrack.appendChild(card);
  var dot=document.createElement('button');
  dot.type='button';
  dot.className='skills-carousel-dot'+(index===0?' is-active':'');
  dot.setAttribute('aria-label','Show '+skill.name+' skill');
  if(index===0) dot.setAttribute('aria-current','true');
  skillDotsContainer.appendChild(dot);
 });
}
var links=document.querySelectorAll('#sbnav a');
var skillCards=skillsTrack?skillsTrack.querySelectorAll('.skill-card'):[];
var skillDots=document.querySelectorAll('.skills-carousel-dot');
var activeSkill=0;
var skillScrollFrame;
function scrollToSkill(index){
 if(!skillsTrack||!skillCards.length) return;
 activeSkill=(index+skillCards.length)%skillCards.length;
 skillsTrack.scrollTo({left:skillsTrack.clientWidth*activeSkill,behavior:'smooth'});
 updateSkillDots();
}
function updateSkillDots(){
 skillDots.forEach(function(dot,index){
  var active=index===activeSkill;
  dot.classList.toggle('is-active',active);
  if(active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current');
 });
}
if(skillsTrack){
 skillsTrack.addEventListener('scroll',function(){
  window.cancelAnimationFrame(skillScrollFrame);
  skillScrollFrame=window.requestAnimationFrame(function(){
   activeSkill=Math.round(skillsTrack.scrollLeft/skillsTrack.clientWidth);
   updateSkillDots();
  });
 });
 skillsTrack.addEventListener('keydown',function(event){
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();
   scrollToSkill(activeSkill+(event.key==='ArrowRight'?1:-1));
  }
 });
 var dragging=false,startX=0,lastX=0,startScroll=0;
 var touchStartX=0,touchStartScroll=0;
 skillsTrack.addEventListener('touchstart',function(event){
  touchStartX=event.changedTouches[0].pageX;
  touchStartScroll=skillsTrack.scrollLeft;
 },{passive:true});
 skillsTrack.addEventListener('touchend',function(event){
  var touchEndX=event.changedTouches[0].pageX;
  var atStart=touchStartScroll<=2;
  var atEnd=touchStartScroll>=skillsTrack.scrollWidth-skillsTrack.clientWidth-2;
  if(atEnd&&touchEndX<touchStartX) scrollToSkill(0);
  if(atStart&&touchEndX>touchStartX) scrollToSkill(skillCards.length-1);
 },{passive:true});
 skillsTrack.addEventListener('mousedown',function(event){
  dragging=true;
  startX=event.pageX;
  lastX=event.pageX;
  startScroll=skillsTrack.scrollLeft;
  skillsTrack.classList.add('is-dragging');
 });
 skillsTrack.addEventListener('mousemove',function(event){
  if(!dragging) return;
  event.preventDefault();
  lastX=event.pageX;
  skillsTrack.scrollLeft=startScroll-(event.pageX-startX);
 });
 function stopDragging(){
  if(!dragging) return;
  dragging=false;
  skillsTrack.classList.remove('is-dragging');
  var current=Math.round(skillsTrack.scrollLeft/skillsTrack.clientWidth);
  var atStart=startScroll<=2;
  var atEnd=startScroll>=skillsTrack.scrollWidth-skillsTrack.clientWidth-2;
  if(atEnd&&lastX<startX) current=0;
  if(atStart&&lastX>startX) current=skillCards.length-1;
  scrollToSkill(current);
 }
 skillsTrack.addEventListener('mouseup',stopDragging);
 skillsTrack.addEventListener('mouseleave',stopDragging);
 document.querySelector('.skills-carousel-prev').addEventListener('click',function(){scrollToSkill(activeSkill-1)});
 document.querySelector('.skills-carousel-next').addEventListener('click',function(){scrollToSkill(activeSkill+1)});
 skillDots.forEach(function(dot,index){dot.addEventListener('click',function(){scrollToSkill(index)})});
}
var contactForm=document.getElementById('contact-form');
if(contactForm){
 contactForm.addEventListener('submit',function(event){
  event.preventDefault();
  var formData=new FormData(contactForm);
  var subject='Portfolio contact from '+formData.get('name');
  var body='Name: '+formData.get('name')+'\nEmail: '+formData.get('email')+'\n\n'+formData.get('message');
  window.location.href='mailto:billiezandraw@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 });
}
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
 links.forEach(function(a){
  var on=a.getAttribute('href')==='#'+id;
  a.classList.toggle('active',on);
  if(on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
 });
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
