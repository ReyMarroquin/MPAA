import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


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

  constructor(private authService: AuthService,public router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      const rol = this.authService.getRol();
      if (rol === 'admin') {
        this.router.navigate(['/control-luces']);
      } else {
        this.router.navigate(['/dashboard']); 
      }
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
  

  goToRegister(){
    this.router.navigate(['/registro']);
  }
}