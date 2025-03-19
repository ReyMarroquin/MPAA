import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any = null; // Aquí se almacena el usuario logueado

  constructor() {
    this.cargarUsuario(); // Cargar usuario al iniciar el servicio
  }

  // Método para hacer login
  login(username: string, password: string): boolean {
    const usuarios = [
      { username: 'admin', password: '1234', nombre: 'Administrador', rol: 'admin' },
      { username: 'user', password: '1234', nombre: 'Usuario Normal', rol: 'usuario' }
    ];

    const usuario = usuarios.find(u => u.username === username && u.password === password);

    if (usuario) {
      this.usuario = { nombre: usuario.nombre, rol: usuario.rol };
      localStorage.setItem('usuario', JSON.stringify(this.usuario)); // Guardar en localStorage
      return true;
    }

    return false; // Credenciales incorrectas
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
  }
}