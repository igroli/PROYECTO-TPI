import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTable.css";

const FIELDS = ["name", "last_name", "activo"];

const AdminAgents = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
  const fetchAgents = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/agents", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRows(Array.isArray(data) ? data : data.agents ?? []);
    } catch {
      setError("No se pudieron cargar los agentes");
    } finally {
      setLoading(false);
    }
  };
  fetchAgents();
}, []);

const startEdit = (row) => {
  console.log(row);
  setEditing(row.Agent.id_agents);
  setEditData({ ...row, id_agents: row.Agent?.id_agents, activo: row.Agent?.activo });
};

  const cancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/agents/${editing}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ activo: editData.activo }),
      });
      if (!res.ok) throw new Error();
      setRows((prev) =>
        prev.map((r) =>
          r.Agent?.id_agents === editing ? { ...r, Agent: { ...r.Agent, activo: editData.activo } } : r,
        ),
      );
      cancelEdit();
    } catch {
      alert("Error al guardar los cambios");
    }
  };

  const deleteRow = async (id) => {
    const token = localStorage.getItem("token");
    console.log(id)
    if (!confirm("¿Seguro que querés eliminar este agente?")) return;
    try {
      const res = await fetch(`http://localhost:3000/agents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.Agent?.id_agents !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

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
          <h1 className="at-title">Agentes</h1>
        </div>
        <span className="at-count">{rows.length}</span>
        <button
          className="at-btn--add"
          type="button"
          onClick={() => navigate("/admin/agents/addAgents")}
        >
          + Añadir agente
        </button>
      </div>

      <div className="at-table-wrap">
        <table className="at-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.Agent?.id_agents}
                className={editing === row.Agent?.id_agents ? "at-row--editing" : ""}
              >
                {FIELDS.map((f) => (
                  <td key={f}>
                    {editing === row.Agent?.id_agents && f === "activo" ? (
                      <select
                        className="at-input"
                        value={editData.activo}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            activo: Number(e.target.value),
                          }))
                        }
                      >
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
                      </select>
                    ) : (
                      <span>
                        {f === "activo"
                          ? row.Agent?.activo
                            ? "Activo"
                            : "Inactivo"
                          : row[f]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="at-actions">
                  {editing === row.Agent?.id_agents ? (
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
                        onClick={() => deleteRow(row.Agent?.id_agents)}
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

export default AdminAgents;
