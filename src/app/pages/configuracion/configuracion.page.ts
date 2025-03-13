import { Component } from '@angular/core';  // Importación correcta de Component
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true
})
export class ConfiguracionPage {
  constructor() {}

  ngOnInit() {
    // Aquí puedes poner cualquier inicialización si es necesario
  }
}
