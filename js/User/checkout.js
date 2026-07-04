document.addEventListener("DOMContentLoaded", () => {
  const checkoutItemsContainer = document.getElementById(
    "checkoutItemsContainer",
  );
  if (!checkoutItemsContainer) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const addressCard = document.getElementById("addressCard");
  const addressEmptyState = document.getElementById("addressEmptyState");
  const addressUserDetails = document.getElementById("addressUserDetails");

  const btnDefaultAddress = document.getElementById("btnDefaultAddress");
  const btnCustomAddress = document.getElementById("btnCustomAddress");
  const customAddressContainer = document.getElementById(
    "customAddressContainer",
  );
  const customAddressInput = document.getElementById("customAddressInput");

  const btnConfirmOrder = document.getElementById("btnConfirmOrder");

  let currentAddressMode = "default";

  if (currentUser.address) {
    addressCard.style.display = "flex";
    addressEmptyState.style.display = "none";
    addressUserDetails.textContent = currentUser.address;
    if (btnConfirmOrder) btnConfirmOrder.disabled = false;
  } else {
    addressCard.style.display = "none";
    addressEmptyState.style.display = "block";
    if (btnConfirmOrder) btnConfirmOrder.disabled = true;
  }

  if (btnDefaultAddress && btnCustomAddress) {
    btnDefaultAddress.addEventListener("click", () => {
      currentAddressMode = "default";
      btnDefaultAddress.classList.add("active");
      btnCustomAddress.classList.remove("active");

      customAddressContainer.style.display = "none";

      if (currentUser.address) {
        addressCard.style.display = "flex";
        addressEmptyState.style.display = "none";
        if (btnConfirmOrder) btnConfirmOrder.disabled = false;
      } else {
        addressCard.style.display = "none";
        addressEmptyState.style.display = "block";
        if (btnConfirmOrder) btnConfirmOrder.disabled = true;
      }
    });

    btnCustomAddress.addEventListener("click", () => {
      currentAddressMode = "custom";
      btnCustomAddress.classList.add("active");
      btnDefaultAddress.classList.remove("active");

      addressCard.style.display = "none";
      addressEmptyState.style.display = "none";
      customAddressContainer.style.display = "block";

      if (btnConfirmOrder) btnConfirmOrder.disabled = false;
    });
  }

  const pendingCheckout = JSON.parse(localStorage.getItem("pendingCheckout"));

  if (!pendingCheckout || pendingCheckout.items.length === 0) {
    window.location.href = "tenant.html";
    return;
  }

  let html = "";
  pendingCheckout.items.forEach((item) => {
    html += `
                  <div class="checkout-item">
                      <div class="checkout-item-info">
                          <h4>${item.name}</h4>
                          <p>${item.qty}x @ Rp ${item.price.toLocaleString("id-ID")}</p>
                      </div>
                      <div class="checkout-item-price">Rp ${item.subtotal.toLocaleString("id-ID")}</div>
                  </div>
              `;
  });
  checkoutItemsContainer.innerHTML = html;

  const checkoutTotalDisplay = document.getElementById("checkoutTotalDisplay");
  if (checkoutTotalDisplay) {
    checkoutTotalDisplay.textContent = `Rp ${pendingCheckout.total.toLocaleString("id-ID")}`;
  }

  if (btnConfirmOrder) {
    btnConfirmOrder.addEventListener("click", () => {
      let finalAddress = "";

      if (currentAddressMode === "default") {
        finalAddress = currentUser.address || "";
      } else {
        finalAddress = customAddressInput.value.trim();
      }

      if (!finalAddress) {
        if (currentAddressMode === "default") {
          alert(
            "Alamat pengiriman default belum diisi. Silakan lengkapi di halaman Profil atau gunakan Alamat Sekarang.",
          );
        } else {
          alert("Mohon ketik alamat pengiriman Anda pada kolom yang tersedia.");
        }
        return;
      }

      const paymentMethod = document.getElementById("paymentMethod").value;
      const now = new Date();

      const newOrder = {
        id: "ORD" + now.getTime(),
        timestamp: now.getTime(),
        tenantId: pendingCheckout.tenantId,
        tenantName: pendingCheckout.tenantName,
        items: pendingCheckout.items,
        total: pendingCheckout.total,
        address: finalAddress,
        paymentMethod: paymentMethod,
        status: "Diproses",
        date: now.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.removeItem("pendingCheckout");

      alert("Pesanan berhasil dibuat dan langsung diproses!");
      window.location.href = "history.html";
    });
  }
});
