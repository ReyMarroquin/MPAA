import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-control-luces',
  templateUrl: './control-luces.page.html',
  styleUrls: ['./control-luces.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterModule,
    TranslateModule // Añade RouterModule a los imports
  ]
})
export class ControlLucesPage {
  lightStatus = [true, false, true, false, true, false, true, false, true, false, true, false];
  doorStatus = [false, true, false, true, false, true];
  elevatorStatus = [1, 2];
  windSpeed = 5;
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

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
    this.windSpeed = Math.floor(Math.random() * 20) + 1;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }
}
