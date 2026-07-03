document.addEventListener("DOMContentLoaded", function () {
  if (
    !localStorage.getItem("tenants") ||
    JSON.parse(localStorage.getItem("tenants")).length === 0
  ) {
    const defaultTenants = [
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
        desc: "Menyediakan aneka keripik tempe, singkong, pisang lumer, dan buah kering renyah.",
        img: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=500&q=60",
        isPromo: false,
        promoBadge: "",
        rating: 4.6,
        price: 15000,
        category: "makanan",
      },
      {
        id: 3,
        name: "Kedai Kopi Pak Kumis",
        desc: "Kopi Nusantara racikan mantap untuk teman nongkrong.",
        img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60",
        isPromo: true,
        promoBadge: "Beli 1 Gratis 1",
        rating: 4.9,
        price: 18000,
        category: "minuman",
      },
      {
        id: 4,
        name: "Warung Sate Khas Madura Cak Malik",
        desc: "Sate ayam dan kambing dengan bumbu kacang kental asli Madura.",
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60",
        isPromo: false,
        promoBadge: "",
        rating: 4.7,
        price: 30000,
        category: "makanan",
      },
      {
        id: 5,
        name: "Dapur Organik Sehat Mama",
        desc: "Menu sehat dari bahan organik segar tanpa MSG.",
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60",
        isPromo: true,
        promoBadge: "Diskon 10%",
        rating: 4.8,
        price: 35000,
        category: "makanan",
      },
      {
        id: 6,
        name: "Kedai Pizza Italia Wong Kito",
        desc: "Pizza otentik dengan kearifan lokal rasa Nusantara.",
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60",
        isPromo: false,
        promoBadge: "",
        rating: 4.5,
        price: 45000,
        category: "makanan",
      },
      {
        id: 7,
        name: "Salad & Juice Bar Premium",
        desc: "Pilihan salad segar dan jus murni kaya nutrisi.",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
        isPromo: true,
        promoBadge: "Free Topping",
        rating: 4.7,
        price: 28000,
        category: "minuman",
      },
      {
        id: 8,
        name: "Boba Time Kekinian",
        desc: "Minuman boba manis segar dengan varian rasa hits.",
        img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60",
        isPromo: false,
        promoBadge: "",
        rating: 4.4,
        price: 18000,
        category: "minuman",
      },
      {
        id: 9,
        name: "Mie Ayam & Bakso Solo Mas Dino",
        desc: "Mie kenyal buatan sendiri dipadu bakso daging sapi asli Solo.",
        img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60",
        isPromo: true,
        promoBadge: "Porsi Jumbo",
        rating: 4.8,
        price: 20000,
        category: "makanan",
      },
      {
        id: 10,
        name: "Soto Lamongan Asli Cak Jono",
        desc: "Soto ayam kuah kental dengan koya gurih melimpah.",
        img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60",
        isPromo: false,
        promoBadge: "",
        rating: 4.6,
        price: 22000,
        category: "makanan",
      },
      {
        id: 11,
        name: "Burger Corner & Grill",
        desc: "Burger daging panggang tebal dengan keju lumer berkualitas.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
        isPromo: true,
        promoBadge: "Free Drink",
        rating: 4.7,
        price: 32000,
        category: "makanan",
      },
      {
        id: 12,
        name: "Iga Bakar Cobek Si Jangkung",
        desc: "Iga sapi empuk dibakar langsung di atas cobek tanah liat.",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60",
        isPromo: false,
        promoBadge: "",
        rating: 4.9,
        price: 48000,
        category: "makanan",
      },
    ];
    localStorage.setItem("tenants", JSON.stringify(defaultTenants));
  }

  if (!localStorage.getItem("tenantMenusData")) {
    const defaultMenus = {
      1: [
        {
          id: 101,
          name: "Ayam Bakar Madu",
          desc: "Ayam bakar dengan olesan madu murni manis gurih meresap.",
          likes: 124,
          priceOriginal: 30000,
          priceFinal: 25000,
          img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60",
          category: "makanan",
        },
        {
          id: 102,
          name: "Ayam Goreng Lengkuas",
          desc: "Ayam goreng renyah bertabur kremesan lengkuas gurih.",
          likes: 85,
          priceOriginal: 28000,
          priceFinal: 24000,
          img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60",
          category: "makanan",
        },
        {
          id: 105,
          name: "Es Teh Manis",
          desc: "Teh melati seduh murni segar dingin.",
          likes: 131,
          priceOriginal: 7000,
          priceFinal: 5000,
          img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60",
          category: "minuman",
        },
      ],
      2: [
        {
          id: 201,
          name: "Keripik Tempe Super",
          desc: "Keripik tempe renyah diiris tipis dengan racikan ketumbar asli.",
          likes: 250,
          priceOriginal: 20000,
          priceFinal: 15000,
          img: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=500&q=60",
          category: "makanan",
        },
        {
          id: 202,
          name: "Pisang Lumer Cokelat",
          desc: "Pisang kepok balut kulit lumpia renyah isian cokelat.",
          likes: 195,
          priceOriginal: 18000,
          priceFinal: 15000,
          img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=60",
          category: "makanan",
        },
      ],
      3: [
        {
          id: 301,
          name: "Kopi Susu Gula Aren",
          desc: "Espresso blend dicampur susu segar krimi dan sirup aren.",
          likes: 550,
          priceOriginal: 22000,
          priceFinal: 18000,
          img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60",
          category: "minuman",
        },
      ],
    };
    localStorage.setItem("tenantMenusData", JSON.stringify(defaultMenus));
  }

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

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let tenants = JSON.parse(localStorage.getItem("tenants")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  let totalPendapatan = 0;
  let totalTransaksi = orders.length;
  let totalTenant = tenants.length;
  let totalProduk = products.length;

  orders.forEach((order) => {
    if (order.status !== "Batal" && order.status !== "Dibatalkan") {
      totalPendapatan += order.total;
    }
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.trim();
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

  const canvas = document.getElementById("salesChart");
  if (canvas) {
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
});
