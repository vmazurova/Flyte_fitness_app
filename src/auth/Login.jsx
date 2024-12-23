import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthProvider";

const initialUser = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({ password: "" });
  const history = useHistory();
  const { setUser: setContextUser } = useContext(AuthContext); // Použití AuthContext

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const hasNumber = /[0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    if (!hasNumber || !hasUppercase) {
      setErrors({
        ...errors,
        password:
          "Heslo musí obsahovat alespoň jedno číslo a jedno velké písmeno.",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:1337/api/auth/local`;
      const userData = {
        identifier: user.email,
        password: user.password,
      };

      const res = await axios.post(url, userData);

      if (res.data.jwt) {
        localStorage.setItem("jwt", res.data.jwt);
        const decodedToken = JSON.parse(atob(res.data.jwt.split(".")[1]));
        setContextUser({ id: decodedToken.id }); // Nastavení uživatele do kontextu

        toast.success("Přihlášení proběhlo úspěšně!", {
          hideProgressBar: true,
        });
        setUser(initialUser);
        history.push("/jidelnicky");
      }
    } catch (error) {
      console.error(
        "Chyba serveru:",
        error.response ? error.response.data : error.message
      );

      toast.error(
        error.response?.data?.error?.message || "Chyba při přihlašování.",
        { hideProgressBar: true }
      );
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
        <h2 className="text-center text-3xl font-bold mb-6">Přihlášení</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Heslo</label>
            <input
              type="password"
              name="password"
              placeholder="Heslo"
              value={user.password}
              onChange={(e) => {
                handleChange(e);
                validatePassword(e.target.value);
              }}
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none transition"
          >
            Přihlásit se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
