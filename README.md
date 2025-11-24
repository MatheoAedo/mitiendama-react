# 🛍️ Mi Tienda MA

**Proyecto desarrollado por: Matheo Aedo**
**Asignatura: Programación de Componentes**

Aplicación web de e-commerce desarrollada con React, Firebase y Bootstrap como proyecto final de la asignatura.

##  Características Implementadas

###  Ejercicio 1: Componentes y Comunicación
- Lista de productos con componentes padre-hijo
- Carrito de compras con estado dinámico
- Comunicación entre componentes con props y callbacks
- Actualización de estado con useState y this.setState

###  Ejercicio 2: Formularios y Firebase
- Formularios con validaciones en tiempo real (react-simple-validator)
- Integración completa con Firebase Firestore
- Almacenamiento y recuperación de datos en cloud
- Manejo de errores y estados de carga

###  Ejercicio 3: Styling y Mobile
- Estilizado completo con Bootstrap y React-Bootstrap
- Firebase Authentication (registro y login)
- Firebase Storage (subida de archivos)
- Exportación a APK con Cordova
- APK firmado: `mitiendama-release.apk`

##  Stack Tecnológico

- **Frontend:** React 18, React Router DOM, Bootstrap 5
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Validación:** Simple React Validator
- **Mobile:** Cordova para APK
- **Deploy:** Netlify (web) + APK (mobile)
- **Control de Versiones:** Git + GitHub

##  Instalación y Desarrollo

### Prerrequisitos
- Node.js 16+ 
- npm

### Ejecutar Localmente
```bash
# Clonar repositorio
git clone https://github.com/MatheoAedo/mitiendama-react
cd mitiendama-react

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Build para producción
npm run build


## 📦 Enlaces de Entrega

### 🌐 Aplicación Web
**URL:** https://mitiendama.netlify.app

### 📱 Aplicación Móvil (APK)
**Descargar:** https://github.com/MatheoAedo/mitiendama-react/releases/download/v1.0.0/mitiendama-release.apk

### 💻 Código Fuente
**Repositorio:** https://github.com/MatheoAedo/mitiendama-react

### 📋 Instrucciones de Instalación
1. **Descargar** el APK desde el enlace anterior
2. **Habilitar** "Orígenes desconocidos" en Android
3. **Instalar** el archivo .apk
4. **Ejecutar** la aplicación