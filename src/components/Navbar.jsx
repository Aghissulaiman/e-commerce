import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";

const Navbar = () => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Hitung total quantity semua item
    const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);

    // Listener biar update saat localStorage berubah (opsional, kalau mau real-time antar tab)
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedTotal = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(updatedTotal);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-900 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="Public/imege/logo2.png"
              alt="Logo"
              className="h-8"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Tecno Shop
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 dark:text-white">Beranda</Link>
            <Link to="/kategori" className="text-gray-700 hover:text-blue-600 dark:text-white">Kategori</Link>
            <Link to="/promo" className="text-gray-700 hover:text-blue-600 dark:text-white">Promo</Link>
            <Link to="/kontak" className="text-gray-700 hover:text-blue-600 dark:text-white">Kontak</Link>
          </div>

          {/* Search */}
          <div className="hidden lg:block w-1/3">
            <div className="relative">
              <input
                type="search"
                placeholder="Cari produk..."
                className="w-full p-2 pl-10 text-sm border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
              <div className="absolute left-3 top-2 text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <Link to="/keranjang" className="relative text-gray-700 hover:text-blue-600 dark:text-white">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">Masuk</Link>
            <Link to="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition">Daftar</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
