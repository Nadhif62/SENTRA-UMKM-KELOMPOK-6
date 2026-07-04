
let tenantsArray = getTenants();
let tenantMenusData = getMenus();

const defaultGenericMenu = DEFAULT_GENERIC_MENU;

let currentCart = {};

function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const tenantId = parseInt(urlParams.get("id"));

  if (!tenantId && !document.getElementById("detailBanner")) return;

  const currentTenant = tenantsArray.find((t) => t.id === tenantId) || {
    id: 0,
    name: "Resto Mitra UMKM",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60",
  };

  const bannerEl = document.getElementById("detailBanner");
  const nameEl = document.getElementById("tenantName");

  if (bannerEl) bannerEl.style.backgroundImage = `url('${currentTenant.img}')`;
  if (nameEl) nameEl.textContent = currentTenant.name;

  const menuItems = tenantMenusData[tenantId] || defaultGenericMenu;
  renderCategorizedMenus(menuItems);
  setupMenuSearch(menuItems);
}

function setupMenuSearch(menuItems) {
  const searchInput = document.getElementById("menuSearchInput");
  const searchNavInput = document.getElementById("navSearchInput");

  function executeSearch(val) {
    const query = val.toLowerCase().trim();
    const filteredMenu = menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query),
    );
    renderCategorizedMenus(filteredMenu);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (searchNavInput) searchNavInput.value = searchInput.value;
      executeSearch(searchInput.value);
    });
  }

  if (searchNavInput) {
    searchNavInput.addEventListener("input", () => {
      if (searchInput) searchInput.value = searchNavInput.value;
      executeSearch(searchNavInput.value);
    });
  }
}

function renderCategorizedMenus(items) {
  const makananContainer = document.getElementById("sectionMakananContainer");
  const minumanContainer = document.getElementById("sectionMinumanContainer");
  const makananList = document.getElementById("makananListContainer");
  const minumanList = document.getElementById("minumanListContainer");

  if (!makananList || !minumanList) return;

  const makananItems = items.filter(
    (i) => i.category === "makanan" || i.category === "cemilan",
  );
  const minumanItems = items.filter((i) => i.category === "minuman");

  if (makananItems.length > 0) {
    makananContainer.style.display = "block";
    makananList.innerHTML = generateMenuItemsHtml(makananItems);
  } else {
    makananContainer.style.display = "none";
  }

  if (minumanItems.length > 0) {
    minumanContainer.style.display = "block";
    minumanList.innerHTML = generateMenuItemsHtml(minumanItems);
  } else {
    minumanContainer.style.display = "none";
  }
}

