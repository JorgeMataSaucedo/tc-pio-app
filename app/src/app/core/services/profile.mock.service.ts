import { Injectable, inject, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

import {
  IOperatorProfileExtended,
  IBasicInfo,
  IContactInfo,
  IEmploymentInfo,
  IGamificationStats,
  IAchievement,
  IUserPreferences,
  IProfileMenuOption,
  AchievementCategory,
  AchievementRarity,
} from '../../models/profile.model';
import {
  OperatorLevel,
  OperatorRole,
  OperatorStatus,
  LEVEL_DISPLAY_NAMES,
} from '../../models/auth.model';
import { AuthMockService } from './auth.mock.service';

/**
 * Servicio Mock de Perfil
 * Simula las respuestas de una API .NET 8 WebAPI
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileMockService {
  private readonly authService = inject(AuthMockService);

  /** Computed: Información básica del operador */
  readonly operatorBasicInfo = computed(() => {
    const operator = this.authService.currentOperator();
    if (!operator) return null;
    
    return {
      id: operator.id,
      employeeNumber: operator.employeeNumber,
      fullName: operator.fullName,
      firstName: operator.firstName,
      lastName: operator.lastName,
      avatarUrl: operator.avatarUrl,
    };
  });

  /**
   * Obtiene el perfil extendido del operador
   */
  getExtendedProfile(): Observable<IOperatorProfileExtended> {
    const profile = this.getMockExtendedProfile();
    return of(profile).pipe(delay(100));
  }

  /**
   * Obtiene los logros del operador
   */
  getAchievements(): Observable<IAchievement[]> {
    return of(this.getMockAchievements()).pipe(delay(100));
  }

  /**
   * Obtiene las preferencias del usuario
   */
  getPreferences(): Observable<IUserPreferences> {
    return of(this.getMockPreferences()).pipe(delay(50));
  }

  /**
   * Actualiza las preferencias del usuario
   */
  updatePreferences(preferences: Partial<IUserPreferences>): Observable<boolean> {
    console.log('Actualizando preferencias:', preferences);
    return of(true).pipe(delay(500));
  }

  /**
   * Obtiene las opciones del menú de perfil
   */
  getMenuOptions(): IProfileMenuOption[] {
    return [
      {
        id: 'personal-info',
        title: 'Información Personal',
        subtitle: 'Datos básicos y contacto',
        icon: 'person-outline',
        route: '/tabs/profile/personal',
        iconColor: 'primary',
      },
      {
        id: 'achievements',
        title: 'Mis Logros',
        subtitle: '12 de 25 desbloqueados',
        icon: 'trophy-outline',
        route: '/tabs/profile/achievements',
        iconColor: 'warning',
        badge: 3,
      },
      {
        id: 'statistics',
        title: 'Estadísticas',
        subtitle: 'Rendimiento y métricas',
        icon: 'stats-chart-outline',
        route: '/tabs/profile/stats',
        iconColor: 'tertiary',
      },
      {
        id: 'notifications',
        title: 'Notificaciones',
        subtitle: 'Configurar alertas',
        icon: 'notifications-outline',
        route: '/tabs/profile/notifications',
        iconColor: 'secondary',
      },
      {
        id: 'security',
        title: 'Seguridad',
        subtitle: 'Contraseña y acceso',
        icon: 'shield-checkmark-outline',
        route: '/tabs/profile/security',
        iconColor: 'success',
      },
      {
        id: 'help',
        title: 'Ayuda y Soporte',
        subtitle: 'FAQ y contacto',
        icon: 'help-circle-outline',
        route: '/tabs/profile/help',
        iconColor: 'medium',
      },
      {
        id: 'about',
        title: 'Acerca de SPIO',
        subtitle: 'Versión 1.0.0',
        icon: 'information-circle-outline',
        route: '/tabs/profile/about',
        iconColor: 'medium',
      },
      {
        id: 'logout',
        title: 'Cerrar Sesión',
        icon: 'log-out-outline',
        action: 'logout',
        iconColor: 'danger',
        isDestructive: true,
      },
    ];
  }

  /**
   * Genera el perfil extendido mock
   */
  private getMockExtendedProfile(): IOperatorProfileExtended {
    return {
      basic: this.getMockBasicInfo(),
      contact: this.getMockContactInfo(),
      employment: this.getMockEmploymentInfo(),
      gamification: this.getMockGamificationStats(),
      achievements: this.getMockAchievements().filter(a => a.isUnlocked).slice(0, 5),
      preferences: this.getMockPreferences(),
    };
  }

  private getMockBasicInfo(): IBasicInfo {
    return {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      employeeNumber: 'TC-2024-0142',
      fullName: 'Jorge Arturo Ramírez González',
      firstName: 'Jorge',
      lastName: 'Ramírez',
      motherLastName: 'González',
      birthDate: '1985-03-15T00:00:00Z',
      age: 40,
      avatarUrl: 'assets/images/avatars/default-avatar.svg',
      curp: 'RAGJ850315HDFRRL09',
      rfc: 'RAGJ850315HD8',
    };
  }

  private getMockContactInfo(): IContactInfo {
    return {
      email: 'jorge.ramirez@transportescuauhtemoc.com',
      phone: '+52 81 1234 5678',
      emergencyPhone: '+52 81 8765 4321',
      emergencyContact: 'María González (Esposa)',
      address: 'Av. Revolución 1425, Col. Centro',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '64000',
    };
  }

  private getMockEmploymentInfo(): IEmploymentInfo {
    return {
      role: OperatorRole.Operator,
      status: OperatorStatus.Active,
      hireDate: '2019-03-15T00:00:00Z',
      seniority: '5 años, 11 meses',
      seniorityYears: 5,
      assignedUnit: 'Tractocamión Kenworth T680',
      unitPlate: 'TC-2024-089',
      operationalBase: 'Terminal Monterrey Norte',
      supervisorName: 'Ing. Roberto Martínez',
      contractType: 'Planta',
      federalLicenseNumber: 'LFC-2024-847291',
    };
  }

  private getMockGamificationStats(): IGamificationStats {
    return {
      currentLevel: OperatorLevel.Gold,
      levelName: LEVEL_DISPLAY_NAMES[OperatorLevel.Gold],
      totalPointsEarned: 22500,
      availablePoints: 8500,
      redeemedPoints: 14000,
      rankingPosition: 12,
      totalOperators: 156,
      totalKilometers: 125840,
      totalTrips: 847,
      averageRating: 4.8,
      currentStreak: 15,
      bestStreak: 45,
      achievementsUnlocked: 12,
      totalAchievements: 25,
    };
  }

  private getMockAchievements(): IAchievement[] {
    return [
      {
        id: 'ach-001',
        name: 'Primer Viaje',
        description: 'Completa tu primer viaje exitosamente',
        icon: 'flag-outline',
        category: AchievementCategory.Trips,
        points: 100,
        isUnlocked: true,
        unlockedAt: '2019-03-20T00:00:00Z',
        progress: 100,
        requirement: 'Completar 1 viaje',
        rarity: AchievementRarity.Common,
      },
      {
        id: 'ach-002',
        name: 'Piloto Veterano',
        description: 'Recorre 50,000 kilómetros',
        icon: 'speedometer-outline',
        category: AchievementCategory.Distance,
        points: 750,
        isUnlocked: true,
        unlockedAt: '2023-08-15T00:00:00Z',
        progress: 100,
        requirement: 'Recorrer 50,000 km',
        rarity: AchievementRarity.Rare,
      },
      {
        id: 'ach-003',
        name: 'Maestro del Combustible',
        description: 'Mantén un promedio de 3.5 km/L durante 30 días',
        icon: 'water-outline',
        category: AchievementCategory.Fuel,
        points: 500,
        isUnlocked: true,
        unlockedAt: '2024-01-10T00:00:00Z',
        progress: 100,
        requirement: '3.5 km/L por 30 días',
        rarity: AchievementRarity.Uncommon,
      },
      {
        id: 'ach-004',
        name: 'Centurión',
        description: 'Completa 100 viajes sin incidentes',
        icon: 'shield-checkmark-outline',
        category: AchievementCategory.Safety,
        points: 1000,
        isUnlocked: true,
        unlockedAt: '2024-12-01T00:00:00Z',
        progress: 100,
        requirement: '100 viajes sin incidentes',
        rarity: AchievementRarity.Epic,
      },
      {
        id: 'ach-005',
        name: 'Puntualidad Perfecta',
        description: 'Entrega a tiempo durante un mes completo',
        icon: 'time-outline',
        category: AchievementCategory.Punctuality,
        points: 400,
        isUnlocked: true,
        unlockedAt: '2024-11-30T00:00:00Z',
        progress: 100,
        requirement: '100% entregas a tiempo por 30 días',
        rarity: AchievementRarity.Uncommon,
      },
      {
        id: 'ach-006',
        name: 'Leyenda de la Carretera',
        description: 'Recorre 200,000 kilómetros',
        icon: 'ribbon-outline',
        category: AchievementCategory.Distance,
        points: 2000,
        isUnlocked: false,
        progress: 63,
        requirement: 'Recorrer 200,000 km',
        rarity: AchievementRarity.Legendary,
      },
      {
        id: 'ach-007',
        name: 'Medio Milenio',
        description: 'Completa 500 viajes',
        icon: 'trophy-outline',
        category: AchievementCategory.Trips,
        points: 1500,
        isUnlocked: true,
        unlockedAt: '2024-06-15T00:00:00Z',
        progress: 100,
        requirement: 'Completar 500 viajes',
        rarity: AchievementRarity.Epic,
      },
      {
        id: 'ach-008',
        name: '5 Años de Servicio',
        description: 'Celebra tu 5to aniversario en la empresa',
        icon: 'star-outline',
        category: AchievementCategory.Seniority,
        points: 1000,
        isUnlocked: true,
        unlockedAt: '2024-03-15T00:00:00Z',
        progress: 100,
        requirement: '5 años de antigüedad',
        rarity: AchievementRarity.Rare,
      },
    ];
  }

  private getMockPreferences(): IUserPreferences {
    return {
      pushNotifications: true,
      emailNotifications: true,
      documentAlerts: true,
      weeklySummary: true,
      language: 'es',
      theme: 'light',
    };
  }
}
