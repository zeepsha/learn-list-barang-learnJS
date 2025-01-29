let inventori = [];

// Ambil elemen HTML
const imput = {
    namaBarang: document.getElementById('nama-barang'),
    stockBarang: document.getElementById('stok-barang'),
    hargaBarang: document.getElementById('harga-barang'),
    tambahBarang: document.getElementById('tambah-barang-btn'),
};

const daftar = {
    daftarBarang: document.getElementById('daftar-barang'),
};

const searchHapus = {
    cariBarangInput: document.getElementById('cari-barang'),
    cariBarangBtn: document.getElementById('cari-barang-btn'),
    hapusBarangInput: document.getElementById('hapus-barang'),
    hapusBarangBtn: document.getElementById('hapus-barang-btn'),
};

const outputPesan = {
    pesan: document.getElementById('output-message'),
};

// Fungsi untuk menampilkan daftar barang
function tampilkanDaftarbarang() {
    daftar.daftarBarang.innerHTML = ''; // Kosongkan daftar barang

    inventori.forEach((barang) => {
        const li = document.createElement('li');
        li.textContent = `${barang.nama} - Stok: ${barang.stok} - Harga: Rp${barang.harga}`;
        daftar.daftarBarang.appendChild(li);
    });
}

// Event listener untuk menambah barang
imput.tambahBarang.addEventListener('click', function () {
    // Ambil nilai input
    const nama = imput.namaBarang.value.trim();
    const stok = parseInt(imput.stockBarang.value.trim());
    const harga = parseFloat(imput.hargaBarang.value.trim());

    // Validasi input
    if (!nama || isNaN(stok) || isNaN(harga) || stok < 0 || harga < 0) {
        outputPesan.pesan.textContent = 'Input tidak valid! Pastikan semua field diisi dengan benar.';
        return;
    }

    // Tambahkan barang ke inventori
    inventori.push({ nama, stok, harga });

    // Tampilkan daftar barang terbaru
    tampilkanDaftarbarang();

    // Reset form
    imput.namaBarang.value = '';
    imput.stockBarang.value = '';
    imput.hargaBarang.value = '';
    outputPesan.pesan.textContent = 'Barang berhasil ditambahkan!';
});

// Event listener untuk mencari barang
searchHapus.cariBarangBtn.addEventListener('click', function () {
    const namaCari = searchHapus.cariBarangInput.value.trim(); // Ambil nilai dari input cari barang

    // Cari barang berdasarkan nama
    const barangDitemukan = inventori.find((barang) => barang.nama.toLowerCase() === namaCari.toLowerCase());

    if (barangDitemukan) {
        outputPesan.pesan.textContent = `Barang ditemukan: ${barangDitemukan.nama} - Stok: ${barangDitemukan.stok} - Harga: Rp${barangDitemukan.harga}`;
    } else {
        outputPesan.pesan.textContent = 'Barang tidak ditemukan!';
    }
});

// Event listener untuk menghapus barang
searchHapus.hapusBarangBtn.addEventListener('click', function () {
    const namaHapus = searchHapus.hapusBarangInput.value.trim(); // Ambil nilai dari input hapus barang

    // Cari index barang berdasarkan nama
    const indexBarang = inventori.findIndex((barang) => barang.nama.toLowerCase() === namaHapus.toLowerCase());

    if (indexBarang !== -1) {
        // Hapus barang dari array
        inventori.splice(indexBarang, 1);

        // Tampilkan daftar barang terbaru
        tampilkanDaftarbarang();
        outputPesan.pesan.textContent = 'Barang berhasil dihapus!';
    } else {
        outputPesan.pesan.textContent = 'Barang tidak ditemukan!';
    }
});