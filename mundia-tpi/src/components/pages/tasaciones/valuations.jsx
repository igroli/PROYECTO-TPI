import React, { useState } from "react";
import "./valuations.css";
import valuationsImage from "../../../assets/img/banner_tasaciones.png";

export default function Valuations() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    comments: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y privacidad");
      return;
    }
    console.log("Formulario enviado:", formData);
    // Aca iría la lógica para enviar el formulario al backend
  };

  return (
    <div className="valuations-container">
      <div className="valuations-wrapper">
        <div className="valuations-content">
          <h1 className="valuations-title">Vendé tu propiedad</h1>
          <p className="valuations-description">
            Completá el formulario y una oficina adherida a la red MUNDIA se pondrá en contacto con vos para continuar con el proceso.
          </p>

          <form className="valuations-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Nombre y apellido</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Ingrese nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Ingrese teléfono"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyType">Tipo de propiedad</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >

                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="location">Localidad/provincia</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Ingrese localidad o provincia"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="comments">Comentarios</label>
              <textarea
                id="comments"
                name="comments"
                placeholder="Escribí tu consulta aquí"
                value={formData.comments}
                onChange={handleChange}
                maxLength="250"
                rows="6"
              ></textarea>
              <small className="char-counter">
                {formData.comments.length}/250
              </small>
            </div>

            <div className="form-group checkbox-group full-width">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="acceptTerms">
                Mantenerme al tanto de promociones y/o descuentos
              </label>
            </div>

            <button type="submit" className="submit-btn full-width">
              ENVIAR FORMULARIO
            </button>
          </form>
        </div>

        <div className="valuations-image">
          <div className="image-placeholder">
            <img src={valuationsImage} alt="Propiedad" />
          </div>
        </div>
      </div>
    </div>
  );
}

