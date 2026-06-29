import { useState, useEffect, useContext } from "react";
import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AuthenticationContext } from "../../auth/auth.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProperty = () => {
  const [properties, setProperties] = useState([]);
  const [agentsList, setAgentsList] = useState([]);
  const { token } = useContext(AuthenticationContext);

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
    state_property: "Sin Reservas",
    id_agents: "",
  });

  const onlyNums = /^\d+$/;
  const positiveNumeric = /^\d+(\.\d+)?$/;

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 1. Efecto para cargar las propiedades existentes
  useEffect(() => {
    fetch("http://localhost:3000/houses")
      .then((response) => {
        if (!response.ok) throw new Error(`Error ${response.status}`);
        return response.json();
      })
      .then((properties) => setProperties(properties))
      .catch((error) => {
        console.log("Error al traer propiedades:", error);
      });
  }, []);

  // 2. Efecto para traer los agentes disponibles desde la API
  useEffect(() => {
    fetch("http://localhost:3000/agents", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudieron cargar los agentes.");
        return response.json();
      })
      .then((data) => {
        setAgentsList(data);
      })
      .catch((error) => {
        console.error("Error cargando agentes:", error);
        toast.error("Error al conectar con el listado de agentes.");
      });
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanTitle = formData.title.trim();
    const cleanDescription = formData.description.trim();
    const cleanAddress = formData.address.trim();
    const cleanImageUrl = formData.image_url.trim();
    const cleanPrice = formData.price.toString().trim();
    const cleanSquareMts = formData.square_mts.toString().trim();
    const cleanRooms = formData.rooms.toString().trim();
    const cleanBathroom = formData.bathroom.toString().trim();
    const cleanIdAgents = formData.id_agents.toString().trim();

    if (!cleanTitle || !cleanDescription || !cleanAddress || !cleanImageUrl) {
      toast.error("Por favor, completá todos los campos obligatorios.");
      return;
    }

    if (!cleanPrice || !cleanSquareMts || !cleanRooms || !cleanBathroom || !cleanIdAgents) {
      toast.error("Por favor, completá todos los campos numéricos y elegí un agente.");
      return;
    }

    if (!positiveNumeric.test(cleanPrice) || parseFloat(cleanPrice) <= 0) {
      toast.error("El precio debe ser un número mayor a 0.");
      return;
    }

    if (!onlyNums.test(cleanSquareMts) || parseInt(cleanSquareMts, 10) <= 0) {
      toast.error("Los metros cuadrados deben ser un número entero mayor a 0.");
      return;
    }

    if (!onlyNums.test(cleanRooms) || parseInt(cleanRooms, 10) < 1 || !onlyNums.test(cleanBathroom)) {
      toast.error("La cantidad de habitaciones y baños deben ser números enteros.");
      return;
    }

    const propertyData = {
      title: cleanTitle,
      description: cleanDescription,
      type_property: formData.type_property,
      type_transactions: formData.type_transactions,
      price: parseFloat(cleanPrice),
      square_mts: parseInt(cleanSquareMts, 10),
      rooms: parseInt(cleanRooms, 10),
      bathroom: parseInt(cleanBathroom, 10),
      address: cleanAddress,
      image_url: cleanImageUrl,
      pet_friendly: formData.pet_friendly,
      state_property: formData.state_property,
      id_agents: parseInt(cleanIdAgents, 10),
    };

    fetch("http://localhost:3000/houses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
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
          state_property: "Sin Reservas",
          id_agents: "", // Resetea la selección
        });
        toast.success("¡Propiedad añadida con éxito!");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log("Error detallado:", error.message);
      });
  };

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Título de la propiedad *</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Ingrese título de la propiedad"
                onChange={handleChange}
                value={formData.title}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Ingrese descripción"
                onChange={handleChange}
                value={formData.description}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 align-items-end">
            <Form.Group as={Col} controlId="formGridRooms">
              <Form.Label>Habitaciones *</Form.Label>
              <Form.Control
                name="rooms"
                type="number"
                min="0"
                placeholder="Cantidad"
                onChange={handleChange}
                value={formData.rooms}
              />
            </Form.Group>

            {/* NUEVO: Reemplazado input manual por Form.Select mapeado */}
            <Form.Group as={Col} controlId="formGridAgent">
              <Form.Label>Agente encargado *</Form.Label>
              <Form.Select
                name="id_agents"
                onChange={handleChange}
                value={formData.id_agents}
              >
                <option value="">Seleccione un agente</option>
                {agentsList.map((agent) => {
                  // Se busca el ID del agente de la relación (id_agents o id_users según devuelva tu JSON)
                  const agentId = agent.Agent?.id_agents || agent.id_users;
                  return (
                    <option key={agentId} value={agentId}>
                      {agent.name} {agent.last_name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBathroom">
              <Form.Label>Baños *</Form.Label>
              <Form.Control
                name="bathroom"
                type="number"
                min="1"
                placeholder="Cantidad"
                onChange={handleChange}
                value={formData.bathroom}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSquareMts">
              <Form.Label>Metros cuadrados *</Form.Label>
              <Form.Control
                name="square_mts"
                type="number"
                min="1"
                placeholder="M²"
                onChange={handleChange}
                value={formData.square_mts}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Dirección *</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Ingrese la dirección"
                onChange={handleChange}
                value={formData.address}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPrice">
              <Form.Label>Precio en USD *</Form.Label>
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
            <Form.Group as={Col} controlId="formGridImageUrl">
              <Form.Label>URL de imagen *</Form.Label>
              <Form.Control
                name="image_url"
                type="text"
                placeholder="Ingrese la URL de la imagen"
                onChange={handleChange}
                value={formData.image_url}
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
              >
                <option value="Alquiler">Alquiler</option>
                <option value="Venta">Venta</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="¿Es pet friendly?"
              name="pet_friendly"
              checked={formData.pet_friendly}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear Propiedad
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default AddProperty;
