const scenes = [
  { background: "Scene1.png", text: "this is u being cutesy and stuff listening to music" },
  { background: "Scene2.png", text: "press the button :3" },
  { background: "Scene3.png", text: "it all started when we both randomly decided to userphone one day" },
  { background: "Scene4.png", text: "you never fail to make me laugh" },
  { background: "Scene5.png", text: "youre relatable asf" },
  { background: "Scene6.png", text: "and kind" },
  { background: "Scene7.png", text: "we share so many memories together and i hope we can make so much more" },
  { background: "Scene8.png", text: "even from far away you became my favorite person" },
  { background: "Scene9.png", text: "happy anniversary baby no matter the distance ill always love you. ❤️" },
  { background: "Scene10.gif", text: "THE ENDDDDD" }
];

let currentScene = 0;
let typingInterval;
let heartInterval;

const game = document.getElementById("game");
const text = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

/* Typing effect */
function typeText(element, message, speed = 35) {
  clearInterval(typingInterval);
  element.textContent = "";
  nextBtn.disabled = true;

  let i = 0;
  typingInterval = setInterval(() => {
    if (i < message.length) {
      element.textContent += message.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      nextBtn.disabled = false;
    }
  }, speed);
}

/* Floating hearts */
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

/* Music button */
const musicBtn = document.createElement("button");
musicBtn.id = "musicBtn";
musicBtn.textContent = "Play Music 🎵";
musicBtn.style.display = "none";
document.body.appendChild(musicBtn);

musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = "Pause Music ⏸️";
  } else {
    audio.pause();
    musicBtn.textContent = "Play Music 🎵";
  }
});

/* Hover effect for desktop */
musicBtn.addEventListener("mouseenter", () => {
  musicBtn.style.transform = "translate(-50%, -50%) scale(1.1)";
  musicBtn.style.boxShadow = "0 6px 15px rgba(255,95,109,0.6)";
});
musicBtn.addEventListener("mouseleave", () => {
  musicBtn.style.transform = "translate(-50%, -50%) scale(1)";
  musicBtn.style.boxShadow = "none";
});

// Audio
const audio = new Audio("audio/song.mp3");
audio.loop = true;

/* Scene loader */
function loadScene(sceneIndex) {
  const scene = scenes[sceneIndex];
  game.style.backgroundImage = `url('${scene.background}')`;

  typeText(text, scene.text);

  game.classList.remove("fade");
  void game.offsetWidth;
  game.classList.add("fade");

  backBtn.disabled = sceneIndex === 0;
  nextBtn.style.display = sceneIndex === scenes.length - 1 ? "none" : "inline-block";

  /* Hearts only on final scene */
  if (sceneIndex === scenes.length - 1) {
    heartInterval = setInterval(spawnHeart, 2000);
  } else {
    clearInterval(heartInterval);
  }

  /* Show music button from Scene2 onward */
  if (sceneIndex >= 1) {
    musicBtn.style.display = "block";
  }
}

/* Navigation (click + touch support) */
function nextScene() {
  if (currentScene < scenes.length - 1) {
    currentScene++;
    loadScene(currentScene);
  }
}

function prevScene() {
  if (currentScene > 0) {
    currentScene--;
    loadScene(currentScene);
  }
}

nextBtn.addEventListener("click", nextScene);
nextBtn.addEventListener("touchstart", nextScene);

backBtn.addEventListener("click", prevScene);
backBtn.addEventListener("touchstart", prevScene);

/* Start game */
loadScene(currentScene);

