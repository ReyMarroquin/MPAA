import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class SensoresPage implements OnInit {
  // Estados de los sensores
  proximityActive = false;
  fireActive = false;
  gasActive = false;
  atmosphericActive = true;
  rainActive = false;
  rfidActive = false;
  lightActive = true;
  windActive = false;
  
  // Valores de los sensores
  proximityValue = 0.5;
  gasValue = 0.2;
  temperature = 24;
  humidity = 65;
  pressure = 1013;
  lightValue = 0.7;
  windSpeed = 0;
  energyGenerated = 0;
  rfidTag: string | null = null;
  
  // Control de simulación
  simulationActive = false;
  simulationInterval: any;
  allSensorsActive = false;

  constructor() { }

  ngOnInit() {
    this.updateAtmosphericData();
  }

  toggleSensor(sensor: string) {
    switch(sensor) {
      case 'proximity':
        this.proximityActive = !this.proximityActive;
        if (this.proximityActive) {
          this.proximityValue = Math.random();
        }
        break;
      case 'fire':
        this.fireActive = !this.fireActive;
        break;
      case 'gas':
        this.gasActive = !this.gasActive;
        if (this.gasActive) {
          this.gasValue = Math.random() * 0.5 + 0.5; // Valores altos cuando está activo
        } else {
          this.gasValue = Math.random() * 0.2;
        }
        break;
      case 'rain':
        this.rainActive = !this.rainActive;
        break;
      case 'rfid':
        this.rfidActive = !this.rfidActive;
        if (this.rfidActive) {
          this.rfidTag = 'ID-' + Math.floor(Math.random() * 10000);
        } else {
          this.rfidTag = null;
        }
        break;
      case 'wind':
        this.windActive = !this.windActive;
        if (this.windActive) {
          this.windSpeed = Math.floor(Math.random() * 30) + 10;
          this.energyGenerated += 0.1;
        } else {
          this.windSpeed = 0;
        }
        break;
        case 'atmospheric':
          this.atmosphericActive = !this.atmosphericActive;
          if (this.atmosphericActive) {
            this.updateAtmosphericData();
          }
          break;
          
        case 'light':
          this.lightActive = !this.lightActive;
          if (this.lightActive) {
            this.lightValue = Math.random();
          } else {
            this.lightValue = 0;
          }
          break;
    }
  }

  toggleAllSensors() {
    this.allSensorsActive = !this.allSensorsActive;
    
    this.proximityActive = this.allSensorsActive;
    this.fireActive = this.allSensorsActive;
    this.gasActive = this.allSensorsActive;
    this.rainActive = this.allSensorsActive;
    this.rfidActive = this.allSensorsActive;
    this.windActive = this.allSensorsActive;
    this.atmosphericActive = this.allSensorsActive;
    this.lightActive = this.allSensorsActive;
    
    if (this.allSensorsActive) {
      this.updateAllSensorValues();
    }
  }

  toggleSimulation() {
    this.simulationActive = !this.simulationActive;
    
    if (this.simulationActive) {
      this.simulationInterval = setInterval(() => {
        this.updateAllSensorValues();
      }, 3000);
    } else {
      clearInterval(this.simulationInterval);
    }
  }

  updateAllSensorValues() {
    if (this.proximityActive) this.proximityValue = Math.random();
    if (this.gasActive) this.gasValue = Math.random() * 0.5 + 0.5;
    if (this.fireActive) this.fireActive = Math.random() > 0.7; // 30% de probabilidad de fuego
    if (this.rainActive) this.rainActive = Math.random() > 0.6; // 40% de probabilidad de lluvia
    if (this.rfidActive && Math.random() > 0.8) { // 20% de probabilidad de lectura RFID
      this.rfidTag = 'ID-' + Math.floor(Math.random() * 10000);
    }
    if (this.windActive) {
      this.windSpeed = Math.floor(Math.random() * 30) + 5;
      this.energyGenerated += 0.05;
    }
    
    this.updateAtmosphericData();
    this.lightValue = Math.random();
  }

  updateAtmosphericData() {
    this.temperature = 20 + Math.floor(Math.random() * 15); // 20-35°C
    this.humidity = 50 + Math.floor(Math.random() * 40); // 50-90%
    this.pressure = 1000 + Math.floor(Math.random() * 30); // 1000-1030 hPa
  }

  ngOnDestroy() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }
}