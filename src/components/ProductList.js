import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ProductItem from './ProductItem';

const formatPriceCLP = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(price);
};

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mueve sampleProducts a useMemo para estabilizar la referencia
  const sampleProducts = useMemo(() => [
    {
      id: 1,
      name: "Laptop Gamer Pro",
      description: "Laptop potente para gaming y trabajo con procesador i7",
      price: 899990,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Smartphone Android",
      description: "Teléfono inteligente con cámara de 48MP y 128GB almacenamiento",
      price: 299990,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Auriculares Bluetooth",
      description: "Sonido surround de alta calidad sin cables, batería 30h",
      price: 79990,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Tablet Digital",
      description: "Tablet perfecta para trabajo y entretenimiento, pantalla 10.1”",
      price: 199990,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Smart Watch",
      description: "Reloj inteligente con monitor de salud y notificaciones",
      price: 149990,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Cámara Digital",
      description: "Cámara profesional 24MP con lente intercambiable",
      price: 599990,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
    }
  ], []); // El array vacío asegura que solo se cree una vez

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Primero intentamos cargar desde Firebase
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (productsData.length > 0) {
          setProducts(productsData);
        } else {
          // Si no hay datos en Firebase, usamos los de ejemplo
          setProducts(sampleProducts);
          setError('ℹ️ Usando datos de ejemplo - Configura Firebase para datos reales');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Si hay error con Firebase, usamos datos de ejemplo
        setProducts(sampleProducts);
        setError('ℹ️ Conectando con Firebase...');
      } finally {
        setLoading(false);
      }
    };

    // Simular carga rápida
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, [sampleProducts]); // ✅ Agregar sampleProducts como dependencia

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-center text-primary">🛍️ Productos</h2>
      
      {error && (
        <Alert variant="warning" className="text-center">
          {error}
        </Alert>
      )}

      <Row>
        {products.map(product => (
          <Col key={product.id} lg={4} md={6} className="mb-4">
            <ProductItem product={product} addToCart={addToCart} formatPriceCLP={formatPriceCLP} />
          </Col>
        ))}
      </Row>
      
      {products.length === 0 && (
        <Alert variant="info" className="text-center">
          No hay productos disponibles. Agrega algunos productos primero.
        </Alert>
      )}
    </div>
  );
}

export default ProductList;