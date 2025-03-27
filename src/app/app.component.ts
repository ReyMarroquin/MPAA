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

    // Escuchar el cambio de idioma y actualizar el menú
    this.translateService.onLangChange.subscribe(() => {
      this.actualizarMenu(); // Volver a cargar las traducciones
    });
  }

  ngOnInit() {
    this.authService.initAuthListener();
    this.actualizarMenu();

    // Escuchar cambios de autenticación
    this.authService.authState$.subscribe(() => {
      this.actualizarMenu();
    });

    // Inicializar idioma por defecto
    this.translateService.setDefaultLang('es');
    this.initApp();
  }

  async actualizarMenu() {
    const rol = this.authService.getRol();
    this.mostrarMenu = this.authService.estaAutenticado();

    // Cargar las traducciones de los títulos del menú
    const todasLasPaginas = await this.translateService.get([
      'MENU_HOME',
      'MENU_SENSORS',
      'MENU_LIGHT_CONTROL',
      'MENU_SETTINGS',
      'MENU_PROFILE',
      'MENU_CONOCENOS',
      'MENU_LOGOUT'
    ]).toPromise();

    // Definir todas las páginas posibles con traducciones
    const paginasConTraduccion = [
      { titulo: todasLasPaginas['MENU_HOME'], url: '/dashboard', icono: 'home' },
      { titulo: todasLasPaginas['MENU_SENSORS'], url: '/sensores', icono: 'pulse', soloAdmin: true },
      { titulo: todasLasPaginas['MENU_LIGHT_CONTROL'], url: '/control-luces', icono: 'bulb', soloAdmin: true },
      { titulo: todasLasPaginas['MENU_SETTINGS'], url: '/configuracion', icono: 'settings' },
      { titulo: todasLasPaginas['MENU_PROFILE'], url: '/perfil', icono: 'person' },
      { titulo: todasLasPaginas['MENU_CONOCENOS'], url: '/conocenos', icono: 'information-circle' },
      { titulo: todasLasPaginas['MENU_LOGOUT'], url: '', icono: 'log-out' }
    ];

    // Filtrar según el rol y asignar las páginas traducidas al menú
    this.paginas = paginasConTraduccion.filter(pagina => {
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
