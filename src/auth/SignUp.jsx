import React, { useState } from "react";
import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    krestnijmeno: "",
    prijmeni: "",
    email: "",
    telefon: "",
    heslo: "",
    potvrzeniHesla: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    heslo: "",
    potvrzeniHesla: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "heslo" || name === "potvrzeniHesla") {
      validatePassword(
        formData.heslo,
        name === "potvrzeniHesla" ? value : formData.potvrzeniHesla
      );
    }
  };

  const validatePassword = (heslo, potvrzeniHesla) => {
    const hasNumber = /[0-9]/.test(heslo);
    const hasUppercase = /[A-Z]/.test(heslo);
    const passwordsMatch = heslo === potvrzeniHesla;

    let hesloError = "";
    let potvrzeniHeslaError = "";

    if (!hasNumber || !hasUppercase) {
      hesloError =
        "Heslo musí obsahovat alespoň jedno číslo a jedno velké písmeno.";
    }

    if (!passwordsMatch) {
      potvrzeniHeslaError = "Hesla se neshodují.";
    }

    setErrors({
      heslo: hesloError,
      potvrzeniHesla: potvrzeniHeslaError,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.heslo && !errors.potvrzeniHesla && formData.termsAccepted) {
      console.log("Formulář byl odeslán:", formData);
    } else {
      console.log("Formulář nemůže být odeslán kvůli chybám.");
    }
  };

  return (
    <Element
      name="signup"
      className="min-h-screen py-40 bg-black text-white flex items-center justify-center"
    >
      <div className="w-10/12 lg:w-6/12 bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Registrace</h2>

        <p className="mb-6 text-center">
          Vytvoř si účet a podívej se, co všechno Flyte umí.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              name="krestnijmeno"
              placeholder="Křestní jméno"
              value={formData.krestnijmeno}
              onChange={handleChange}
              className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
            />
            <input
              type="text"
              name="prijmeni"
              placeholder="Příjmení"
              value={formData.prijmeni}
              onChange={handleChange}
              className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
          />
          <input
            type="tel"
            name="telefon"
            placeholder="Telefonní číslo"
            value={formData.telefon}
            onChange={handleChange}
            className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
          />
          <input
            type="password"
            name="heslo"
            placeholder="Heslo"
            value={formData.heslo}
            onChange={handleChange}
            className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
          />
          {errors.heslo && (
            <p className="text-red-500 text-sm">{errors.heslo}</p>
          )}
          <input
            type="password"
            name="potvrzeniHesla"
            placeholder="Potvrzení hesla"
            value={formData.potvrzeniHesla}
            onChange={handleChange}
            className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
          />
          {errors.potvrzeniHesla && (
            <p className="text-red-500 text-sm">{errors.potvrzeniHesla}</p>
          )}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="border border-gray-600"
            />
            <label className="text-gray-300">
              Potvrzuji{" "}
              <a href="#" className="text-purple-400 font-semibold">
                Podmínky používání
              </a>{" "}
              &{" "}
              <a href="#" className="text-purple-400 font-semibold">
                GDPR
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none"
          >
            Registrovat!
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
              Máš účet?{" "}
              <Link
                to="/auth/Prihlaseni"
                className="text-purple-400 hover:text-purple-500 font-semibold"
              >
                Přihlaš se tady
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Element>
  );
};

export default SignUp;
