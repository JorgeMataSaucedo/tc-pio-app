import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthMockService } from '../services/auth.mock.service';

/**
 * Interceptor HTTP de autenticación
 * Agrega el token JWT a las peticiones y maneja errores de auth
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthMockService);
  const router = inject(Router);

  // Obtener el token actual
  const token = authService.getAccessToken();

  // Clonar la petición y agregar el header de autorización
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Procesar la petición y manejar errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 (No autorizado), cerrar sesión
      if (error.status === 401) {
        authService.logout().subscribe(() => {
          router.navigate(['/login'], { replaceUrl: true });
        });
      }

      // Si el error es 403 (Prohibido), mostrar mensaje
      if (error.status === 403) {
        console.error('Acceso denegado:', error.message);
      }

      return throwError(() => error);
    })
  );
};

/**
 * Interceptor de logging para desarrollo
 * Registra todas las peticiones HTTP en consola
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  console.log(`[HTTP] ${req.method} ${req.url}`);

  return next(req).pipe(
    catchError((error) => {
      const duration = Date.now() - startTime;
      console.error(`[HTTP ERROR] ${req.method} ${req.url} - ${error.status} (${duration}ms)`);
      return throwError(() => error);
    })
  );
};
