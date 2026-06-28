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

  const regex = /^(?=.*\d).{8,}$/;
  const onlyNums = /^\d+$/
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanLastName = last_name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone_number.trim();


    if (!nameRegex.test(cleanName) || !nameRegex.test(cleanLastName)) {
      toast.error("El nombre y el apellido deben contener solo letras (mínimo 2 caracteres).");
      return;
    }
    if (cleanPhone.length != 12) {
      toast.error("El número de teléfono debe tener 12 caracteres.");
      return;
    }

    if (!onlyNums.test(cleanPhone)) {
      toast.error("Teléfono: solo números del 0 al 9.");
      return;
    }



    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      toast.error("La contsraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!regex.test(password)) {
      toast.error("La contraseña debe tener al menos un número.");
      return;
    }



    const newUser = {
      name: cleanName,
      last_name: cleanLastName,
      email: cleanEmail,
      password: password,
      phone_number: cleanPhone,
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
          const errorData = await res.json().catch(() => ({ message: "Error desconocido" }));
          throw new Error(errorData.message || "Error al procesar el registro");
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
        toast.error(error.message);
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
              type="button"
              className="button-alternate"
              onClick={() => navigate("/login")}
            >
              ¿Tenés cuenta? Iniciá sesión
            </Button>
          </Form.Group>
        </Form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};

export default Register;