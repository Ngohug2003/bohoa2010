import './teachers.css';

const $ = selector => document.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const video = $('#classroom-video');
const music = $('#music');
const sound = $('#sound');
let musicWanted = true;
let gardenOpen = false;
let letterIndex = 0;
const dialog = $('#letter-dialog');
const flowers = new Set();
const resumedAfterLetter = new WeakSet();
const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
let restoringFlowerFocus = false;
const letters = [
  {
    label: 'Lòng biết ơn', title: ['Cảm ơn thầy cô,', 'vì những mùa xanh.'],
    paragraphs: [
      'Có những điều ngày ấy chúng em chưa kịp hiểu, để rồi khi lớn lên mới nhận ra: đằng sau mỗi bài giảng là biết bao kiên nhẫn và yêu thương.',
      'Cảm ơn thầy cô đã dành những năm tháng tận tụy để gieo chữ, gieo ước mơ và giúp chúng em trưởng thành. Những điều ấy, chúng em luôn mang theo.',
    ],
    wish: 'Nhân ngày 20/11, kính chúc thầy cô luôn mạnh khỏe, bình an và hạnh phúc. Mong mỗi ngày đến lớp vẫn là một ngày đầy niềm vui.',
  },
  {
    label: 'Niềm tin', title: ['Một lời động viên,', 'một đời nhớ mãi.'],
    paragraphs: [
      'Đôi khi, điều giúp một người học trò bước tiếp chỉ là một lời: “Em làm được.” Cảm ơn thầy cô đã nhìn thấy khả năng của chúng em, ngay cả khi chúng em còn chưa tin vào chính mình.',
      'Niềm tin ấy trở thành hành trang để chúng em dám thử, dám sai và dám bắt đầu lại. Mong thầy cô biết rằng những lời động viên của mình chưa bao giờ là nhỏ bé.',
    ],
    wish: 'Kính chúc thầy cô luôn có thật nhiều niềm vui, và luôn được đón nhận những yêu thương đẹp như cách thầy cô đã trao đi.',
  },
  {
    label: 'Bài học', title: ['Bài học năm ấy,', 'theo em đến hôm nay.'],
    paragraphs: [
      'Có những trang vở đã cũ, nhưng bài học về sự tử tế, lòng trung thực và cách đối xử với mọi người thì vẫn còn nguyên.',
      'Cảm ơn thầy cô không chỉ dạy chúng em kiến thức, mà còn dạy chúng em cách làm một người có trách nhiệm và biết yêu thương. Đó là những bài học không bao giờ khép lại.',
    ],
    wish: 'Chúc thầy cô một ngày Nhà giáo Việt Nam thật ấm áp. Mong những thế hệ học trò trưởng thành luôn là niềm tự hào của thầy cô.',
  },
  {
    label: 'Sức khỏe', title: ['Xin gửi thầy cô,', 'thật nhiều sức khỏe.'],
    paragraphs: [
      'Sau những giờ đứng lớp, những trang giáo án và những bài kiểm tra còn chờ chấm, mong thầy cô cũng dành cho mình một chút nghỉ ngơi.',
      'Cảm ơn thầy cô vì đã luôn chăm lo cho học trò. Hôm nay, chúng em chỉ muốn nhắn rằng: thầy cô cũng hãy chăm sóc bản thân thật tốt nhé.',
    ],
    wish: 'Kính chúc thầy cô luôn khỏe mạnh, có những giấc ngủ ngon, những ngày nhẹ nhàng và thật nhiều thời gian vui bên gia đình.',
  },
  {
    label: 'Nhiệt huyết', title: ['Giữ một ngọn lửa,', 'thắp bao ước mơ.'],
    paragraphs: [
      'Có những ước mơ bắt đầu từ một bài giảng đầy say mê. Sự tận tâm của thầy cô đã khiến những điều tưởng như xa lạ trở nên gần gũi và đáng khám phá.',
      'Mong trên chặng đường phía trước, thầy cô vẫn có những tiết học khiến mình mỉm cười và những người học trò mang đến thật nhiều cảm hứng.',
    ],
    wish: 'Chúc thầy cô luôn giữ được niềm vui với nghề, được trân trọng và có thêm thật nhiều mùa dạy học đáng nhớ.',
  },
  {
    label: 'Bình an', title: ['Sau những tận tụy,', 'mong thầy cô an vui.'],
    paragraphs: [
      'Dẫu chúng em có đi xa đến đâu, mái trường và những người thầy, người cô vẫn là một miền ký ức dịu dàng để nhớ về.',
      'Nhân ngày 20/11, xin gửi lại một chút yêu thương từ những người học trò đã từng được thầy cô dìu dắt. Mong những điều tốt đẹp sẽ luôn tìm đến thầy cô.',
    ],
    wish: 'Kính chúc thầy cô bình an trong lòng, hạnh phúc bên những người thương và luôn mỉm cười khi nhớ về những mùa học trò.',
  },
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
  if (reducedMotion.matches || !gardenOpen) return;
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

function syncFlowers() {
  flowers.forEach(node => {
    const interactionPaused = !resumedAfterLetter.has(node)
      && (node.matches(':focus-visible') || (hoverPointer.matches && node.matches(':hover')));
    const paused = document.hidden || dialog.open || reducedMotion.matches || interactionPaused;
    node.getAnimations().forEach(animation => paused ? animation.pause() : animation.play());
  });
}

function clearFlowers() {
  flowers.forEach(node => { node.getAnimations().forEach(animation => animation.cancel()); node.remove(); });
  flowers.clear();
}

function makeFlowers() {
  clearFlowers();
  if (!gardenOpen) return;
  const landscape = innerWidth > innerHeight && innerHeight < 600;
  const mobile = innerWidth <= 720 && !landscape;
  const shortMobile = mobile && innerHeight < 620;
  // Only the reduced-motion alternative uses a stationary arrangement.
  const stillAnchors = landscape
    ? [[.54,.36],[.73,.35],[.91,.36],[.54,.7],[.73,.7],[.91,.7]]
    : mobile
      ? (shortMobile
        ? [[.16,.51],[.5,.49],[.83,.52],[.18,.69],[.51,.68],[.83,.69]]
        : [[.16,.49],[.5,.47],[.83,.5],[.18,.70],[.51,.71],[.83,.70]])
      : [[.12,.48],[.28,.72],[.43,.60],[.59,.75],[.76,.47],[.9,.72]];
  const lanes = landscape ? [.55,.9,.72,.6,.85,.75] : [.12,.86,.3,.72,.43,.6];
  const duration = 9000;
  letters.forEach((letter, index) => {
    const width = landscape ? Math.min(76, innerWidth * .1, innerHeight * .2)
      : mobile ? Math.min(108, innerWidth * .26) : Math.min(168, innerWidth * .13);
    const height = width * 1.5;
    const lane = reducedMotion.matches ? stillAnchors[index][0] : lanes[index];
    const x = Math.max(12, Math.min(innerWidth - width - 12, lane * innerWidth - width / 2));
    const node = document.createElement('button');
    node.className = 'letter-flower';
    node.id = `flower-letter-${index}`;
    node.setAttribute('aria-label', `Mở bức thư ${index + 1}: ${letter.label}`);
    node.setAttribute('aria-haspopup', 'dialog');
    node.setAttribute('aria-controls', 'letter-dialog');
    node.style.cssText = `left:${x}px;top:0;width:${width}px;height:${height}px;`;
    const image = new Image();
    image.src = '/media/teachers/teachers-single-flower.webp';
    image.alt = ''; image.draggable = false; image.decoding = 'async';
    node.append(image);
    $('#letter-flower-bed').append(node); flowers.add(node);
    node.addEventListener('click', () => openLetter(index));
    node.addEventListener('pointerenter', syncFlowers);
    node.addEventListener('pointerleave', () => {
      if (document.activeElement !== node) resumedAfterLetter.delete(node);
      syncFlowers();
    });
    node.addEventListener('blur', () => {
      resumedAfterLetter.delete(node);
      syncFlowers();
    });
    node.addEventListener('focus', () => {
      if (!restoringFlowerFocus) resumedAfterLetter.delete(node);
      // Keyboard users can reach a letter even while its flower is above/below the screen.
      const bounds = node.getBoundingClientRect();
      if (!restoringFlowerFocus && node.matches(':focus-visible')
        && (bounds.top < 80 || bounds.bottom > innerHeight - 90)) {
        node.getAnimations().forEach(animation => {
          animation.currentTime = animation.effect.getTiming().delay + duration * .5;
        });
      }
      syncFlowers();
    });
    if (reducedMotion.matches) {
      const y = Math.max(100, Math.min(innerHeight - height - 68, stillAnchors[index][1] * innerHeight - height / 2));
      node.style.top = `${y}px`;
      node.style.opacity = '1';
      return;
    }
    const sway = mobile || landscape ? 14 : 32;
    const rotation = index % 2 ? 9 : -10;
    const startY = -height - 24;
    const distance = innerHeight + height + 48;
    // Uniform vertical speed from above the screen to below it; only the
    // horizontal sway and rotation vary gently, with no separate entrance rush.
    const frames = Array.from({ length: 33 }, (_, step) => {
      const progress = step / 32;
      const wave = Math.sin(progress * Math.PI * 2);
      return {
        offset: progress,
        transform: `translate3d(${wave * sway}px,${startY + distance * progress}px,0) rotate(${rotation + wave * 8}deg)`,
        opacity: step === 0 || step === 32 ? 0 : .96,
        easing: 'linear',
      };
    });
    // Every flower begins entirely above the screen. The same delay and duration
    // are preserved on later loops, so arrivals stay staggered without JS timers.
    node.animate(frames, {
      duration, delay: index * 1500,
      iterations: Infinity, easing: 'linear', fill: 'both',
    });
    syncFlowers();
  });
}

function showGarden(open) {
  gardenOpen = open;
  if (dialog.open) dialog.close();
  document.body.classList.toggle('is-garden', open);
  $('#hero').hidden = open;
  $('#garden-scene').hidden = !open;
  makePetals(); makeFlowers();
  window.scrollTo({ top: 0, behavior: 'instant' });
  (open ? $('#garden-title') : $('#open-letter')).focus({ preventScroll: true });
  $('#announcement').textContent = open ? 'Hoa đang lần lượt rơi từ trên xuống. Chạm vào từng bông hoa để đọc một bức thư riêng.' : 'Trở về bó hoa tri ân thầy cô.';
}

let audioCtx = null;
function playPageRustle() {
  if (!musicWanted || reducedMotion.matches) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = Math.floor(sampleRate * 0.16);
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI) * Math.exp(-t * 2.5);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.16;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1250, audioCtx.currentTime);
    filter.Q.setValueAtTime(2.0, audioCtx.currentTime);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.28, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.16);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
  } catch (_) {
    // Non-critical audio effect
  }
}

