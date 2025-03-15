import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const rol = localStorage.getItem('userRole');
    
    // Verificar si el rol es admin
    if (rol === 'admin') {
      return true;
    }
  
    // Si no es admin, redirigir al inicio o a una página pública
    this.router.navigate(['/dashboard']); // Puedes cambiar la ruta a una página de acceso público
    return false;
  }
  
}
