import React from "react";

const DeskripsiDetail = ({ description, title, category }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      {/* Judul Produk */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Detail Produk: {title}
      </h2>

      {/* Deskripsi Utama */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Deskripsi</h3>
        <p className="text-gray-600 leading-relaxed">
          {title} adalah pilihan sempurna bagi kamu yang ingin tampil stylish dan tetap nyaman setiap hari. 
          Produk ini hadir dengan desain modern yang cocok untuk segala aktivitas, mulai dari hangout, kuliah, kerja, 
          hingga acara santai lainnya. Dengan bahan berkualitas dan detail finishing yang rapi, sepatu ini dirancang 
          agar tahan lama dan memberikan kenyamanan maksimal saat dipakai.
        </p>
      </div>

      {/* Spesifikasi Umum */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Spesifikasi Umum
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Kategori: {category}</li>
          <li>Ukuran tersedia: 39, 40, 41, 42</li>
          <li>Warna: Tersedia dalam variasi Putih dan Cokelat</li>
          <li>Berat produk: ± 800 gram (tergantung ukuran)</li>
          <li>Harga menyesuaikan ukuran (otomatis dihitung)</li>
        </ul>
      </div>

      {/* Informasi Bahan */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Material & Kenyamanan
        </h3>
        <p className="text-gray-600">
          Dibuat dari bahan kulit sintetis premium dan sol karet antislip yang ringan namun kuat, 
          sepatu ini tidak hanya tahan lama tetapi juga memberikan kenyamanan luar biasa saat dipakai 
          dalam waktu lama. Jahitan presisi di setiap sisi memastikan sepatu ini tidak mudah rusak.
        </p>
      </div>

      {/* Fitur Unggulan */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Fitur Unggulan</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Desain modern & kekinian</li>
          <li>Sol tebal anti selip</li>
          <li>Nyaman dipakai seharian</li>
          <li>Tersedia berbagai ukuran & warna</li>
        </ul>
      </div>

      {/* Catatan Penjual */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Catatan Penting
        </h3>
        <p className="text-gray-600">
          Mohon pastikan memilih ukuran yang sesuai. Perbedaan warna mungkin terjadi karena pencahayaan 
          foto produk. Baca deskripsi dengan cermat sebelum checkout. Produk tidak dapat dibatalkan kecuali ada 
          kesalahan dari pihak kami.
        </p>
      </div>

      {/* Kebijakan Pengembalian */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Ketentuan Retur & Pengembalian
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Retur dapat dilakukan maksimal 3x24 jam sejak barang diterima</li>
          <li>Produk belum dipakai & kondisi tetap seperti semula</li>
          <li>Wajib sertakan video unboxing sebagai bukti saat klaim</li>
        </ul>
      </div>
    </div>
  );
};

export default DeskripsiDetail;
