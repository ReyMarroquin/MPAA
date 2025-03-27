import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';  // Asegúrate de importar esto

import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports:[IonicModule,CommonModule,RouterModule,TranslateModule],
  standalone:true
})
export class ConfiguracionPage implements OnInit {

  isAdmin = true; // Simulación de rol, cambiar según autenticación
  menuExpanded = false; // Estado del menú desplegable
  adminExpanded = false; // Estado del submenú de administración

  constructor(private router: Router, private translate: TranslateService
  ) {}

  logout() {
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  toggleAdminMenu() {
    this.adminExpanded = !this.adminExpanded;
  }
  changeSpanish(){
    this.translate.use('es');
  }
  changeEnglish(){
    this.translate.use('en');
  }
  // Función para manejar el cambio de idioma desde el select
  changeLanguage(value: string) {
    if (value === 'es') {
      this.changeSpanish();
    } else if (value === 'en') {
      this.changeEnglish();
    }
  }

  


  ngOnInit() {
  }

}