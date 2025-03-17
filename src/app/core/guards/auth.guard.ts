import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface RouteData {
  role?: string;
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRole = (route.data as RouteData).role;
  if (requiredRole && authService.getRole() !== requiredRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
