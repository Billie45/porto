
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
var skillCards=[];
var skillDots=[];
var activeSkill=0;
var skillTimer;
var skillHovering=false;
var skillReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
 skillCards=Array.prototype.slice.call(skillsTrack.querySelectorAll('.skill-card'));
 skillDots=Array.prototype.slice.call(document.querySelectorAll('.skills-carousel-dot'));
}
function skillOffset(index){
 var offset=(index-activeSkill+skillCards.length)%skillCards.length;
 return offset>skillCards.length/2?offset-skillCards.length:offset;
}
function resizeSkillTrack(){
 if(!skillsTrack||!skillCards.length) return;
 if(window.matchMedia('(max-width:575.98px)').matches){
  skillsTrack.style.height='auto';
  var tallestCard=0;
  skillCards.forEach(function(card){
   tallestCard=Math.max(tallestCard,card.scrollHeight);
  });
  if(tallestCard) skillsTrack.style.height=tallestCard+'px';
 } else {
  skillsTrack.style.height='';
 }
}
function renderSkillsCarousel(){
 skillCards.forEach(function(card,index){
  var offset=skillOffset(index);
  card.classList.remove('is-prev','is-active','is-next');
  if(offset===-1) card.classList.add('is-prev');
  if(offset===0) card.classList.add('is-active');
  if(offset===1) card.classList.add('is-next');
  card.setAttribute('aria-hidden',offset===0?'false':'true');
 });
 skillDots.forEach(function(dot,index){
  var active=index===activeSkill;
  dot.classList.toggle('is-active',active);
  if(active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current');
 });
 resizeSkillTrack();
}
function scrollToSkill(index){
 if(!skillsTrack||!skillCards.length) return;
 activeSkill=(index+skillCards.length)%skillCards.length;
 renderSkillsCarousel();
}
function updateSkillDots(){
 renderSkillsCarousel();
}
function stopSkillAutoplay(){
 window.clearInterval(skillTimer);
 skillTimer=null;
}
function startSkillAutoplay(){
 if(skillReducedMotion||skillHovering) return;
 stopSkillAutoplay();
 skillTimer=window.setInterval(function(){scrollToSkill(activeSkill+1)},4000);
}
if(skillsTrack){
 skillsTrack.addEventListener('keydown',function(event){
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();
   scrollToSkill(activeSkill+(event.key==='ArrowRight'?1:-1));
  }
 });
 var dragging=false,startX=0;
 skillsTrack.addEventListener('pointerdown',function(event){
  skillHovering=true;
  stopSkillAutoplay();
  dragging=true;
  startX=event.clientX;
  skillsTrack.setPointerCapture(event.pointerId);
  skillsTrack.classList.add('is-dragging');
 });
 skillsTrack.addEventListener('pointermove',function(event){
  if(!dragging) return;
  if(Math.abs(event.clientX-startX)>8) event.preventDefault();
 });
 function stopDragging(event){
  if(!dragging) return;
  dragging=false;
  skillsTrack.classList.remove('is-dragging');
  var distance=event.clientX-startX;
  if(Math.abs(distance)>50) scrollToSkill(activeSkill+(distance<0?1:-1));
  skillHovering=false;
  startSkillAutoplay();
 }
 skillsTrack.addEventListener('pointerup',stopDragging);
 skillsTrack.addEventListener('pointercancel',stopDragging);
 skillsTrack.addEventListener('mouseenter',function(){skillHovering=true;stopSkillAutoplay()});
 skillsTrack.addEventListener('mouseleave',function(){skillHovering=false;startSkillAutoplay()});
 skillCards.forEach(function(card,index){
  card.addEventListener('click',function(){
   var offset=skillOffset(index);
   if(Math.abs(offset)===1) scrollToSkill(activeSkill+offset);
  });
 });
 document.querySelector('.skills-carousel-prev').addEventListener('click',function(){scrollToSkill(activeSkill-1)});
 document.querySelector('.skills-carousel-next').addEventListener('click',function(){scrollToSkill(activeSkill+1)});
 skillDots.forEach(function(dot,index){dot.addEventListener('click',function(){scrollToSkill(index)})});
 renderSkillsCarousel();
 startSkillAutoplay();
}
window.addEventListener('resize',resizeSkillTrack);
var links=document.querySelectorAll('#sbnav a');
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
   var oc=bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('sb')); oc.hide();
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

