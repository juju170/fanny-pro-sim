// === AI SEDERHANA UNTUK FANNY PRO SIM ===

// Posisi objek tiruan
let enemy = { x: 200, y: 200, alive: true };
let buff = { x: 100, y: 400, available: true };

// Fungsi jarak antar dua titik
function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// Fungsi aksi otomatis AI
function aiDecision() {
  // Jika HP rendah
  if (fanny.hp < 30) {
    console.log("HP rendah, mundur!");
    fanny.x += (Math.random() - 0.5) * -40;
    fanny.y += (Math.random() - 0.5) * -40;
    return;
  }

  // Jika energi rendah
  if (fanny.energy < 30) {
    console.log("Energi rendah, mundur dulu...");
    fanny.x += (Math.random() - 0.5) * -20;
    fanny.y += (Math.random() - 0.5) * -20;
    return;
  }

  // Jika ada buff & tersedia
  if (buff.available && distance(fanny, buff) > 60) {
    console.log("Pergi ke buff...");
    fanny.x += (buff.x - fanny.x) * 0.02;
    fanny.y += (buff.y - fanny.y) * 0.02;
    return;
  }

  // Jika musuh masih hidup & dekat
  if (enemy.alive && distance(fanny, enemy) < 150) {
    console.log("Musuh dekat, serang!");
    useSkill(15, (enemy.x - fanny.x) * 0.2, (enemy.y - fanny.y) * 0.2);

    // Simulasi damage
    if (distance(fanny, enemy) < 40) {
      enemy.alive = false;
      console.log("Musuh dikalahkan!");
    }
    return;
  }

  // Jika tidak ada musuh dekat, jelajah acak
  fanny.x += (Math.random() - 0.5) * 2;
  fanny.y += (Math.random() - 0.5) * 2;
}

// Tambahkan AI ke loop utama
const oldLoop = gameLoop;
window.gameLoop = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Panggil AI
  aiDecision();

  // Gambar musuh & buff
  if (enemy.alive) {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 25, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  if (buff.available) {
    ctx.beginPath();
    ctx.arc(buff.x, buff.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
  }

  drawFanny();
  updateBars();
  regenEnergy();

  requestAnimationFrame(gameLoop);
};

gameLoop();
