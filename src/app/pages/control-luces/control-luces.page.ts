import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-control-luces',
  templateUrl: './control-luces.page.html',
  styleUrls: ['./control-luces.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class ControlLucesPage implements OnInit {
    isAdmin = true; // Simulación de rol, cambiar según autenticación
    menuExpanded = false; // Estado del menú desplegable
    adminExpanded = false; // Estado del submenú de administración
  
    constructor(private router: Router) {}
  
    logout() {
      this.router.navigate(['/login']);
    }
  
    toggleMenu() {
      this.menuExpanded = !this.menuExpanded;
    }
  
    toggleAdminMenu() {
      this.adminExpanded = !this.adminExpanded;
    }

  luces: Record<number, boolean> = { 1: false, 2: false };

  toggleLuz(id: number) {
  this.luces[id] = !this.luces[id];
  }

  ngOnInit() {
  }

}
