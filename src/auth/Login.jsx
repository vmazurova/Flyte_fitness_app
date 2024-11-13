import React, { useState } from "react";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import CusotomButton from "../components/Button.jsx";
import { Col, FormGroup, Input, Row } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
{
  /*
   */
}
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.email && user.password) {
        const res = await axios.post(url, user);
        console.log({ res });
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    validatePassword(formData.password);

    if (!errors.password) {
      console.log("Uživatel se přihlásil s údaji:", formData);
    } else {
      console.log("Chyba při přihlašování.");
    }
  };
  return (
    <Row
      name="login"
      className="min-h-screen py-40 bg-black text-white flex items-center justify-center"
    >
      <Col>
        <div className="w-10/14 lg:w-6/16 bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8">
          <h2 className="text-4xl font-bold mb-6 text-center">Přihlášení</h2>

          <p className="mb-6 text-center">
            Přihlašte se do svého účtu a získejte přístup ke svému profilu.
          </p>

          <div onSubmit={handleSubmit} className="space-y-5">
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
              onClick={handleLogin}
            >
              Přihlásit se
            </button>

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
        </div>
      </Col>
    </Row>
  );
};

export default Login;
