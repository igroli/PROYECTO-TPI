import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal, Form } from "react-bootstrap";
import { User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import "./UserPage.css";
import { AuthenticationContext } from "../auth.context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPage = () => {

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleUserLogOut, token } = useContext(AuthenticationContext);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", last_name: "", phone_number: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/usersme", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]); 


  const handleOpenEdit = () => {
    setFormData({
      name: userInfo.name || "",
      last_name: userInfo.last_name || "",
      phone_number: userInfo.phone_number || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const soloNumeros = value.replace(/\D/g, "");
      if (soloNumeros.length > 13) return;
      setFormData({ ...formData, [name]: soloNumeros });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (formData.phone_number && formData.phone_number.length !== 13) {
      toast.error("El número de teléfono debe contener 13 dígitos.");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch("http://localhost:3000/users/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.user);
        setShowModal(false);
        toast.success("¡Perfil actualizado con éxito!");
      } else {
        toast.error("Ocurrió un error al intentar guardar los cambios.");
      }
    } catch (error) {
      toast.error("Error de conexión.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/delete", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleUserLogOut();
      } else {
        toast.error("Ocurrió un error al intentar eliminar la cuenta.");
      }
    } catch (error) {
      toast.error("Error de conexión.");
    }
  };


  if (loading) {
    return (
      <Container className="text-center py-5">
        <p className="text-muted">Cargando información de tu perfil...</p>
      </Container>
    );
  }

  if (!userInfo) {
    return (
      <Container className="text-center py-5">
        <p className="text-muted">No se pudo recuperar la información de la cuenta.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5 user-card-container">
      <Row className="w-130">
        <Col md={{ span: 10, offset: 1 }}>
          <div className="mb-4">
            <h2 className="user-section-title">Mi Perfil</h2>
            <p className="user-section-subtitle">Información de mi cuenta en Mundia.</p>
          </div>

          <Card className="user-profile-card">
            <Row className="g-0">
              <Col md={3} className="avatar-container">
                <div className="profile-avatar">
                  {userInfo.image_url ? (
                    <img 
                      src={userInfo.image_url} 
                      alt={`Avatar de ${userInfo.name}`} 
                      className="user-avatar-img"
                    />
                  ) : (
                    <User size={80} />
                  )}
                </div>
              </Col>

              <Col md={6} className="user-info-body">
                <div className="user-name">
                  {userInfo.name} {userInfo.last_name}
                </div>

                <div className="d-flex flex-column">
                  <div className="user-info-item">
                    <Mail size={18} className="user-info-icon" />
                    <div className="user-info-content">
                      <small className="user-info-label">Correo Electrónico</small>
                      <div className="user-info-value">{userInfo.email}</div>
                    </div>
                  </div>
                  <div className="user-info-item">
                    <Phone size={18} className="user-info-icon" />
                    <div className="user-info-content">
                      <small className="user-info-label">Teléfono</small>
                      <div className="user-info-value">{userInfo.phone_number || "No registrado"}</div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={3} className="user-actions-container">
                <button 
                  className="btn-user-action btn-user-action-edit"
                  onClick={handleOpenEdit}
                >
                  <Edit2 size={16} /> Editar Perfil
                </button>
                <button 
                  className="btn-user-action btn-user-action-logout"
                  onClick={handleUserLogOut}
                >
                  <LogOut size={16} /> Cerrar Sesión
                </button>

                <span 
                  className="delete-account-link"
                  onClick={() => setShowDeleteModal(true)}
                >
                  ¿Querés eliminar tu cuenta?
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Modal de edición de perfil */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mi Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveProfile}>
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="tel" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={handleChange} 
                placeholder="Ej: 1234567891234"
                required
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button 
                type="button"
                className="btn-modal-cancel" 
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="btn-modal-save" 
                disabled={isUpdating}
              >
                {isUpdating ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Si eliminás tu cuenta, se borrará toda tu información y las reservas que hayas hecho.
            Esta acción no se puede deshacer.
          </p>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button 
              className="btn-modal-cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleDeleteAccount}
            >
              Sí, eliminar cuenta
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-right" autoClose={2000}/>
    </Container>
  );
};

export default UserPage;