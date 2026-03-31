const catEl       = document.getElementById('cat');
const counterEl   = document.getElementById('counter');
const reactionEl  = document.getElementById('reaction');
const milestoneEl = document.getElementById('milestone');
const particlesEl = document.getElementById('particles');

let clickCount = 0;
let lastReactionIndex = -1;

const reactions = [
  "😻 So cute!", "🐾 Purrfect!", "😺 Meow~", "🙀 Whoa!",
  "😸 Hehe!", "💕 Loves it!", "🐟 Feed me!", "😹 LOL!",
  "🌟 Shiny!", "🎉 Yay!", "💫 Sparkle!", "🔥 Hot!",
  "🍣 Sushi?", "🎵 Purring~", "👑 King cat!", "🌈 Rainbow!",
  "💥 Boom!", "🥳 Party!", "🍀 Lucky!", "🦋 Flutter!",
  "🌸 Kawaii!", "⚡ Zap!", "🎊 Confetti!", "🍩 Donut?",
  "🤩 Wow!", "🐠 Fishy!", "🌙 Mooncat!", "🎸 Rock on!",
  "🍦 Ice cream!", "🦄 Unicat!", "🌺 Bloom!", "💎 Gem!",
  "🚀 To space!", "🎯 Bullseye!", "🍭 Sweet!", "🌊 Splash!",
  "🦊 Foxy!", "🎠 Spin!", "🍋 Zesty!", "🐙 Squish!"
];

const milestones = [10, 25, 50, 100, 200, 500];

function selectReaction() {
  let index;
  do {
    index = Math.floor(Math.random() * reactions.length);
  } while (reactions.length > 1 && index === lastReactionIndex);
  lastReactionIndex = index;
  return reactions[index];
}

function updateCounter() {
  counterEl.textContent = clickCount;
  counterEl.classList.remove('count-pop');
  void counterEl.offsetWidth;
  counterEl.classList.add('count-pop');
}

function showReaction(text) {
  reactionEl.textContent = text;
  reactionEl.classList.remove('reaction-float');
  void reactionEl.offsetWidth;
  reactionEl.classList.add('reaction-float');
}

function playClickAnimation() {
  catEl.classList.remove('cat-bounce');
  void catEl.offsetWidth;
  catEl.classList.add('cat-bounce');
}

function spawnParticle() {
  const emojis = ['✨','💫','⭐','🌟','💥','🎉','🎊','💕','🐾'];
  const el = document.createElement('div');
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.cssText = `
    position: absolute;
    font-size: ${16 + Math.random() * 20}px;
    left: ${20 + Math.random() * 60}%;
    top: ${30 + Math.random() * 40}%;
    pointer-events: none;
    animation: reactionFloat 800ms ease forwards;
    opacity: 0;
  `;
  particlesEl.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function checkMilestone() {
  if (milestones.includes(clickCount)) {
    milestoneEl.textContent = `🎉 ${clickCount} clicks!`;
    milestoneEl.classList.remove('hidden');
    setTimeout(() => milestoneEl.classList.add('hidden'), 2000);
  }
}

function handleCatClick() {
  clickCount++;
  updateCounter();
  const text = selectReaction();
  showReaction(text);
  playClickAnimation();
  spawnParticle();
  checkMilestone();
}

catEl.addEventListener('click', handleCatClick);
