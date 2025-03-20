import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const usuario = this.authService.getUsuario();
  
    // 🔴 Si no hay usuario logueado, mandarlo a login
    if (!usuario) {
      this.router.navigate(['/login']);
      return false;
    }
  
    const rol = this.authService.getRol();
    const rolesPermitidos = route.data['roles'] as Array<string>; // Obtener roles permitidos desde la ruta
  
    // 🔴 Verificar si el rol del usuario está permitido
    if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
      this.router.navigate(['/home']); // Redirigir si no tiene permiso
      return false;
    }
  
    return true; // ✅ Si cumple con las condiciones, puede acceder
  }
}