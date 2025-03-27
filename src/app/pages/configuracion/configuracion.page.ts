import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';  // Asegúrate de importar esto

import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Añade esta línea
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports:[IonicModule,CommonModule,RouterModule,FormsModule,TranslateModule],
  standalone:true
})
export class ConfiguracionPage implements OnInit {

  isAdmin=true;
  menuExpanded = false;
  adminExpanded = false;

  constructor(private router: Router, private translate: TranslateService,private themeService: ThemeService
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

  darkMode = true;

  ngOnInit() {
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}