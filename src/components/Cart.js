import React from 'react';
import { Card, ListGroup, Button, Row, Col, Alert } from 'react-bootstrap';

//Funcion  para pesos chilenos
const formatPriceCLP = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(price);
};

function Cart({ cart, removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <Card className="mt-4 shadow">
        <Card.Body className="text-center py-5">
          <Card.Title className="text-muted">🛒 Carrito de Compras</Card.Title>
          <p className="text-muted mb-0">Tu carrito está vacío</p>
          <small className="text-muted">Agrega algunos productos para comenzar</small>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-4 shadow">
      <Card.Body>
        <Card.Title className="mb-4">🛒 Carrito de Compras</Card.Title>
        <ListGroup variant="flush">
          {cart.map(item => (
            <ListGroup.Item key={item.id} className="px-0">
              <Row className="align-items-center">
                <Col md={1} className="text-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                </Col>
                <Col md={4}>
                  <strong>{item.name}</strong>
                  <br />
                  <small className="text-muted">{formatPriceCLP(item.price)} c/u</small>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center justify-content-center">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-3 fw-bold">{item.quantity}</span>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col md={2} className="text-center">
                  <strong className="text-success">
                    {formatPriceCLP(item.price * item.quantity)}
                  </strong>
                </Col>
                <Col md={2} className="text-center">
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar del carrito"
                  >
                    🗑️
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="mt-4 p-3 bg-light rounded">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">Total: <span className="text-success">{formatPriceCLP(total)}</span></h5>
            </Col>
            <Col className="text-end">
              <Button variant="success" size="lg" className="px-4">
                ✅ Finalizar Compra
              </Button>
            </Col>
          </Row>
        </div>
        
        <Alert variant="info" className="mt-3">
          <small>💡 Puedes ajustar las cantidades usando los botones + y -</small>
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default Cart;