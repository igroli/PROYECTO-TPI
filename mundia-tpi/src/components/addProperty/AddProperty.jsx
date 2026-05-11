import { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddProperty = () => {
  const [properties, setProperties] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type_property, setTypeProperty] = useState("Departamento");
  const [type_transactions, setTypeTransaction] = useState("Alquiler");
  const [price, setPrice] = useState("");
  const [square_mts, setSquareMts] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathroom, setBathrooms] = useState("");
  const [address, setAddress] = useState("");
  const [image_url, setImageUrl] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeRooms = (event) => {
    setRooms(event.target.value);
  };

  const handleChangeBathrooms = (event) => {
    setBathrooms(event.target.value);
  };

  const handleChangeSquareMts = (event) => {
    setSquareMts(event.target.value);
  };

  const handleChangeAdress = (event) => {
    setAddress(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeTypeProperty = (event) => {
    setTypeProperty(event.target.value);
  };

  const handleChangeTypeTransaction = (event) => {
    setTypeTransaction(event.target.value);
  };

  const handleChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/houses")
      .then((response) => response.json())
      .then((properties) => setProperties(properties))
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const propertyData = {
      title: title,
      description: description,
      type_property: type_property,
      type_transactions: type_transactions,
      price: parseFloat(price),
      square_mts: parseInt(square_mts, 10),
      rooms: parseInt(rooms, 10),
      bathroom: parseInt(bathroom, 10),
      address: address,
      image_url: image_url,
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
        setTitle("");
        setDescription("");
        setTypeProperty("Departamento");
        setTypeTransaction("Alquiler");
        setPrice("");
        setSquareMts("");
        setRooms("");
        setBathrooms("");
        setAddress("");
        setImageUrl("");
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
                type="text"
                placeholder="Ingrese titulo de la propiedad"
                onChange={handleChangeTitle}
                value={title}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese descripcion"
                onChange={handleChangeDescription}
                value={description}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Habitaciones</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese cantidad de habitaciones"
                onChange={handleChangeRooms}
                value={rooms}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Baños</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese cantidad de baños"
                onChange={handleChangeBathrooms}
                value={bathroom}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Metros cuadrados</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese cantidad de metros cuadrados"
                onChange={handleChangeSquareMts}
                value={square_mts}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                onChange={handleChangeAdress}
                value={address}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Precio en USD</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el precio"
                onChange={handleChangePrice}
                value={price}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="miDesplegable">
              <Form.Label>Tipo de propiedad</Form.Label>
              <Form.Select
                onChange={handleChangeTypeProperty}
                value={type_property}
                aria-label="Selector de ejemplo"
              >
                <option value="Departamento">Departamento</option>
                <option value="Casa">Casa</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="miDesplegable">
              <Form.Label>Tipo de transacción</Form.Label>
              <Form.Select
                onChange={handleChangeTypeTransaction}
                value={type_transactions}
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
                type="text"
                placeholder="Ingrese la dirección URL de la imagen"
                onChange={handleChangeImageUrl}
                value={image_url}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Es pet friendly?" />
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
