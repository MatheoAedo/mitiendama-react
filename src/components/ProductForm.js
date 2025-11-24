import React, { useState } from 'react';
import { Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validator = new SimpleReactValidator({
    validators: {
      price: {
        message: 'El precio debe ser un número válido mayor a 1000',
        rule: (val) => /^\d+$/.test(val) && parseInt(val) >= 1000
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validator.allValid()) {
      validator.showMessages();
      setMessage('❌ Por favor corrige los errores del formulario');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        image: formData.image || 'https://via.placeholder.com/300x200/6c757d/ffffff?text=Producto',
        createdAt: new Date()
      });

      setMessage('✅ Producto agregado exitosamente!');
      setFormData({
        name: '',
        description: '',
        price: '',
        image: ''
      });
      validator.hideMessages();
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('❌ Error al agregar el producto. Verifica la configuración de Firebase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="text-center mb-4">📦 Agregar Nuevo Producto</Card.Title>
        
        {message && (
          <Alert variant={message.includes('✅') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Nombre del Producto *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Laptop Gamer, Smartphone, etc."
              isInvalid={validator.message('nombre', formData.name, 'required|alpha_num_dash_space')}
            />
            <Form.Control.Feedback type="invalid">
              {validator.message('nombre', formData.name, 'required|alpha_num_dash_space')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Descripción *</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe las características del producto..."
              isInvalid={validator.message('descripción', formData.description, 'required')}
            />
            <Form.Control.Feedback type="invalid">
              {validator.message('descripción', formData.description, 'required')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Precio *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              step="1000"
              min="1000"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="99990"
              isInvalid={validator.message('precio', formData.price, 'required|price')}
            />
            <Form.Text className="text-muted">
              Ingresa el precio en pesos chilenos (CLP) - Ej: 99990 para $99.990
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {validator.message('precio', formData.price, 'required|price')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              <strong>URL de la Imagen</strong>
            </Form.Label>
            <Form.Control
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              isInvalid={validator.message('imagen', formData.image, 'url')}
            />
            <Form.Text className="text-muted">
              Opcional. Si no proporcionas una URL, se usará una imagen por defecto.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {validator.message('imagen', formData.image, 'url')}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            className="w-100 py-2"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Agregando Producto...
              </>
            ) : (
              '✅ Agregar Producto'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProductForm;