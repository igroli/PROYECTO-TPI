import { useContext } from "react";
import { AuthenticationContext } from "../../auth/auth.context";
import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const isAdmin = user?.rol === "Admin";
  const sectionsClassName = isAdmin
    ? "admin-panel-sections admin-panel-sections--4"
    : "admin-panel-sections admin-panel-sections--2";

  const quickLinks = [
    {
      label: "Nueva reserva",
      icon: "ti-calendar-plus",
      path: "/admin/reservations/new",
    },
    {
      label: "Reservas pendientes",
      icon: "ti-clock",
      path: "/admin/reservations?state=Pendiente de confirmación",
    },
    {
      label: "Mis propiedades asignadas",
      icon: "ti-file-description",
      path: "/admin/myproperties",
    },
  ];
  return (
    <div className="admin-panel">
      <h1 className="admin-panel-title">Panel de administración</h1>
      <h2>
        Bienvenido/a {user?.rol || "usuario"} {user?.name || ""}
      </h2>
      <h3>Haga click en la tabla que desee modificar:</h3>
      <div className={sectionsClassName}>
        {isAdmin && (
          <>
            <section className="admin-panel-section">
              <div className="admin-panel-buttons">
                <button
                  className="admin-panel-btn1"
                  type="button"
                  onClick={() => navigate("/admin/users")}
                >
                  Usuarios
                </button>
              </div>
            </section>
            <section className="admin-panel-section">
              <div className="admin-panel-buttons">
                <button
                  className="admin-panel-btn2"
                  type="button"
                  onClick={() => navigate("/admin/agents")}
                >
                  Agentes
                </button>
              </div>
            </section>
          </>
        )}

        <section className="admin-panel-section">
          <div className="admin-panel-buttons">
            <button
              className="admin-panel-btn3"
              type="button"
              onClick={() => navigate("/admin/properties")}
            >
              Propiedades
            </button>
          </div>
        </section>
        <section className="admin-panel-section">
          <div className="admin-panel-buttons">
            <button
              className="admin-panel-btn4"
              type="button"
              onClick={() => navigate("/admin/reservationslist")}
            >
              Reservas
            </button>
          </div>
        </section>
        {!isAdmin && (
          <section className="admin-panel-quicklinks">
            <p className="quicklinks-title">Accesos rápidos</p>
            {quickLinks.map((link, i) => (
              <>
                {i > 0 && <hr className="quicklinks-divider" />}
                <button
                  key={link.path}
                  className="quicklinks-btn"
                  type="button"
                  onClick={() => navigate(link.path)}
                >
                  <i className={`ti ${link.icon}`} aria-hidden="true" />
                  <span>{link.label}</span>
                  <i className="ti ti-chevron-right" aria-hidden="true" />
                </button>
              </>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
