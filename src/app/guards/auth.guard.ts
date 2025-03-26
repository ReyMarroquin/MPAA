import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Esperar a que se resuelva el estado de autenticación
    const isAuthenticated = await this.authService.estaAutenticado();
    
    // 1. Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url } // Guardar URL para redirección después del login
      });
      return false;
    }

    // 2. Verificar roles si la ruta los requiere
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = this.authService.getRol();
      
      if (!requiredRoles.includes(userRole)) {
        this.router.navigate(['/unauthorized']); // O a una ruta de "no autorizado"
        return false;
      }
    }

    return true;
  }
}