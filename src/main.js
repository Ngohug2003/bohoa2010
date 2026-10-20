import './style.css';

const flowerIcon = `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">${Array.from({length:8},(_,i)=>`<ellipse cx="16" cy="9" rx="3.4" ry="6.8" transform="rotate(${i*45} 16 16)" fill="currentColor"/>`).join('')}<circle cx="16" cy="16" r="3" fill="#fff3ee"/></svg>`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
document.querySelector('#app').innerHTML = `
<main class="experience" id="experience">
  <div class="background-word" aria-hidden="true">bloom</div>
  <button id="flower-hit" class="flower-hit" aria-label="Chạm vào bó hoa để mở rừng hoa"><img class="main-flower" src="/media/pastel-bouquet.webp" width="1086" height="1448" alt="Bó hoa mẫu đơn và hoa hồng pastel, gói giấy hồng nhạt và thắt nơ lụa" fetchpriority="high" decoding="async" /></button>
  <div class="scene-vignette" aria-hidden="true"></div>
  <header class="occasion-header"><span class="nav-date">20 <i>✳</i> 10 <span>VIETNAMESE WOMEN'S DAY</span></span></header>
  <section class="hero-copy" id="hero-copy" aria-labelledby="headline"><div class="eyebrow"><span></span> 20/10 · GỬI ĐỨA BẠN THÂN CỦA TỚ</div><h1 class="headline" id="headline"><span>Gửi cậu</span><span class="italic">chút hoa,</span><span>thêm chút</span><span class="italic indent">niềm vui.</span></h1><p class="hero-description">Hoa này tớ chọn, niềm vui cậu nhận nhé.<br>Chúc cậu một ngày 20/10 thật vui!</p><button class="bloom-button" id="open-garden">Nhận hoa nè! <span>${arrow}</span></button></section>
  <div class="flower-label"><span class="label-number">01 /</span><div>BÓ HOA CHO BẠN THÂN<span>Một chút hoa, một chút vui.</span></div><span class="label-line"></span></div>
  <button class="bloom-hint" id="bloom-hint"><span class="hint-circle">${flowerIcon}<span>+</span></span><span>Chạm nhẹ vào hoa<br><b>còn bất ngờ nữa nè!</b></span></button>
  <div class="side-caption">JUST FOR MY BESTIE — 20.10</div>
  <section class="garden-copy" id="garden-copy" aria-labelledby="garden-title" hidden><div class="eyebrow">HOA CHO CẬU, NIỀM VUI NHÂN ĐÔI</div><h2 id="garden-title" tabindex="-1">Cứ rạng rỡ,<br><em>theo cách của cậu.</em></h2><p>Chúc cậu bớt deadline, thêm nhiều niềm vui,<br>ăn ngon, ngủ đủ và cứ tự tin làm điều mình thích.</p><span class="signature">20/10 vui vẻ nha, bạn thân! ✿</span></section>
  <div class="garden-controls" id="garden-controls" hidden><button class="bloom-button" id="more-flowers">Thêm hoa cho vui <span>＋</span></button><button class="text-button" data-action="home">← Trở về bó hoa</button></div>
  <footer><span class="footer-center">CẢM ƠN VÌ ĐÃ LÀ BẠN THÂN CỦA TỚ ✿</span><button class="sound-button" id="sound" aria-pressed="false" aria-label="Bật nhạc nền"><span class="sound-bars"><i></i><i></i><i></i><i></i></span><span id="sound-label">Nhạc nền · 10%</span></button></footer>
  <div class="extra-flower-bed" id="extra-flower-bed" aria-hidden="true"></div>
  <div class="transition-bloom" aria-hidden="true"></div><div class="sr-only" id="announcement" aria-live="polite"></div>
</main>`;

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const experience=document.querySelector('#experience');
let gardenOpen=false, transitionBusy=false;
let flowerRound=0;
const announce=message=>document.querySelector('#announcement').textContent=message;
function setGarden(open){
  if(transitionBusy||gardenOpen===open)return;
  transitionBusy=true;experience.classList.add('is-transitioning');
  setTimeout(()=>{
    gardenOpen=open;
    experience.classList.toggle('is-garden',open);
    document.querySelector('.video-background').classList.toggle('is-garden',open);
    document.querySelector('#hero-copy').hidden=open;
    document.querySelector('#flower-hit').hidden=open;
    document.querySelector('#garden-copy').hidden=!open;
    document.querySelector('#garden-controls').hidden=!open;
    if(open){
      spawnFloatingFlowers(innerWidth<=720?6:8);
      document.querySelector('#garden-title').focus({preventScroll:true});
    }else{
      resetExtras();
      document.querySelector('#open-garden').focus({preventScroll:true});
    }
    announce(open?'Hoa đã nở. Chúc cậu 20/10 thật vui, bạn thân nhé!':'Trở về bó hoa.');
    experience.classList.remove('is-transitioning');transitionBusy=false;
  },reducedMotion.matches?0:680);
}
['open-garden','flower-hit','bloom-hint'].forEach(id=>document.querySelector(`#${id}`).addEventListener('click',()=>setGarden(true)));
document.querySelector('.garden-controls [data-action="home"]').addEventListener('click',()=>setGarden(false));
// Set the level before attempting autoplay, so playback starts at 10%.
const backgroundMusic=document.querySelector('#background-music');
const soundButton=document.querySelector('#sound');
const soundLabel=document.querySelector('#sound-label');
let musicWanted=true;
backgroundMusic.volume=0.1;

