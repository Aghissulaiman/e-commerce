import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("39");
  const [stock, setStock] = useState(0); // stok manual

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
        setLoading(false);
      });
  }, [id]);

  // Simulasi stok (manual karena API tidak punya stok asli)
  useEffect(() => {
    if (id === "5") {
      setStock(0); // produk id 5 dianggap habis
    } else {
      setStock(10); // default stok
    }
  }, [id]);

  const sizeMultiplier = {
    "39": 1.0,
    "40": 1.05,
    "41": 1.10,
    "42": 1.15,
  };

  const getHargaUkuran = () => {
    if (!product) return 0;
    const basePrice = product.price * 16000;
    const multiplier = sizeMultiplier[size] || 1;
    return basePrice * multiplier;
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const handleAddToCart = () => {
    if (stock === 0) {
      alert("Stok produk habis!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const hargaUkuran = getHargaUkuran();
    const totalHarga = hargaUkuran * quantity;

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
      cart[existingIndex].totalHarga += totalHarga;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        category: product.category,
        image: product.image,
        price: hargaUkuran,
        quantity,
        size,
        totalHarga,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
  };

  const handleBuyNow = () => {
    if (stock === 0) {
      alert("Stok produk habis!");
      return;
    }

    const hargaUkuran = getHargaUkuran();
    const subtotal = hargaUkuran * quantity;

    navigate("/Checkout", {
      state: {
        cart: [
          {
            id: product.id,
            title: product.title,
            category: product.category,
            image: product.image,
            price: hargaUkuran,
            quantity,
            size,
            totalHarga: subtotal,
          },
        ],
      },
    });
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!product)
    return (
      <p className="text-center mt-10 text-red-500">Produk tidak ditemukan</p>
    );

  const hargaUkuran = getHargaUkuran();
  const subtotal = hargaUkuran * quantity;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Kembali ke Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain rounded-xl border"
          />
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt={`thumb-${i}`}
                className="w-16 h-16 object-contain border rounded"
              />
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
          <p className="text-gray-500 mb-1 italic">{product.category}</p>
          <p className="text-gray-600 text-sm mb-4">
            Terjual 250+ • ⭐ 4.9 (104 rating)
          </p>

          <p className="text-green-600 text-3xl font-bold mb-4">
            {formatRupiah(hargaUkuran)}
          </p>

          <div className="mb-4">
            <label className="font-medium block mb-1">Pilih warna:</label>
            <div className="flex gap-2">
              <button className="border px-3 py-1 rounded bg-black text-white">
                Putih
              </button>
              <button className="border px-3 py-1 rounded">Brown</button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <label htmlFor="size" className="font-medium">
                Ukuran:
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border rounded-md px-2 py-1"
              >
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="font-medium">
                Jumlah:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border rounded-md px-2 py-1"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Stok: {stock === 0 ? "Habis" : stock}
          </p>
          <p className="text-lg font-semibold mb-4">
            Subtotal: {formatRupiah(subtotal)}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              + Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Beli Langsung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
