import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import "./Register.css";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";

const Register = () => {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      name: name,
      last_name: last_name,
      email: email,
      password: password,
      phone_number: phone_number,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg);
        }
        return res.json();
      })
      .then(() => {
        setName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        alert("Usuario creado con éxito!");
      })
      .catch((error) => {
        console.log("Error detallado:", errorMsg);
      });

    console.log(newUser);
    navigate("/");

  };

  return (
    <>
      <NavBar />
      <div className="register-container">
        <Form onSubmit={handleSubmit}>
          <div className="form-row">
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese apellido."
                required
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese número de teléfono."
                required
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese Mail"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese Contraseña"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repita la contraseña"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button
              className="button-alternate"
              onClick={() => navigate("/login")}
            >
              ¿Tenés cuenta? Iniciá sesión
            </Button>
          </Form.Group>
          <Button type="submit">Registrarse</Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
