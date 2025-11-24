import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function FirebaseTest() {
  useEffect(() => {
    testFirebase();
  }, []);

  const testFirebase = async () => {
    try {
      console.log('🔌 Probando conexión Firebase...');
      const querySnapshot = await getDocs(collection(db, 'test'));
      console.log('✅ Firebase conectado correctamente');
    } catch (error) {
      console.error('❌ Error Firebase:', error.message);
    }
  };

  return (
    <Alert variant="warning" className="mt-3">
      <strong>Estado Firebase:</strong> Verificando conexión...
      <br />
      <small>Revisa la consola del navegador (F12) para detalles</small>
    </Alert>
  );
}

export default FirebaseTest;