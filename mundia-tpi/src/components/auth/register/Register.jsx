import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error("Las contraseñas no coinciden.");
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
        return res.text();
      })
      .then(() => {
        setName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        toast.success("¡Usuario creado con éxito!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((error) => {
        toast.error("Error al crear el usuario. Intente nuevamente.");
        console.log("Error detallado:", error.message);
      });
  };

  return (
    <>
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

          <Button type="submit">Registrarse</Button>

          <Form.Group>
            <Button
              className="button-alternate"
              onClick={() => navigate("/login")}
            >
              ¿Tenés cuenta? Iniciá sesión
            </Button>
          </Form.Group>
        </Form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000}/>
    </>
  );
};

export default Register;