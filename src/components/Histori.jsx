import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

const Histori = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(history.reverse());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-gray-800 px-6 py-8">
        <div className="flex flex-col items-center mb-10">
          <img
            src="https://ui-avatars.com/api/?name=Aghissulaiman"
            alt="Avatar"
            className="w-20 h-20 rounded-full mb-2"
          />
          <h2 className="text-lg font-bold">Aghissulaiman</h2>
          <span className="text-sm text-blue-400 cursor-pointer">
            ✎ Ubah Profil
          </span>
        </div>

        <ul className="space-y-4 text-sm">
          <li className="cursor-pointer text-white hover:text-blue-400">Profil</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Bank & Kartu</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Alamat</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Ubah Kata Sandi</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Pengaturan Notifikasi</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Pengaturan Privasi</li>
          <li className="cursor-pointer text-blue-500 font-semibold">Pesanan Saya</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Notifikasi</li>
          <li className="cursor-pointer text-white hover:text-blue-400">Kupon</li>
        </ul>

        <button
          onClick={handleLogout}
          className="flex items-center mt-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white w-full justify-center text-sm"
        >
          <LogOut className="mr-2" size={18} />
          Keluar
        </button>
      </aside>

      {/* Konten */}
      <main className="flex-1 bg-[#0f0f0f] p-10 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Riwayat Pesanan
          </h2>

          {orders.length === 0 ? (
            <div className="text-center text-gray-400">Belum ada pesanan.</div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-xl p-5 shadow-lg border border-gray-800"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-400">ID Pesanan:</p>
                      <p className="font-medium text-white mb-1">{order.id}</p>
                      <p className="text-sm text-gray-400">
                        {order.date} • {order.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400 text-lg">
                        {formatRupiah(order.total)}
                      </p>
                      <p className="text-xs text-gray-500">{order.metodeBayar}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                        />
                        <div>
                          <p className="text-white font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">
                            x{item.quantity} • {item.size}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Histori;
