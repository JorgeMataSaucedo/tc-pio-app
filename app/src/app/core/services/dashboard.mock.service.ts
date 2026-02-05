import { Injectable, inject, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

import {
  IDashboardStats,
  IGamificationSummary,
  IOperatorKpis,
  IDashboardAlert,
  AlertType,
  AlertSeverity,
} from '../../models/dashboard.model';
import { OperatorLevel, LEVEL_DISPLAY_NAMES } from '../../models/auth.model';
import { AuthMockService } from './auth.mock.service';

/**
 * Servicio Mock del Dashboard
 * Simula las respuestas de una API .NET 8 WebAPI
 * 
 * Proporciona datos realistas de operación de tractocamiones
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardMockService {
  private readonly authService = inject(AuthMockService);

  /** Computed: nombre del operador para el saludo */
  readonly operatorFirstName = computed(() => {
    const operator = this.authService.currentOperator();
    return operator?.firstName ?? 'Operador';
  });

  /** Computed: avatar del operador */
  readonly operatorAvatar = computed(() => {
    const operator = this.authService.currentOperator();
    return operator?.avatarUrl ?? 'assets/images/avatars/default-avatar.svg';
  });

  /** Computed: número de empleado */
  readonly employeeNumber = computed(() => {
    const operator = this.authService.currentOperator();
    return operator?.employeeNumber ?? '';
  });

  /**
   * Obtiene las estadísticas completas del dashboard
   * Simula petición HTTP con delay de 800ms
   */
  getDashboardStats(): Observable<IDashboardStats> {
    const stats: IDashboardStats = {
      gamification: this.getMockGamification(),
      kpis: this.getMockKpis(),
      alerts: this.getMockAlerts(),
      lastUpdatedAt: new Date().toISOString(),
    };

    return of(stats).pipe(delay(150));
  }

  /**
   * Obtiene solo el resumen de gamificación
   */
  getGamificationSummary(): Observable<IGamificationSummary> {
    return of(this.getMockGamification()).pipe(delay(100));
  }

  /**
   * Obtiene solo los KPIs operativos
   */
  getOperatorKpis(): Observable<IOperatorKpis> {
    return of(this.getMockKpis()).pipe(delay(100));
  }

  /**
   * Obtiene las alertas pendientes
   */
  getAlerts(): Observable<IDashboardAlert[]> {
    return of(this.getMockAlerts()).pipe(delay(50));
  }

  /**
   * Marca una alerta como leída
   */
  markAlertAsRead(alertId: string): Observable<boolean> {
    // En producción, esto actualizaría el backend
    console.log(`Alerta ${alertId} marcada como leída`);
    return of(true).pipe(delay(200));
  }

  /**
   * Genera datos mock de gamificación
   * Basado en el operador autenticado
   */
  private getMockGamification(): IGamificationSummary {
    const operator = this.authService.currentOperator();
    const gamification = operator?.gamification;

    return {
      currentLevel: gamification?.level ?? OperatorLevel.Gold,
      levelDisplayName: gamification?.levelName ?? LEVEL_DISPLAY_NAMES[OperatorLevel.Gold],
      totalPoints: gamification?.totalPoints ?? 15750,
      availablePoints: gamification?.availablePoints ?? 8500,
      progressPercent: gamification?.progressToNextLevel ?? 65,
      pointsToNextLevel: gamification?.pointsToNextLevel ?? 4250,
      nextLevelName: LEVEL_DISPLAY_NAMES[OperatorLevel.Platinum],
      rankingPosition: gamification?.ranking ?? 12,
      totalOperators: 156,
      currentStreak: 15, // 15 días consecutivos trabajando
    };
  }

  /**
   * Genera KPIs mock realistas para un operador de tractocamión
   * Período: Mes actual
   */
  private getMockKpis(): IOperatorKpis {
    return {
      kilometers: {
        value: 12458,
        unit: 'km',
        variation: 8.5,
        isPositiveTrend: true,
        target: 15000,
        targetPercent: 83,
      },
      fuelEfficiency: {
        value: 3.2,
        unit: 'km/L',
        variation: 4.2,
        isPositiveTrend: true,
        target: 3.5,
        targetPercent: 91,
      },
      tripsCompleted: {
        value: 24,
        unit: 'viajes',
        variation: 12.0,
        isPositiveTrend: true,
        target: 28,
        targetPercent: 86,
      },
      serviceRating: {
        value: 4.8,
        unit: '/ 5',
        variation: 2.1,
        isPositiveTrend: true,
        target: 4.5,
        targetPercent: 107,
      },
      drivingHours: {
        value: 186,
        unit: 'hrs',
        variation: -3.5,
        isPositiveTrend: false, // Menos horas puede ser negativo si hay menos trabajo
        target: 200,
        targetPercent: 93,
      },
      onTimeDelivery: {
        value: 96.5,
        unit: '%',
        variation: 1.8,
        isPositiveTrend: true,
        target: 95,
        targetPercent: 102,
      },
    };
  }

  /**
   * Genera alertas mock del sistema
   */
  private getMockAlerts(): IDashboardAlert[] {
    const now = new Date();
    
    return [
      {
        id: 'alert-001',
        type: AlertType.DocumentExpiring,
        title: 'Licencia Federal por vencer',
        description: 'Tu licencia vence en 15 días. Renuévala a tiempo.',
        severity: AlertSeverity.Warning,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Hace 2 días
        isRead: false,
        actionRoute: '/tabs/documents',
      },
      {
        id: 'alert-002',
        type: AlertType.BonusAvailable,
        title: '¡Bono de rendimiento disponible!',
        description: 'Has ganado 500 puntos por tu excelente rendimiento de combustible.',
        severity: AlertSeverity.Success,
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 día
        isRead: false,
        actionRoute: '/tabs/wallet',
      },
      {
        id: 'alert-003',
        type: AlertType.AchievementUnlocked,
        title: '¡Nuevo logro desbloqueado!',
        description: 'Has completado 100 viajes sin incidentes. ¡Felicidades!',
        severity: AlertSeverity.Success,
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // Hace 3 días
        isRead: true,
        actionRoute: '/tabs/profile',
      },
      {
        id: 'alert-004',
        type: AlertType.DocumentExpiring,
        title: 'Verificación vehicular próxima',
        description: 'La verificación del tracto TC-2024-089 vence en 30 días.',
        severity: AlertSeverity.Info,
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Hace 5 días
        isRead: true,
        actionRoute: '/tabs/documents',
      },
    ];
  }

  /**
   * Obtiene el saludo según la hora del día
   */
  getGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Buenos días';
    } else if (hour >= 12 && hour < 19) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }

  /**
   * Obtiene el número de alertas no leídas
   */
  getUnreadAlertsCount(): Observable<number> {
    const unreadCount = this.getMockAlerts().filter(a => !a.isRead).length;
    return of(unreadCount).pipe(delay(50));
  }
}
