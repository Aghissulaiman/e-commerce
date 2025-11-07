import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  History,
  User,
  Settings,
  Lock,
  CreditCard,
  MapPin,
  Truck,
  Bell,
  HelpCircle,
  Star,
  ShieldCheck,
  Mail,
} from "lucide-react";

const Profil = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/");
  };

  const menuItems = [
    {
      section: "Akun Saya",
      items: [
        { icon: <User size={18} />, label: "Profil" },
        { icon: <CreditCard size={18} />, label: "Bank & Kartu" },
        { icon: <MapPin size={18} />, label: "Alamat" },
        { icon: <Lock size={18} />, label: "Ubah Kata Sandi" },
        { icon: <Bell size={18} />, label: "Pengaturan Notifikasi" },
        { icon: <ShieldCheck size={18} />, label: "Pengaturan Privasi" },
      ],
    },
    {
      section: "",
      items: [
        {
          icon: <History size={18} />,
          label: "Pesanan Saya",
          onClick: () => navigate("/histori"),
        },
        { icon: <Bell size={18} />, label: "Notifikasi" },
        { icon: <Star size={18} />, label: "Kupon" },
      ],
    },
  ];

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

        {menuItems.map((section, sIdx) => (
          <div key={sIdx} className="mb-6">
            {section.section && (
              <div className="text-sm font-semibold mb-2 text-gray-400 uppercase">
                {section.section}
              </div>
            )}
            <ul className="space-y-2">
              {section.items.map((item, iIdx) => (
                <li
                  key={iIdx}
                  onClick={item.onClick || (() => alert(item.label))}
                  className="flex items-center cursor-pointer hover:text-blue-500 transition"
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center mt-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white w-full justify-center"
        >
          <LogOut className="mr-2" />
          Keluar
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-10 text-black">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                value="Aghis97531"
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Username hanya dapat diubah satu (1) kali.
              </p>

              <label className="block text-sm mt-4 mb-1">Nama</label>
              <input
                type="text"
                value="Afgan Irwansyah Hidayat"
                className="w-full px-4 py-2 border rounded-md"
              />

              <label className="block text-sm mt-4 mb-1">Email</label>
              <a href="#" className="text-blue-600 text-sm">
                Tambah
              </a>

              <label className="block text-sm mt-4 mb-1">Nomer</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value="********08"
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
                <a href="#" className="text-blue-600 text-sm">
                  Ubah
                </a>
              </div>

              <label className="block text-sm mt-4 mb-1">Nama Toko</label>
              <input
                type="text"
                value="-By_Aghis-Studio"
                className="w-full px-4 py-2 border rounded-md"
              />

              <label className="block text-sm mt-4 mb-1">Jenis Kelamin</label>
              <select className="w-full px-4 py-2 border rounded-md">
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>

              <label className="block text-sm mt-4 mb-1">Tanggal Lahir</label>
              <div className="flex gap-2">
                <select className="flex-1 px-3 py-2 border rounded-md">
                  <option>Tanggal</option>
                </select>
                <select className="flex-1 px-3 py-2 border rounded-md">
                  <option>Bulan</option>
                </select>
                <select className="flex-1 px-3 py-2 border rounded-md">
                  <option>Tahun</option>
                </select>
              </div>

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                Simpan
              </button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src="https://via.placeholder.com/120"
                alt="Profil"
                className="w-28 h-28 rounded-full mb-4"
              />
              <button className="bg-gray-300 px-4 py-2 rounded-md text-sm">
                Pilih Gambar
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Ukuran gambar: maks. 1 MB <br />
                Format: .JPEG, .PNG
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profil;
