import './style.css';

// The family subdomain and its standalone entry share the same interaction code.
const familyEdition=location.hostname==='giadinh.20th10.io.vn'||document.documentElement.dataset.audience==='family';
const copy=familyEdition?{
  eyebrow:'20/10 · GỬI NHỮNG NGƯỜI PHỤ NỮ CỦA GIA ĐÌNH',
  headline:['Gửi cả nhà','chút hoa,','thêm chút','niềm vui.'],
  description:'Một bó hoa nhỏ gửi đến cả nhà.<br>Chúc gia đình mình một ngày 20/10 thật vui!',
  button:'Cả nhà nhận hoa nhé!',
  label:'BÓ HOA GỬI GIA ĐÌNH',
  labelNote:'Một chút hoa, niềm vui cho cả nhà.',
  sideCaption:'FOR MY FAMILY — 20.10',
  gardenEyebrow:'HOA CHO CẢ NHÀ, NIỀM VUI NHÂN ĐÔI',
  gardenTitle:'Cười rạng rỡ,<br><em>theo cách của cả nhà.</em>',
  gardenWish:'Chúc những người phụ nữ của gia đình<br>thật hạnh phúc và vui vẻ!',
  signature:'20/10 vui vẻ và hạnh phúc nha cả nhà! ✿',
  footer:'GỬI GIA ĐÌNH MÌNH NHỮNG ĐIỀU TỐT ĐẸP NHẤT ✿',
  announcement:'Hoa đã nở. Chúc cả nhà 20/10 vui vẻ và hạnh phúc!',
  musicError:'Không thể phát nhạc nền. Cả nhà thử tải lại trang nhé.',
}:{
  eyebrow:'20/10 · GỬI ĐỨA BẠN THÂN CỦA TỚ',
  headline:['Gửi cậu','chút hoa,','thêm chút','niềm vui.'],
  description:'Hoa này tớ chọn, niềm vui cậu nhận nhé.<br>Chúc cậu một ngày 20/10 thật vui!',
  button:'Nhận hoa nè!',
  label:'BÓ HOA CHO BẠN THÂN',
  labelNote:'Một chút hoa, một chút vui.',
  sideCaption:'JUST FOR MY BESTIE — 20.10',
  gardenEyebrow:'HOA CHO CẬU, NIỀM VUI NHÂN ĐÔI',
  gardenTitle:'Cứ rạng rỡ,<br><em>theo cách của cậu.</em>',
  gardenWish:'Chúc cậu bớt deadline, thêm nhiều niềm vui,<br>ăn ngon, ngủ đủ và cứ tự tin làm điều mình thích.',
  signature:'20/10 vui vẻ nha, bạn thân! ✿',
  footer:'CẢM ƠN VÌ ĐÃ LÀ BẠN THÂN CỦA TỚ ✿',
  announcement:'Hoa đã nở. Chúc cậu 20/10 thật vui, bạn thân nhé!',
  musicError:'Không thể phát nhạc nền. Cậu thử tải lại trang nhé.',
};
if(familyEdition){
 document.title='Gửi gia đình — Một bó hoa cho ngày 20/10';
 document.querySelector('meta[name="description"]').content='Hoa cho cả nhà, niềm vui nhân đôi. Chúc những người phụ nữ của gia đình một ngày 20/10 thật hạnh phúc và vui vẻ.';
}

