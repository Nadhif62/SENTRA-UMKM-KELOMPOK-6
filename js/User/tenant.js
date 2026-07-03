document.addEventListener("DOMContentLoaded", () => {
  // Dropdown menu profil di topbar
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

  // Data tenant untuk daftar & pencarian
  const tenantsData = [
    {
      id: 1,
      name: "Ayam Bakar Bu Sri",
      desc: "Spesialis ayam bakar madu bumbu meresap dan aneka sambal Nusantara sejak 1999.",
      img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60",
      isPromo: true,
      promoBadge: "Diskon 25%",
      rating: 4.8,
      price: 25000,
      category: "makanan",
    },
    {
      id: 2,
      name: "Pusat Oleh-Oleh Mbok Giyem",
      desc: "Menyediakan aneka keripik tempe, singkong, pisang lumer, dan buah kering renyah khas lokal.",
      img: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=500&q=60",
      isPromo: true,
      promoBadge: "Potongan Rp10rb",
      rating: 4.5,
      price: 15000,
      category: "cemilan",
    },
    {
      id: 3,
      name: "Kedai Kopi Pak Kumis",
      desc: "Tempat berkumpulnya penikmat kopi lokal racikan manual brew barista berpengalaman.",
      img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60",
      isPromo: true,
      promoBadge: "Buy 1 Get 1",
      rating: 4.9,
      price: 20000,
      category: "minuman",
    },
    {
      id: 4,
      name: "Warung Sate Khas Madura Cak Malik",
      desc: "Sate ayam dan kambing pilihan dengan siraman bumbu kacang kental legendaris.",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60",
      isPromo: true,
      promoBadge: "Diskon 15%",
      rating: 4.6,
      price: 28000,
      category: "makanan",
    },
    {
      id: 5,
      name: "Dapur Organik Sehat Mama",
      desc: "Menyediakan katering makanan sehat, rendah kalori, non-MSG, dan ramah diet.",
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60",
      isPromo: true,
      promoBadge: "Diskon 20%",
      rating: 4.7,
      price: 35000,
      category: "makanan",
    },
    {
      id: 6,
      name: "Kedai Pizza Italia Wong Kito",
      desc: "Perpaduan pizza tipis kering khas Italia dengan toping kearifan lokal yang melimpah.",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60",
      isPromo: true,
      promoBadge: "Potongan Rp5rb",
      rating: 4.4,
      price: 45000,
      category: "makanan",
    },
    {
      id: 7,
      name: "Salad & Juice Bar Premium",
      desc: "Pilihan potongan buah segar dan sayur organik premium dengan dressing homemade istimewa.",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
      isPromo: false,
      promoBadge: "",
      rating: 4.2,
      price: 26000,
      category: "cemilan",
    },
    {
      id: 8,
      name: "Boba Time Kekinian",
      desc: "Aneka minuman boba manis bertekstur kenyal dengan racikan susu segar berbagai varian rasa.",
      img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60",
      isPromo: false,
      promoBadge: "",
      rating: 4.3,
      price: 18000,
      category: "minuman",
    },
    {
      id: 9,
      name: "Mie Ayam & Bakso Solo Mas Dino",
      desc: "Mie homemade kenyal dipadukan kuah kaldu sapi murni dan bakso urat super mantap.",
      img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60",
      isPromo: false,
      promoBadge: "",
      rating: 4.5,
      price: 17000,
      category: "makanan",
    },
    {
      id: 10,
      name: "Soto Lamongan Asli Cak Jono",
      desc: "Soto ayam kampung khas Jawa Timur bertabur koya udang gurih melimpah.",
      img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60",
      isPromo: false,
      promoBadge: "",
      rating: 4.6,
      price: 19000,
      category: "makanan",
    },
    {
      id: 11,
      name: "Burger Corner & Grill",
      desc: "Daging burger premium dipanggang sempurna dengan saus keju lumer dan sayur segar.",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
      isPromo: false,
      promoBadge: "",
      rating: 4.7,
      price: 32000,
      category: "makanan",
    },
    {
      id: 12,
      name: "Iga Bakar Cobek Si Jangkung",
      desc: "Iga sapi tebal dibakar kecap harum dan disajikan di atas cobek tanah liat panas.",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60",
      isPromo: false,
      promoBadge: "",
      rating: 4.9,
      price: 55000,
      category: "makanan",
    },
  ];

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
  }
});
