import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ContactForm.css";
import "../../../index.css";

const ContactForm = () => {
  // Estado para controlar los campos del formulario
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    comments: ""
  });

  // Expresiones regulares que ya validamos antes
  const onlyNums = /^\d+$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const cleanEmail = formData.email.trim();
    const cleanFullName = formData.fullName.trim();
    const cleanPhone = formData.phone.trim();
    const cleanComments = formData.comments.trim();


    if (!cleanEmail || !cleanFullName || !cleanPhone || !cleanComments) {
      toast.error("Por favor, completá todos los campos obligatorios.");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    
    const namesArray = cleanFullName.split(/\s+/);
    const allNamesValid = namesArray.every(name => nameRegex.test(name));

    if (namesArray.length < 2) {
      toast.error("Por favor, ingrese su nombre y apellido completo.");
      return;
    }

    if (!allNamesValid) {
      toast.error("Cada nombre y apellido debe contener solo letras y un mínimo de 2 caracteres.");
      return;
    }

    if (cleanPhone.length !== 12) {
      toast.error("El número de teléfono debe tener 12 caracteres.");
      return;
    }

    if (!onlyNums.test(cleanPhone)) {
      toast.error("Teléfono: solo números del 0 al 9.");
      return;
    }

    toast.success("¡Formulario enviado! Un agente se pondrá en contacto contigo a la brevedad.");

    console.log("Consulta enviada:", {
      email: cleanEmail,
      fullName: cleanFullName,
      phone: cleanPhone,
      comments: cleanComments
    });

    setFormData({
      email: "",
      fullName: "",
      phone: "",
      comments: ""
    });
  };

  return (
    <>
      <div className="contact-form-container">
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingrese email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Ingrese nombre completo"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Ingrese teléfono"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Ingrese su consulta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comments"
                placeholder="Escriba aquí su consulta..."
                value={formData.comments}
                onChange={handleChange}
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
      
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};

export default ContactForm;
