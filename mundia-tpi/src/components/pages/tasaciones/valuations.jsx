import React, { useState } from "react";
import "./valuations.css";
import valuationsImage from "../../../assets/img/banner_tasaciones.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const onlyNums = /^\d+$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();
    const cleanFullName = formData.fullName.trim();

    if (
      !cleanEmail ||
      !cleanFullName ||
      !formData.location ||
      !formData.propertyType ||
      !formData.comments ||
      !cleanPhone
    ) {
      toast.error("Por favor, completá todos los campos obligatorios.");
      return;
    }

    
    if (!emailRegex.test(cleanEmail)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return;
    }


    const namesArray = cleanFullName.split(/\s+/);
    const allNamesValid = namesArray.every(name => nameRegex.test(name));

    if (namesArray.length < 2) {
      toast.error("Por favor, ingrese su nombre y apellido completo.");
      return;
    }

    if (!allNamesValid) {
      toast.error("Cada nombre y apellido debe contener solo letras y un mínimo de 2 caracteres.");
      return;
    }


    if (cleanPhone.length !== 12) {
      toast.error("El número de teléfono debe tener 12 caracteres.");
      return;
    }

    if (!onlyNums.test(cleanPhone)) {
      toast.error("Teléfono: solo números del 0 al 9.");
      return;
    }

    
    if (!formData.acceptTerms) {
      toast.error("Debés aceptar los términos y condiciones para continuar.");
      return;
    }

    toast.success("¡Formulario enviado! Un asesor se pondrá en contacto contigo a la brevedad.");

    console.log("Formulario enviado:", formData);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      propertyType: "",
      comments: "",
      acceptTerms: false,
    });
  };

  return (
    <div className="valuations-container">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <div className="valuations-wrapper">
        <div className="valuations-content">
          <h1 className="valuations-title">Vendé tu propiedad</h1>
          <p className="valuations-description">
            Completá el formulario y una oficina adherida a la red MUNDIA se pondrá en contacto con vos para continuar con el proceso.
          </p>

          <form className="valuations-form" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese email"
                value={formData.email}
                onChange={handleChange}
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
              >
                <option value="">Seleccione una opción</option>
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
                Acepto los términos y condiciones para continuar con el envío del formulario.
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
