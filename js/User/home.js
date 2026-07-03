document.addEventListener("DOMContentLoaded", () => {
  const userMenuBtn = document.getElementById("user-menu-btn-comprehensive");
  const profileDropdown = document.getElementById(
    "profile-dropdown-comprehensive",
  );

  if (userMenuBtn && profileDropdown) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });
    document.addEventListener("click", (e) => {
      if (!userMenuBtn.contains(e.target)) {
        profileDropdown.classList.remove("show");
      }
    });
  }
});
