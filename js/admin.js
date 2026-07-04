document.addEventListener("DOMContentLoaded", function () {
  if (
    !localStorage.getItem("products") ||
    JSON.parse(localStorage.getItem("products")).length === 0
  ) {
    const defaultProducts = [
      { id: 1, name: "Ayam Bakar Madu", tenantId: 1, price: 25000 },
      { id: 2, name: "Boba Brown Sugar", tenantId: 8, price: 18000 },
      { id: 3, name: "Kripik Tempe Renyah", tenantId: 2, price: 15000 },
    ];
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  }

  initDashboard();
  initTenantAdminPage();
  initProdukAdminPage();
  initLogout();
});


function initDashboard() {
  const cards = document.querySelectorAll(".card");
  if (cards.length === 0 && !document.getElementById("salesChart")) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const tenants = getTenants();
  const totalProduk = getTotalProdukCount();

  let totalPendapatan = 0;
  let totalTransaksi = orders.length;
  let totalTenant = tenants.length;

  orders.forEach((order) => {
    if (order.status !== "Batal" && order.status !== "Dibatalkan") {
      totalPendapatan += order.total;
    }
  });

  cards.forEach((card) => {
    const titleEl = card.querySelector("h3");
    if (!titleEl) return;
    const title = titleEl.textContent.trim();
    const valueElement = card.querySelector(".card-value");
    if (valueElement) {
      if (title.includes("Tenant")) {
        valueElement.textContent = totalTenant;
      } else if (title.includes("Transaksi")) {
        valueElement.textContent = totalTransaksi;
      } else if (title.includes("Pendapatan")) {
        valueElement.textContent =
          "Rp " + totalPendapatan.toLocaleString("id-ID");
      } else if (title.includes("Produk")) {
        valueElement.textContent = totalProduk;
      }
    }
  });

  const canvas = document.getElementById("salesChart");
  if (canvas && window.Chart) {
    let chartLabels = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];
    let chartData = [
      850000, 920000, 780000, 1050000, 1250000, 2100000, 1950000,
    ];

    if (orders.length > 0) {
      chartLabels = [];
      chartData = [];
      let recentOrders = [...orders].reverse().slice(0, 7).reverse();
      recentOrders.forEach((o) => {
        let shortDate = o.date
          ? o.date.split(" ").slice(0, 2).join(" ")
          : "Baru";
        chartLabels.push(shortDate);
        chartData.push(o.total);
      });
    }

    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Pendapatan (Rp)",
            data: chartData,
            borderColor: "#1EAD4C",
            backgroundColor: "rgba(30, 173, 76, 0.1)",
            borderWidth: 3,
            pointBackgroundColor: "#A65D24",
            pointRadius: 4,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
          x: { grid: { display: false } },
        },
      },
    });
  }
}

function initLogout() {
  const logoutBtn = document.querySelector(".btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const confirmLogout = confirm(
        "Apakah Anda yakin ingin keluar dari halaman Admin?",
      );
      if (confirmLogout) {
        window.location.replace("../index.html");
      }
    });
  }
}

