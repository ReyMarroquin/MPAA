import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Importa el servicio

@Component({
  selector: 'app-vista',
  templateUrl: './vista.page.html',
  styleUrls: ['./vista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class VistaPage implements OnInit {
  isAdmin = false;  // Inicializa como false
  lightStatus = [true, false, true, false, true, false, true, false, true, false, true, false]; // Estado de las luces
  doorStatus = [true, false, true, false, true, false]; // Estado de las puertas
  elevatorStatus = [1, 2]; // Pisos de los elevadores
  windSpeed = 5; // Velocidad inicial del viento (ejemplo de ventilador)

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtén el rol del usuario y cambia isAdmin
    this.isAdmin = this.authService.getRol() === 'admin'; // Si el rol es 'admin', se habilita la interacción
  }

  // Método para cambiar el estado de las luces, solo si el usuario es admin
  toggleLight(index: number) {
    if (this.isAdmin) {
      this.lightStatus[index] = !this.lightStatus[index];
    }
  }

  // Método para cambiar el estado de las puertas, solo si el usuario es admin
  toggleDoor(index: number) {
    if (this.isAdmin) {
      this.doorStatus[index] = !this.doorStatus[index];
    }
  }

  // Método para cambiar el estado de los elevadores, solo si el usuario es admin
  toggleElevator(index: number) {
    if (this.isAdmin) {
      this.elevatorStatus[index] = this.elevatorStatus[index] === 1 ? 2 : 1;
    }
  }

  // Método para cambiar la velocidad del viento (simulado con valor aleatorio)
  changeWindSpeed() {
    if (this.isAdmin) {
      this.windSpeed = Math.floor(Math.random() * 21); // Genera un valor entre 0 y 20
    }
  }
}