let isTurningPage = false;

function updateLetterContent(index) {
  letterIndex = index;
  const letter = letters[index];
  const padIndex = String(index + 1).padStart(2, '0');
  const total = String(letters.length).padStart(2, '0');

  $('#letter-counter').textContent = `Trang ${padIndex} / ${total}`;
  const pageTag = $('#page-tag');
  if (pageTag) pageTag.textContent = `${padIndex} · ${letter.label.toUpperCase()}`;

  const italic = document.createElement('em');
  italic.textContent = letter.title[1];
  $('#letter-title').replaceChildren(
    document.createTextNode(letter.title[0]),
    document.createElement('br'),
    italic
  );
  $('#letter-paragraph-one').textContent = letter.paragraphs[0];
  $('#letter-paragraph-two').textContent = letter.paragraphs[1];
  $('#wish-text').textContent = letter.wish;

  document.querySelectorAll('.journal-tab').forEach((tab, i) => {
    tab.classList.toggle('is-active', i === index);
  });
}

function turnToPage(targetIndex, direction = 'next') {
  if (isTurningPage || targetIndex === letterIndex) return;
  if (reducedMotion.matches) {
    updateLetterContent(targetIndex);
    $('#letter-title').focus({ preventScroll: true });
    return;
  }

  isTurningPage = true;
  playPageRustle();

  const page = $('#journal-page');
  const outClass = direction === 'next' ? 'page-turn-out-left' : 'page-turn-out-right';
  const inClass = direction === 'next' ? 'page-turn-in-right' : 'page-turn-in-left';

  page?.classList.add(outClass);

  setTimeout(() => {
    updateLetterContent(targetIndex);
    page?.classList.remove(outClass);
    page?.classList.add(inClass);

    setTimeout(() => {
      page?.classList.remove(inClass);
      isTurningPage = false;
      $('#letter-title').focus({ preventScroll: true });
    }, 280);
  }, 220);
}

