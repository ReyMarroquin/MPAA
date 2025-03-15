import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.page.html',
  styleUrls: ['./vista.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class VistaPage implements OnInit {
  lightStatus = [true, false, true, false, true, false, true, false, true, false, true, false];

  // Estado de las puertas (open = true, closed = false)
  doorStatus = [true, false, true, false, true, false];

  // Estado de los elevadores (piso 1 o piso 2)
  elevatorStatus = [1, 2];

  // Velocidad del viento generada por los ventiladores eólicos
  windSpeed = 25; // en km/h

  constructor() { }

  ngOnInit() {
  }

}
