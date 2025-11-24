import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/" className="ms-3">
        🛍️Tienda MA - Proyecto final de programacion de componentes.
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">🏠 Inicio</Nav.Link>
          <Nav.Link as={Link} to="/agregar-producto">📦 Agregar Producto</Nav.Link>
          <Nav.Link as={Link} to="/login">🔐 Login</Nav.Link>
        </Nav>
        <Nav className="me-3">
          <Nav.Link as={Link} to="/">
            🛒 Carrito <Badge bg="success" className="ms-1">{cartCount}</Badge>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;