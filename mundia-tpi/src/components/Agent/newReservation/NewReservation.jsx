import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../auth/auth.context";
import "./NewReservation.css";

const NewReservation = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    reservation_date: "",
    id_properties: "",
    id_users: "",
    id_agents: user?.id_agents || "",
    state: "Pendiente de confirmación",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      const agentId = user?.id_agents;

      try {
        const res = await fetch(`http://localhost:3000/propiedades?id_agents=${agentId}`);
        if (!res.ok) throw new Error("Error al cargar propiedades");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingProps(false);
      }
    };

    if (user?.id_agents) fetchProperties();
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/createreservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id_agents: user?.id_agents,
        }),
      });
      if (!res.ok) throw new Error("No se pudo crear la reserva");
      setSuccess(true);
      setForm({ reservation_date: "", id_properties: "", id_users: "", id_agents: user?.id_agents || "", state: "Pendiente de confirmación" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="nr-wrap">
        <div className="nr-success">
          <div className="nr-success-icon">✓</div>
          <h2>Reserva creada</h2>
          <p>La reserva quedó registrada como <strong>Pendiente de confirmación</strong>.</p>
          <div className="nr-success-actions">
            <button type="button" onClick={() => navigate("/admin/reservations")}>
              Ver pendientes
            </button>
            <button type="button" className="nr-btn-secondary" onClick={() => { setSuccess(false); setForm({ reservation_date: "", id_properties: "", id_users: user?.id || "", id_agents: user?.id_agents || "", state: "Pendiente de confirmación" }); }}>
              Nueva reserva
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nr-wrap">
      <div className="nr-header">
        <button className="nr-back" type="button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div>
          <p className="nr-eyebrow">Reservas</p>
          <h1 className="nr-title">Nueva reserva</h1>
        </div>
      </div>

      <form className="nr-form" onSubmit={handleSubmit}>
        <div className="nr-field">
          <label className="nr-label" htmlFor="id_properties">Propiedad</label>
          {loadingProps ? (
            <p className="nr-loading">Cargando propiedades...</p>
          ) : (
            <select
              id="id_properties"
              name="id_properties"
              className="nr-select"
              value={form.id_properties}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná una propiedad</option>
              {properties.map((p) => (
                <option key={p.id_properties} value={p.id_properties}>
                  {p.title} — {p.address}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="nr-field">
          <label className="nr-label" htmlFor="reservation_date">Fecha de reserva</label>
          <input
            id="reservation_date"
            name="reservation_date"
            type="datetime-local"
            className="nr-input"
            value={form.reservation_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="nr-field">
          <label className="nr-label" htmlFor="id_users">ID del usuario</label>
          <input
            id="id_users"
            name="id_users"
            type="number"
            className="nr-input"
            placeholder="Ej: 42"
            value={form.id_users}
            onChange={handleChange}
            required
          />
          <span className="nr-hint">Ingresá el ID del usuario que solicita la reserva</span>
        </div>

        <div className="nr-field">
          <label className="nr-label">Estado inicial</label>
          <div className="nr-state-badge">Pendiente de confirmación</div>
        </div>

        {error && <p className="nr-error">{error}</p>}

        <button className="nr-submit" type="submit" disabled={submitting}>
          {submitting ? "Creando..." : "Crear reserva"}
        </button>
      </form>
    </div>
  );
};

export default NewReservation;
