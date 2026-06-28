import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../auth/auth.context";
import "./AgentPendingReservations.css";

const STATE = "Pendiente de confirmación";

const AgentPendingReservations = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const agentId = user?.id_agents;

      try {
        const res = await fetch(
          `http://localhost:3000/reservationsFiltered?id_agents=${agentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (!res.ok) throw new Error("Error al cargar reservas");
        const data = await res.json();
        console.log(data);
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id_agents) fetchReservations();
  }, [user]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  if (loading) return <div className="apr-state">Cargando reservas...</div>;
  if (error) return <div className="apr-state apr-state--error">{error}</div>;

  return (
    <div className="apr-wrap">
      <div className="apr-header">
        <button className="apr-back" type="button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div>
          <p className="apr-eyebrow">Gestión de reservas</p>
          <h1 className="apr-title">Pendientes</h1>
        </div>
        <span className="apr-count">{reservations.length}</span>
      </div>

      {reservations.length === 0 ? (
        <div className="apr-empty">
          <p>No hay reservas pendientes. ¡Todo al día!</p>
        </div>
      ) : (
        <div className="apr-list">
          {reservations.map((r) => (
            <div key={r.id_reservations} className="apr-row">
              <div className="apr-row-id">#{r.id_reservations}</div>
              <div className="apr-row-info">
                <span className="apr-row-date">
                  {formatDate(r.reservation_date)}
                </span>
                <span className="apr-row-prop">
                  Propiedad #{r.id_properties}
                </span>
              </div>
              <div className="apr-row-user">Usuario #{r.id_users}</div>
              <span className="apr-badge">{r.state}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentPendingReservations;
