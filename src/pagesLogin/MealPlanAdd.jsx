import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar.jsx";

const MealPlanAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    week_start: "",
    image: null,
    monday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
    tuesday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
    wednesday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
    thursday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
    friday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
    saturday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
    sunday: { breakfast: "", snack1: "", lunch: "", snack2: "", dinner: "" },
  });

  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Stav sidebaru

  const handleInputChange = (e, day, mealType) => {
    const { name, value } = e.target;
    if (day) {
      setFormData((prev) => ({
        ...prev,
        [day]: { ...prev[day], [mealType]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        toast.error("Prosím, přihlaste se.", { hideProgressBar: true });
        return;
      }

      let uploadedImageId = null;
      if (formData.image) {
        const formDataForImage = new FormData();
        formDataForImage.append("files", formData.image);

        const imageUploadResponse = await axios.post(
          "http://localhost:1337/api/upload",
          formDataForImage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        uploadedImageId = imageUploadResponse.data[0].id;
      }

      const payload = {
        data: {
          title: formData.title,
          week_start: formData.week_start,
          image: uploadedImageId,
          ...Object.keys(formData)
            .filter((day) => typeof formData[day] === "object")
            .reduce((acc, day) => {
              Object.keys(formData[day]).forEach((mealType) => {
                acc[`${day}_${mealType}`] = formData[day][mealType];
              });
              return acc;
            }, {}),
        },
      };

      await axios.post("http://localhost:1337/api/meal-plans", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Jídelníček byl úspěšně uložen!", {
        hideProgressBar: true,
      });

      setFormData({
        title: "",
        week_start: "",
        image: null,
        monday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
        tuesday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
        wednesday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
        thursday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
        friday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
        saturday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
        sunday: {
          breakfast: "",
          snack1: "",
          lunch: "",
          snack2: "",
          dinner: "",
        },
      });
    } catch (error) {
      toast.error("Chyba při ukládání jídelníčku.", { hideProgressBar: true });
    } finally {
      setLoading(false);
    }
  };

  const renderDaySection = (day, index) => (
    <div
      className={`p-4 rounded-lg mb-6 ${
        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
      }`}
    >
      <h3 className="text-xl font-bold mb-4 text-white capitalize">{day}</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {["breakfast", "snack1", "lunch", "snack2", "dinner"].map(
          (mealType) => (
            <div key={mealType}>
              <label className="block text-sm font-medium mb-2 capitalize text-white">
                {mealType}
              </label>
              <input
                type="text"
                value={formData[day][mealType]}
                onChange={(e) => handleInputChange(e, day, mealType)}
                placeholder={`Zadejte ${mealType}`}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } bg-cover bg-center relative`}
        style={{
          backgroundImage: "url('/images/gradient_puple.webp')",
        }}
      >
        <ToastContainer />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative w-full max-w-5xl mx-auto bg-[#1A1A2E] text-white rounded-xl shadow-2xl p-6">
          <h2 className="text-center text-3xl font-bold mb-6">
            Týdenní jídelníček
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Název jídelníčku
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
              <label className="block text-sm font-medium mb-2 text-white">
                Začátek týdne
              </label>
              <input
                type="date"
                name="week_start"
                value={formData.week_start}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Obrázek jídelníčku
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day, index) => renderDaySection(day, index))}
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none transition"
              disabled={loading}
            >
              {loading ? "Ukládání..." : "Uložit jídelníček"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealPlanAdd;