function syncMusicButton(){
 const playing=!backgroundMusic.paused&&!backgroundMusic.ended;
 soundButton.setAttribute('aria-pressed',String(playing));
 soundButton.setAttribute('aria-label',playing?'Tắt nhạc nền':'Bật nhạc nền ở âm lượng 10%');
 soundLabel.textContent=playing?'Nhạc bật · 10%':musicWanted?'Bật nhạc · 10%':'Nhạc tắt';
}
function startBackgroundMusic(){
 if(!musicWanted||document.hidden)return;
 backgroundMusic.volume=0.1;
 backgroundMusic.play().catch(error=>{
  // Audible autoplay may require a real pointer or keyboard gesture.
  if(error.name!=='NotAllowedError'&&error.name!=='AbortError'){
   musicWanted=false;
   announce('Không thể phát nhạc nền. Cậu thử tải lại trang nhé.');
  }
 }).finally(syncMusicButton);
}
soundButton.addEventListener('click',()=>{
 if(!backgroundMusic.paused){
  musicWanted=false;backgroundMusic.pause();syncMusicButton();
 }else{
  musicWanted=true;startBackgroundMusic();
 }
});
function unlockBackgroundMusic(event){
 // Let the sound button handle its own click, without toggling twice.
 if(soundButton.contains(event.target)||!musicWanted||!backgroundMusic.paused)return;
 if(event.type==='keydown'&&(event.repeat||!['Enter',' '].includes(event.key)))return;
 startBackgroundMusic();
}
document.addEventListener('pointerdown',unlockBackgroundMusic,{capture:true});
document.addEventListener('keydown',unlockBackgroundMusic,{capture:true});
backgroundMusic.addEventListener('playing',syncMusicButton);
backgroundMusic.addEventListener('pause',syncMusicButton);
backgroundMusic.addEventListener('error',()=>{
 musicWanted=false;syncMusicButton();announce('Không thể tải file nhạc nền.');
});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden)backgroundMusic.pause();else if(musicWanted)startBackgroundMusic();
});
syncMusicButton();
startBackgroundMusic();

// Background motion is encoded in an MP4. No canvas, WebGL or animation loop.
const backgroundVideo=document.querySelector('#hero-video');
function syncVideoPlayback(){
 if(document.hidden||reducedMotion.matches){backgroundVideo.pause();return;}
 backgroundVideo.play().catch(()=>{/* The poster remains visible if autoplay is blocked. */});
}
reducedMotion.addEventListener('change',syncVideoPlayback);
document.addEventListener('visibilitychange',syncVideoPlayback);
backgroundVideo.addEventListener('error',()=>document.querySelector('.video-background').classList.add('video-unavailable'));
syncVideoPlayback();

