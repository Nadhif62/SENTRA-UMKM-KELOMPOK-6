document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.getElementById("laporanTableBody");
  const canvas = document.getElementById("reportChart");
  if (!tbody && !canvas) return;

  const totalOmzetEl = document.getElementById("totalOmzetValue");
  const totalTransaksiEl = document.getElementById("totalTransaksiValue");
  const pendapatanBersihEl = document.getElementById("pendapatanBersihValue");

  const dariInput = document.getElementById("dariTanggal");
  const sampaiInput = document.getElementById("sampaiTanggal");
  const btnFilter = document.getElementById("btnFilterLaporan");

  let chartInstance = null;

  function isValidOrder(order) {
    const status = (order.status || "").toLowerCase();
    return !status.includes("batal");
  }

  function dateKeyFromTimestamp(ts) {
    return new Date(ts).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function getFilteredOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter(isValidOrder);

    const dari =
      dariInput && dariInput.value
        ? new Date(dariInput.value + "T00:00:00").getTime()
        : null;
    const sampai =
      sampaiInput && sampaiInput.value
        ? new Date(sampaiInput.value + "T23:59:59").getTime()
        : null;

    return orders.filter((o) => {
      const ts = o.timestamp || Date.parse(o.date) || Date.now();
      if (dari && ts < dari) return false;
      if (sampai && ts > sampai) return false;
      return true;
    });
  }

  function renderSummary(orders) {
    const totalOmzet = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalTransaksi = orders.length;
    const pendapatanBersih = Math.round(totalOmzet * 0.9);

    if (totalOmzetEl)
      totalOmzetEl.textContent = "Rp " + totalOmzet.toLocaleString("id-ID");
    if (totalTransaksiEl) totalTransaksiEl.textContent = totalTransaksi;
    if (pendapatanBersihEl)
      pendapatanBersihEl.textContent =
        "Rp " + pendapatanBersih.toLocaleString("id-ID");
  }

  function groupByDate(orders) {
    const groups = {};
    orders.forEach((o) => {
      const ts = o.timestamp || Date.parse(o.date) || Date.now();
      const key = dateKeyFromTimestamp(ts);
      if (!groups[key]) groups[key] = { ts, total: 0, count: 0 };
      groups[key].total += o.total || 0;
      groups[key].count += 1;
      if (ts < groups[key].ts) groups[key].ts = ts;
    });
    return Object.keys(groups)
      .map((key) => ({
        label: key,
        ts: groups[key].ts,
        total: groups[key].total,
        count: groups[key].count,
      }))
      .sort((a, b) => a.ts - b.ts);
  }

  function renderTable(rows) {
    if (!tbody) return;
    if (rows.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" style="text-align:center;color:#888;">Belum ada data transaksi.</td></tr>';
      return;
    }
    tbody.innerHTML = rows
      .map((r) => {
        const admin = Math.round(r.total * 0.1);
        const bersih = r.total - admin;
        return `
          <tr>
            <td>${r.label}</td>
            <td>${r.count}</td>
            <td>Rp ${r.total.toLocaleString("id-ID")}</td>
            <td>Rp ${admin.toLocaleString("id-ID")}</td>
            <td><strong>Rp ${bersih.toLocaleString("id-ID")}</strong></td>
          </tr>
        `;
      })
      .join("");
  }

  function renderChart(rows) {
    if (!canvas || !window.Chart) return;
    const ctx = canvas.getContext("2d");
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: rows.map((r) => r.label),
        datasets: [
          {
            label: "Omzet Penjualan (Rp)",
            data: rows.map((r) => r.total),
            backgroundColor: "#1EAD4C",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  function renderAll() {
    const orders = getFilteredOrders();
    renderSummary(orders);
    const rows = groupByDate(orders);
    renderTable(rows);
    renderChart(rows);
  }

  if (btnFilter) btnFilter.addEventListener("click", renderAll);

  renderAll();
});
