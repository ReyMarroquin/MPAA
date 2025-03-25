import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.page.html',
  styleUrls: ['./vista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class VistaPage implements OnInit {
  lightStatus = [true, false, true, false, true, false, true, false, true, false, true, false];
  doorStatus = [true, false, true, false, true, false];
  elevatorStatus = [1, 2];  // Inicialmente los elevadores están en piso 1 y 2
  windSpeed = 5;  // en km/h

  constructor() { }

  ngOnInit() { }

  // Alternar luces
  toggleLight(index: number) {
    this.lightStatus[index] = !this.lightStatus[index];
  }

  // Alternar estado de las puertas
  toggleDoor(index: number) {
    this.doorStatus[index] = !this.doorStatus[index];
  }

  // Alternar piso de los elevadores (de piso 1 a 2 o viceversa)
  toggleElevator(index: number) {
    this.elevatorStatus[index] = this.elevatorStatus[index] === 1 ? 2 : 1;
  }

  // Función para simular la velocidad del viento de los ventiladores
  changeWindSpeed() {
    this.windSpeed = Math.floor(Math.random() * 21);  // Random entre 0 y 20 km/h
  }
}