// Animate pre-rendered cutouts with compositor transforms, without a render loop.
const floatingFlowers=new Set();
const desktopAnchors=[[.08,.26],[.91,.24],[.16,.58],[.83,.56],[.07,.77],[.93,.79],[.33,.77],[.65,.8],[.18,.14],[.8,.13],[.48,.78],[.89,.44],[.22,.8],[.74,.76],[.03,.48],[.96,.5]];
const mobileAnchors=[[.09,.17],[.91,.15],[.12,.55],[.9,.54],[.28,.75],[.79,.78],[.5,.67],[.94,.82],[.05,.76],[.75,.63]];
let flowerSequence=0;
function removeFloatingFlower(record){
 record.node.getAnimations({subtree:true}).forEach(animation=>animation.cancel());
 record.node.remove();floatingFlowers.delete(record);
}
function resetExtras(){
 [...floatingFlowers].forEach(removeFloatingFlower);flowerRound=0;flowerSequence=0;
}
function animateFlowerDrift(record){
 if(!record.node.isConnected||reducedMotion.matches)return;
 const {node,x,y,width,height,rotation}=record;
 const mobile=innerWidth<=720;
 const amplitude=mobile?22:48;
 const safeX=value=>Math.max(-width*.28,Math.min(innerWidth-width*.72,value));
 const safeY=value=>Math.max(64-height*.12,Math.min(innerHeight-height*.65-55,value));
 const path=[[x,y,rotation],[x+amplitude,y-30,rotation+7],[x-amplitude*.4,y-57,rotation-5],[x-amplitude*.8,y+16,rotation+4],[x,y,rotation]];
 const animation=node.animate(path.map(([px,py,r])=>({transform:`translate3d(${safeX(px)}px,${safeY(py)}px,0) rotate(${r}deg)`,opacity:record.opacity})),{duration:18000+Math.random()*12000,iterations:Infinity,easing:'ease-in-out'});
 if(document.hidden)animation.pause();
}
function spawnFloatingFlowers(count,origin=null,immediate=false){
 const bed=document.querySelector('#extra-flower-bed');
 const mobile=innerWidth<=720,anchors=mobile?mobileAnchors:desktopAnchors;
 const maxFlowers=mobile?10:16;
 for(let i=0;i<count;i++){
  while(floatingFlowers.size>=maxFlowers)removeFloatingFlower(floatingFlowers.values().next().value);
  const index=flowerSequence++,anchor=anchors[index%anchors.length];
  const height=mobile?110+(index%3)*24:175+(index%4)*33;
  const width=height*2/3;
  const x=anchor[0]*innerWidth-width/2,y=anchor[1]*innerHeight-height/2;
  const rotation=(index%2?1:-1)*(9+index%4*5),opacity=mobile?.82:.9;
  const node=document.createElement('div');node.className='floating-flower';
  node.style.width=`${width}px`;node.style.height=`${height}px`;node.style.opacity=String(opacity);
  node.style.transform=`translate3d(${x}px,${y}px,0) rotate(${rotation}deg)`;
  const image=new Image();image.src='/media/floating-peony.webp';image.alt='';image.decoding='async';image.draggable=false;
  node.append(image);bed.append(node);
  const record={node,x,y,width,height,rotation,opacity};floatingFlowers.add(record);
  if(reducedMotion.matches||immediate){animateFlowerDrift(record);continue;}
  const from=origin||{x:innerWidth*.55,y:innerHeight*.7};
  const entrance=node.animate([
   {transform:`translate3d(${from.x-width/2}px,${from.y-height/2}px,0) rotate(${rotation-30}deg) scale(.18)`,opacity:0},
   {transform:`translate3d(${x}px,${y}px,0) rotate(${rotation}deg) scale(1)`,opacity},
  ],{duration:1500+i*65,delay:i*85,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
  entrance.finished.then(()=>animateFlowerDrift(record)).catch(()=>{/* Removed flowers cancel their entrance. */});
  if(document.hidden)entrance.pause();
 }
}
function addFlowers(event){
 if(!gardenOpen)return;
 flowerRound++;
 const rect=document.querySelector('#more-flowers').getBoundingClientRect();
 const origin=event?.clientX?{x:event.clientX,y:event.clientY}:{x:rect.left+rect.width/2,y:rect.top+rect.height/2};
 spawnFloatingFlowers(4,origin);
 announce(`Thêm 4 bông hoa đang bay nhẹ trên màn hình. Lần ${flowerRound}.`);
}
function refreshFloatingFlowers(){
 if(!gardenOpen)return;
 const count=Math.min(floatingFlowers.size,innerWidth<=720?10:16);
 [...floatingFlowers].forEach(removeFloatingFlower);flowerSequence=0;
 spawnFloatingFlowers(count,null,true);
}
let resizeFlowersTimer;
addEventListener('resize',()=>{clearTimeout(resizeFlowersTimer);resizeFlowersTimer=setTimeout(refreshFloatingFlowers,150);});
reducedMotion.addEventListener('change',refreshFloatingFlowers);
document.addEventListener('visibilitychange',()=>{
 floatingFlowers.forEach(({node})=>node.getAnimations({subtree:true}).forEach(animation=>{
  if(document.hidden)animation.pause();else if(!reducedMotion.matches)animation.play();
 }));
});
document.querySelector('#more-flowers').addEventListener('click',addFlowers);
