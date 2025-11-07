// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const AddToCartForm = ({ product, onAdded }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [size, setSize] = useState("M");

//   const getHargaUkuran = () => {
//     let basePrice = product.price * 16000;
//     switch (size) {
//       case "S": return basePrice;
//       case "M": return basePrice * 1.05;
//       case "L": return basePrice * 1.1;
//       case "XL": return basePrice * 1.15;
//       case "XXL": return basePrice * 1.2;
//       default: return basePrice;
//     }
//   };

//   const formatRupiah = (angka) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(angka);

//   const handleAddToCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const totalHarga = getHargaUkuran() * quantity;

//     const existingIndex = cart.findIndex(
//       (item) => item.id === product.id && item.size === size
//     );

//     if (existingIndex !== -1) {
//       cart[existingIndex].quantity += quantity;
//       cart[existingIndex].totalHarga += totalHarga;
//     } else {
//       cart.push({
//         id: product.id,
//         title: product.title,
//         category: product.category,
//         image: product.image,
//         price: product.price,
//         quantity,
//         size,
//         totalHarga,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     if (onAdded) onAdded();
//     alert("Produk ditambahkan ke keranjang!");
//   };

//   return (
//     <div>
//       <p className="text-green-600 text-2xl font-bold mb-4">
//         {formatRupiah(getHargaUkuran())}
//       </p>

//       <div className="flex flex-wrap items-center gap-6 mb-6">
//         <div className="flex items-center gap-2">
//           <label htmlFor="size" className="font-medium">
//             Ukuran:
//           </label>
//           <select
//             id="size"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//             className="border rounded-md px-2 py-1"
//           >
//             <option value="S">S</option>
//             <option value="M">M</option>
//             <option value="L">L</option>
//             <option value="XL">XL</option>
//             <option value="XXL">XXL</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <label htmlFor="quantity" className="font-medium">
//             Jumlah:
//           </label>
//           <input
//             type="number"
//             id="quantity"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-20 border rounded-md px-2 py-1"
//           />
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={handleAddToCart}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
//         >
//           Tambah ke Keranjang
//         </button>

//         <Link
//           to="/checkout"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition flex items-center justify-center"
//           onClick={() => {
//             // Optional: bisa simpan produk ini ke localStorage checkout juga kalau perlu
//             const checkoutData = {
//               id: product.id,
//               title: product.title,
//               size,
//               quantity,
//               pricePerUnit: getHargaUkuran(),
//               totalHarga: getHargaUkuran() * quantity,
//             };
//             localStorage.setItem("checkoutItem", JSON.stringify(checkoutData));
//           }}
//         >
//           Beli Sekarang
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AddToCartForm;
