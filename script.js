
(function(){

/* ═══════════════════════════════════════════
   1. CUSTOM CURSOR
═══════════════════════════════════════════ */
// var isPointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
// if(isPointer){
//   var cur=document.getElementById('cur'), dot=document.getElementById('dot');
//   cur.style.display='block'; dot.style.display='block';
//   var mx=0,my=0,cx=0,cy=0,going=false;
//   document.addEventListener('mousemove',function(e){
//     mx=e.clientX; my=e.clientY;
//     if(!going){going=true;cx=mx;cy=my;}
//     dot.style.left=mx+'px'; dot.style.top=my+'px';
//   });
//   (function loop(){
//     cx+=(mx-cx)*.11; cy+=(my-cy)*.11;
//     cur.style.left=cx+'px'; cur.style.top=cy+'px';
//     requestAnimationFrame(loop);
//   })();
//   document.querySelectorAll('a,button,.scard,.pi,.pfb,.ptr').forEach(function(el){
//     el.addEventListener('mouseenter',function(){cur.classList.add('big')});
//     el.addEventListener('mouseleave',function(){cur.classList.remove('big')});
//   });
// }

/* ═══════════════════════════════════════════
   2. NAVBAR SCROLL
═══════════════════════════════════════════ */
var nav=document.getElementById('nav');
function chkNav(){nav.classList.toggle('solid',window.scrollY>50);}
window.addEventListener('scroll',chkNav,{passive:true});
chkNav();

/* ═══════════════════════════════════════════
   3. MOBILE DRAWER
═══════════════════════════════════════════ */
var drawer=document.getElementById('mdraw');
var burger=document.getElementById('hbg');
var closeBtn=document.getElementById('mclose');
function openD(){drawer.classList.add('open');burger.classList.add('open');document.body.style.overflow='hidden';}
function closeD(){drawer.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';}
burger.addEventListener('click',openD);
closeBtn.addEventListener('click',closeD);
document.querySelectorAll('.ml').forEach(function(a){a.addEventListener('click',closeD);});

/* ═══════════════════════════════════════════
   4. SCROLL REVEAL — BULLETPROOF
   ─────────────────────────────────────────
   Strategy: use getBoundingClientRect() on
   every scroll event + immediate check on
   load. This works in ALL environments
   including iframes, without any
   IntersectionObserver quirks.
═══════════════════════════════════════════ */
var rvEls = Array.prototype.slice.call(document.querySelectorAll('.rv'));

function isInView(el){
  var r = el.getBoundingClientRect();
  /* reveal when top of element is within 120px below the bottom of the window */
  return r.top < (window.innerHeight + 120) && r.bottom > 0;
}

function revealAll(){
  rvEls = rvEls.filter(function(el){
    if(isInView(el)){
      el.classList.add('a0'); /* set opacity:0 immediately */
      /* tiny delay so browser registers the opacity:0 before we animate */
      (function(e){
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){
            e.classList.add('a1'); /* trigger animation */
          });
        });
      })(el);
      return false; /* remove from list — done */
    }
    /* not in view yet — mark hidden, keep in list */
    el.classList.add('a0');
    return true;
  });
}

/* Run immediately on load */
revealAll();

/* Run on every scroll */
window.addEventListener('scroll', revealAll, {passive:true});

/* Hard safety net: reveal everything remaining after 2s */
setTimeout(function(){
  rvEls.forEach(function(el){el.classList.add('a0','a1');});
}, 2000);

/* ═══════════════════════════════════════════
   5. PORTFOLIO FILTER
═══════════════════════════════════════════ */
document.querySelectorAll('.pfb').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('.pfb').forEach(function(b){b.classList.remove('on');});
    btn.classList.add('on');
    var f=btn.getAttribute('data-f');
    document.querySelectorAll('.pi').forEach(function(item){
      var show=f==='all'||item.getAttribute('data-c')===f;
      item.style.opacity=show?'1':'0.1';
      item.style.transform=show?'':'scale(0.96)';
      item.style.transition='opacity .4s,transform .4s';
      item.style.pointerEvents=show?'auto':'none';
    });
  });
});

/* ═══════════════════════════════════════════
   6. CONTACT FORM
═══════════════════════════════════════════ */
// var form=document.getElementById('cform');
// var sbtn=document.getElementById('sbtn');
// form.addEventListener('submit',function(e){
//   e.preventDefault();
//   // sbtn.innerHTML='✓ Sent! We\'ll contact you within 24 hours.';
//   sbtn.innerHTML='Fill all required fields';
//   sbtn.style.background='#b61515';
//   sbtn.style.borderColor='#b61515';
//   sbtn.disabled=true;
//   setTimeout(function(){
//     sbtn.innerHTML='Send Enquiry &nbsp;<i class="bi bi-send"></i>';
//     sbtn.style.background='';
//     sbtn.style.borderColor='';
//     sbtn.disabled=false;
//     form.reset();
//   },4500);
// });

})();