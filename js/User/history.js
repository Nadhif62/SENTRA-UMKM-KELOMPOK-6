
document.addEventListener("DOMContentLoaded", () => {
  const historyContainer = document.getElementById("historyListContainer");
  const emptyState = document.getElementById("emptyState");

  if (!historyContainer || !emptyState) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    emptyState.style.display = "flex";
    historyContainer.style.display = "none";
    return;
  }

  orders.sort(
    (a, b) =>
      parseInt(b.id.replace("ORD", "")) - parseInt(a.id.replace("ORD", "")),
  );

  let html = "";
  orders.forEach((order) => {
    let statusClass = order.status.toLowerCase().includes("selesai")
      ? "status-success"
      : order.status.toLowerCase().includes("proses")
        ? "status-process"
        : order.status.toLowerCase().includes("batal")
          ? "status-failed"
          : "status-pending";

    let itemsPreviewHtml = "";
    let displayCount = Math.min(order.items.length, 2);
    for (let i = 0; i < displayCount; i++) {
      itemsPreviewHtml += `<div class="history-item-row"><span class="item-name">${order.items[i].qty}x ${order.items[i].name}</span></div>`;
    }
    if (order.items.length > 2) {
      itemsPreviewHtml += `<div class="history-item-row more-items">... dan ${order.items.length - 2} barang lainnya</div>`;
    }

    html += `
            <div class="history-card">
                <div class="history-card-header">
                    <div class="header-left"><i class="fas fa-store icon-tenant"></i> <span class="tenant-name">${order.tenantName || "Sentra UMKM"}</span></div>
                    <div class="header-right"><span class="status-badge ${statusClass}">${order.status}</span></div>
                </div>
                <div class="history-card-body">
                    <div class="order-meta"><span class="order-id">ID: <strong>${order.id}</strong></span><span class="order-date"><i class="far fa-calendar-alt"></i> ${order.date}</span></div>
                    <div class="order-items-preview">${itemsPreviewHtml}</div>
                </div>
                <div class="history-card-footer">
                    <div class="total-wrap"><span class="total-label">Total Belanja</span><span class="total-value">Rp ${order.total.toLocaleString("id-ID")}</span></div>
                    <button class="btn-detail-order" onclick="showOrderDetail('${order.id}')">Lihat Detail</button>
                </div>
            </div>
        `;
  });
  historyContainer.innerHTML = html;
});

window.showOrderDetail = function (orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let order = orders.find((o) => o.id === orderId);
  if (!order) return;

  let itemsHtml = "";
  if (order.items) {
    order.items.forEach((item) => {
      let p = item.priceFinal || item.price || 0;
      itemsHtml += `<div class="modal-item-row"><span>${item.qty}x ${item.name}</span><span class="modal-item-price">Rp ${(p * item.qty).toLocaleString("id-ID")}</span></div>`;
    });
  }

  document.getElementById("modalBodyContent").innerHTML = `
        <div class="modal-meta-group"><div><strong>ID Pesanan:</strong> ${order.id}</div><div><strong>Tanggal:</strong> ${order.date}</div><div><strong>Status:</strong> ${order.status}</div></div>
        <div class="modal-section-title">Item Belanja</div><div class="modal-items-box">${itemsHtml}</div>
        <div class="modal-section-title">Alamat Pengiriman</div><p class="modal-text-box">${order.address || "-"}</p>
        <div class="modal-section-title">Metode Pembayaran</div><p class="modal-text-box">${order.paymentMethod || "COD"}</p>
        <div class="modal-total-box"><span>Total Bayar</span><strong>Rp ${order.total.toLocaleString("id-ID")}</strong></div>
    `;
  document.getElementById("orderDetailModal").style.display = "flex";
};

window.closeOrderDetailModal = function () {
  document.getElementById("orderDetailModal").style.display = "none";
};
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("orderDetailModal"))
    document.getElementById("orderDetailModal").style.display = "none";
});
