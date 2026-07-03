document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. KONFIRMASI LOGOUT ---
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah browser langsung pindah halaman
            
            // Munculkan popup konfirmasi
            const confirmLogout = confirm('Apakah Anda yakin ingin keluar dari halaman Admin?');
            
            // Jika klik "OK", arahkan ke halaman login/keluar
            if (confirmLogout) {
                window.location.href = this.getAttribute('href');
            }
        });
    }

    // --- 2. GRAFIK PENJUALAN (CHART.JS) ---
    // Kita pindahkan dari HTML ke sini agar file HTML lebih bersih
    const canvas = document.getElementById('salesChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [{
                    label: 'Pendapatan (Rp)',
                    data: [850000, 920000, 780000, 1050000, 1250000, 2100000, 1950000],
                    borderColor: '#1EAD4C',
                    backgroundColor: 'rgba(30, 173, 76, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#A65D24',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [5, 5] }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

});