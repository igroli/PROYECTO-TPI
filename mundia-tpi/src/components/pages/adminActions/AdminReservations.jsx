import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTable.css";

const FIELDS = [
  "reservation_date",
  "state",
  "id_properties",
  "id_users",
  "id_agents",
];

const AdminReservations = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const EDITABLE = ["reservation_date", "state"];
  const STATES = [
    "Pendiente de confirmación",
    "Confirmada",
    "Cancelada",
    "Finalizada",
  ];


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/reservations/all", { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'} })
      .then(res => {
        if(!res.ok) {
          throw new Error(`Error del servidor: ${res.status}`);
        }
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) {
          setRows(data);
        } else {
          console.error("La API no devolvió un array:", data);
        }
      })
      .catch(err => {
        console.error("Error cargando reservaciones:", err)
      })
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (row) => {
    setEditing(row.id_reservations);
    setEditData({ ...row });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/reservations/${editing}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error();
      setRows((prev) =>
        prev.map((r) =>
          r.id_reservations === editing ? { ...r, ...editData } : r,
        ),
      );
      cancelEdit();
    } catch {
      alert("Error al guardar los cambios");
    }
  };

  const deleteRow = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("¿Seguro que querés eliminar esta reserva?")) return;
    try {
      const res = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id_reservations !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("es-AR") : "-");

  if (loading) return <div className="at-state">Cargando...</div>;
  if (error) return <div className="at-state at-state--error">{error}</div>;

  return (
    <div className="at-wrap">
      <div className="at-header">
        <button className="at-back" type="button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div>
          <p className="at-eyebrow">Administración</p>
          <h1 className="at-title">Reservas</h1>
        </div>
        <span className="at-count">{rows.length}</span>
        <button
          className="at-btn--add"
          type="button"
          onClick={() => navigate("/admin/reservations/new")}
        >
          + Añadir reserva
        </button>
      </div>

      <div className="at-table-wrap">
        <table className="at-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Propiedad</th>
              <th>Usuario</th>
              <th>Agente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr
                key={row.id_reservations}
                className={
                  editing === row.id_reservations ? "at-row--editing" : ""
                }
              >
                <td className="at-id">{row.id_reservations}</td>
                {FIELDS.map((f) => (
                  <td key={f}>
                    {editing === row.id_reservations && EDITABLE.includes(f) ? (
                      f === "state" ? (
                        <select
                          className="at-input"
                          value={editData.state}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                        >
                          {STATES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="at-input"
                          type="datetime-local"
                          value={editData.reservation_date?.slice(0, 16) ?? ""}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              reservation_date: e.target.value,
                            }))
                          }
                        />
                      )
                    ) : (
                      <span>
                        {f === "reservation_date" ? formatDate(row[f]) : row[f]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="at-actions">
                  {editing === row.id_reservations ? (
                    <>
                      <button
                        className="at-btn at-btn--save"
                        type="button"
                        onClick={saveEdit}
                      >
                        Guardar
                      </button>
                      <button
                        className="at-btn at-btn--cancel"
                        type="button"
                        onClick={cancelEdit}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="at-btn at-btn--edit"
                        type="button"
                        onClick={() => startEdit(row)}
                      >
                        Editar
                      </button>
                      <button
                        className="at-btn at-btn--delete"
                        type="button"
                        onClick={() => deleteRow(row.id_reservations)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReservations;
