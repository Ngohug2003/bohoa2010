import './teachers.css';

const $ = selector => document.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const video = $('#classroom-video');
const music = $('#music');
const sound = $('#sound');
let musicWanted = true;
let letterOpen = false;
let wishIndex = 0;
const wishes = [
  'Nhân ngày 20/11, kính chúc thầy cô luôn mạnh khỏe, bình an và hạnh phúc. Mong mỗi ngày đến lớp vẫn là một ngày đầy niềm vui.',
  'Kính chúc thầy cô luôn giữ được ngọn lửa yêu nghề, có thật nhiều sức khỏe và những thế hệ học trò khiến thầy cô tự hào.',
  'Mong những yêu thương thầy cô đã trao sẽ trở về thành thật nhiều niềm vui. Chúc thầy cô một ngày 20/11 ấm áp bên gia đình và học trò.',
  'Cảm ơn thầy cô đã nhìn thấy khả năng của chúng em, ngay cả khi chúng em còn chưa tin vào chính mình. Kính chúc thầy cô luôn an vui và hạnh phúc.',
];

function syncSound() {
  const playing = !music.paused && !music.ended;
  sound.setAttribute('aria-pressed', String(playing));
  sound.setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền ở âm lượng 10%');
  $('#sound-label').textContent = playing ? 'Nhạc nền · 10%' : 'Bật nhạc · 10%';
}

async function playMusic() {
  if (!musicWanted || document.hidden) return;
  music.volume = 0.1;
  try {
    await music.play();
  } catch (error) {
    if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
      $('#announcement').textContent = 'Chưa tải được nhạc nền. Bạn có thể thử bật nhạc lại.';
    }
  }
  syncSound();
}

music.volume = 0.1;
['play', 'pause', 'ended'].forEach(event => music.addEventListener(event, syncSound));
sound.addEventListener('click', () => {
  if (!music.paused) {
    musicWanted = false;
    music.pause();
  } else {
    musicWanted = true;
    playMusic();
  }
});
// Retry blocked autoplay in a real gesture, without overriding an explicit mute.
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('#sound') && music.paused) playMusic();
}, { passive: true });
document.addEventListener('keydown', event => {
  if (['Enter', ' '].includes(event.key) && !event.target.closest('#sound') && music.paused) playMusic();
});

function syncVideo() {
  if (document.hidden || reducedMotion.matches) video.pause();
  else video.play().catch(() => {});
}
video.addEventListener('error', () => document.body.classList.add('video-unavailable'));

function makePetals() {
  $('#petals').replaceChildren();
  if (reducedMotion.matches || !letterOpen) return;
  const fragment = document.createDocumentFragment();
  const count = innerWidth <= 720 ? 10 : 16;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.cssText = `--x:${(i * 73.7) % 100}%;--size:${8 + i % 8}px;--duration:${10 + i % 5}s;--delay:${-i * 1.3}s;--drift:${(i % 2 ? 1 : -1) * (45 + i * 4)}px;--turn:${180 + i * 37}deg`;
    fragment.append(petal);
  }
  $('#petals').append(fragment);
}

function celebrate(x, y) {
  if (reducedMotion.matches) return;
  document.querySelectorAll('.petal-burst').forEach(petal => petal.remove());
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal-burst';
    petal.setAttribute('aria-hidden', 'true');
    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;
    document.body.append(petal);
    const angle = i / 12 * Math.PI * 2;
    const distance = 70 + i % 4 * 35;
    petal.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 0 },
      { opacity: 1, offset: .15 },
      { transform: `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance + 70}px) rotate(${i * 55}deg)`, opacity: 0 },
    ], { duration: 1100 + i * 35, easing: 'cubic-bezier(.15,.6,.3,1)' }).finished.then(() => petal.remove()).catch(() => petal.remove());
  }
}

function showLetter(open) {
  letterOpen = open;
  document.body.classList.toggle('is-letter', open);
  $('#hero').hidden = open;
  $('#letter-scene').hidden = !open;
  makePetals();
  window.scrollTo({ top: 0, behavior: 'instant' });
  (open ? $('#letter-title') : $('#open-letter')).focus({ preventScroll: true });
  $('#announcement').textContent = open ? 'Lá thư tri ân thầy cô đã mở. Chúc mừng ngày Nhà giáo Việt Nam 20 tháng 11.' : 'Trở về bó hoa tri ân thầy cô.';
  if (open) celebrate(innerWidth * .5, Math.min(innerHeight * .6, 500));
}

$('#open-letter').addEventListener('click', () => showLetter(true));
$('#bouquet').addEventListener('click', () => showLetter(true));
$('#back').addEventListener('click', () => showLetter(false));
$('#another-wish').addEventListener('click', event => {
  wishIndex = (wishIndex + 1) % wishes.length;
  $('#wish-text').textContent = wishes[wishIndex];
  const wish = $('.wish');
  wish.classList.remove('is-changing');
  requestAnimationFrame(() => wish.classList.add('is-changing'));
  const box = event.currentTarget.getBoundingClientRect();
  celebrate(box.x + box.width / 2, box.y);
});
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('is-hidden-tab', document.hidden);
  syncVideo();
  if (document.hidden) music.pause();
  else playMusic();
});
reducedMotion.addEventListener('change', () => { syncVideo(); makePetals(); });
syncVideo();
playMusic();
