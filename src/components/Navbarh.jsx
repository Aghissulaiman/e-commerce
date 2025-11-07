import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, User } from "lucide-react";
import axios from "axios";

const Navbarh = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=20")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Gagal fetch API:", err));
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedTotal = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(updatedTotal);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(true);
  }, [searchTerm, products]);

  const handleSelectProduct = (id) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/Detail/${id}`);
  };

  return (
    <nav className="bg-white border-b shadow-sm dark:bg-gray-900">
      {/* Top Row */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        {/* Logo + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mb-2 md:mb-0">
            <img src="Public/imege/logo2.png" className="h-8" alt="Logo" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Tecno Shop
            </span>
          </Link>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                if (filteredProducts.length > 0 || searchTerm.trim() !== "")
                  setShowDropdown(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowDropdown(false), 200);
              }}
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
              />
            </svg>

            {/* Dropdown hasil pencarian */}
            {showDropdown && (
              <ul className="absolute z-20 bg-white dark:bg-gray-700 w-full max-h-60 overflow-auto border border-gray-300 dark:border-gray-600 rounded-md mt-1 shadow-lg">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white flex items-center gap-2"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-sm line-clamp-1">{product.title}</span>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                    Produk tidak ditemukan.
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Cart + Profile */}
        <div className="flex items-center space-x-4 justify-end">
          <Link to="/keranjang" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/profil">
            <User className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-600 transition" />
          </Link>

          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Navigation */}
      <div className="bg-gray-100 dark:bg-gray-800 border-t">
        <div className="max-w-screen-xl mx-auto px-4 py-2">
          <ul className="flex space-x-6 text-sm font-medium text-gray-700 dark:text-gray-200 justify-center">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/produk">Produk</Link>
            </li>
            <li>
              <Link to="/promo">Promo</Link>
            </li>
            <li>
              <Link to="/kontak">Kontak</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarh;
