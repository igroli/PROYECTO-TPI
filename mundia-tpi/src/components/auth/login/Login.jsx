import { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Login.css";
import { errorToast } from "../../ui/notifications/notifications";
import { AuthenticationContext } from "../auth.context";
import { loginUser } from "./login.services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const { handleUserLogIn } = useContext(AuthenticationContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value.length) {
      setErrors({ ...errors, email: true });
      alert("Ingrese su email.");
      emailRef.current.focus();
      setMessage(true);
      return;
    } else if (!password.length || password.length < 8) {
      setErrors({ ...errors, password: true });
      alert("La contraseña debe tener como mínimo 8 caracteres.");
      passwordRef.current.focus();
      setMessage(true);
      return;
    }
    setErrors({ email: false, password: false });
    setMessage(false);

    try {
      const data = await loginUser(email, password);
      handleUserLogIn(data);
      console.log("Token creado!");
      navigate('/');
    } catch (err) {
      console.log("Hubo un error:", err.message);
    }
  };

  return (
    <div>
      <div className="login-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Ingrese Mail"
              onChange={handleEmailChange}
              value={email}
              ref={emailRef}
              className={errors.email && "border border-danger border-3"}
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
              ref={passwordRef}
              className={errors.password && "border border-danger border-3"}
            />
          </Form.Group>
          <Form.Group>
            <Button onClick={() => navigate("/register")}>
              No tiene cuenta? Registrese
            </Button>
          </Form.Group>
          <Button type="submit">Iniciar Sesion</Button>
        </Form>
        {message && <p>Debe completar los campos para iniciar sesión.</p>}
      </div>
    </div>
  );
};

export default Login;
