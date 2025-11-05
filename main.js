const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

const hpBar = document.getElementById("hp-fill");
const energyBar = document.getElementById("energy-fill");
const buffText = document.getElementById("buff-status");
const miniFanny = document.getElementById("mini-fanny");

// Atur ukuran canvas agar tetap kotak (rasio 1:1)
let size = Math.min(window.innerWidth, window.innerHeight);
canvas.width = size;
canvas.height = size;

// Gambar
const imgMap = new Image();
const imgFanny = new Image();
const imgEnemy = new Image();
const imgBuff = new Image();
imgMap.src = "assets/map.png";
imgFanny.src = "assets/fanny.png";
imgEnemy.src = "assets/enemy.png";
imgBuff.src = "assets/buff.png";

// Objek utama (posisi disesuaikan dgn map kamu)
let fanny = { x: 120, y: 650, hp: 100, energy: 100, size: 36, buff: false };
let enemy = { x: 400, y: 150, alive: true };
let buff = { x: 200, y: 500, available: true };

// Gerakan & status
function drawFanny() {
  if (imgFanny.complete)
    ctx.drawImage(imgFanny, fanny.x - 25, fanny.y - 25, 50, 50);
  else {
    ctx.beginPath();
    ctx.arc(fanny.x, fanny.y, fanny.size, 0, Math.PI * 2);
    ctx.fillStyle = "#00aaff";
    ctx.fill();
    ctx.closePath();
  }
}

function updateBars() {
  hpBar.style.width = `${fanny.hp}%`;
  energyBar.style.width = `${fanny.energy}%`;
  buffText.textContent = fanny.buff ? "Buff: Aktif ⚡" : "Buff: Tidak Ada";
}

function regenEnergy() {
  const rate = fanny.buff ? 0.4 : 0.1;
  if (fanny.energy < 100) fanny.energy += rate;
}

function useSkill(cost, moveX, moveY) {
  if (fanny.energy >= cost) {
    fanny.energy -= cost;
    fanny.x = Math.max(0, Math.min(canvas.width, fanny.x + moveX));
    fanny.y = Math.max(0, Math.min(canvas.height, fanny.y + moveY));
  }
}

// Tombol skill & serangan
document.getElementById("skill1").addEventListener("click", () => useSkill(15, -50, 0));
document.getElementById("skill2").addEventListener("click", () => useSkill(15, 50, 0));
document.getElementById("skill3").addEventListener("click", () => useSkill(25, 0, -70));
document.getElementById("attack").addEventListener("click", () => console.log("Basic attack!"));

// Gambar musuh dan buff
function drawObjects() {
  if (enemy.alive)
    ctx.drawImage(imgEnemy, enemy.x - 20, enemy.y - 20, 40, 40);
  if (buff.available)
    ctx.drawImage(imgBuff, buff.x - 15, buff.y - 15, 30, 30);
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function checkBuffPickup() {
  if (buff.available && distance(fanny, buff) < 40) {
    fanny.buff = true;
    buff.available = false;
    console.log("Buff diambil!");
  }
}

function updateMiniMap() {
  const miniSize = 80;
  miniFanny.style.left = `${(fanny.x / canvas.width) * (miniSize - 10) + 10}px`;
  miniFanny.style.top = `${(fanny.y / canvas.height) * (miniSize - 10) + 10}px`;
}

// Loop utama
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgMap, 0, 0, canvas.width, canvas.height);

  drawObjects();
  drawFanny();
  updateBars();
  regenEnergy();
  checkBuffPickup();
  updateMiniMap();

  requestAnimationFrame(gameLoop);
}

gameLoop();
