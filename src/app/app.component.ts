import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  mostrarMenu: boolean = false;
  paginas: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private menuCtrl: MenuController,
    private platform: Platform,
    private translateService: TranslateService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.verificarVisibilidadMenu(event.url);
        this.menuCtrl.close();
      });
  }

  ngOnInit() {
    this.authService.initAuthListener();
    this.actualizarMenu();

    // Escuchar cambios de autenticación
    this.authService.authState$.subscribe(() => {
      this.actualizarMenu();
    });

    // Inicializar idioma
    this.translateService.setDefaultLang('es');
    this.initApp();
  }

  actualizarMenu() {
    const rol = this.authService.getRol();
    this.mostrarMenu = this.authService.estaAutenticado();
    
    // Definir todas las páginas posibles
    const todasLasPaginas = [
      { titulo: 'Inicio', url: '/dashboard', icono: 'home' },
      { titulo: 'Sensores', url: '/sensores', icono: 'pulse', soloAdmin: true },
      { titulo: 'Administrar luces', url: '/control-luces', icono: 'bulb', soloAdmin: true },
      { titulo: 'Configuración', url: '/configuracion', icono: 'settings' },
      { titulo: 'Perfil', url: '/perfil', icono: 'person' },
      { titulo: 'Conócenos', url: '/conocenos', icono: 'information-circle' },
      { titulo: 'Cerrar Sesión', url: '', icono: 'log-out' }
    ];

    // Filtrar según el rol
    this.paginas = todasLasPaginas.filter(pagina => {
      return !(pagina.soloAdmin && rol !== 'admin');
    });
  }

  async handleMenuClick(pagina: any) {
    await this.menuCtrl.close();
    if (pagina.titulo === 'Cerrar Sesión') {
      this.authService.logout();
    } else {
      this.router.navigate([pagina.url]);
    }
  }

  verificarVisibilidadMenu(url: string) {
    this.mostrarMenu = this.authService.estaAutenticado() && 
       !['/login', '/registro', '/home'].includes(url);
  }

  initApp() {
    this.platform.ready().then(async () => {
      const language = await Device.getLanguageCode();

      if (language.value) {
        this.translateService.use(language.value);
      }
    });
  }
}
