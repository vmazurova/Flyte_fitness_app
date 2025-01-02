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
  const [user, setUser] = useState(() => {
    // Načtení uživatele z localStorage, pokud existuje
    const savedUser = localStorage.getItem("rememberedUser");
    return savedUser ? JSON.parse(savedUser) : { email: "", password: "" };
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ password: "" });
  const history = useHistory();
  const { setUser: setContextUser } = useContext(AuthContext);

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
        setContextUser({ id: decodedToken.id });

        if (rememberMe) {
          localStorage.setItem("rememberedUser", JSON.stringify(user));
        } else {
          localStorage.removeItem("rememberedUser");
        }

        toast.success("Přihlášení proběhlo úspěšně!", {
          hideProgressBar: true,
        });
        setUser({ email: "", password: "" });
        history.push("/kurzy");
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
      <div className="absolute mt-4 ml-4"></div>

      <div className="relative w-full max-w-md bg-[#1A1A2E] text-white rounded-xl shadow-2xl p-6">
        <h2 className="text-center text-3xl font-bold mb-6">Přihlášení</h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-500 hover:bg-gray-700">
            <i className="fa-brands fa-github"></i>
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-500 hover:bg-gray-700">
            <i className="fab fa-google text-white"></i>
          </button>
        </div>

        <p className="text-center text-gray-400 mb-4">nebo zadej:</p>

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
            Přihlásit se
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Nemáte účet?{" "}
          <Link
            to="/auth/registrace"
            className="text-purple-400 hover:text-purple-500 font-semibold"
          >
            Zaregistrujte se zde
          </Link>
          <br />
          <br />
          <Link
            to="/"
            className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Zpět na hlavní stránku
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
