import React, { useState } from 'react';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';

function ProductItem({ product, addToCart, formatPriceCLP }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Imagen por defecto si hay error
  const defaultImage = "https://preview.redd.it/technical-difficulties-please-stand-by-v0-x9p62nw4ym4f1.jpg?width=640&crop=smart&auto=webp&s=90de3431fc49f0619764081a75f54e57d229e8fa";

  return (
    <Card className="h-100 shadow-sm product-card">
      <div className="position-relative">
        {imageLoading && (
          <div 
            className="d-flex justify-content-center align-items-center"
            style={{ 
              height: '200px', 
              backgroundColor: '#f8f9fa' 
            }}
          >
            <Spinner animation="border" variant="secondary" size="sm" />
          </div>
        )}
        <Card.Img 
          variant="top" 
          src={imageError ? defaultImage : product.image}
          style={{ 
            height: '200px', 
            objectFit: 'cover',
            backgroundColor: '#f8f9fa',
            display: imageLoading ? 'none' : 'block'
          }}
          alt={product.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">{product.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1 small">
          {product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Badge bg="success" className="fs-6 px-3 py-2">
            {formatPriceCLP(product.price)}
          </Badge>
          <Button 
            variant="primary" 
            onClick={handleAddToCart}
            className="px-3"
            size="sm"
          >
            🛒 Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;