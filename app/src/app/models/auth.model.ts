/**
 * Modelos de Autenticación - SPIO
 * Alineados con DTOs esperados en .NET 8 WebAPI
 */

/**
 * Request para inicio de sesión
 * Equivalente a LoginRequestDto en C#
 */
export interface ILoginRequest {
  /** Número de empleado o usuario */
  username: string;
  /** Contraseña del operador */
  password: string;
  /** Recordar sesión en dispositivo */
  rememberMe?: boolean;
}

/**
 * Respuesta de autenticación exitosa
 * Equivalente a AuthResponseDto en C#
 */
export interface IAuthResponse {
  /** Indica si la autenticación fue exitosa */
  success: boolean;
  /** Mensaje de respuesta (error o confirmación) */
  message: string;
  /** Token JWT para autenticación */
  accessToken: string | null;
  /** Token de refresco para renovar sesión */
  refreshToken: string | null;
  /** Fecha de expiración del token (ISO 8601) */
  expiresAt: string | null;
  /** Perfil del operador autenticado */
  operator: IOperatorProfile | null;
}

/**
 * Perfil del Operador
 * Equivalente a OperatorProfileDto en C#
 */
export interface IOperatorProfile {
  /** Identificador único (Guid en C#) */
  id: string;
  /** Número de empleado */
  employeeNumber: string;
  /** Nombre completo del operador */
  fullName: string;
  /** Nombre(s) */
  firstName: string;
  /** Apellido paterno */
  lastName: string;
  /** Apellido materno */
  motherLastName?: string;
  /** Correo electrónico */
  email: string;
  /** Teléfono de contacto */
  phone?: string;
  /** URL de la foto de perfil */
  avatarUrl?: string;
  /** Rol del usuario en el sistema */
  role: OperatorRole;
  /** Estado del operador */
  status: OperatorStatus;
  /** Información de gamificación */
  gamification: IOperatorGamification;
  /** Fecha de ingreso (ISO 8601) */
  hireDate: string;
  /** Fecha de último acceso (ISO 8601) */
  lastLoginAt?: string;
  /** Fecha de creación del registro */
  createdAt: string;
  /** Fecha de última actualización */
  updatedAt: string;
}

/**
 * Información de gamificación del operador
 * Equivalente a OperatorGamificationDto en C#
 */
export interface IOperatorGamification {
  /** Puntos SPIO acumulados */
  totalPoints: number;
  /** Puntos disponibles para canje */
  availablePoints: number;
  /** Nivel actual */
  level: OperatorLevel;
  /** Nombre del nivel actual */
  levelName: string;
  /** Progreso hacia el siguiente nivel (0-100) */
  progressToNextLevel: number;
  /** Puntos necesarios para el siguiente nivel */
  pointsToNextLevel: number;
  /** Total de kilómetros recorridos */
  totalKilometers: number;
  /** Ranking general entre operadores */
  ranking?: number;
}

/**
 * Roles de operador en el sistema
 */
export enum OperatorRole {
  /** Operador estándar de tractocamión */
  Operator = 'OPERATOR',
  /** Supervisor de flota */
  Supervisor = 'SUPERVISOR',
  /** Administrador del sistema */
  Admin = 'ADMIN',
}

/**
 * Estados posibles del operador
 */
export enum OperatorStatus {
  /** Activo y operando */
  Active = 'ACTIVE',
  /** Inactivo temporalmente */
  Inactive = 'INACTIVE',
  /** En vacaciones */
  OnLeave = 'ON_LEAVE',
  /** Suspendido */
  Suspended = 'SUSPENDED',
}

/**
 * Niveles de gamificación
 */
export enum OperatorLevel {
  /** Nivel inicial */
  Rookie = 'ROOKIE',
  /** Nivel bronce */
  Bronze = 'BRONZE',
  /** Nivel plata */
  Silver = 'SILVER',
  /** Nivel oro */
  Gold = 'GOLD',
  /** Nivel platino (élite) */
  Platinum = 'PLATINUM',
  /** Nivel diamante (máximo) */
  Diamond = 'DIAMOND',
}

/**
 * Mapeo de niveles a nombres en español
 */
export const LEVEL_DISPLAY_NAMES: Record<OperatorLevel, string> = {
  [OperatorLevel.Rookie]: 'Novato',
  [OperatorLevel.Bronze]: 'Piloto Bronce',
  [OperatorLevel.Silver]: 'Piloto Plata',
  [OperatorLevel.Gold]: 'Piloto Oro',
  [OperatorLevel.Platinum]: 'Piloto Platino',
  [OperatorLevel.Diamond]: 'Piloto Diamante',
};

/**
 * Mapeo de niveles a colores de gradiente
 */
export const LEVEL_GRADIENT_CLASSES: Record<OperatorLevel, string> = {
  [OperatorLevel.Rookie]: 'gradient-primary',
  [OperatorLevel.Bronze]: 'gradient-bronze',
  [OperatorLevel.Silver]: 'gradient-silver',
  [OperatorLevel.Gold]: 'gradient-gold',
  [OperatorLevel.Platinum]: 'gradient-silver',
  [OperatorLevel.Diamond]: 'gradient-gold',
};
