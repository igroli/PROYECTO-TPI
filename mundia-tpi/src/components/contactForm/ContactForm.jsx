import { Form, Row, Col, Button } from 'react-bootstrap';
import './ContactForm.css';
import '../../index.css';

const ContactForm = () => {
  return (
    <div className="contact-form-container">
        <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingrese email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Nombre y apellido</Form.Label>
          <Form.Control type="text" placeholder="Ingrese nombre completo" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type='text' placeholder='Ingrese teléfono'/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Ingrese su consulta</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Mantenerme al tanto de promociones y/o descuentos" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar formulario
      </Button>
    </Form>
    </div>
  )
}

export default ContactForm