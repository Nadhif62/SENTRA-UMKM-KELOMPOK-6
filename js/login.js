// Login JS
// --- LOGIKA TOAST POPUP NOTIFICATION ---
function showToast(type, title, message) {
  const toastContainer = document.getElementById("toastContainer");

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon = type === "error" ? "fa-circle-exclamation" : "fa-circle-check";

  toast.innerHTML = `
                <i class="fa-solid ${icon} fa-lg"></i>
                <div class="toast-content">
                    <strong>${title}</strong>
                    <span>${message}</span>
                </div>
            `;

  toastContainer.appendChild(toast);

  // Trigger animasi masuk
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Hapus otomatis setelah 3.5 detik
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400); // Tunggu animasi keluar selesai
  }, 3500);
}

// Helper Validasi Format Email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// --- LOGIKA TOGGLE FORM LOGIN & DAFTAR ---
function toggleForm(type) {
  const loginSection = document.getElementById("login-form-section");
  const registerSection = document.getElementById("register-form-section");
  const title = document.getElementById("auth-title");
  const subtitle = document.getElementById("auth-subtitle");

  // Reset input saat ganti form
  document.getElementById("loginForm").reset();
  document.getElementById("registerForm").reset();

  if (type === "register") {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    title.textContent = "Daftar Akun";
    subtitle.textContent = "Bergabunglah dengan Sentra UMKM";
  } else {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    title.textContent = "Masuk";
    subtitle.textContent = "Selamat datang kembali di Sentra UMKM";
  }
}

// --- LOGIKA SUBMIT LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // 1. Validasi Format Email
  if (!isValidEmail(email)) {
    showToast("error", "Gagal Masuk", "Format email kurang tepat!");
    return;
  }

  // 2. Cek Akun Admin
  if (email === "admin@umkm.local") {
    if (password === "censololeh") {
      showToast("success", "Berhasil", "Masuk sebagai Admin...");
      setTimeout(() => (window.location.href = "admin/dashboard.html"), 1500);
    } else {
      showToast("error", "Gagal Masuk", "Kata sandi Admin salah!");
    }
  }
  // 3. Cek Akun Pelanggan (User)
  else {
    if (password.length < 6) {
      showToast("error", "Gagal Masuk", "Kata sandi salah! (Min. 6 Karakter)");
    } else {
      // SIMPAN DATA KE LOCAL STORAGE SEBELUM PINDAH HALAMAN
      const userData = {
        name: email.split("@")[0], // Mengambil nama dari depan email sementara
        email: email,
        phone: "",
        address: "",
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      showToast("success", "Berhasil", "Login Pelanggan berhasil...");
      setTimeout(() => (window.location.href = "user/home.html"), 1500);
    }
  }
});

// --- LOGIKA SUBMIT DAFTAR ---
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    // 1. Validasi Format Email
    if (!isValidEmail(email)) {
      showToast("error", "Pendaftaran Gagal", "Format email kurang tepat!");
      return;
    }

    // 2. Validasi Kata Sandi (Misal wajib minimal 6 karakter)
    if (password.length < 6) {
      showToast(
        "error",
        "Pendaftaran Gagal",
        "Kata sandi kurang dari 6 karakter!",
      );
      return;
    }

    // 3. SIMPAN DATA PENDAFTARAN KE LOCAL STORAGE
    const userData = {
      name: name,
      email: email,
      phone: "",
      address: "",
    };
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // 4. Jika Sukses
    showToast("success", "Pendaftaran Berhasil", "Mengarahkan ke beranda...");
    setTimeout(() => (window.location.href = "user/home.html"), 1500);
  });
