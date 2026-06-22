const BIRTH_DATE = "2001-06-02"; // change to your birthday

// arm animations only when JS is available (content stays visible otherwise)
document.documentElement.classList.add('js-anim');

// reveal on scroll
(function(){
  const obs = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vis'); obs.unobserve(e.target);} });
  }, { threshold:0.14, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// smooth scroll cue
document.getElementById('cue').addEventListener('click',()=>{
  document.querySelector('.letter').scrollIntoView({behavior:'smooth'});
});

// timeline: fill line + pop dots in sequence
(function(){
  const tl = document.getElementById('tl');
  const line = document.getElementById('tlLine');
  const items = tl.querySelectorAll('.tl-item');
  const obs = new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        line.classList.add('fill');
        items.forEach((it,i)=> setTimeout(()=>it.classList.add('dot'), 250 + i*320));
        obs.disconnect();
      }
    });
  }, { threshold:0.3 });
  obs.observe(tl);
})();

// day counter
(function(){
  const el = document.getElementById('num');
  const start = new Date(BIRTH_DATE+"T00:00:00");
  const target = Math.max(Math.floor((Date.now()-start)/86400000),0);
  let done=false;
  const run=()=>{
    if(done) return; done=true;
    const dur=1700; let t0=null;
    const step=(ts)=>{
      if(!t0) t0=ts;
      const p=Math.min((ts-t0)/dur,1);
      const e=1-Math.pow(1-p,3);
      el.textContent=Math.floor(e*target).toLocaleString();
      if(p<1) requestAnimationFrame(step); else el.textContent=target.toLocaleString();
    };
    requestAnimationFrame(step);
  };
  new IntersectionObserver((es,o)=>{
    es.forEach(e=>{ if(e.isIntersecting){ run(); o.disconnect(); } });
  },{threshold:0.5}).observe(el);
})();
