document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.querySelector(".data-table tbody");
  const searchInput = document.querySelector(".search-box input");
  const filterSelect = document.querySelector(".filter-select");

  if (!tbody) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  function getBadgeClass(status) {
    const s = (status || "").toLowerCase();
    if (s.includes("selesai")) return "badge-success";
    if (s.includes("proses")) return "badge-warning";
    if (s.includes("batal")) return "badge-danger";
    return "badge-pending";
  }

  function formatCurrency(v) {
    return "Rp " + Number(v || 0).toLocaleString("id-ID");
  }

  function render(list) {
    if (!list || list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:20px;">Belum ada transaksi</td></tr>';
      return;
    }

    tbody.innerHTML = list
      .map((o) => {
        const badge = getBadgeClass(o.status);
        const tenant = o.tenantName || "-";
        const date = o.date || "-";
        const method = o.paymentMethod || "-";
        const total = formatCurrency(o.total || 0);
        return `
          <tr>
            <td>${o.id || "-"}</td>
            <td>${date}</td>
            <td><strong>${tenant}</strong></td>
            <td>${total}</td>
            <td>${method}</td>
            <td><span class="badge ${badge}">${o.status || "-"}</span></td>
            <td class="action-buttons"><button class="btn-detail" title="Detail Transaksi" data-id="${o.id}"><i class="fas fa-eye"></i></button></td>
          </tr>
        `;
      })
      .join("");

    // attach detail listeners
    tbody.querySelectorAll(".btn-detail").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        showOrderDetail(id);
      });
    });
  }

  function filterAndSearch() {
    const q = (searchInput && searchInput.value || "").toLowerCase();
    const status = (filterSelect && filterSelect.value) || "";
    let filtered = [...orders];
    if (status) {
      filtered = filtered.filter((o) => (o.status || "").toLowerCase().includes(status));
    }
    if (q) {
      filtered = filtered.filter((o) => {
        return (
          (o.id || "").toLowerCase().includes(q) ||
          (o.tenantName || "").toLowerCase().includes(q)
        );
      });
    }
    render(filtered.sort((a,b)=> (b.id||"").localeCompare(a.id||"", undefined, {numeric:true})));
  }

  window.showOrderDetail = function (orderId) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return alert("Detail pesanan tidak ditemukan");

    let itemsHtml = "";
    if (order.items && order.items.length) {
      order.items.forEach((it) => {
        const price = it.priceFinal || it.price || 0;
        itemsHtml += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;"><span>${it.qty}x ${it.name}</span><span>${formatCurrency(price * it.qty)}</span></div>`;
      });
    }

    const modal = document.createElement("div");
    modal.id = "adminOrderModal";
    modal.style.position = "fixed";
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = 9999;

    modal.innerHTML = `
      <div style="background:#fff;width:90%;max-width:700px;padding:20px;border-radius:8px;box-shadow:0 6px 30px rgba(0,0,0,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0">Detail Transaksi - ${order.id}</h3>
          <button id="closeAdminModal" style="background:transparent;border:0;font-size:24px;cursor:pointer">&times;</button>
        </div>
        <div style="margin-bottom:10px;display:flex;gap:12px;flex-wrap:wrap;">
          <div><strong>Tanggal:</strong> ${order.date || '-'}</div>
          <div><strong>Status:</strong> ${order.status || '-'}</div>
          <div><strong>Metode:</strong> ${order.paymentMethod || '-'}</div>
        </div>
        <div style="margin-bottom:8px"><strong>Tenant:</strong> ${order.tenantName || '-'}</div>
        <div style="margin-bottom:12px"><strong>Alamat:</strong> ${order.address || '-'}</div>
        <div style="margin-bottom:12px"><strong>Item:</strong><div style="margin-top:8px">${itemsHtml || '<div>-</div>'}</div></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;font-size:18px;">
          <div><strong>Total Bayar</strong></div>
          <div><strong>${formatCurrency(order.total || 0)}</strong></div>
        </div>
      </div>
    `;

    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.id === "closeAdminModal") {
        modal.remove();
      }
    });

    document.body.appendChild(modal);
  };

  // initial render
  render(orders.sort((a,b)=> (b.id||"").localeCompare(a.id||"", undefined, {numeric:true})));

  if (searchInput) searchInput.addEventListener("input", filterAndSearch);
  if (filterSelect) filterSelect.addEventListener("change", filterAndSearch);
});
