import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import "./UserPage.css";
import { AuthenticationContext } from "../auth.context";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { handleUserLogOut, token } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        console.log("No hay token");
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
          console.log("Datos del usuario obtenidos!");
        } else {
          console.log("Error al obtener datos del usuario.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

    if(loading) {
        return (
          <Container className="text-center py-5">
            <p className="text-muted">Cargando información del usuario...</p>
          </Container>
        );
    }

    if(!userInfo) {
        return (
          <Container className="text-center py-5">
            <p className="text-muted">No se pudo cargar la información del usuario.</p>
          </Container>
        );
    }

  return (
    <Container className="py-5" style={{ minHeight: "80vh" }}>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold border-bottom pb-2">Mi Perfil</h2>
          <p className="text-muted">Información de mi cuenta en Mundia.</p>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="shadow-sm border-0 overflow-hidden h-100">
            <Row className="g-0">
              <Col md={3} className="bg-light d-flex align-items-center justify-content-center p-4">
                <div className="profile-avatar">
                  <User size={80} className="text-primary" />
                </div>
              </Col>

              <Col md={6} className="p-4">
                <Card.Title className="fw-bold mb-4">
                  {userInfo.name} {userInfo.last_name}
                </Card.Title>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center text-secondary">
                    <Mail size={18} className="me-3 text-primary" />
                    <div>
                      <small className="text-muted d-block">Correo Electrónico</small>
                      <span>{userInfo.email}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center text-secondary">
                    <Phone size={18} className="me-3 text-primary" />
                    <div>
                      <small className="text-muted d-block">Teléfono</small>
                      <span>{userInfo.phone_number}</span>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={3} className="d-flex flex-column justify-content-center p-4 border-start bg-light">
                <Button variant="outline-primary" className="mb-2 d-flex align-items-center justify-content-center gap-2">
                  <Edit2 size={16} /> Editar Perfil
                </Button>
                <Button variant="outline-danger" className="d-flex align-items-center justify-content-center gap-2" onClick={handleUserLogOut}>
                  <LogOut size={16} /> Cerrar Sesión
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
