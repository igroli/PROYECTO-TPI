import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { successToast } from "../../ui/notifications/notifications";
const AddAgents = () => {
  const [agents, setAgents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    image_url: "",
  });

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const agentData = {
      ...formData,
    };

    fetch("http://localhost:3000/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg);
        }
        return res.json();
      })
      .then((agentData) => {
        setFormData({
          name: "",
          last_name: "",
          email: "",
          password: "",
          phone_number: "",
          image_url: "",
        });
        successToast("Agente añadido!");
      })
      .catch((error) => {
        console.log("Error detallado:", error.message);
      });
    console.log(agentData);
  };

  return (
    <div>
      <div className="contact-form-container">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Ingrese nombre"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Apellido</Form.Label>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Ingrese email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                name="phone_number"
                type="text"
                placeholder="Ingrese teléfono"
                onChange={handleChange}
                value={formData.phone_number}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Ingrese contraseña"
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
