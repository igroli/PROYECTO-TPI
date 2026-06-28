import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTable.css";

const FIELDS = ["name", "last_name", "email", "phone_number", "id_roles"];
const ROLES = [{ id: 1, label: "Admin" }, { id: 2, label: "Agente" }, { id: 3, label: "Client" }];

const AdminUsers = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch("http://localhost:3000/users", { headers })
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setError("No se pudieron cargar los usuarios"))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (row) => {
    setEditing(row.id_users);
    setEditData({ ...row });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${editing}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ id_roles: editData.id_roles }),
      });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.map((r) => (r.id_users === editing ? { ...r, id_roles: editData.id_roles } : r)));
      cancelEdit();
    } catch {
      alert("Error al guardar los cambios");
    }
  };

  const deleteRow = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este usuario?")) return;
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE", headers });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id_users !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

  const rolLabel = (id) => ROLES.find((r) => r.id === id)?.label ?? id;

  if (loading) return <div className="at-state">Cargando...</div>;
  if (error)   return <div className="at-state at-state--error">{error}</div>;

  return (
    <div className="at-wrap">
      <div className="at-header">
        <button className="at-back" type="button" onClick={() => navigate(-1)}>← Volver</button>
        <div>
          <p className="at-eyebrow">Administración</p>
          <h1 className="at-title">Usuarios</h1>
        </div>
        <span className="at-count">{rows.length}</span>
      </div>

      <div className="at-table-wrap">
        <table className="at-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id_users} className={editing === row.id_users ? "at-row--editing" : ""}>
                <td className="at-id">{row.id_users}</td>
                {FIELDS.map((f) => (
                  <td key={f}>
                    {editing === row.id_users && f === "id_roles" ? (
                      <select
                        className="at-input"
                        value={editData.id_roles}
                        onChange={(e) => setEditData((prev) => ({ ...prev, id_roles: Number(e.target.value) }))}
                      >
                        {ROLES.map((r) => (
                          <option key={r.id} value={r.id}>{r.label}</option>
                        ))}
                      </select>
                    ) : (
                      <span>{f === "id_roles" ? rolLabel(row[f]) : row[f]}</span>
                    )}
                  </td>
                ))}
                <td className="at-actions">
                  {editing === row.id_users ? (
                    <>
                      <button className="at-btn at-btn--save" type="button" onClick={saveEdit}>Guardar</button>
                      <button className="at-btn at-btn--cancel" type="button" onClick={cancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="at-btn at-btn--edit" type="button" onClick={() => startEdit(row)}>Editar</button>
                      <button className="at-btn at-btn--delete" type="button" onClick={() => deleteRow(row.id_users)}>Eliminar</button>
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

export default AdminUsers;
