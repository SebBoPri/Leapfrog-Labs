/* ============================================================
   LEAPFROG LABS  -  behaviour
   1. Nav turns solid after scrolling
   2. Scroll reveal (once per element)
   3. Contact form composes a pre-filled email (works on static hosting)
   All optional: page is fully usable with JS disabled.
   ============================================================ */
var nav=document.getElementById('nav');
var onS=function(){nav.classList.toggle('solid',scrollY>16)};onS();addEventListener('scroll',onS,{passive:true});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
var cf=document.getElementById('cform');
if(cf){cf.addEventListener('submit',function(e){e.preventDefault();
  var body=encodeURIComponent('Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\n\n'+cf.msg.value);
  location.href='mailto:hello@leapfroglabs.com?subject='+encodeURIComponent('New conversation from '+cf.name.value)+'&body='+body;});}
