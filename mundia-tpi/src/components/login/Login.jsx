import React from 'react'
import NavBar from "../navBar/NavBar";
import { Button, Form } from 'react-bootstrap';

export const Login = () => {
  return (
    <div>
        <NavBar />
        <Form>
            <Form.Group>
                <Form.Label>
                    email
                </Form.Label>
                <Form.Control type='email' placeholder='Ingrese Mail'/>

            </Form.Group>
            <Form.Group>
                <Form.Label>
                    password
                </Form.Label>
                <Form.Control type='password' placeholder='Ingrese Contraseña'/>
            </Form.Group>
            <Button>
                Iniciar Sesion
            </Button>
        </Form>
    </div>
  )
}
