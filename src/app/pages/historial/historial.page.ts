import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class HistorialPage implements OnInit {

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


  ngOnInit() {
  }

}