var certificateGallery=document.querySelector('.cert-gallery');
var certificateLightbox;
var certificateLightboxImage;
var certificateLightboxClose;
var certificateLastTrigger;
if(certificateGallery){
 var certificateCards=Array.prototype.slice.call(certificateGallery.querySelectorAll('.cert-card'));
 var certificateName=document.querySelector('.cert-gallery-name');
 var certificatePosition=document.querySelector('.cert-gallery-position');
 var certificateIndex=0;
 var certificateTimer;
 var certificateHovering=false;
 var certificateReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function certificateLabel(card){
  var source=card.querySelector('img').getAttribute('src').split('/').pop();
  return source.replace(/\.[^.]+$/,'').replace(/[-_]/g,' ').trim();
 }
 function certificateOffset(index){
  var offset=(index-certificateIndex+certificateCards.length)%certificateCards.length;
  return offset>certificateCards.length/2?offset-certificateCards.length:offset;
 }
 function renderCertificateCarousel(){
  certificateCards.forEach(function(card,index){
   var offset=certificateOffset(index);
   card.classList.remove('is-prev','is-active','is-next');
   if(offset===-1) card.classList.add('is-prev');
   if(offset===0) card.classList.add('is-active');
   if(offset===1) card.classList.add('is-next');
   card.setAttribute('aria-hidden',offset===0?'false':'true');
   card.querySelector('img').loading=offset===0?'eager':'lazy';
  });
  certificateName.textContent=certificateLabel(certificateCards[certificateIndex]);
  certificatePosition.textContent=(certificateIndex+1)+' / '+certificateCards.length;
 }
 function moveCertificate(step){
  certificateIndex=(certificateIndex+step+certificateCards.length)%certificateCards.length;
  renderCertificateCarousel();
 }
 function stopCertificateAutoplay(){
  window.clearInterval(certificateTimer);
  certificateTimer=null;
 }
 function startCertificateAutoplay(){
  if(certificateReducedMotion||certificateHovering) return;
  stopCertificateAutoplay();
  certificateTimer=window.setInterval(function(){moveCertificate(1)},4000);
 }
 certificateLightbox=document.createElement('div');
 certificateLightbox.className='cert-lightbox';
 certificateLightbox.setAttribute('role','dialog');
 certificateLightbox.setAttribute('aria-modal','true');
 certificateLightbox.setAttribute('aria-label','Certificate preview');
 certificateLightbox.innerHTML='<button class="cert-lightbox-close" type="button" aria-label="Close certificate preview">&times;</button><img alt="">';
 document.body.appendChild(certificateLightbox);
 certificateLightboxImage=certificateLightbox.querySelector('img');
 certificateLightboxClose=certificateLightbox.querySelector('.cert-lightbox-close');
 function closeCertificateLightbox(){
  certificateLightbox.classList.remove('is-open');
  document.body.style.overflow='';
  if(certificateLastTrigger) certificateLastTrigger.focus();
 }
 function openCertificateLightbox(image){
  certificateLastTrigger=image;
  certificateLightboxImage.src=image.src;
  certificateLightboxImage.alt=image.alt;
  certificateLightbox.classList.add('is-open');
  document.body.style.overflow='hidden';
  certificateLightboxClose.focus();
 }
 certificateCards.forEach(function(card,index){
  card.addEventListener('click',function(){
   if(Math.abs(certificateOffset(index))===1){
    moveCertificate(certificateOffset(index));
    return;
   }
   openCertificateLightbox(card.querySelector('img'));
  });
 });
 certificateLightboxClose.addEventListener('click',closeCertificateLightbox);
 certificateLightbox.addEventListener('click',function(event){
  if(event.target===certificateLightbox) closeCertificateLightbox();
 });
 document.addEventListener('keydown',function(event){
  if(event.key==='Escape'&&certificateLightbox.classList.contains('is-open')) closeCertificateLightbox();
 });
 var dragging=false,startX=0;
 certificateGallery.addEventListener('pointerdown',function(event){
  certificateHovering=true;
  stopCertificateAutoplay();
  dragging=true;
  startX=event.clientX;
  certificateGallery.setPointerCapture(event.pointerId);
  certificateGallery.classList.add('is-dragging');
 });
 certificateGallery.addEventListener('pointermove',function(event){
  if(!dragging) return;
  if(Math.abs(event.clientX-startX)>8) event.preventDefault();
 });
 function stopCertificateDragging(event){
  if(!dragging) return;
  dragging=false;
  certificateGallery.classList.remove('is-dragging');
  var distance=event.clientX-startX;
  if(Math.abs(distance)>50) moveCertificate(distance<0?1:-1);
  certificateHovering=false;
  startCertificateAutoplay();
 }
 certificateGallery.addEventListener('pointerup',stopCertificateDragging);
 certificateGallery.addEventListener('pointercancel',stopCertificateDragging);
 certificateGallery.addEventListener('mouseenter',function(){certificateHovering=true;stopCertificateAutoplay()});
 certificateGallery.addEventListener('mouseleave',function(){certificateHovering=false;startCertificateAutoplay()});
 document.querySelector('.cert-gallery-prev').addEventListener('click',function(){moveCertificate(-1)});
 document.querySelector('.cert-gallery-next').addEventListener('click',function(){moveCertificate(1)});
 certificateGallery.addEventListener('keydown',function(event){
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();
   moveCertificate(event.key==='ArrowRight'?1:-1);
  }
 });
 renderCertificateCarousel();
 startCertificateAutoplay();
}
