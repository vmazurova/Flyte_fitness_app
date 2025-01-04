import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    secondName: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("chyba v tokenu");
          toast.error("nejsi prihlasen");
          setLoading(false);
          return;
        }

        console.log("tvuj token", token);

        const response = await axios.get("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("data", response.data);

        setFormData({
          username: response.data.username || "",
          email: response.data.email || "",
          firstName: response.data.firstName || "",
          secondName: response.data.secondName || "",
          password: "",
        });
      } catch (err) {
        console.error("chyba v nacitani", err.response?.data || err.message);
        toast.error("nepodařilo se načíst data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("Token chybí nebo není k dispozici.");
        toast.error("Uživatel není přihlášen.");
        setSaving(false);
        return;
      }

      console.log("JWT Token při ukládání:", token);

      const payload = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        secondName: formData.secondName,
        ...(formData.password && { password: formData.password }),
      };

      console.log("Odesílaná data:", payload);

      const response = await axios.put(
        "http://localhost:1337/api/users/me",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Odpověď po aktualizaci uživatele:", response.data);
      toast.success("Uživatelská data byla úspěšně aktualizována!");
    } catch (err) {
      console.error(
        "Chyba při aktualizaci uživatelských dat:",
        err.response?.data || err.message
      );
      toast.error(
        err.response?.data?.error?.message || "Chyba při ukládání dat."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Načítání...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-row bg-cover bg-center relative">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-6 relative bg-gradient-to-r from-purple-500 via-indigo-500 to-black">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <ToastContainer />

        <div className="relative w-full max-w-lg bg-[#1A1A2E] text-white rounded-xl shadow-2xl p-6">
          <h2 className="text-center text-3xl font-bold mb-6">
            Nastavení uživatele
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Uživatelské jméno
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jméno</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Příjmení</label>
              <input
                type="text"
                name="secondName"
                value={formData.secondName}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heslo</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Zadejte nové heslo (volitelné)"
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none transition"
              disabled={saving}
            >
              {saving ? "Ukládání..." : "Uložit změny"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
