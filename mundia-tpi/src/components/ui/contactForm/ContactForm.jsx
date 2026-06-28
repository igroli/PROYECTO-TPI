import { Form, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./ContactForm.css";
import "../../../index.css";

const ContactForm = () => {

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    Swal.fire({
      icon: "success",
      title: "¡Formulario enviado!",
      text: "Un agente se pondrá en contacto contigo a la brevedad.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0d6efd",
    }).then(() => {
      form.reset(); // Limpia todos los campos del formulario
    });
  };

  return (
    <div className="contact-form-container">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese email"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Nombre y apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre completo"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese teléfono"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Ingrese su consulta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escriba aquí su consulta..."
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Mantenerme al tanto de promociones y/o descuentos"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar formulario
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;