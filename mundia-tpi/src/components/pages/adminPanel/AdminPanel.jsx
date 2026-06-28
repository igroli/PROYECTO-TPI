import { useContext } from "react";
import { AuthenticationContext } from "../../auth/auth.context";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { user } = useContext(AuthenticationContext);
  const isAdmin = user?.rol === "Admin" || user?.rol === "admin";
  const sectionsClassName = isAdmin
    ? "admin-panel-sections admin-panel-sections--4"
    : "admin-panel-sections admin-panel-sections--2";

  return (
    <div className="admin-panel">
      <h1 className="admin-panel-title">Panel de administración</h1>
      <h2>
        Bienvenido/a {user?.rol || "usuario"} {user?.name || ""}
      </h2>

      <div className={sectionsClassName}>
        {isAdmin && (
          <>
          <section className="admin-panel-section">
            <h2 className="admin-panel-section-title">Usuarios</h2>
            <div className="admin-panel-buttons">
              <button className="admin-panel-btn1" type="button">
                Ver lista de usuarios
              </button>
              <button className="admin-panel-btn2" type="button">
                Agregar usuarios
              </button>
              <button className="admin-panel-btn3" type="button">
                Editar usuarios
              </button>
              <button className="admin-panel-btn4" type="button">
                Eliminar usuarios
              </button>
            </div>
          </section>
          <section className="admin-panel-section">
            <h2 className="admin-panel-section-title">Agentes</h2>
            <div className="admin-panel-buttons">
              <button className="admin-panel-btn1" type="button">
                Ver lista de agentes
              </button>
              <button className="admin-panel-btn2" type="button">
                Agregar agentes
              </button>
              <button className="admin-panel-btn3" type="button">
                Editar agentes
              </button>
              <button className="admin-panel-btn4" type="button">
                Eliminar agentes
              </button>
            </div>
          </section>
          </>
        )}

        <section className="admin-panel-section">
          <h2 className="admin-panel-section-title">Propiedades</h2>
          <div className="admin-panel-buttons">
            <button className="admin-panel-btn1" type="button">
              Ver lista de propiedades
            </button>
            <button className="admin-panel-btn2" type="button">
              Agregar propiedades
            </button>
            <button className="admin-panel-btn3" type="button">
              Editar propiedades
            </button>
            <button className="admin-panel-btn4" type="button">
              Eliminar propiedades
            </button>
          </div>
        </section>

        <section className="admin-panel-section">
          <h2 className="admin-panel-section-title">Reservas</h2>
          <div className="admin-panel-buttons">
            <button className="admin-panel-btn1" type="button">
              Ver lista de reservas
            </button>
            <button className="admin-panel-btn2" type="button">
              Agregar reservas
            </button>
            <button className="admin-panel-btn3" type="button">
              Editar reservas
            </button>
            <button className="admin-panel-btn4" type="button">
              Eliminar reservas
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