function initTenantAdminPage() {
  const tbody = document.getElementById("tenantTableBody");
  const btnAdd = document.getElementById("btnTambahTenant");
  const modal = document.getElementById("modalTambahTenant");
  if (!tbody || !modal) return; // bukan halaman ini

  const form = document.getElementById("formTambahTenant");
  const btnCancel = document.getElementById("btnBatalTenant");
  const fileInput = document.getElementById("inputTenantFile");
  const urlInput = document.getElementById("inputTenantImgUrl");
  const preview = document.getElementById("previewTenantImg");
  const searchInput = document.querySelector(
    '.table-section .search-box input[type="text"]',
  );

  function renderTenantTable() {
    const tenants = getTenants();
    const query = (searchInput?.value || "").toLowerCase().trim();
    const filtered = tenants.filter((t) =>
      t.name.toLowerCase().includes(query),
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#888;">Belum ada data tenant.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered
      .map((t, index) => {
        const kategoriLabel =
          t.category === "makanan"
            ? "Makanan"
            : t.category === "minuman"
              ? "Minuman"
              : "Cemilan";
        return `
          <tr>
            <td>${index + 1}</td>
            <td><strong>${t.name}</strong></td>
            <td>${kategoriLabel}</td>
            <td>&#9733; ${t.rating}</td>
            <td>Rp ${Number(t.price).toLocaleString("id-ID")}</td>
            <td class="action-buttons">
              <button class="btn-delete" title="Hapus" data-id="${t.id}"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const tenant = getTenants().find((t) => t.id === id);
        const confirmed = confirm(
          `Hapus tenant "${tenant ? tenant.name : ""}"? Menu tenant ini juga akan terhapus.`,
        );
        if (!confirmed) return;

        const tenants = getTenants().filter((t) => t.id !== id);
        saveTenants(tenants);

        const menus = getMenus();
        delete menus[id];
        saveMenus(menus);

        renderTenantTable();
      });
    });
  }

  function openModal() {
    modal.style.display = "flex";
  }
  function closeModal() {
    modal.style.display = "none";
    form.reset();
    if (preview) {
      preview.style.display = "none";
      preview.src = "";
    }
  }

  if (btnAdd) btnAdd.addEventListener("click", openModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (urlInput) urlInput.value = "";
        if (preview) {
          preview.src = reader.result;
          preview.style.display = "block";
        }
        fileInput.dataset.base64 = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (urlInput && preview) {
    urlInput.addEventListener("input", () => {
      if (urlInput.value.trim()) {
        preview.src = urlInput.value.trim();
        preview.style.display = "block";
        if (fileInput) {
          fileInput.value = "";
          delete fileInput.dataset.base64;
        }
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("inputTenantName").value.trim();
      const desc = document.getElementById("inputTenantDesc").value.trim();
      const category = document.getElementById("inputTenantCategory").value;
      const rating =
        parseFloat(document.getElementById("inputTenantRating").value) || 0;
      const price =
        parseInt(document.getElementById("inputTenantPrice").value) || 0;
      const isPromo = document.getElementById("inputTenantIsPromo").checked;
      const promoBadge = document
        .getElementById("inputTenantPromoBadge")
        .value.trim();

      const img =
        (fileInput && fileInput.dataset.base64) ||
        (urlInput && urlInput.value.trim()) ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60";

      if (!name) {
        alert("Nama tenant wajib diisi.");
        return;
      }

      const newTenant = {
        id: getNextTenantId(),
        name,
        desc: desc || "-",
        img,
        isPromo,
        promoBadge: isPromo ? promoBadge || "Promo" : "",
        rating,
        price,
        category,
      };

      const tenants = getTenants();
      tenants.push(newTenant);
      saveTenants(tenants);

      const menus = getMenus();
      if (!menus[newTenant.id]) menus[newTenant.id] = [];
      saveMenus(menus);

      closeModal();
      renderTenantTable();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderTenantTable);
  }

  renderTenantTable();
}


function initProdukAdminPage() {
  const tbody = document.getElementById("produkTableBody");
  const btnAdd = document.getElementById("btnTambahProduk");
  const modal = document.getElementById("modalTambahProduk");
  if (!tbody || !modal) return; // bukan halaman ini

  const form = document.getElementById("formTambahProduk");
  const btnCancel = document.getElementById("btnBatalProduk");
  const tenantSelect = document.getElementById("inputProdukTenant");
  const searchInput = document.querySelector(
    '.table-section .search-box input[type="text"]',
  );
  const categoryFilter = document.querySelector(".filter-select");

  function badgeClass(cat) {
    if (cat === "makanan") return "badge-makanan";
    if (cat === "minuman") return "badge-minuman";
    return "badge-cemilan";
  }
  function badgeLabel(cat) {
    if (cat === "makanan") return "Makanan";
    if (cat === "minuman") return "Minuman";
    return "Cemilan";
  }

  function flattenProducts() {
    const tenants = getTenants();
    const menus = getMenus();
    const rows = [];
    Object.keys(menus).forEach((tenantId) => {
      const tenant = tenants.find((t) => t.id === Number(tenantId));
      (menus[tenantId] || []).forEach((item) => {
        rows.push({
          ...item,
          tenantId: Number(tenantId),
          tenantName: tenant ? tenant.name : "(Tenant tidak ditemukan)",
        });
      });
    });
    return rows.sort((a, b) => a.id - b.id);
  }

  function renderTenantOptions() {
    if (!tenantSelect) return;
    const tenants = getTenants();
    tenantSelect.innerHTML =
      '<option value="" disabled selected>-- Pilih Tenant --</option>' +
      tenants
        .map((t) => `<option value="${t.id}">${t.name}</option>`)
        .join("");
  }

  function renderProdukTable() {
    let rows = flattenProducts();

    const query = (searchInput?.value || "").toLowerCase().trim();
    const kategori = categoryFilter?.value || "";

    if (query) {
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.tenantName.toLowerCase().includes(query),
      );
    }
    if (kategori) {
      rows = rows.filter((r) => r.category === kategori);
    }

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#888;">Belum ada data produk.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows
      .map(
        (r) => `
          <tr>
            <td>#PRD-${r.id}</td>
            <td><strong>${r.name}</strong></td>
            <td>${r.tenantName}</td>
            <td><span class="badge ${badgeClass(r.category)}">${badgeLabel(r.category)}</span></td>
            <td>Rp ${Number(r.priceFinal).toLocaleString("id-ID")}</td>
            <td class="action-buttons">
              <button class="btn-delete" title="Hapus" data-id="${r.id}" data-tenant="${r.tenantId}"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        `,
      )
      .join("");

    tbody.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const tenantId = Number(btn.dataset.tenant);
        if (!confirm("Hapus produk ini?")) return;

        const menus = getMenus();
        menus[tenantId] = (menus[tenantId] || []).filter(
          (m) => m.id !== id,
        );
        saveMenus(menus);
        renderProdukTable();
      });
    });
  }

  function openModal() {
    renderTenantOptions();
    modal.style.display = "flex";
  }
  function closeModal() {
    modal.style.display = "none";
    form.reset();
  }

  if (btnAdd) btnAdd.addEventListener("click", openModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const tenantId = parseInt(tenantSelect.value);
      const name = document.getElementById("inputProdukName").value.trim();
      const desc = document
        .getElementById("inputProdukDesc")
        .value.trim();
      const category = document.getElementById("inputProdukCategory").value;
      const priceOriginal =
        parseInt(document.getElementById("inputProdukHargaAsli").value) || 0;
      const priceFinal =
        parseInt(document.getElementById("inputProdukHargaJual").value) || 0;
      const img = document
        .getElementById("inputProdukImgUrl")
        .value.trim();

      if (!tenantId) {
        alert("Silakan pilih tenant terlebih dahulu.");
        return;
      }
      if (!name) {
        alert("Nama produk wajib diisi.");
        return;
      }

      const menus = getMenus();
      if (!menus[tenantId]) menus[tenantId] = [];

      const newItem = {
        id: getNextMenuId(tenantId),
        name,
        desc: desc || "-",
        likes: 0,
        priceOriginal: priceOriginal || priceFinal,
        priceFinal,
        img:
          img ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60",
        category,
      };

      menus[tenantId].push(newItem);
      saveMenus(menus);

      closeModal();
      renderProdukTable();
    });
  }

  if (searchInput) searchInput.addEventListener("input", renderProdukTable);
  if (categoryFilter)
    categoryFilter.addEventListener("change", renderProdukTable);

  renderProdukTable();
}
