import React, { useState } from 'react';
import { Card, Form, Button, Alert, Tabs, Tab, ProgressBar } from 'react-bootstrap';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../services/firebaseConfig';

function Auth({ setUser }) {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [user, setLocalUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      setLocalUser(userCredential.user);
      setUser(userCredential.user);
      setMessage('✅ Registro exitoso! Bienvenido/a');
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      setLocalUser(userCredential.user);
      setUser(userCredential.user);
      setMessage('✅ Login exitoso! Bienvenido/a de vuelta');
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLocalUser(null);
      setUser(null);
      setMessage('✅ Sesión cerrada exitosamente');
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('❌ Selecciona un archivo primero');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      
      // Simular progreso de subida
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Subir archivo
      await uploadBytes(storageRef, file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Obtener URL de descarga
      const downloadURL = await getDownloadURL(storageRef);
      setMessage(`✅ Archivo subido exitosamente! 
        \n📁 Nombre: ${file.name}
        \n🔗 URL: ${downloadURL}`);
      
      // Resetear después de 3 segundos
      setTimeout(() => {
        setUploadProgress(0);
        setFile(null);
        setUploading(false);
      }, 3000);
    } catch (error) {
      setMessage(`❌ Error al subir archivo: ${error.message}`);
      setUploading(false);
    }
  };

  // Si el usuario está logueado
  if (user) {
    return (
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            👋 Bienvenido, {user.email}
          </Card.Title>
          
          {message && (
            <Alert variant={message.includes('✅') ? 'success' : 'danger'}>
              {message.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </Alert>
          )}

          <div className="mb-4">
            <Form.Label>
              <strong>📤 Subir Archivo a Firebase Storage</strong>
            </Form.Label>
            <Form.Control 
              type="file" 
              onChange={handleFileChange}
              disabled={uploading}
            />
            <Form.Text className="text-muted">
              Puedes subir imágenes, documentos, etc.
            </Form.Text>
          </div>

          {file && (
            <div className="mb-4">
              <Alert variant="info">
                <strong>Archivo seleccionado:</strong> {file.name}
                <br />
                <strong>Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB
                <br />
                <strong>Tipo:</strong> {file.type || 'Desconocido'}
              </Alert>
              
              {uploadProgress > 0 && (
                <div className="mb-3">
                  <ProgressBar 
                    now={uploadProgress} 
                    label={`${uploadProgress}%`}
                    variant="success"
                    animated
                  />
                </div>
              )}
              
              <Button 
                onClick={handleUpload} 
                variant="success"
                disabled={uploading}
                className="w-100"
              >
                {uploading ? '⏳ Subiendo...' : '🚀 Subir Archivo'}
              </Button>
            </div>
          )}

          <Button 
            onClick={handleLogout} 
            variant="outline-danger"
            className="w-100 mt-3"
          >
            🚪 Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    );
  }

  // Formularios de login/registro
  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="text-center mb-4">🔐 Autenticación</Card.Title>
        
        {message && (
          <Alert variant={message.includes('✅') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}

        <Tabs 
          activeKey={activeTab} 
          onSelect={setActiveTab} 
          className="mb-3"
          justify
        >
          <Tab eventKey="login" title="🔑 Iniciar Sesión">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>📧 Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>🔒 Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 py-2">
                🚀 Iniciar Sesión
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="register" title="📝 Registrarse">
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>📧 Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>🔒 Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>✅ Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100 py-2">
                📝 Crear Cuenta
              </Button>
            </Form>
          </Tab>
        </Tabs>
        
        <Alert variant="info" className="mt-3">
          <small>
            💡 <strong>Nota:</strong> Para probar la autenticación, necesitas configurar 
            Firebase Authentication en la consola de Firebase.
          </small>
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default Auth;