import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
  imports:[IonicModule,CommonModule,RouterModule,FormsModule],
  standalone:true
})
export class ConfiguracionPage implements OnInit {


  constructor(private router: Router,private themeService: ThemeService) {}

  darkMode = false;

  ngOnInit() {
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}