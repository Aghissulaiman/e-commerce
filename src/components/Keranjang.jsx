import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

const Keranjang = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    newCart[index].totalHarga =
      newCart[index].quantity *
      (newCart[index].totalHarga / (newCart[index].quantity - delta || 1));
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleSelectItem = (id) => {
    let updatedSelection;
    if (selectedItems.includes(id)) {
      updatedSelection = selectedItems.filter((itemId) => itemId !== id);
    } else {
      updatedSelection = [...selectedItems, id];
    }
    setSelectedItems(updatedSelection);
    setSelectAll(updatedSelection.length === cart.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckout = () => {
    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.id)
    );
    if (selectedProducts.length === 0) {
      alert("Silakan pilih produk yang ingin dibeli.");
      return;
    }
    navigate("/Checkout", { state: { cart: selectedProducts } });
  };

  const handleRemoveSelected = () => {
    const newCart = cart.filter((item) => !selectedItems.includes(item.id));
    setCart(newCart);
    setSelectedItems([]);
    setSelectAll(false);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalHarga = cart.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + item.totalHarga;
    }
    return total;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-5 h-5 mr-2"
            />
            <label>Pilih Semua</label>
          </div>

          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center gap-4 border rounded p-4"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="w-5 h-5"
                />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>Ukuran: {item.size}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p>Harga: {formatRupiah(item.totalHarga / item.quantity)}</p>
                  <p>total: {formatRupiah(item.totalHarga)}</p>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-600 font-semibold"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-semibold">
              Total Semua: {formatRupiah(totalHarga)}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleRemoveSelected}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Hapus yang Dipilih
              </button>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Keranjang;
