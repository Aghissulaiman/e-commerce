import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PromoBaner = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  // Auto slide banner promo
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5); // cuma 5 produk pertama buat promo
    }, 4000);
    return () => clearInterval(interval);
  }, [products]);

  // Tombol navigasi banner promo
  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? 4 : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % 5);
  };

  // Swipe gesture banner promo
  useEffect(() => {
    if (!containerRef.current) return;
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      const diffX = startX - endX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    const node = containerRef.current;
    node.addEventListener("touchstart", handleTouchStart);
    node.addEventListener("touchmove", handleTouchMove);
    node.addEventListener("touchend", handleTouchEnd);

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  }, [products]);

  if (products.length === 0) return null;

  // Ambil produk promo (5 pertama)
  const promoProduct = products[index];
  const discountedPrice = (promoProduct.price * 0.5).toFixed(2);

  // Fungsi format ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Banner Promo */}
      <div
        ref={containerRef}
        className="relative w-full h-[300px] md:h-[400px] bg-gray-100 overflow-hidden rounded-xl shadow-lg my-6 select-none"
      >
        <img
          src={promoProduct.image}
          alt={promoProduct.title}
          className="absolute inset-0 w-full h-full object-contain opacity-20"
        />
        <div className="relative z-10 h-full flex flex-col justify-center items-start p-6 md:p-12">
          <h2 className="text-3xl md:text-5xl font-bold text-red-600 mb-3">
            DISCOUNT 50%
          </h2>
          <p className="text-xl md:text-3xl font-semibold text-gray-900 mb-2">
            {promoProduct.title}
          </p>
          <p className="text-gray-600 line-through text-lg">
            {formatRupiah(promoProduct.price * 16000)}
          </p>
          <p className="text-green-600 text-3xl font-bold mb-6">
            {formatRupiah(discountedPrice * 16000)}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Beli Sekarang
          </button>
        </div>

        {/* Tombol navigasi */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 shadow hover:bg-opacity-100 transition"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 shadow hover:bg-opacity-100 transition"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slider Produk ala Shopee */}
      <h3 className="text-2xl font-semibold mb-4">Produk Populer</h3>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="grid grid-flow-col auto-cols-[calc(100%/7)] gap-4">
          {products.map((product) => (
            <Link
              to={`/Detail/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center cursor-pointer hover:scale-105 transition transform"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-24 w-auto object-contain mb-2"
              />
              <h4 className="text-xs font-semibold line-clamp-2 text-center">
                {product.title}
              </h4>
              <p className="text-green-600 font-bold mt-1 text-sm">
                {formatRupiah(product.price * 16000)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBaner;