function openLetter(index) {
  if (dialog.open) {
    turnToPage(index, index > letterIndex ? 'next' : 'prev');
    return;
  }
  updateLetterContent(index);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('is-letter');
  $('#letter-title').focus({ preventScroll: true });
  playPageRustle();
  syncFlowers();
}

function initJournal() {
  const tabsContainer = $('#journal-tabs');
  if (tabsContainer) {
    tabsContainer.replaceChildren();
    letters.forEach((letter, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `journal-tab${i === letterIndex ? ' is-active' : ''}`;
      btn.id = `journal-tab-${i}`;
      btn.innerHTML = `<span class="tab-index">${String(i + 1).padStart(2, '0')}</span><span class="tab-label">${letter.label}</span>`;
      btn.setAttribute('aria-label', `Trang ${i + 1}: ${letter.label}`);
      btn.addEventListener('click', () => turnToPage(i, i > letterIndex ? 'next' : 'prev'));
      tabsContainer.append(btn);
    });
  }

  $('#next-letter')?.addEventListener('click', () => turnToPage((letterIndex + 1) % letters.length, 'next'));
  $('#prev-letter')?.addEventListener('click', () => turnToPage((letterIndex - 1 + letters.length) % letters.length, 'prev'));

  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      turnToPage((letterIndex + 1) % letters.length, 'next');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      turnToPage((letterIndex - 1 + letters.length) % letters.length, 'prev');
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  const notebook = $('#journal-notebook');
  notebook?.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  notebook?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        turnToPage((letterIndex + 1) % letters.length, 'next');
      } else {
        turnToPage((letterIndex - 1 + letters.length) % letters.length, 'prev');
      }
    }
  }, { passive: true });
}

initJournal();

$('#open-letter').addEventListener('click', () => showGarden(true));
$('#bouquet').addEventListener('click', () => showGarden(true));
$('#back').addEventListener('click', () => showGarden(false));
$('#replay-flowers').addEventListener('click', () => {
  makeFlowers();
  $('#announcement').textContent = 'Hoa bắt đầu rơi lại lần lượt từ trên xuống, mỗi bông giữ một bức thư riêng.';
});
['close-letter', 'return-garden'].forEach(id => $(`#${id}`).addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('is-letter');
  if (gardenOpen) {
    const flower = $(`#flower-letter-${letterIndex}`);
    restoringFlowerFocus = true;
    flower?.focus({ preventScroll: true });
    restoringFlowerFocus = false;
    // Returning focus (or sticky touch hover) must not freeze the flower again.
    if (flower) resumedAfterLetter.add(flower);
  }
  syncFlowers();
});
let resizeTimer;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => makeFlowers(), 160);
});
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('is-hidden-tab', document.hidden);
  syncVideo(); syncFlowers();
  if (document.hidden) music.pause();
  else playMusic();
});
reducedMotion.addEventListener('change', () => { syncVideo(); makePetals(); makeFlowers(); });
syncVideo();
playMusic();
