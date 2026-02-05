import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthMockService } from '../services/auth.mock.service';

/**
 * Guard de autenticación
 * Protege las rutas que requieren sesión activa
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthMockService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/login'], { replaceUrl: true });
  return false;
};

/**
 * Guard inverso de autenticación
 * Previene acceso al login si ya está autenticado
 */
export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthMockService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al dashboard si ya está autenticado
  router.navigate(['/tabs/dashboard'], { replaceUrl: true });
  return false;
};
