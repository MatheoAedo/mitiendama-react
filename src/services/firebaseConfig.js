import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBIgw_DPiigB-zRLgCYzzzMyEVVO92Kpwo",
  authDomain: "tienda-maedo-progcom.firebaseapp.com",
  projectId: "tienda-maedo-progcom",
  storageBucket: "tienda-maedo-progcom.firebasestorage.app",
  messagingSenderId: "64496614512",
  appId: "1:64496614512:web:6c6eb58107d05fab5ac8b5"
};

//  INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);

//  INICIALIZAR SERVICIOS
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

//  EXPORTAR LA APP
export default app;