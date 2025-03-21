import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any = null; // Aquí se almacena el usuario logueado
  private loginError: string = '';

  constructor() {
    this.cargarUsuario(); // Cargar usuario al iniciar el servicio
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return !!this.usuario;
  }

  // Método para realizar el login
  login(username: string, password: string): boolean {
    const usuarios = [
      { username: 'admin', password: '1234', nombre: 'Administrador', correo: 'admin@dominio.com', rol: 'admin' },
      { username: 'user', password: '1234', nombre: 'Usuario Normal', correo: 'user@dominio.com', rol: 'usuario' }
    ];

    const usuario = usuarios.find(u => u.username === username);

    if (!usuario) {
      this.loginError = 'Usuario no encontrado';
      return false;
    }

    if (usuario.password !== password) {
      this.loginError = 'Contraseña incorrecta';
      return false;
    }

    this.usuario = { nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    return true;
  }

  // Método para obtener la redirección por defecto según el rol
  getDefaultRedirectForRole(rol: string): string {
    switch (rol) {
      case 'admin':
        return '/control-luces';
      case 'usuario':
        return '/dashboard';
      default:
        return '/home';
    }
  }

  // Método para cargar usuario desde localStorage
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
  getRol(): string {
    return this.usuario?.rol || 'invitado';
  }

  // Método para cerrar sesión
  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }

  // Método para actualizar los datos del usuario
  actualizarUsuario(updatedUserData: any) {
    this.usuario = { ...this.usuario, ...updatedUserData };
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
}
