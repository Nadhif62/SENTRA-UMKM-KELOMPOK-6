
const checkUser = localStorage.getItem("currentUser");


if (!checkUser || checkUser === "null" || checkUser === "undefined") {
  alert("Akses ditolak! Anda harus login terlebih dahulu.");
  window.location.replace("../index.html");
}

window.prosesLogout = function () {
  localStorage.clear(); 
  alert("Anda berhasil keluar. Sesi telah dibersihkan.");
  window.location.replace("../index.html");
};
