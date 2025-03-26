import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage {
  nombre: string = '';
  email: string = '';  // Cambiado de 'correo' a 'email' para consistencia
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async register() {
    // Validaciones básicas
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.register(this.email, this.password, this.nombre);
      
      if (success) {
        await this.showRegistrationSuccess();
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error en registro:', error);
      this.errorMessage = this.authService.getLoginError() || 'Error al registrar. Por favor, inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private async showRegistrationSuccess() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Tu cuenta ha sido creada correctamente. Por favor inicia sesión.',
      buttons: ['OK']
    });
    await alert.present();
  }
}