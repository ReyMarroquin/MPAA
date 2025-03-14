import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule  } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,RouterModule],
})
export class DashboardPage implements OnInit {
  temperatura: number = 40; // Temperatura en °C
  calidadAire: number = 80; // Calidad de aire en porcentaje
  ruido: number = 50; // Nivel de ruido en dB
  humedad: number = 45; // Humedad en porcentaje
  calidadAgua: number = 60; // Calidad del agua en porcentaje
  co2: number = 300; // Nivel de CO2 en ppm
  luz: number = 300; // Intensidad de luz en lux

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


  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }


  ngOnInit() {}
}
