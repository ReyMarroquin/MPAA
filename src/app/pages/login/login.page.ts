import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';  // Cambiamos username por email
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.login(this.email, this.password);
      
      if (success) {
        const rol = this.authService.getRol();
        const returnUrl = this.authService.getDefaultRedirectForRole(rol);
        this.router.navigate([returnUrl]);
      } else {
        this.errorMessage = this.authService.getLoginError();
      }
    } catch (error) {
      console.error('Error en login:', error);
      this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu correo electrónico',
          value: this.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            try {
              await this.authService.sendPasswordResetEmail(data.email);
              this.showAlert('Éxito', 'Se ha enviado un correo para restablecer tu contraseña');
            } catch (error) {
              this.showAlert('Error', 'No pudimos enviar el correo. Verifica la dirección.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}