import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import {
  ILoginRequest,
  IAuthResponse,
  IOperatorProfile,
  OperatorRole,
  OperatorStatus,
  OperatorLevel,
  LEVEL_DISPLAY_NAMES,
} from '../../models/auth.model';

/**
 * Servicio Mock de Autenticación
 * Simula las respuestas de una API .NET 8 WebAPI
 * 
 * En producción, este servicio será reemplazado por AuthApiService
 * que realizará peticiones HTTP reales al backend.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthMockService {
  /** Signal para el estado de autenticación */
  private readonly _isAuthenticated = signal<boolean>(false);
  
  /** Signal para el operador actual */
  private readonly _currentOperator = signal<IOperatorProfile | null>(null);
  
  /** Signal para el token de acceso */
  private readonly _accessToken = signal<string | null>(null);

  /** Computed: estado de autenticación reactivo */
  public readonly isAuthenticated = computed(() => this._isAuthenticated());
  
  /** Computed: operador actual reactivo */
  public readonly currentOperator = computed(() => this._currentOperator());
  
  /** Computed: nombre del operador para saludo */
  public readonly operatorFirstName = computed(() => {
    const operator = this._currentOperator();
    return operator?.firstName ?? 'Operador';
  });

  /** Datos mock del operador para demostración */
  private readonly mockOperator: IOperatorProfile = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    employeeNumber: 'TC-2024-0142',
    fullName: 'Jorge Arturo Ramírez González',
    firstName: 'Jorge',
    lastName: 'Ramírez',
    motherLastName: 'González',
    email: 'jorge.ramirez@transportescuauhtemoc.com',
    phone: '+52 55 1234 5678',
    avatarUrl: 'assets/images/avatars/default-avatar.svg',
    role: OperatorRole.Operator,
    status: OperatorStatus.Active,
    gamification: {
      totalPoints: 15750,
      availablePoints: 8500,
      level: OperatorLevel.Gold,
      levelName: LEVEL_DISPLAY_NAMES[OperatorLevel.Gold],
      progressToNextLevel: 65,
      pointsToNextLevel: 4250,
      totalKilometers: 125840,
      ranking: 12,
    },
    hireDate: '2019-03-15T00:00:00Z',
    lastLoginAt: '2026-02-03T14:30:00Z',
    createdAt: '2019-03-15T10:00:00Z',
    updatedAt: '2026-02-03T14:30:00Z',
  };

  /** Credenciales válidas para demo */
  private readonly validCredentials = {
    username: 'TC-2024-0142',
    password: 'Demo123!',
  };

  constructor() {
    this.checkStoredSession();
  }

  /**
   * Verifica si hay una sesión almacenada
   * En producción, validaría el token JWT con el backend
   */
  private checkStoredSession(): void {
    const storedToken = localStorage.getItem('spio_access_token');
    const storedOperator = localStorage.getItem('spio_operator');

    if (storedToken && storedOperator) {
      try {
        const operator = JSON.parse(storedOperator) as IOperatorProfile;
        this._accessToken.set(storedToken);
        this._currentOperator.set(operator);
        this._isAuthenticated.set(true);
      } catch {
        this.clearSession();
      }
    }
  }

  /**
   * Inicia sesión con las credenciales proporcionadas
   * Simula una petición HTTP con delay de 2 segundos
   * 
   * @param credentials Credenciales de inicio de sesión
   * @returns Observable con la respuesta de autenticación
   */
  login(credentials: ILoginRequest): Observable<IAuthResponse> {
    // Simular validación de credenciales
    const isValid =
      credentials.username === this.validCredentials.username &&
      credentials.password === this.validCredentials.password;

    if (!isValid) {
      const errorResponse: IAuthResponse = {
        success: false,
        message: 'Credenciales inválidas. Verifica tu número de empleado y contraseña.',
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        operator: null,
      };

      // Simular delay de red y retornar error
      return of(errorResponse).pipe(delay(800));
    }

    // Generar token mock (en producción sería JWT real)
    const mockToken = this.generateMockToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 horas

    const successResponse: IAuthResponse = {
      success: true,
      message: 'Inicio de sesión exitoso',
      accessToken: mockToken,
      refreshToken: this.generateMockToken(),
      expiresAt,
      operator: { ...this.mockOperator },
    };

    // Simular petición HTTP con delay reducido para demo
    return new Observable<IAuthResponse>((observer) => {
      setTimeout(() => {
        // Guardar sesión
        this.saveSession(successResponse);
        observer.next(successResponse);
        observer.complete();
      }, 800);
    });
  }

  /**
   * Cierra la sesión del operador
   */
  logout(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        this.clearSession();
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Guarda la sesión en localStorage y actualiza los signals
   */
  private saveSession(response: IAuthResponse): void {
    if (response.accessToken && response.operator) {
      localStorage.setItem('spio_access_token', response.accessToken);
      localStorage.setItem('spio_operator', JSON.stringify(response.operator));
      
      if (response.refreshToken) {
        localStorage.setItem('spio_refresh_token', response.refreshToken);
      }

      this._accessToken.set(response.accessToken);
      this._currentOperator.set(response.operator);
      this._isAuthenticated.set(true);
    }
  }

  /**
   * Limpia la sesión de localStorage y signals
   */
  private clearSession(): void {
    localStorage.removeItem('spio_access_token');
    localStorage.removeItem('spio_refresh_token');
    localStorage.removeItem('spio_operator');

    this._accessToken.set(null);
    this._currentOperator.set(null);
    this._isAuthenticated.set(false);
  }

  /**
   * Genera un token mock para demostración
   * En producción, el token vendría del servidor .NET
   */
  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: this.mockOperator.id,
        emp: this.mockOperator.employeeNumber,
        name: this.mockOperator.fullName,
        role: this.mockOperator.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400, // 24 horas
      })
    );
    const signature = btoa('mock-signature-transportes-cuauhtemoc');
    
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Obtiene el token actual (para interceptors HTTP)
   */
  getAccessToken(): string | null {
    return this._accessToken();
  }

  /**
   * Helper para obtener credenciales de demo
   * Solo para desarrollo/demostración
   */
  getDemoCredentials(): { username: string; password: string } {
    return { ...this.validCredentials };
  }
}
