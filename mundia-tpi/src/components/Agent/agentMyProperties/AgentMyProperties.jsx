import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../auth/auth.context";
import "./AgentMyProperties.css";

const AgentMyProperties = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      }
    };

    if (user?.id_agents) fetchProperties();
  }, [user]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);

  if (loading) return <div className="amp-state">Cargando propiedades...</div>;
  if (error)   return <div className="amp-state amp-state--error">{error}</div>;

  return (
    <div className="amp-wrap">
      <div className="amp-header">
        <button className="amp-back" type="button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div>
          <p className="amp-eyebrow">Mis propiedades</p>
          <h1 className="amp-title">Propiedades asignadas</h1>
        </div>
        <span className="amp-count">{properties.length}</span>
      </div>

      {properties.length === 0 ? (
        <div className="amp-empty">
          <p>No tenés propiedades asignadas aún.</p>
        </div>
      ) : (
        <div className="amp-grid">
          {properties.map((p) => (
            <div key={p.id_properties} className="amp-card">
              {p.image_url && (
                <img src={p.image_url} alt={p.title} className="amp-card-img" />
              )}
              <div className="amp-card-body">
                <div className="amp-card-top">
                  <span className={`amp-badge amp-badge--${p.state_property === "Disponible" ? "ok" : "off"}`}>
                    {p.state_property}
                  </span>
                  <span className="amp-type">{p.type_property} · {p.type_transactions}</span>
                </div>
                <h2 className="amp-card-title">{p.title}</h2>
                <p className="amp-address">{p.address}</p>
                <div className="amp-specs">
                  <span>🛏 {p.rooms} hab.</span>
                  <span>🚿 {p.bathroom} baños</span>
                  <span>📐 {p.square_mts} m²</span>
                  {p.pet_friendly && <span>🐾 Pet friendly</span>}
                </div>
                <p className="amp-price">{formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentMyProperties;