const flowerIcon = `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">${Array.from({length:8},(_,i)=>`<ellipse cx="16" cy="9" rx="3.4" ry="6.8" transform="rotate(${i*45} 16 16)" fill="currentColor"/>`).join('')}<circle cx="16" cy="16" r="3" fill="#fff3ee"/></svg>`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
document.querySelector('#app').innerHTML = `
<main class="experience${familyEdition?' family-edition':''}" id="experience">
  <div class="background-word" aria-hidden="true">bloom</div>
  <button id="flower-hit" class="flower-hit" aria-label="Chạm vào bó hoa để mở rừng hoa"><img class="main-flower" src="/media/pastel-bouquet.webp" width="1086" height="1448" alt="Bó hoa mẫu đơn và hoa hồng pastel, gói giấy hồng nhạt và thắt nơ lụa" fetchpriority="high" decoding="async" /></button>
  <div class="scene-vignette" aria-hidden="true"></div>
  <header class="occasion-header"><span class="nav-date">20 <i>✳</i> 10 <span>VIETNAMESE WOMEN'S DAY</span></span></header>
  <section class="hero-copy" id="hero-copy" aria-labelledby="headline"><div class="eyebrow"><span></span> ${copy.eyebrow}</div><h1 class="headline" id="headline"><span>${copy.headline[0]}</span><span class="italic">${copy.headline[1]}</span><span>${copy.headline[2]}</span><span class="italic indent">${copy.headline[3]}</span></h1><p class="hero-description">${copy.description}</p><button class="bloom-button" id="open-garden">${copy.button} <span>${arrow}</span></button></section>
  <div class="flower-label"><span class="label-number">01 /</span><div>${copy.label}<span>${copy.labelNote}</span></div><span class="label-line"></span></div>
  <button class="bloom-hint" id="bloom-hint"><span class="hint-circle">${flowerIcon}<span>+</span></span><span>Chạm nhẹ vào hoa<br><b>còn bất ngờ nữa nè!</b></span></button>
  <div class="side-caption">${copy.sideCaption}</div>
  <section class="garden-copy" id="garden-copy" aria-labelledby="garden-title" hidden><div class="eyebrow">${copy.gardenEyebrow}</div><h2 id="garden-title" tabindex="-1">${copy.gardenTitle}</h2><p>${copy.gardenWish}</p><span class="signature">${copy.signature}</span></section>
  <div class="garden-controls" id="garden-controls" hidden><button class="bloom-button" id="more-flowers">Thêm hoa cho vui <span>＋</span></button><button class="text-button" data-action="home">← Trở về bó hoa</button></div>
  <footer><span class="footer-center">${copy.footer}</span><button class="sound-button" id="sound" aria-pressed="false" aria-label="Bật nhạc nền"><span class="sound-bars"><i></i><i></i><i></i><i></i></span><span id="sound-label">Nhạc nền · 10%</span></button></footer>
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
      celebrateFlowers({x:innerWidth*.52,y:innerHeight*.65});
      document.querySelector('#garden-title').focus({preventScroll:true});
    }else{
      resetExtras();
      document.querySelector('#open-garden').focus({preventScroll:true});
    }
    announce(open?copy.announcement:'Trở về bó hoa.');
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
   announce(copy.musicError);
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
 clearCelebration();
 [...floatingFlowers].forEach(removeFloatingFlower);flowerRound=0;flowerSequence=0;
}
function animateFlowerDrift(record){
 if(!record.node.isConnected||reducedMotion.matches)return;
 const {node,x,y,width,height,rotation}=record;
 const mobile=innerWidth<=720;
 const amplitude=mobile?42:84;
 const safeX=value=>Math.max(-width*.28,Math.min(innerWidth-width*.72,value));
 const safeY=value=>Math.max(64-height*.12,Math.min(innerHeight-height*.65-55,value));
 const path=[[x,y,rotation],[x+amplitude,y-55,rotation+14],[x-amplitude*.35,y-105,rotation-11],[x-amplitude*.85,y+25,rotation+9],[x,y,rotation]];
 const animation=node.animate(path.map(([px,py,r])=>({transform:`translate3d(${safeX(px)}px,${safeY(py)}px,0) rotate(${r}deg)`,opacity:record.opacity})),{duration:9000+Math.random()*5000,iterations:Infinity,easing:'ease-in-out'});
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
  ],{duration:850+i*45,delay:i*50,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
  entrance.finished.then(()=>animateFlowerDrift(record)).catch(()=>{/* Removed flowers cancel their entrance. */});
  if(document.hidden)entrance.pause();
 }
}
// Short, bounded accents animate only opacity and transforms.
const celebrationEffects=new Set();
function clearCelebration(){
 celebrationEffects.forEach(node=>{
  node.getAnimations().forEach(animation=>animation.cancel());node.remove();
 });
 celebrationEffects.clear();
}
function celebrateFlowers(origin){
 clearCelebration();
 if(reducedMotion.matches||document.hidden)return;
 const mobile=innerWidth<=720,count=mobile?8:12;
 for(let i=0;i<count;i++){
  const petal=document.createElement('span');
  petal.className=i%3===0?'celebration-spark':'celebration-petal';petal.setAttribute('aria-hidden','true');
  experience.append(petal);celebrationEffects.add(petal);
  const angle=(i/count*Math.PI*2)+Math.random()*.3;
  const distance=(mobile?75:110)+Math.random()*(mobile?95:150);
  const dx=Math.cos(angle)*distance,dy=Math.sin(angle)*distance-45;
  const r=i*32;
  const animation=petal.animate([
   {transform:`translate3d(${origin.x}px,${origin.y}px,0) rotate(${r}deg) scale(.25)`,opacity:0,offset:0},
   {transform:`translate3d(${origin.x+dx*.25}px,${origin.y+dy*.4}px,0) rotate(${r+35}deg) scale(1)`,opacity:.9,offset:.22},
   {transform:`translate3d(${origin.x+dx}px,${origin.y+dy}px,0) rotate(${r+130}deg) scale(.65)`,opacity:0,offset:1},
  ],{duration:950+Math.random()*450,delay:i*20,easing:'cubic-bezier(.15,.6,.35,1)',fill:'both'});
  animation.finished.catch(()=>{}).finally(()=>{petal.remove();celebrationEffects.delete(petal);});
 }
}
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)clearCelebration();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearCelebration();});

function addFlowers(event){
 if(!gardenOpen)return;
 flowerRound++;
 const rect=document.querySelector('#more-flowers').getBoundingClientRect();
 const origin=event?.clientX?{x:event.clientX,y:event.clientY}:{x:rect.left+rect.width/2,y:rect.top+rect.height/2};
 spawnFloatingFlowers(4,origin);
 celebrateFlowers(origin);
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
