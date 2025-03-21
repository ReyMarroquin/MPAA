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
    { titulo: 'Conócenos', url: '/conocenos', icono: 'information-circle' }, // ✅ Nueva opción añadida
    { titulo: 'Cerrar Sesión', url: '', icono: 'log-out' }
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.rolUsuario = this.authService.getRol(); // Obtener el rol del usuario
  }

  ngOnInit() {
    const rolGuardado = localStorage.getItem('userRole');
    
    if (rolGuardado) {
      this.rolUsuario = rolGuardado;
    } else {
      this.rolUsuario = 'invitado';
    }
    
    // Filtrar las páginas según el rol del usuario
    this.paginas = this.paginas.filter(pagina => {
      return !(pagina.soloAdmin && this.rolUsuario !== 'admin');
    });
  }

  handleMenuClick(pagina: any) {
    if (pagina.titulo === 'Cerrar Sesión') {
      this.logout();
    } else {
      this.router.navigate([pagina.url]);
    }
  }
  
  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
