document.addEventListener("DOMContentLoaded", () => {
  const checkoutItemsContainer = document.getElementById(
    "checkoutItemsContainer",
  );
  if (!checkoutItemsContainer) return;

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

  const btnConfirmOrder = document.getElementById("btnConfirmOrder");
  if (btnConfirmOrder) {
    btnConfirmOrder.addEventListener("click", () => {
      const address = document.getElementById("deliveryAddress").value.trim();
      const paymentMethod = document.getElementById("paymentMethod").value;

      if (!address) {
        alert("Silakan masukkan alamat lengkap pengiriman!");
        return;
      }

      const newOrder = {
        id: "ORD" + new Date().getTime(),
        tenantId: pendingCheckout.tenantId,
        tenantName: pendingCheckout.tenantName,
        items: pendingCheckout.items,
        total: pendingCheckout.total,
        address: address,
        paymentMethod: paymentMethod,
        status: "Menunggu Konfirmasi",
        date: new Date().toLocaleDateString("id-ID", {
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

      alert("Pesanan berhasil dibuat!");
      window.location.href = "history.html";
    });
  }
});
