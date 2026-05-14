import { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddProperty = () => {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type_property: "Departamento",
    type_transactions: "Alquiler",
    price: "",
    square_mts: "",
    rooms: "0",
    bathroom: "1",
    address: "",
    image_url: "",
    pet_friendly: false,
    state_property: "Sin reservas",
  });

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/houses")
      .then((response) => response.json())
      .then((properties) => setProperties(properties))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      square_mts: parseInt(formData.square_mts, 10),
      rooms: parseInt(formData.rooms, 10),
      bathroom: parseInt(formData.bathroom, 10),
    };

    fetch("http://localhost:3000/houses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg);
        }
        return res.json();
      })
      .then((propertyData) => {
        setFormData({
          title: "",
          description: "",
          type_property: "Departamento",
          type_transactions: "Alquiler",
          price: "",
          square_mts: "",
          rooms: "",
          bathroom: "",
          address: "",
          image_url: "",
          pet_friendly: false,
          state_property: "Sin Reservas",
        });
        alert("Propiedad añadida!");
      })
      .catch((error) => {
        console.log("Error detallado:", error.message);
      });
    // LIMPIO INPUTS
    console.log(propertyData);
  };

  return (
    <div>
      <NavBar />
      <div className="contact-form-container">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Titulo de la propiedad</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Ingrese titulo de la propiedad"
                onChange={handleChange}
                value={formData.title}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Ingrese descripcion"
                onChange={handleChange}
                value={formData.description}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Habitaciones</Form.Label>
              <Form.Control
                name="rooms"
                type="number"
                placeholder="Ingrese cantidad de habitaciones"
                onChange={handleChange}
                value={formData.rooms}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Baños</Form.Label>
              <Form.Control
                name="bathroom"
                type="number"
                placeholder="Ingrese cantidad de baños"
                onChange={handleChange}
                value={formData.bathroom}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Metros cuadrados</Form.Label>
              <Form.Control
                name="square_mts"
                type="text"
                placeholder="Ingrese cantidad de metros cuadrados"
                onChange={handleChange}
                value={formData.square_mts}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Ingrese la dirección"
                onChange={handleChange}
                value={formData.address}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Precio en USD</Form.Label>
              <Form.Control
                name="price"
                type="text"
                placeholder="Ingrese el precio"
                onChange={handleChange}
                value={formData.price}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="dropdown-type-property">
              <Form.Label>Tipo de propiedad</Form.Label>
              <Form.Select
                name="type_property"
                onChange={handleChange}
                value={formData.type_property}
                aria-label="Selector de ejemplo"
              >
                <option value="Departamento">Departamento</option>
                <option value="Casa">Casa</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="dropdown-type-transaction">
              <Form.Label>Tipo de transacción</Form.Label>
              <Form.Select
                name="type_transactions"
                onChange={handleChange}
                value={formData.type_transactions}
                aria-label="Selector de ejemplo"
              >
                <option value="Alquiler">Alquiler</option>
                <option value="Venta">Venta</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Imagen de la propiedad</Form.Label>
              <Form.Control
                name="image_url"
                type="text"
                placeholder="Ingrese la dirección URL de la imagen"
                onChange={handleChange}
                value={formData.image_url}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="¿Es pet friendly?"
              name="pet_friendly"
              checked={formData.pet_friendly}
              onChange={handleChange}
            />{" "}
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar formulario
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default AddProperty;
