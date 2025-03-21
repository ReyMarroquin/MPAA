import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  rolUsuario: string = 'invitado';
  mostrarMenu: boolean = false; // Propiedad para controlar la visibilidad del menú

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

    // Escuchar cambios en la ruta para mostrar/ocultar el menú
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.verificarVisibilidadMenu(event.url);
      });
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


  verificarVisibilidadMenu(url: string) {
    // Ocultar el menú en las páginas de login y otras páginas públicas
    if (url === '/login' || url === '/registro' || url === '/home') {
      this.mostrarMenu = false;
    } else {
      // Mostrar el menú si el usuario está autenticado
      this.mostrarMenu = this.authService.estaAutenticado();
    }
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