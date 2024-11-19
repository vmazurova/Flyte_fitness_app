import React, { useState } from "react";
import { Row, FormGroup, Col, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CusotomButton from "../components/Button.jsx";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:1337/api/auth/forgot-password`;
      const userData = { email };

      const res = await axios.post(url, userData);
      toast.success("E-mail s odkazem na obnovení hesla byl odeslán!", {
        hideProgressBar: true,
      });
      setEmail("");
    } catch (error) {
      console.error("Chyba serveru:", error.response?.data);
      toast.error(
        error.response?.data?.error?.message || "Chyba při odesílání e-mailu.",
        { hideProgressBar: true }
      );
    }
  };

  return (
    <Row
      name="forgot-password"
      className="min-h-screen py-40 bg-black text-white flex items-center justify-center"
    >
      <ToastContainer />
      <Col>
        <div className="w-10/14 lg:w-6/16 bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Zapomenuté heslo
          </h2>
          <p className="mb-6 text-center">
            Zadejte svůj e-mail a obdržíte odkaz na obnovení hesla.
          </p>
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                required
                className="border border-gray-600 py-2 px-3 bg-white text-black rounded-lg focus:border-purple-500 focus:outline-none w-full"
              />
            </FormGroup>
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none"
            >
              Odeslat e-mail
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link
              to="/auth/prihlaseni"
              className="text-purple-400 hover:text-purple-500 font-semibold"
            >
              Zpět na přihlášení
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
