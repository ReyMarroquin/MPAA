import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  rolUsuario: string = 'invitado';
  
  // Definimos las páginas del menú
  paginas = [
    { titulo: 'Inicio', url: '/dashboard', icono: 'home' },
    { titulo: 'Sensores', url: '/sensores', icono: 'pulse' },
    { titulo: 'Administrar luces', url: '/control-luces', icono: 'bulb', soloAdmin: true },
    { titulo: 'Configuración', url: '/configuracion', icono: 'settings' },
    { titulo: 'Perfil', url: '/perfil', icono: 'settings' },
    { titulo: 'Cerrar Sesion', url: '/login', icono: 'settings' }
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.rolUsuario = this.authService.getRol(); // Obtener el rol del usuario
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir al login
  }

  ngOnInit() {
  }
}