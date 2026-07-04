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

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveRegisteredUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function toggleForm(type) {
  const loginSection = document.getElementById("login-form-section");
  const registerSection = document.getElementById("register-form-section");
  const title = document.getElementById("auth-title");
  const subtitle = document.getElementById("auth-subtitle");

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

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!isValidEmail(email)) {
    showToast("error", "Gagal Masuk", "Format email kurang tepat!");
    return;
  }

  if (email.toLowerCase() === "admin@umkm.local") {
    if (password === "censololeh") {
      showToast("success", "Berhasil", "Masuk sebagai Admin...");
      setTimeout(() => (window.location.href = "admin/dashboard.html"), 1500);
    } else {
      showToast("error", "Gagal Masuk", "Kata sandi Admin salah!");
    }
    return;
  }

  const users = getRegisteredUsers();
  const account = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );

  if (!account) {
    showToast(
      "error",
      "Gagal Masuk",
      "Akun belum terdaftar. Silakan daftar terlebih dahulu.",
    );
    return;
  }

  if (account.password !== password) {
    showToast("error", "Gagal Masuk", "Kata sandi salah!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(account));
  showToast("success", "Berhasil", "Login Pelanggan berhasil...");
  setTimeout(() => (window.location.href = "user/home.html"), 1500);
});

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;

    if (!isValidEmail(email)) {
      showToast("error", "Pendaftaran Gagal", "Format email kurang tepat!");
      return;
    }

    if (password.length < 6) {
      showToast(
        "error",
        "Pendaftaran Gagal",
        "Kata sandi kurang dari 6 karakter!",
      );
      return;
    }

    if (email.toLowerCase() === "admin@umkm.local") {
      showToast(
        "error",
        "Pendaftaran Gagal",
        "Email ini tidak dapat digunakan untuk pendaftaran.",
      );
      return;
    }

    const users = getRegisteredUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      showToast(
        "error",
        "Pendaftaran Gagal",
        "Email sudah terdaftar. Silakan masuk.",
      );
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
      phone: "",
      address: "",
    };

    users.push(newUser);
    saveRegisteredUsers(users);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    showToast(
      "success",
      "Pendaftaran Berhasil",
      "Mengarahkan ke beranda...",
    );
    setTimeout(() => (window.location.href = "user/home.html"), 1500);
  });
