import React, { useState, useEffect } from "react";
import axios from "axios";

const MealPlanAdd = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [users, setUsers] = useState([]); // Přidáno: Seznam uživatelů
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    selectedUser: "", // Přidáno: ID vybraného uživatele
  });
  const [loading, setLoading] = useState(false);

  // Načtení jídelníčků
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/meal-plans?populate=*"
        );
        setMealPlans(response.data.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };
    fetchMealPlans();
  }, []);

  // Načtení uživatelů
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("Token není dostupný. Přihlaste se.");
          return;
        }

        const response = await axios.get("http://localhost:1337/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Načtení uživatelů:", response.data); // Logování dat
        setUsers(response.data); // Uložení dat do stavu
      } catch (error) {
        console.error(
          "Chyba při načítání uživatelů:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsers();
  }, []);

  // Zpracování změn ve formuláři
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Zpracování nahrávání souborů
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  // Odeslání formuláře
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("Prosím, přihlaste se.");
        return;
      }

      // Vytvoření FormData
      const form = new FormData();
      form.append(
        "data",
        JSON.stringify({
          title: formData.title,
          description: formData.description,
          users: [formData.selectedUser], // Přidáno: Vybraný uživatel
          created_plan_at: new Date().toISOString(),
        })
      );

      formData.images.forEach((file) => form.append("files.image", file));

      const response = await axios.post(
        "http://localhost:1337/api/meal-plans",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMealPlans((prev) => [...prev, response.data.data]);
      setFormData({ title: "", description: "", images: [], selectedUser: "" });
    } catch (error) {
      console.error(
        "Chyba při odesílání:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Jídelníčky</h1>

      {/* Formulář */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-400 mb-2">
            Název jídelníčku
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-400 mb-2">
            Popis
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="selectedUser" className="block text-gray-400 mb-2">
            Vyberte uživatele
          </label>
          <select
            id="selectedUser"
            name="selectedUser"
            value={formData.selectedUser}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            required
          >
            <option value="" disabled>
              -- Vyberte uživatele --
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username || user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-400 mb-2">
            Obrázky/soubory
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            multiple
            className="w-full px-4 py-2 bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Odesílání..." : "Přidat jídelníček"}
        </button>
      </form>
    </div>
  );
};

export default MealPlanAdd;
