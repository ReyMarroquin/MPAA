import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule  } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,RouterModule, TranslateModule],
})
export class DashboardPage implements OnInit {
  temperatura: number = 20; // Temperatura en °C
  calidadAire: number = 60; // Calidad de aire en porcentaje
  ruido: number = 50; // Nivel de ruido en dB
  humedad: number = 45; // Humedad en porcentaje
  calidadAgua: number = 20; // Calidad del agua en porcentaje
  co2: number = 300; // Nivel de CO2 en ppm
  luz: number = 300; // Intensidad de luz en lux
  monoxidoCarbono: number = 5; // Nivel de CO en ppm
  gasMetano: number = 100; // Nivel de CH4 en ppm
  vibracion: number = 2; // Nivel de vibración en escala 0-10
  proximidad: number = 30; // Distancia en cm
  rfid: string = "No detectado"; // Estado del RFID
  llama: boolean = false; // Detección de llama/fuego

  // Función para obtener el color de la temperatura
  getTemperatureColor(temperatura: number): string {
    if (temperatura >= 35) {
      return 'red'; // Muy caliente
    } else if (temperatura >= 20 && temperatura < 35) {
      return 'green'; // Normal
    } else {
      return 'blue'; // Frío
    }
  }

  // Función para obtener el ancho de la barra de temperatura
  getTemperatureWidth(temperatura: number): number {
    if (temperatura >= 35) {
      return 100; // Muy caliente
    } else if (temperatura >= 20 && temperatura < 35) {
      return 50; // Normal
    } else {
      return 20; // Frío
    }
  }

  // Función para obtener el color de la calidad de aire
  getAirQualityColor(calidadAire: number): string {
    if (calidadAire >= 80) {
      return 'green'; // Buena calidad
    } else if (calidadAire >= 50 && calidadAire < 80) {
      return 'yellow'; // Calidad media
    } else {
      return 'red'; // Mala calidad
    }
  }

  // Función para obtener el ancho de la barra de calidad de aire
  getAirQualityWidth(calidadAire: number): number {
    return calidadAire; // El porcentaje de calidad de aire determina el ancho
  }

  // Función para obtener el color del nivel de ruido
  getNoiseLevelColor(ruido: number): string {
    if (ruido >= 70) {
      return 'red'; // Ruido alto
    } else if (ruido >= 40 && ruido < 70) {
      return 'yellow'; // Ruido moderado
    } else {
      return 'green'; // Ruido bajo
    }
  }

  // Función para obtener el ancho de la barra de ruido
  getNoiseLevelWidth(ruido: number): number {
    if (ruido >= 70) {
      return 100; // Ruido alto
    } else if (ruido >= 40 && ruido < 70) {
      return 50; // Ruido moderado
    } else {
      return 20; // Ruido bajo
    }
  }

  // Función para obtener el color de la humedad
  getHumidityColor(humedad: number): string {
    if (humedad >= 60) {
      return 'green'; // Alta humedad
    } else if (humedad >= 30 && humedad < 60) {
      return 'yellow'; // Humedad moderada
    } else {
      return 'blue'; // Baja humedad
    }
  }

  // Función para obtener el ancho de la barra de humedad
  getHumidityWidth(humedad: number): number {
    return humedad; // El porcentaje de humedad determina el ancho
  }

  // Función para obtener el color de la calidad del agua
  getWaterQualityColor(calidadAgua: number): string {
    if (calidadAgua >= 80) {
      return 'green'; // Buena calidad
    } else if (calidadAgua >= 50 && calidadAgua < 80) {
      return 'yellow'; // Calidad media
    } else {
      return 'red'; // Mala calidad
    }
  }

  // Función para obtener el ancho de la barra de calidad del agua
  getWaterQualityWidth(calidadAgua: number): number {
    return calidadAgua; // El porcentaje de calidad del agua determina el ancho
  }

  // Función para obtener el color del nivel de CO2
  getCO2LevelColor(co2: number): string {
    if (co2 >= 1000) {
      return 'red'; // Nivel alto de CO2
    } else if (co2 >= 500 && co2 < 1000) {
      return 'yellow'; // Nivel moderado de CO2
    } else {
      return 'green'; // Nivel bajo de CO2
    }
  }

  // Función para obtener el ancho de la barra de CO2
  getCO2LevelWidth(co2: number): number {
    return Math.min(co2 / 10, 100); // El nivel de CO2 determina el ancho
  }

  // Función para obtener el color de la intensidad de luz
  getLightIntensityColor(luz: number): string {
    if (luz >= 500) {
      return 'green'; // Alta intensidad de luz
    } else if (luz >= 200 && luz < 500) {
      return 'yellow'; // Intensidad de luz moderada
    } else {
      return 'blue'; // Baja intensidad de luz
    }
  }

  // Función para obtener el ancho de la barra de luz
  getLightIntensityWidth(luz: number): number {
    return Math.min(luz / 5, 100); // La intensidad de luz determina el ancho
  }

  getCOLevelColor(monoxidoCarbono: number): string {
    if (monoxidoCarbono >= 35) {
      return 'red'; // Peligroso
    } else if (monoxidoCarbono >= 9 && monoxidoCarbono < 35) {
      return 'orange'; // Advertencia
    } else {
      return 'green'; // Seguro
    }
  }

  getCOLevelWidth(monoxidoCarbono: number): number {
    return Math.min(monoxidoCarbono * 3, 100);
  }

  // Gas Metano (CH4)
  getMethaneColor(gasMetano: number): string {
    if (gasMetano >= 10000) {
      return 'red'; // Peligro de explosión
    } else if (gasMetano >= 1000 && gasMetano < 10000) {
      return 'orange'; // Advertencia
    } else {
      return 'green'; // Seguro
    }
  }

  getMethaneWidth(gasMetano: number): number {
    return Math.min(gasMetano / 100, 100);
  }

  // Vibración
  getVibrationColor(vibracion: number): string {
    if (vibracion >= 7) {
      return 'red'; // Vibración fuerte
    } else if (vibracion >= 4 && vibracion < 7) {
      return 'yellow'; // Vibración moderada
    } else {
      return 'green'; // Vibración normal
    }
  }

  getVibrationWidth(vibracion: number): number {
    return vibracion * 10;
  }

  // Proximidad
  getProximityColor(proximidad: number): string {
    if (proximidad <= 10) {
      return 'red'; // Muy cerca
    } else if (proximidad > 10 && proximidad <= 30) {
      return 'yellow'; // Cercano
    } else {
      return 'green'; // Normal
    }
  }

  getProximityWidth(proximidad: number): number {
    return Math.max(0, 100 - (proximidad * 2));
  }

  // RFID (no necesita funciones de color/ancho)
  
  // Llama/Fuego
  getFlameColor(llama: boolean): string {
    return llama ? 'red' : 'green';
  }

  getFlameIcon(llama: boolean): string {
    return llama ? 'flame' : 'flame-outline';
  }

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}