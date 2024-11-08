import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../services/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private cookieService: CookieService = inject(CookieService)

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario es administrador
    if (this.cookieService.getCookie("admin") === "true") {
      return true;
    } else {
      // Redirige si no tiene permiso
      this.router.navigate(['/home']);
      return false;
    }
  }
}
