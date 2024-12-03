import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const initialUser = { email: "", password: "", username: "" };

const SignUp = () => {
  const [user, setUser] = useState(initialUser);
  const Navigate = useHistory();
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({ ...currentUser, [name]: value }));

    if (name === "username") {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const hasNumber = /[0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    let passwordError = "";

    if (!hasNumber || !hasUppercase) {
      passwordError =
        "Heslo musí obsahovat alespoň jedno číslo a jedno velké písmeno.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.password && !errors.username) {
      try {
        const url = `http://localhost:1337/api/auth/local/register`;
        const userData = {
          username: user.username.trim(),
          email: user.email,
          password: user.password,
        };

        const res = await axios.post(url, userData);
        if (res) {
          setUser(initialUser);
          Navigate.push("/auth/prihlaseni");
        }
        toast.success("Registrace byla úspěšná!");
      } catch (error) {
        if (
          error.response?.data?.error?.message ===
          "Email or Username are already taken"
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "Zadej jiné jméno nebo email, už je zabrané.",
          }));
        } else {
          toast.error("Chyba při odesílání formuláře.");
        }
      }
    } else {
      console.log("Formulář obsahuje chyby.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/gradient_puple.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <ToastContainer />
      <div className="relative w-full max-w-md bg-[#1A1A2E] text-white rounded-xl shadow-2xl p-6">
        <h2 className="text-center text-3xl font-bold mb-6">
          Registruj se pomocí:
        </h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-500 hover:bg-gray-700">
            <i className="fa-brands fa-github"></i>
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-500 hover:bg-gray-700">
            <i className="fab fa-google text-white"></i>
          </button>
        </div>

        <p className="text-center text-gray-400 mb-4">nebo zadej:</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Uživatelské jméno
            </label>
            <input
              type="text"
              name="username"
              placeholder="Uživatelské jméno"
              value={user.username}
              onChange={handleUserChange}
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Váš email"
              value={user.email}
              onChange={handleUserChange}
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Heslo</label>
            <input
              type="password"
              name="password"
              placeholder="Vaše heslo"
              value={user.password}
              onChange={handleUserChange}
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-5 h-5 text-purple-500 bg-transparent border-gray-500 rounded focus:outline-none"
            />
            <label className="text-gray-400 text-sm">Zapamatovat si mě</label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 py-3 rounded-lg text-white font-bold hover:bg-purple-700 transition"
          >
            Registrovat!
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Máte účet?{" "}
          <Link
            to="/auth/prihlaseni"
            className="text-purple-400 hover:text-purple-500 font-semibold"
          >
            Přihlaste se zde
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
