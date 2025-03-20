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
    { titulo: 'Perfil', url: '/perfil', icono: 'person' },
    { titulo: 'Cerrar Sesion', url: '', icono: 'log-out' }
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.rolUsuario = this.authService.getRol(); // Obtener el rol del usuario
  }

  ngOnInit() {
    // Obtener el rol del usuario desde localStorage
    const rolGuardado = localStorage.getItem('userRole');
    
    if (rolGuardado) {
      this.rolUsuario = rolGuardado;
    } else {
      this.rolUsuario = 'invitado'; // Si no hay rol guardado, asignar como invitado
    }
    
    // Filtrar las páginas según el rol del usuario
    this.paginas = this.paginas.filter(pagina => {
      return !(pagina.soloAdmin && this.rolUsuario !== 'admin');
    });
  }
  

  handleMenuClick(pagina: any) {
    if (pagina.titulo === 'Cerrar Sesion') {
      this.logout();
    } else {
      // Si no es la opción de cerrar sesión, redirigimos normalmente
      this.router.navigate([pagina.url]);
    }
  }
  
  logout() {
    // Eliminar el rol y la información del usuario
    localStorage.removeItem('userRole');
    localStorage.removeItem('usuario'); // Limpiar el objeto completo del usuario
  
    // Redirigir al login
    this.router.navigate(['/login']);
  }
  
  
  
}