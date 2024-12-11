import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import "react-toastify/dist/ReactToastify.css";

const CoursesAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    max_capacity: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const token = localStorage.getItem("jwt");
      // if (!token) {
      //   toast.error("Prosím, přihlaste se.", { hideProgressBar: true });
      //   return;
      // }

      const coursePayload = {
        data: {
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toISOString(),
          max_capacity: parseInt(formData.max_capacity, 10),
        },
      };

      const courseResponse = await axios.post(
        "http://localhost:1337/api/courses",
        coursePayload,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Course created:", courseResponse.data);

      const courseId = courseResponse.data.data.id;

      if (formData.images.length > 0) {
        const form = new FormData();
        formData.images.forEach((file) => form.append("files", file));
        form.append("ref", "api::course.course");
        form.append("refId", courseId);
        form.append("field", "image");

        await axios.post("http://localhost:1337/api/upload", form, {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        max_capacity: "",
        images: [],
      });
      toast.success("Kurz byl úspěšně přidán!", { hideProgressBar: true });
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.error?.message || "Chyba při přidávání kurzu.",
        { hideProgressBar: true }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-row bg-cover bg-center relative">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-6 relative bg-gradient-to-r from-purple-500 via-indigo-500 to-black">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <ToastContainer />
        {/* Tlačítko zpět */}
        <div className="relative w-full max-w-3xl flex justify-between mb-8">
          <Link
            to="/kurzy"
            className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Zpět na kurzy
          </Link>
        </div>
        {/* Formulář */}
        <div className="relative w-full max-w-lg bg-[#1A1A2E] text-white rounded-xl shadow-2xl p-6">
          <h2 className="text-center text-3xl font-bold mb-6">
            Přidat nový kurz
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Název kurzu
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Popis</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Datum kurzu
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Maximální kapacita
              </label>
              <input
                type="number"
                name="max_capacity"
                value={formData.max_capacity}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Obrázky kurzu
              </label>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none transition"
              disabled={loading}
            >
              {loading ? "Odesílání..." : "Přidat kurz"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursesAdd;
