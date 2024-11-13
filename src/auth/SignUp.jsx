import React, { useState } from "react";
import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import { FormGroup, Row } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "", // Nastavení výchozí hodnoty jako prázdného řetězce
    email: "",
    phone: "", // Pole pro telefon
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const handleUserChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: type === "checkbox" ? checked : value,
    }));

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

    setErrors({
      password: passwordError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.password) {
      try {
        const url = `http://localhost:1337/api/auth/local/register`;

        // Objekt s daty pro registraci
        const userData = {
          username:
            user.username || `${user.firstName} ${user.secondName}`.trim(),
          email: user.email,
          phone: user.phone, // Zahrnutí telefonu
          password: user.password,
        };

        const res = await axios.post(url, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Formulář byl odeslán:", res.data);
      } catch (error) {
        console.error(
          "Chyba serveru:",
          error.response?.status,
          error.response?.data || error.response?.statusText
        );
        toast.error(
          `Chyba při odesílání formuláře: ${
            error.response?.data?.error?.message || error.response?.statusText
          }`,
          {
            hideProgressBar: true,
          }
        );
      }
    } else {
      console.log("Formulář nebyl odeslán kvůli chybám.");
    }
  };

  return (
    <Row
      name="signup"
      className="min-h-screen py-40 bg-black text-white flex items-center justify-center"
    >
      <ToastContainer />
      <div className="w-10/12 lg:w-6/12 bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Registrace</h2>

        <p className="mb-6 text-center">
          Vytvoř si účet a podívej se, co všechno Flyte umí.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGroup>
            <input
              type="text"
              name="username"
              placeholder="Uživatelské jméno"
              value={user.username}
              onChange={handleUserChange}
              className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
            />
          </FormGroup>

          <FormGroup>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleUserChange}
              className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
            />
          </FormGroup>

          <FormGroup>
            <input
              type="tel"
              name="phone"
              placeholder="Telefonní číslo"
              value={user.phone}
              onChange={handleUserChange}
              className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
            />
          </FormGroup>

          <FormGroup>
            <input
              type="password"
              name="password"
              placeholder="Heslo"
              value={user.password}
              onChange={handleUserChange}
              className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </FormGroup>

          <button
            type="submit"
            className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none sm:px-6 sm:py-2 md:px-8 md:py-3"
          >
            Registrovat!
          </button>

          <div className="mt-8 text-center">
            <p>Nebo se přihlaš pomocí:</p>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <Button
                icon="/images/logos/googleICON.png"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 text-xs sm:text-sm md:text-base"
              >
                Google
              </Button>
              <Button
                icon="/images/logos/githubICON.png"
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 text-xs sm:text-sm md:text-base"
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
    </Row>
  );
};

export default SignUp;
