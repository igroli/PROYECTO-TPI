import React, { useState } from "react";
import NavBar from "../navBar/NavBar";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Footer from "../footer/Footer";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div>
      <NavBar />
      <div className="login-container">
      <Form>
        <Form.Group>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Ingrese Mail"
            onChange={handleEmailChange}
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Ingrese Contraseña"
            onChange={handlePasswordChange}
            value={password}
          />
        </Form.Group>
        <Form.Group>
            <Button onClick={() => navigate("/register")}>No tiene cuenta? Registrese</Button>
        </Form.Group>
        <Button onClick={handleSubmit}>Iniciar Sesion</Button>
      </Form>
      </div>
      <Footer />
    </div>
  );
};