function generateMenuItemsHtml(items) {
  return items
    .map((item) => {
      const currentQty = currentCart[item.id] || 0;
      return `
            <div class="menu-item-card">
                <img src="${item.img}" alt="${item.name}" class="menu-item-img">
                <div class="menu-item-details">
                    <h4 class="menu-item-title">${item.name}</h4>
                    <div class="menu-item-likes">
                        <i class="fas fa-heart"></i> ${item.likes} suka
                    </div>
                    <p class="menu-item-desc">${item.desc}</p>
                    <div class="menu-item-price-row">
                        <span class="price-original">${item.priceOriginal.toLocaleString("id-ID")}</span>
                        <span class="badge-item-promo">Promo</span>
                        <span class="price-final">Rp ${item.priceFinal.toLocaleString("id-ID")}</span>
                    </div>
                </div>
                <div class="menu-item-action-zone">
                    <div class="quantity-control-wrapper">
                        <button class="btn-qty-modifier" onclick="updateItemQuantity(${item.id}, -1)">-</button>
                        <div class="qty-number-display" id="qty-${item.id}">${currentQty}</div>
                        <button class="btn-qty-modifier" onclick="updateItemQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
}

window.updateItemQuantity = function (itemId, change) {
  let currentQty = currentCart[itemId] || 0;
  currentQty += change;

  if (currentQty < 0) currentQty = 0;

  if (currentQty === 0) {
    delete currentCart[itemId];
  } else {
    currentCart[itemId] = currentQty;
  }

  const qtyDisplay = document.getElementById(`qty-${itemId}`);
  if (qtyDisplay) qtyDisplay.textContent = currentQty;

  calculateTotalPayment();
};

function calculateTotalPayment() {
  let total = 0;
  const urlParams = new URLSearchParams(window.location.search);
  let tenantId = parseInt(urlParams.get("id"));
  if (isNaN(tenantId)) tenantId = 0;
  const menuItems = tenantMenusData[tenantId] || defaultGenericMenu;

  for (const itemId in currentCart) {
    const item = menuItems.find((i) => i.id === parseInt(itemId));
    if (item) {
      total += currentCart[itemId] * item.priceFinal;
    }
  }

  const totalDisplay = document.getElementById("totalPaymentDisplay");
  if (totalDisplay) {
    totalDisplay.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Sticky search bar saat header di-scroll
  const headerCard = document.getElementById("headerCard");
  const searchBarContainer = document.getElementById("searchMenuBar");
  const backBtn = document.getElementById("btnBack");
  const bannerDetail = document.getElementById("detailBanner");

  if (headerCard && searchBarContainer && backBtn && bannerDetail) {
    let placeholder = document.getElementById("searchPlaceholder");
    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.id = "searchPlaceholder";
      placeholder.style.display = "none";
      searchBarContainer.parentNode.insertBefore(
        placeholder,
        searchBarContainer.nextSibling,
      );
    }

    window.addEventListener("scroll", () => {
      const headerRect = headerCard.getBoundingClientRect();
      const triggerPoint = -(
        headerCard.offsetHeight - searchBarContainer.offsetHeight
      );

      if (headerRect.top <= triggerPoint) {
        if (!searchBarContainer.classList.contains("is-sticky")) {
          placeholder.style.height = searchBarContainer.offsetHeight + "px";
          placeholder.style.display = "block";

          searchBarContainer.classList.add("is-sticky");
          searchBarContainer.insertBefore(
            backBtn,
            searchBarContainer.firstChild,
          );
          backBtn.classList.add("is-sticky");
        }
      } else {
        if (searchBarContainer.classList.contains("is-sticky")) {
          searchBarContainer.classList.remove("is-sticky");
          placeholder.style.display = "none";

          bannerDetail.insertBefore(backBtn, bannerDetail.firstChild);
          backBtn.classList.remove("is-sticky");
        }
      }
    });
  }

  // Tombol ORDER -> susun data checkout & arahkan ke checkout.html
  const btnOrderAction = document.querySelector(".btn-order-action");
  if (btnOrderAction) {
    btnOrderAction.addEventListener("click", () => {
      const keys = Object.keys(currentCart);
      if (keys.length === 0) {
        alert("Silakan pilih minimal 1 menu untuk dipesan!");
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      let tenantId = parseInt(urlParams.get("id"));
      if (isNaN(tenantId)) tenantId = 0;

      const tData = tenantsArray.find((t) => t.id === tenantId) || {
        id: 0,
        name: "Resto Mitra UMKM",
      };
      const mData = tenantMenusData[tenantId] || defaultGenericMenu;

      const checkoutItems = [];
      let total = 0;

      keys.forEach((k) => {
        const item = mData.find((i) => i.id === parseInt(k));
        if (item && currentCart[k] > 0) {
          const subtotal = item.priceFinal * currentCart[k];
          checkoutItems.push({
            id: item.id,
            name: item.name,
            price: item.priceFinal,
            qty: currentCart[k],
            subtotal: subtotal,
          });
          total += subtotal;
        }
      });

      const checkoutData = {
        tenantId: tData.id,
        tenantName: tData.name,
        items: checkoutItems,
        total: total,
      };

      localStorage.setItem("pendingCheckout", JSON.stringify(checkoutData));
      window.location.href = "checkout.html";
    });
  }

  initDetailPage();
});
