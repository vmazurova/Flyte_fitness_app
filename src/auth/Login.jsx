import React, { useState } from "react";
import { Row, FormGroup, Col, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CusotomButton from "../components/Button.jsx";
import "react-toastify/dist/ReactToastify.css";

const initialUser = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({ password: "" });
  const history = useHistory(); // Použití useHistory pro verzi 5.x

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
        identifier: user.email, // Správné pole pro identifikátor
        password: user.password,
      };

      const res = await axios.post(url, userData);
      if (res.data.jwt) {
        toast.success("Přihlášení proběhlo úspěšně!", {
          hideProgressBar: true,
        });
        setUser(initialUser); // Vyprázdnění formuláře
        history.push("/osobni-slozka"); // Přesměrování na jinou stránku
      }
    } catch (error) {
      console.error("Chyba serveru:", error.response?.data);

      toast.error(
        error.response?.data?.error?.message || "Chyba při přihlašování.",
        { hideProgressBar: true }
      );
    }
  };

  return (
    <Row
      name="login"
      className="min-h-screen py-40 bg-black text-white flex items-center justify-center"
    >
      <ToastContainer />
      <Col>
        <div className="w-10/14 lg:w-6/16 bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8">
          <h2 className="text-4xl font-bold mb-6 text-center">Přihlášení</h2>
          <p className="mb-6 text-center">
            Přihlašte se do svého účtu a získejte přístup ke svému profilu.
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="Heslo"
                value={user.password}
                onChange={(e) => {
                  handleChange(e);
                  validatePassword(e.target.value);
                }}
                className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
              />
            </FormGroup>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none"
            >
              Přihlásit se
            </button>
          </form>
          <div className="mt-8 text-center">
            <p>Nebo se přihlaš pomocí:</p>
            <div className="flex justify-center gap-4 mt-4">
              <CusotomButton
                icon="/images/logos/googleICON.png"
                className="bg-red-500 hover:bg-red-600"
              >
                Google
              </CusotomButton>
              <CusotomButton
                icon="/images/logos/githubICON.png"
                className="bg-gray-700 hover:bg-gray-800"
              >
                Githubu
              </CusotomButton>
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
        </div>
      </Col>
    </Row>
  );
};

export default Login;
