import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any = null; // Aquí se almacena el usuario logueado

  constructor(private router: Router) {
    this.cargarUsuario(); // Cargar usuario al iniciar el servicio
  }

  // Método para hacer login
  login(usuario: any) {
    const storedUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]'); // Aquí simulas obtener los usuarios de localStorage
    const foundUser = storedUsuario.find((user: any) => user.nombre === usuario.nombre && user.password === usuario.password);
  
    if (foundUser) {
      // Si el usuario existe y la contraseña es correcta
      localStorage.setItem('userRole', foundUser.rol); // Guarda el rol del usuario
      localStorage.setItem('usuario', JSON.stringify(foundUser)); // Guarda el objeto completo del usuario
      this.usuario = foundUser; // Actualiza el usuario en el servicio
      return true; // Login exitoso
    } else {
      return false; // Usuario o contraseña incorrectos
    }
  }
  

  // Cargar usuario desde localStorage
  private cargarUsuario() {
    try {
      const datos = localStorage.getItem('usuario');
      this.usuario = datos ? JSON.parse(datos) : null;
    } catch (error) {
      console.error('Error al cargar usuario desde localStorage', error);
      this.usuario = null;
    }
  }

  // Obtener el usuario logueado
  getUsuario() {
    return this.usuario;
  }

  // Obtener el rol del usuario
  getRol() {
    return this.usuario?.rol || 'invitado';
  }

  // Método para cerrar sesión
  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('userRole'); // Eliminar el rol también

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
