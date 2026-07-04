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


  function loadTenants() {
    return getTenants();
  }

  const promoGrid = document.getElementById("promo-grid");
  const regularGrid = document.getElementById("regular-grid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const categorySelect = document.getElementById("categorySelect");
  const promoSection = document.getElementById("tenant-promo-section");
  const regularSection = document.getElementById("tenant-regular-section");
  const emptyState = document.getElementById("empty-state");

  function getStars(rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        starsHTML += '<i class="fas fa-star text-warning"></i>';
      } else if (rating >= i - 0.5) {
        starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
      } else {
        starsHTML += '<i class="far fa-star text-warning"></i>';
      }
    }
    return starsHTML;
  }

  function createCard(tenant) {
    return `
                <div class="tenant-item">
                    ${tenant.isPromo ? `<span class="badge-promo">${tenant.promoBadge}</span>` : ""}
                    <img src="${tenant.img}" alt="${tenant.name}" class="tenant-cover">
                    <div class="tenant-info">
                        <h4>${tenant.name}</h4>
                        <div class="tenant-rating">
                            ${getStars(tenant.rating)}
                            <span class="rating-score">${tenant.rating}</span>
                        </div>
                        <p>${tenant.desc}</p>
                        <a href="detail-tenant.html?id=${tenant.id}" class="tenant-btn">Kunjungi Tenant</a>
                    </div>
                </div>
            `;
  }

  function renderTenants() {
    if (!promoGrid || !regularGrid) return;

    const tenantsData = loadTenants();
    const query = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;
    const category = categorySelect.value;

    let filteredData = tenantsData.filter((tenant) => {
      const matchQuery =
        tenant.name.toLowerCase().includes(query) ||
        tenant.desc.toLowerCase().includes(query);
      const matchCategory =
        category === "semua" || tenant.category === category;
      return matchQuery && matchCategory;
    });

    if (sortBy === "rating") {
      filteredData.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "termurah") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "termahal") {
      filteredData.sort((a, b) => b.price - a.price);
    } else {
      filteredData.sort((a, b) => a.id - b.id);
    }

    const promoData = filteredData.filter((t) => t.isPromo);
    const regularData = filteredData.filter((t) => !t.isPromo);

    promoGrid.innerHTML = "";
    regularGrid.innerHTML = "";

    if (promoData.length > 0) {
      promoSection.style.display = "block";
      promoGrid.innerHTML = promoData.map(createCard).join("");
    } else {
      promoSection.style.display = "none";
    }

    if (regularData.length > 0) {
      regularSection.style.display = "block";
      regularGrid.innerHTML = regularData.map(createCard).join("");
    } else {
      regularSection.style.display = "none";
    }

    if (promoData.length === 0 && regularData.length === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }
  }

  if (searchInput && sortSelect && categorySelect) {
    renderTenants();
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        renderTenants();
        this.blur();
      }
    });
    sortSelect.addEventListener("change", renderTenants);
    categorySelect.addEventListener("change", renderTenants);


    window.addEventListener("storage", (e) => {
      if (e.key === "tenants") renderTenants();
    });
  }
});
