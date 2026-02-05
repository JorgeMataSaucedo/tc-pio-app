/**
 * Modelos del Dashboard - SPIO
 * Alineados con DTOs esperados en .NET 8 WebAPI
 */

import { OperatorLevel } from './auth.model';

/**
 * Estadísticas completas del Dashboard
 * Equivalente a DashboardStatsDto en C#
 */
export interface IDashboardStats {
  /** Información de gamificación del operador */
  gamification: IGamificationSummary;
  /** KPIs operativos del período actual */
  kpis: IOperatorKpis;
  /** Alertas y notificaciones pendientes */
  alerts: IDashboardAlert[];
  /** Fecha de última actualización de datos */
  lastUpdatedAt: string;
}

/**
 * Resumen de gamificación para el Hero Card
 * Equivalente a GamificationSummaryDto en C#
 */
export interface IGamificationSummary {
  /** Nivel actual del operador */
  currentLevel: OperatorLevel;
  /** Nombre del nivel para mostrar */
  levelDisplayName: string;
  /** Puntos totales acumulados */
  totalPoints: number;
  /** Puntos disponibles para canje */
  availablePoints: number;
  /** Progreso hacia el siguiente nivel (0-100) */
  progressPercent: number;
  /** Puntos faltantes para el siguiente nivel */
  pointsToNextLevel: number;
  /** Nombre del siguiente nivel */
  nextLevelName: string;
  /** Posición en el ranking general */
  rankingPosition: number;
  /** Total de operadores en el ranking */
  totalOperators: number;
  /** Racha actual de días consecutivos */
  currentStreak: number;
}

/**
 * KPIs operativos del operador
 * Equivalente a OperatorKpisDto en C#
 */
export interface IOperatorKpis {
  /** Kilómetros recorridos en el período */
  kilometers: IKpiValue;
  /** Rendimiento de diésel (km/litro) */
  fuelEfficiency: IKpiValue;
  /** Viajes completados en el período */
  tripsCompleted: IKpiValue;
  /** Calificación promedio de servicio */
  serviceRating: IKpiValue;
  /** Horas de conducción en el período */
  drivingHours: IKpiValue;
  /** Entregas a tiempo (porcentaje) */
  onTimeDelivery: IKpiValue;
}

/**
 * Valor de un KPI individual
 * Equivalente a KpiValueDto en C#
 */
export interface IKpiValue {
  /** Valor actual del KPI */
  value: number;
  /** Unidad de medida */
  unit: string;
  /** Variación respecto al período anterior (porcentaje) */
  variation: number;
  /** Indica si la variación es positiva para el operador */
  isPositiveTrend: boolean;
  /** Valor objetivo (meta) */
  target?: number;
  /** Porcentaje de cumplimiento de la meta */
  targetPercent?: number;
}

/**
 * Alerta o notificación del dashboard
 * Equivalente a DashboardAlertDto en C#
 */
export interface IDashboardAlert {
  /** Identificador único */
  id: string;
  /** Tipo de alerta */
  type: AlertType;
  /** Título de la alerta */
  title: string;
  /** Descripción breve */
  description: string;
  /** Severidad de la alerta */
  severity: AlertSeverity;
  /** Fecha de creación */
  createdAt: string;
  /** Indica si ha sido leída */
  isRead: boolean;
  /** Ruta de navegación al presionar */
  actionRoute?: string;
}

/**
 * Tipos de alertas
 */
export enum AlertType {
  /** Documento por vencer */
  DocumentExpiring = 'DOCUMENT_EXPIRING',
  /** Documento vencido */
  DocumentExpired = 'DOCUMENT_EXPIRED',
  /** Nuevo bono disponible */
  BonusAvailable = 'BONUS_AVAILABLE',
  /** Logro desbloqueado */
  AchievementUnlocked = 'ACHIEVEMENT_UNLOCKED',
  /** Recordatorio de viaje */
  TripReminder = 'TRIP_REMINDER',
  /** Mensaje del sistema */
  SystemMessage = 'SYSTEM_MESSAGE',
}

/**
 * Severidad de las alertas
 */
export enum AlertSeverity {
  /** Informativo */
  Info = 'INFO',
  /** Advertencia */
  Warning = 'WARNING',
  /** Crítico/Urgente */
  Critical = 'CRITICAL',
  /** Positivo/Éxito */
  Success = 'SUCCESS',
}

/**
 * Configuración de una tarjeta KPI para la UI
 */
export interface IKpiCardConfig {
  /** Identificador del KPI */
  id: string;
  /** Título a mostrar */
  title: string;
  /** Icono de Ionicons */
  icon: string;
  /** Color del icono */
  iconColor: string;
  /** Propiedad del objeto IOperatorKpis */
  kpiKey: keyof IOperatorKpis;
  /** Formato de número (decimal, integer, percent) */
  format: 'decimal' | 'integer' | 'percent';
}

/**
 * Configuración de acceso directo (quick action)
 */
export interface IQuickAction {
  /** Identificador */
  id: string;
  /** Título del botón */
  title: string;
  /** Subtítulo o descripción breve */
  subtitle: string;
  /** Icono de Ionicons */
  icon: string;
  /** Ruta de navegación */
  route: string;
  /** Color de fondo */
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'gold';
  /** Indica si tiene badge de notificación */
  hasBadge?: boolean;
  /** Número del badge */
  badgeCount?: number;
}

/**
 * Configuración de tarjetas KPI por defecto
 */
export const DEFAULT_KPI_CARDS: IKpiCardConfig[] = [
  {
    id: 'km',
    title: 'Kilómetros',
    icon: 'speedometer-outline',
    iconColor: 'primary',
    kpiKey: 'kilometers',
    format: 'integer',
  },
  {
    id: 'fuel',
    title: 'Rendimiento',
    icon: 'water-outline',
    iconColor: 'success',
    kpiKey: 'fuelEfficiency',
    format: 'decimal',
  },
  {
    id: 'trips',
    title: 'Viajes',
    icon: 'navigate-outline',
    iconColor: 'tertiary',
    kpiKey: 'tripsCompleted',
    format: 'integer',
  },
  {
    id: 'rating',
    title: 'Calificación',
    icon: 'star-outline',
    iconColor: 'warning',
    kpiKey: 'serviceRating',
    format: 'decimal',
  },
];

/**
 * Accesos directos por defecto
 */
export const DEFAULT_QUICK_ACTIONS: IQuickAction[] = [
  {
    id: 'wallet',
    title: 'Mi Wallet',
    subtitle: 'Puntos y canjes',
    icon: 'wallet-outline',
    route: '/tabs/wallet',
    color: 'success',
  },
  {
    id: 'documents',
    title: 'Documentos',
    subtitle: 'Licencias y permisos',
    icon: 'document-text-outline',
    route: '/tabs/documents',
    color: 'primary',
    hasBadge: true,
    badgeCount: 2,
  },
  {
    id: 'routes',
    title: 'Mis Rutas',
    subtitle: 'Viajes asignados',
    icon: 'map-outline',
    route: '/tabs/routes',
    color: 'tertiary',
  },
  {
    id: 'support',
    title: 'Soporte',
    subtitle: 'Ayuda y contacto',
    icon: 'headset-outline',
    route: '/tabs/support',
    color: 'secondary',
  },
];
