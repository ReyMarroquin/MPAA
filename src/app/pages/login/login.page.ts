import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(public router: Router) {}

  login() {
    this.errorMessage = ''; // Limpiar mensaje de error antes de validar

    // Verificar si ambos campos están llenos
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, llena todos los campos';
      return;
    }

    // Lógica de autenticación
    if (this.username === 'admin' && this.password === 'admin123') {
      this.router.navigate(['/control-luces']);
    } else if (this.username === 'user' && this.password === 'user123') {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
