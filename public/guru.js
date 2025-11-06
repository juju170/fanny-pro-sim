import { db } from "./app.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const form = document.getElementById("formSoal");
const kategori = document.getElementById("kategori");
const lombaSettings = document.getElementById("lombaSettings");
const tambahLencanaBtn = document.getElementById("tambahLencana");
const lencanaList = document.getElementById("lencanaList");

// Tampilkan pengaturan lomba hanya jika kategori lomba
kategori.addEventListener("change", () => {
  lombaSettings.style.display = kategori.value === "lomba" ? "block" : "none";
});

// Tambah baris lencana baru
tambahLencanaBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "lencana-item";
  div.innerHTML = `
    <select class="tipeLencana">
      <option value="emas">Emas</option>
      <option value="perak">Perak</option>
      <option value="perunggu">Perunggu</option>
    </select>
    <input type="text" class="namaLencana" placeholder="Nama Lencana">
  `;
  lencanaList.appendChild(div);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipe = document.getElementById("tipe").value;
  const pertanyaan = document.getElementById("pertanyaan").value;
  const jawaban = document.getElementById("jawaban").value;
  const kelas = document.getElementById("kelas").value;
  const kategoriVal = kategori.value;

  const opsi = [
    document.getElementById("opsi1").value,
    document.getElementById("opsi2").value,
    document.getElementById("opsi3").value,
    document.getElementById("opsi4").value
  ].filter(o => o.trim() !== "");

  const dataSoal = {
    tipe,
    pertanyaan,
    jawaban,
    kelas,
    kategori: kategoriVal,
    timestamp: new Date().toISOString(),
  };

  if (tipe === "pilihan_ganda") dataSoal.opsi = opsi;

  if (kategoriVal === "lomba") {
    const maxPartisipan = parseInt(document.getElementById("maxPartisipan").value);
    const waktuMulai = document.getElementById("waktuMulai").value;
    const lencanaEls = document.querySelectorAll(".lencana-item");
    const lencana = [...lencanaEls].map(el => ({
      tipe: el.querySelector(".tipeLencana").value,
      nama: el.querySelector(".namaLencana").value || "Tanpa Nama"
    }));
    dataSoal.max_partisipan = maxPartisipan;
    dataSoal.waktu_mulai = waktuMulai;
    dataSoal.lencana = lencana;
    dataSoal.status_lobby = "menunggu";
  }

  const targetCollection = kategoriVal === "lomba" ? "soal_lomba" : "soal_harian";
  await addDoc(collection(db, targetCollection), dataSoal);

  alert("Soal berhasil disimpan!");
  form.reset();
  lombaSettings.style.display = "none";
});
