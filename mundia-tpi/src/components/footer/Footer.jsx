import ContactForm from '../contactForm/ContactForm'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-4">
                    <h5>Contacto</h5>
                    <p>Email: info@mundia.com</p>
                    <p>Teléfono: +54 11 1234-5678</p>
                    <p>Dirección: Calle Principal 123</p>
                </div>
                <div className="col-md-4">
                    <h5>Enlaces Útiles</h5>
                    <ul>
                        <li><a href="#propiedades">Propiedades</a></li>
                        <li><a href="#nosotros">Nosotros</a></li>
                        <li><a href="#tasaciones">Tasaciones</a></li>
                        <li><a href="#blog">Blog</a></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>Síguenos</h5>
                    <div className="social-links">
                        <a href="#facebook" title="Facebook">f</a>
                        <a href="#instagram" title="Instagram">i</a>
                        <a href="#twitter" title="Twitter">t</a>
                        <a href="#linkedin" title="LinkedIn">in</a>
                    </div>
                </div>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-bottom">
                <p>&copy; 2024 Mundia Propiedades. Todos los derechos reservados.</p>
                <p>Diseñado con ❤️ para encontrar tu hogar ideal.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer