import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTable.css";

const FIELDS = ["id_agents", "id_users", "activo"];

const AdminAgents = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch("http://localhost:3000/agents", { headers })
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setError("No se pudieron cargar los agentes"))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (row) => {
    setEditing(row.id_agents);
    setEditData({ ...row });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/agents/${editing}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ activo: editData.activo }),
      });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.map((r) => (r.id_agents === editing ? { ...r, activo: editData.activo } : r)));
      cancelEdit();
    } catch {
      alert("Error al guardar los cambios");
    }
  };

  const deleteRow = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este agente?")) return;
    try {
      const res = await fetch(`http://localhost:3000/agents/${id}`, { method: "DELETE", headers });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id_agents !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

  if (loading) return <div className="at-state">Cargando...</div>;
  if (error)   return <div className="at-state at-state--error">{error}</div>;

  return (
    <div className="at-wrap">
      <div className="at-header">
        <button className="at-back" type="button" onClick={() => navigate(-1)}>← Volver</button>
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
              <th>ID Agente</th>
              <th>ID Usuario</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id_agents} className={editing === row.id_agents ? "at-row--editing" : ""}>
                {FIELDS.map((f) => (
                  <td key={f}>
                    {editing === row.id_agents && f === "activo" ? (
                      <select
                        className="at-input"
                        value={editData.activo}
                        onChange={(e) => setEditData((prev) => ({ ...prev, activo: Number(e.target.value) }))}
                      >
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
                      </select>
                    ) : (
                      <span>
                        {f === "activo"
                          ? row[f] ? "Activo" : "Inactivo"
                          : row[f]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="at-actions">
                  {editing === row.id_agents ? (
                    <>
                      <button className="at-btn at-btn--save" type="button" onClick={saveEdit}>Guardar</button>
                      <button className="at-btn at-btn--cancel" type="button" onClick={cancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="at-btn at-btn--edit" type="button" onClick={() => startEdit(row)}>Editar</button>
                      <button className="at-btn at-btn--delete" type="button" onClick={() => deleteRow(row.id_agents)}>Eliminar</button>
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
