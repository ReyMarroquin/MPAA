import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.authService.initAuthListener(); // Inicializa el listener
    
    // Opcional: Si ya está logueado, redirige
    if (this.authService.estaAutenticado()) {
      const rol = this.authService.getRol();
      this.router.navigate([this.authService.getDefaultRedirectForRole(rol)]);
    }
  }

  async loginWithGoogle() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión con Google...'
    });
    await loading.present();

    try {
      await this.authService.googleLogin();
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error al usuario
    } finally {
      await loading.dismiss();
    }
  }

  async loginWithFacebook() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión con Facebook...'
    });
    await loading.present();
  
    try {
      await this.authService.facebookLogin();
    } catch (error) {
      this.errorMessage = typeof error === 'string' ? error : 'Error al iniciar con Facebook';
      console.error(error);
    } finally {
      await loading.dismiss();
    }
  }

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
        // Obtenemos el error del servicio
        this.errorMessage = this.authService.getLoginError() || 
          'Usuario o contraseña incorrectos';
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
            if (!data.email) {
              this.showAlert('Error', 'Por favor ingresa un correo electrónico');
              return;
            }

            try {
              await this.authService.sendPasswordResetEmail(data.email);
              this.showAlert('Éxito', 'Se ha enviado un correo para restablecer tu contraseña');
            } catch (error) {
              console.error('Error al enviar correo de recuperación:', error);
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