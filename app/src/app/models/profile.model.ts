/**
 * Modelos de Perfil - SPIO
 * Información extendida del operador
 * Alineados con DTOs esperados en .NET 8 WebAPI
 */

import { OperatorLevel, OperatorRole, OperatorStatus } from './auth.model';

/**
 * Perfil extendido del operador
 * Equivalente a OperatorProfileExtendedDto en C#
 */
export interface IOperatorProfileExtended {
  /** Información básica */
  basic: IBasicInfo;
  /** Información de contacto */
  contact: IContactInfo;
  /** Información laboral */
  employment: IEmploymentInfo;
  /** Estadísticas de gamificación */
  gamification: IGamificationStats;
  /** Logros desbloqueados */
  achievements: IAchievement[];
  /** Configuración de preferencias */
  preferences: IUserPreferences;
}

/**
 * Información básica del operador
 */
export interface IBasicInfo {
  /** ID único */
  id: string;
  /** Número de empleado */
  employeeNumber: string;
  /** Nombre completo */
  fullName: string;
  /** Nombre(s) */
  firstName: string;
  /** Apellido paterno */
  lastName: string;
  /** Apellido materno */
  motherLastName?: string;
  /** Fecha de nacimiento */
  birthDate: string;
  /** Edad calculada */
  age: number;
  /** URL del avatar */
  avatarUrl?: string;
  /** CURP */
  curp?: string;
  /** RFC */
  rfc?: string;
}

/**
 * Información de contacto
 */
export interface IContactInfo {
  /** Correo electrónico */
  email: string;
  /** Teléfono principal */
  phone: string;
  /** Teléfono de emergencia */
  emergencyPhone?: string;
  /** Nombre del contacto de emergencia */
  emergencyContact?: string;
  /** Dirección completa */
  address?: string;
  /** Ciudad */
  city?: string;
  /** Estado */
  state?: string;
  /** Código postal */
  zipCode?: string;
}

/**
 * Información laboral
 */
export interface IEmploymentInfo {
  /** Rol en el sistema */
  role: OperatorRole;
  /** Estado actual */
  status: OperatorStatus;
  /** Fecha de ingreso */
  hireDate: string;
  /** Antigüedad en texto */
  seniority: string;
  /** Años de antigüedad */
  seniorityYears: number;
  /** Unidad asignada */
  assignedUnit?: string;
  /** Placa de la unidad */
  unitPlate?: string;
  /** Base operativa */
  operationalBase?: string;
  /** Supervisor directo */
  supervisorName?: string;
  /** Tipo de contrato */
  contractType?: string;
  /** Número de licencia federal */
  federalLicenseNumber?: string;
}

/**
 * Estadísticas de gamificación extendidas
 */
export interface IGamificationStats {
  /** Nivel actual */
  currentLevel: OperatorLevel;
  /** Nombre del nivel */
  levelName: string;
  /** Puntos totales históricos */
  totalPointsEarned: number;
  /** Puntos disponibles */
  availablePoints: number;
  /** Puntos canjeados */
  redeemedPoints: number;
  /** Posición en ranking */
  rankingPosition: number;
  /** Total de operadores */
  totalOperators: number;
  /** Kilómetros totales recorridos */
  totalKilometers: number;
  /** Viajes completados */
  totalTrips: number;
  /** Calificación promedio */
  averageRating: number;
  /** Días de racha actual */
  currentStreak: number;
  /** Mejor racha histórica */
  bestStreak: number;
  /** Logros desbloqueados */
  achievementsUnlocked: number;
  /** Total de logros disponibles */
  totalAchievements: number;
}

/**
 * Logro del operador
 */
export interface IAchievement {
  /** ID único */
  id: string;
  /** Nombre del logro */
  name: string;
  /** Descripción */
  description: string;
  /** Icono */
  icon: string;
  /** Categoría */
  category: AchievementCategory;
  /** Puntos otorgados */
  points: number;
  /** Indica si está desbloqueado */
  isUnlocked: boolean;
  /** Fecha de desbloqueo */
  unlockedAt?: string;
  /** Progreso actual (0-100) */
  progress: number;
  /** Requisito para desbloquear */
  requirement: string;
  /** Rareza del logro */
  rarity: AchievementRarity;
}

/**
 * Categorías de logros
 */
export enum AchievementCategory {
  /** Kilómetros recorridos */
  Distance = 'DISTANCE',
  /** Viajes completados */
  Trips = 'TRIPS',
  /** Eficiencia de combustible */
  Fuel = 'FUEL',
  /** Seguridad */
  Safety = 'SAFETY',
  /** Puntualidad */
  Punctuality = 'PUNCTUALITY',
  /** Antigüedad */
  Seniority = 'SENIORITY',
  /** Especiales */
  Special = 'SPECIAL',
}

/**
 * Rareza de logros
 */
export enum AchievementRarity {
  /** Común */
  Common = 'COMMON',
  /** Poco común */
  Uncommon = 'UNCOMMON',
  /** Raro */
  Rare = 'RARE',
  /** Épico */
  Epic = 'EPIC',
  /** Legendario */
  Legendary = 'LEGENDARY',
}

/**
 * Preferencias del usuario
 */
export interface IUserPreferences {
  /** Notificaciones push habilitadas */
  pushNotifications: boolean;
  /** Notificaciones por email */
  emailNotifications: boolean;
  /** Alertas de documentos */
  documentAlerts: boolean;
  /** Resumen semanal */
  weeklySummary: boolean;
  /** Idioma preferido */
  language: string;
  /** Tema (light/dark/auto) */
  theme: 'light' | 'dark' | 'auto';
}

/**
 * Opción del menú de perfil
 */
export interface IProfileMenuOption {
  /** ID único */
  id: string;
  /** Título */
  title: string;
  /** Subtítulo */
  subtitle?: string;
  /** Icono */
  icon: string;
  /** Ruta de navegación */
  route?: string;
  /** Acción a ejecutar */
  action?: string;
  /** Color del icono */
  iconColor?: string;
  /** Indica si es destructivo (ej: logout) */
  isDestructive?: boolean;
  /** Badge/contador */
  badge?: number;
}

/**
 * Colores por rareza de logro
 */
export const RARITY_COLORS: Record<AchievementRarity, string> = {
  [AchievementRarity.Common]: '#9E9E9E',
  [AchievementRarity.Uncommon]: '#4CAF50',
  [AchievementRarity.Rare]: '#2196F3',
  [AchievementRarity.Epic]: '#9C27B0',
  [AchievementRarity.Legendary]: '#FF9800',
};

/**
 * Nombres de rareza
 */
export const RARITY_NAMES: Record<AchievementRarity, string> = {
  [AchievementRarity.Common]: 'Común',
  [AchievementRarity.Uncommon]: 'Poco Común',
  [AchievementRarity.Rare]: 'Raro',
  [AchievementRarity.Epic]: 'Épico',
  [AchievementRarity.Legendary]: 'Legendario',
};
