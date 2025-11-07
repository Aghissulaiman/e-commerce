import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Daftar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.repeatPassword) {
      alert("Password dan konfirmasi tidak cocok.");
      return;
    }
    if (!form.agree) {
      alert("Anda harus menyetujui syarat dan ketentuan.");
      return;
    }

    // Simulasi register success
    alert("Pendaftaran berhasil!");
    navigate("/Home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Daftar Akun Baru
        </h2>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="repeatPassword"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Ulangi Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={form.repeatPassword}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            name="agree"
            type="checkbox"
            checked={form.agree}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            Saya menyetujui{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              syarat dan ketentuan
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register Akun Baru
        </button>

        {/* Tambahan link "Saya sudah memiliki akun" */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline dark:text-blue-500 font-medium"
          >
            Masuk di sini
          </button>
        </p>
      </form>
    </div>
  );
};

export default Daftar;
