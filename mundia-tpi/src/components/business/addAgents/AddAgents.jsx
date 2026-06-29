import { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AuthenticationContext } from "../../auth/auth.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAgents = () => {
  const [agents, setAgents] = useState([]);
  const { token } = useContext(AuthenticationContext);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    image_url: "",
  });

  const regex = /^(?=.*\d).{8,}$/;
  const onlyNums = /^\d+$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanName = formData.name.trim();
    const cleanLastName = formData.last_name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone_number.trim().replace(/\s+/g, "");

    if (!cleanName || !cleanLastName || !cleanEmail || !formData.password || !cleanPhone) {
      toast.error("Por favor, completá todos los campos obligatorios.");
      return;
    }

    if (!nameRegex.test(cleanName) || !nameRegex.test(cleanLastName)) {
      toast.error("El nombre y el apellido deben contener solo letras (mínimo 2 caracteres).");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (cleanPhone.length !== 12) {
      toast.error("El número de teléfono debe tener 12 dígitos.");
      return;
    }

    if (!onlyNums.test(cleanPhone)) {
      toast.error("Teléfono: solo números del 0 al 9.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!regex.test(formData.password)) {
      toast.error("La contraseña debe contener al menos un número.");
      return;
    }

    const agentData = {
      name: cleanName,
      last_name: cleanLastName,
      email: cleanEmail,
      password: formData.password,
      phone_number: cleanPhone,
      image_url: formData.image_url.trim(),
    };

    fetch("http://localhost:3000/agents", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const errorMsg = data.message || data.error || "Error al procesar la solicitud.";
          throw new Error(errorMsg);
        }
        return data;
      })
      .then((data) => {
        setFormData({
          name: "",
          last_name: "",
          email: "",
          password: "",
          phone_number: "",
          image_url: "",
        });
        toast.success("¡Agente añadido con éxito!");
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error detallado:", error.message);
      });
  };

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="contact-form-container">
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Ingrese nombre"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Apellido *</Form.Label>
              <Form.Control
                name="last_name"
                type="text"
                placeholder="Ingrese apellido"
                onChange={handleChange}
                value={formData.last_name}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Ingrese email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Teléfono *</Form.Label>
              <Form.Control
                name="phone_number"
                type="text"
                placeholder="Ej: 549341234567"
                onChange={handleChange}
                value={formData.phone_number}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña *</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres y 1 número"
                onChange={handleChange}
                value={formData.password}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridImage">
              <Form.Label>Imagen del agente</Form.Label>
              <Form.Control
                name="image_url"
                type="text"
                placeholder="Ingrese la dirección URL de la imagen"
                onChange={handleChange}
                value={formData.image_url}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Enviar formulario
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddAgents;
