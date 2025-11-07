import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [telepon, setTelepon] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("Transfer Bank");
  const [catatan, setCatatan] = useState("");
  const [ongkir, setOngkir] = useState(15000);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
  }, [location.state]);

  if (!cart.length) {
    return (
      <div className="text-center mt-10 text-red-500">
        Tidak ada produk di checkout. Silakan kembali dan pilih produk dulu.
      </div>
    );
  }

  const totalHarga = cart.reduce((sum, item) => sum + item.totalHarga, 0);
  const pajak = totalHarga * 0.1;
  const totalAkhir = totalHarga + ongkir + pajak;

  const validate = () => {
    const newErrors = {};
    if (!nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
    if (!kota.trim()) newErrors.kota = "Kota wajib diisi";
    if (!kodePos.trim()) newErrors.kodePos = "Kode pos wajib diisi";
    if (!telepon.trim()) newErrors.telepon = "No telepon wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("id-ID"),
      status: "Diproses",
      total: totalAkhir,
      items: cart,
      alamat: {
        nama,
        alamat,
        kota,
        kodePos,
        telepon,
      },
      metodeBayar,
      catatan,
    };

    const oldHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const newHistory = [...oldHistory, newOrder];
    localStorage.setItem("orderHistory", JSON.stringify(newHistory));

    localStorage.removeItem("cart");
    alert("Pesanan berhasil dikirim!\nTerima kasih sudah berbelanja.");
    navigate("/Home");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Pengiriman */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Informasi Pengiriman</h2>

          <div>
            <label className="block font-medium">Nama Lengkap</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
          </div>

          <div>
            <label className="block font-medium">Alamat</label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Kota</label>
              <input
                type="text"
                value={kota}
                onChange={(e) => setKota(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              {errors.kota && <p className="text-red-500 text-sm">{errors.kota}</p>}
            </div>

            <div>
              <label className="block font-medium">Kode Pos</label>
              <input
                type="text"
                value={kodePos}
                onChange={(e) => setKodePos(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              {errors.kodePos && <p className="text-red-500 text-sm">{errors.kodePos}</p>}
            </div>
          </div>

          <div>
            <label className="block font-medium">No Telepon</label>
            <input
              type="text"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.telepon && <p className="text-red-500 text-sm">{errors.telepon}</p>}
          </div>

          <div>
            <label className="block font-medium">Metode Pembayaran</label>
            <select
              value={metodeBayar}
              onChange={(e) => setMetodeBayar(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>Transfer Bank</option>
              <option>OVO</option>
              <option>Dana</option>
              <option>GoPay</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Catatan</label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
          >
            Konfirmasi Pesanan
          </button>
        </form>

        {/* Ringkasan Pesanan */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Ringkasan Pesanan</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4 border-b pb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded border"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    Ukuran: {item.size} | Jumlah: {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-sm">{formatRupiah(item.totalHarga)}</p>
              </div>
            ))}
          </div>

          <hr className="my-4" />
          <div className="text-sm space-y-1">
            <p>Total Harga: {formatRupiah(totalHarga)}</p>
            <p>Ongkir: {formatRupiah(ongkir)}</p>
            <p>Pajak (10%): {formatRupiah(pajak)}</p>
          </div>
          <p className="font-bold text-lg mt-2">
            Total Bayar: {formatRupiah(totalAkhir)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
  