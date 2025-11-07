import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await axios.get("https://fakestoreapi.com/products?limit=20");
        const productsWithStock = resProducts.data.map((product) => ({
          ...product,
          stock: Math.floor(Math.random() * 6),
          priceIDR: product.price * 16000,
        }));

        setProducts(productsWithStock);
        setAllProducts(productsWithStock);

        const resCategories = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(["all", ...resCategories.data]);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const handleFilter = () => {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.priceIDR >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.priceIDR <= parseInt(maxPrice));
    }

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.priceIDR - b.priceIDR);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.priceIDR - a.priceIDR);
    }

    setProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert("Stok produk habis!");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = storedCart.findIndex(
      (item) => item.id === product.id && item.size === "M"
    );

    if (existingItemIndex !== -1) {
      storedCart[existingItemIndex].quantity += 1;
      storedCart[existingItemIndex].totalHarga =
        storedCart[existingItemIndex].price * storedCart[existingItemIndex].quantity;
    } else {
      storedCart.push({
        id: product.id,
        title: product.title,
        image: product.image,
        category: product.category,
        price: product.priceIDR,
        quantity: 1,
        size: "M",
        totalHarga: product.priceIDR,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert("Produk berhasil ditambahkan ke keranjang!");
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-white" /> Produk Pilihan
      </h2>

      {/* FILTER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-md bg-white text-gray-700 border border-gray-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        />

        <input
          type="number"
          placeholder="Harga minimum"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        />

        <input
          type="number"
          placeholder="Harga maksimum"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="default">Urutkan</option>
          <option value="lowToHigh">Harga Terendah</option>
          <option value="highToLow">Harga Tertinggi</option>
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Terapkan Filter
      </button>

      {/* PRODUK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-white col-span-full">Produk tidak ditemukan.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md p-4 hover:shadow-lg flex flex-col"
            >
        <button
          onClick={() => handleAddToCart(product)}
          className={`absolute top-3 left-3 z-10 p-2 rounded-full focus:outline-none focus:ring-2 text-white
          ${product.stock <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-opacity-100 bg-opacity-80 focus:ring-blue-500"
            }`}
          title={product.stock <= 0 ? "Stok habis" : "Tambah ke keranjang"}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>

              <Link to={`/Detail/${product.id}`} className="flex flex-col grow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-4"
                />
                <h2 className="text-md font-semibold mb-1 line-clamp-2 h-12">{product.title}</h2>
                <p className="text-gray-500 text-sm mb-1 capitalize">{product.category}</p>
                <p className="text-green-600 font-bold mb-2">{formatRupiah(product.priceIDR)}</p>
                <p className={`text-sm ${product.stock <= 0 ? "text-red-600" : "text-gray-600"}`}>
                  {product.stock <= 0 ? "Stok Habis" : `Stok: ${product.stock}`}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
