import React, { useState } from "react";
import { Element } from "react-scroll";
import { Link } from "react-router-dom"; // Přidán import Link pro navigaci
import Button from "../components/Button.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    heslo: "",
  });

  const [errors, setErrors] = useState({
    heslo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = (heslo) => {
    const hasNumber = /[0-9]/.test(heslo);
    const hasUppercase = /[A-Z]/.test(heslo);

    if (!hasNumber || !hasUppercase) {
      setErrors({
        ...errors,
        heslo:
          "Heslo musí obsahovat alespoň jedno číslo a jedno velké písmeno.",
      });
    } else {
      setErrors({ ...errors, heslo: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validatePassword(formData.heslo);

    if (!errors.heslo) {
      console.log("Uživatel se přihlásil s údaji:", formData);
    } else {
      console.log("Chyba při přihlašování.");
    }
  };

  return (
    <Element
      name="login"
      className="min-h-screen py-40 bg-black text-white flex items-center justify-center"
    >
      <div className="w-10/14 lg:w-6/16 bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Přihlášení</h2>

        <p className="mb-6 text-center">
          Přihlašte se do svého účtu a získejte přístup ke svému profilu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
          />
          <input
            type="password"
            name="heslo"
            placeholder="Heslo"
            value={formData.heslo}
            onChange={(e) => {
              handleChange(e);
              validatePassword(e.target.value);
            }}
            className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
          />
          {errors.heslo && (
            <p className="text-red-500 text-sm">{errors.heslo}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none"
          >
            Přihlásit se
          </button>

          <div className="mt-8 text-center">
            <p>Nebo se přihlaš pomocí:</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                icon="/images/logos/googleICON.png"
                className="bg-red-500 hover:bg-red-600"
              >
                Google
              </Button>
              <Button
                icon="/images/logos/githubICON.png"
                className="bg-gray-700 hover:bg-gray-800"
              >
                Githubu
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p>
              Nemáš účet?{" "}
              <Link
                to="/auth/Registrace"
                className="text-purple-400 hover:text-purple-500 font-semibold"
              >
                Registruj se tady
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Element>
  );
};

export default Login;
