import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule,  TranslateModule]
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
  co2Active = false;
  coActive = false;
  vibrationActive = false;
  methaneActive = false;
  
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
  co2Value = 400;
  coValue = 0.5;
  vibrationValue = 0;
  methaneValue = 100;
  
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
          this.gasValue = Math.random() * 0.5 + 0.5;
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
      case 'co2':
        this.co2Active = !this.co2Active;
        if (this.co2Active) {
          this.co2Value = 400 + Math.random() * 1600; // 400-2000 ppm
        }
        break;
      case 'co':
        this.coActive = !this.coActive;
        if (this.coActive) {
          this.coValue = Math.random() * 10; // 0-10 ppm
        } else {
          this.coValue = 0.5;
        }
        break;
      case 'vibration':
        this.vibrationActive = !this.vibrationActive;
        if (this.vibrationActive) {
          this.vibrationValue = Math.random() * 10; // 0-10
        } else {
          this.vibrationValue = 0;
        }
        break;
      case 'methane':
        this.methaneActive = !this.methaneActive;
        if (this.methaneActive) {
          this.methaneValue = 100 + Math.random() * 9900; // 100-10000 ppm
        } else {
          this.methaneValue = 100;
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
    this.co2Active = this.allSensorsActive;
    this.coActive = this.allSensorsActive;
    this.vibrationActive = this.allSensorsActive;
    this.methaneActive = this.allSensorsActive;
    
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
    if (this.fireActive) this.fireActive = Math.random() > 0.7;
    if (this.rainActive) this.rainActive = Math.random() > 0.6;
    if (this.rfidActive && Math.random() > 0.8) {
      this.rfidTag = 'ID-' + Math.floor(Math.random() * 10000);
    }
    if (this.windActive) {
      this.windSpeed = Math.floor(Math.random() * 30) + 5;
      this.energyGenerated += 0.05;
    }
    if (this.co2Active) this.co2Value = 400 + Math.random() * 1600;
    if (this.coActive) this.coValue = Math.random() * 10;
    if (this.vibrationActive) this.vibrationValue = Math.random() * 10;
    if (this.methaneActive) this.methaneValue = 100 + Math.random() * 9900;
    
    this.updateAtmosphericData();
    this.lightValue = Math.random();
  }

  updateAtmosphericData() {
    this.temperature = 20 + Math.floor(Math.random() * 15);
    this.humidity = 50 + Math.floor(Math.random() * 40);
    this.pressure = 1000 + Math.floor(Math.random() * 30);
  }

  // Funciones para determinar el estado y color de los sensores
  getCO2LevelColor(value: number): string {
    if (value > 1000) return 'red';
    if (value > 800) return 'orange';
    return 'green';
  }

  getCO2LevelStatus(value: number): string {
    if (value > 1000) return 'Nivel Peligroso';
    if (value > 800) return 'Nivel Alto';
    return 'Nivel Normal';
  }

  getCOLevelColor(value: number): string {
    if (value > 9) return 'red';
    if (value > 5) return 'orange';
    return 'green';
  }

  getCOLevelStatus(value: number): string {
    if (value > 9) return '¡PELIGRO!';
    if (value > 5) return 'Nivel Alto';
    return 'Nivel Seguro';
  }

  getVibrationLevelColor(value: number): string {
    if (value > 7) return 'red';
    if (value > 4) return 'orange';
    return 'green';
  }

  getVibrationLevelStatus(value: number): string {
    if (value > 7) return 'Vibración Fuerte';
    if (value > 4) return 'Vibración Moderada';
    return 'Vibración Normal';
  }

  getMethaneLevelColor(value: number): string {
    if (value > 5000) return 'red';
    if (value > 1000) return 'orange';
    return 'green';
  }

  getMethaneLevelStatus(value: number): string {
    if (value > 5000) return '¡PELIGRO DE EXPLOSIÓN!';
    if (value > 1000) return 'Nivel Alto';
    return 'Nivel Seguro';
  }

  ngOnDestroy() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }
}