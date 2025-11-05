// === Inisialisasi elemen ===
const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hpBar = document.getElementById("hp-fill");
const energyBar = document.getElementById("energy-fill");

let fanny = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  hp: 100,
  energy: 100,
  speed: 4,
  size: 40,
};

// === Gambar Hero di Map ===
function drawFanny() {
  ctx.beginPath();
  ctx.arc(fanny.x, fanny.y, fanny.size, 0, Math.PI * 2);
  ctx.fillStyle = "#00aaff";
  ctx.fill();
  ctx.closePath();
}

// === Update Bar ===
function updateBars() {
  hpBar.style.width = `${fanny.hp}%`;
  energyBar.style.width = `${fanny.energy}%`;
}

// === Regenerasi energi ===
function regenEnergy() {
  if (fanny.energy < 100) {
    fanny.energy += 0.1;
  }
}

// === Logika Tombol Skill ===
function useSkill(cost, moveX, moveY) {
  if (fanny.energy >= cost) {
    fanny.energy -= cost;
    fanny.x += moveX;
    fanny.y += moveY;
  } else {
    console.log("Energi tidak cukup!");
  }
}

// === Kontrol Tombol ===
document.getElementById("skill1").addEventListener("click", () => {
  useSkill(15, -40, 0); // ke kiri
});

document.getElementById("skill2").addEventListener("click", () => {
  useSkill(15, 40, 0); // ke kanan
});

document.getElementById("skill3").addEventListener("click", () => {
  useSkill(25, 0, -60); // ke atas
});

document.getElementById("attack").addEventListener("click", () => {
  console.log("Basic attack!");
});

// === Loop utama ===
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFanny();
  updateBars();
  regenEnergy();

  requestAnimationFrame(gameLoop);
}

gameLoop();
