// src/environments/environment.prod.ts
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCJO7qGqqpU4h_l1bxPs6IQhzXmmd14c4I", // Reemplaza con tus credenciales de producción
    authDomain: "mpaa-prod.firebaseapp.com", // Cambia a tu dominio de producción
    projectId: "mpaa-prod", // Cambia a tu ID de proyecto de producción
    storageBucket: "mpaa-prod.appspot.com", // Cambia a tu bucket de producción
    messagingSenderId: "TU_SENDER_ID_PROD",
    appId: "TU_APP_ID_PROD",
    measurementId: "G-ANALYTICS_PROD"
  },
  // Otras variables de producción
  apiUrl: 'https://api.tudominio.com',
  debugMode: false
};