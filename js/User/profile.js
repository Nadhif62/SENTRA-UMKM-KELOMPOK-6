function showProfileToast(type, title, message) {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "error" ? "fa-circle-exclamation" : "fa-circle-check";

  toast.innerHTML = `<i class="fa-solid ${icon} fa-lg"></i><div class="toast-content"><strong>${title}</strong><span>${message}</span></div>`;
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

document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  if (!profileForm) return;

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  document.getElementById("profName").value = currentUser.name || "";
  document.getElementById("profEmail").value = currentUser.email || "";
  document.getElementById("profPhone").value = currentUser.phone || "";
  document.getElementById("profAddress").value = currentUser.address || "";

  document.getElementById("sidebarUserName").textContent =
    currentUser.name || "Nama Pengguna";
  document.getElementById("sidebarUserEmail").textContent =
    currentUser.email || "user@domain.com";

  window.toggleEditMode = function () {
    document.getElementById("profName").disabled = false;
    document.getElementById("profPhone").disabled = false;
    document.getElementById("profAddress").disabled = false;
    document.getElementById("btnToggleEdit").style.display = "none";
    document.getElementById("btnCancelEdit").style.display = "flex";
    document.getElementById("formFooterAction").style.display = "flex";
  };

  window.cancelEditMode = function () {
    document.getElementById("profName").value = currentUser.name || "";
    document.getElementById("profPhone").value = currentUser.phone || "";
    document.getElementById("profAddress").value = currentUser.address || "";
    document.getElementById("profName").disabled = true;
    document.getElementById("profPhone").disabled = true;
    document.getElementById("profAddress").disabled = true;
    document.getElementById("btnToggleEdit").style.display = "flex";
    document.getElementById("btnCancelEdit").style.display = "none";
    document.getElementById("formFooterAction").style.display = "none";
  };

  window.saveProfileData = function (e) {
    e.preventDefault();
    const updatedName = document.getElementById("profName").value.trim();
    const updatedPhone = document.getElementById("profPhone").value.trim();
    const updatedAddress = document
      .getElementById("profAddress")
      .value.trim();

    if (!updatedName) {
      showProfileToast("error", "Gagal", "Nama lengkap tidak boleh kosong!");
      return;
    }

    currentUser.name = updatedName;
    currentUser.phone = updatedPhone;
    currentUser.address = updatedAddress;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(
      (u) => u.email.toLowerCase() === (currentUser.email || "").toLowerCase(),
    );
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...currentUser };
      localStorage.setItem("users", JSON.stringify(users));
    }

    document.getElementById("sidebarUserName").textContent = updatedName;
    window.cancelEditMode();
    showProfileToast(
      "success",
      "Berhasil",
      "Perubahan profil Anda telah disimpan.",
    );
  };
});
