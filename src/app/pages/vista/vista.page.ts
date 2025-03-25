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
  elevatorStatus = [1, 2];  
  windSpeed = 5;  

  constructor() { }

  ngOnInit() { }

  toggleLight(index: number) {
    this.lightStatus[index] = !this.lightStatus[index];
  }

  
  toggleDoor(index: number) {
    this.doorStatus[index] = !this.doorStatus[index];
  }

  
  toggleElevator(index: number) {
    this.elevatorStatus[index] = this.elevatorStatus[index] === 1 ? 2 : 1;
  }


  changeWindSpeed() {
    this.windSpeed = Math.floor(Math.random() * 21);  
  }
}

