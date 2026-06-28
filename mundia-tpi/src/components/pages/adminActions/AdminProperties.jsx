import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTable.css";

const FIELDS = [
  "title",
  "type_property",
  "type_transactions",
  "price",
  "address",
  "state_property",
];

const AdminProperties = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null); // id being edited
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
  const fetchProperties = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/propiedades", {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRows(Array.isArray(data) ? data : data.properties ?? []);
    } catch {
      setError("No se pudieron cargar las propiedades");
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, []);

  const startEdit = (row) => {
    setEditing(row.id_properties);
    setEditData({ ...row });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://localhost:3000/houses/${editing}`, {
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
          r.id_properties === editing ? { ...r, ...editData } : r,
        ),
      );
      cancelEdit();
    } catch {
      alert("Error al guardar los cambios");
    }
  };

  const deleteRow = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("¿Seguro que querés eliminar esta propiedad?")) return;
    try {
      const res = await fetch(`http://localhost:3000/houses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id_properties !== id));
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
          <h1 className="at-title">Propiedades</h1>
        </div>
        <span className="at-count">{rows.length}</span>
        <button
          className="at-btn--add"
          type="button"
          onClick={() => navigate("/admin/properties/addProperty")}
        >
          + Añadir propiedad
        </button>
      </div>

      <div className="at-table-wrap">
        <table className="at-table">
          <thead>
            <tr>
              <th>#</th>
              {FIELDS.map((f) => (
                <th key={f}>{f}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id_properties}
                className={
                  editing === row.id_properties ? "at-row--editing" : ""
                }
              >
                <td className="at-id">{row.id_properties}</td>
                {FIELDS.map((f) => (
                  <td key={f}>
                    {editing === row.id_properties ? (
                      <input
                        className="at-input"
                        value={editData[f] ?? ""}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            [f]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{row[f]}</span>
                    )}
                  </td>
                ))}
                <td className="at-actions">
                  {editing === row.id_properties ? (
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
                        onClick={() => deleteRow(row.id_properties)}
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

export default AdminProperties;
