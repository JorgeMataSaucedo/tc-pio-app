/**
 * Modelos de Wallet - SPIO
 * Billetera Virtual estilo Fintech
 * Alineados con DTOs esperados en .NET 8 WebAPI
 */

/**
 * Resumen de la billetera del operador
 * Equivalente a WalletSummaryDto en C#
 */
export interface IWalletSummary {
  /** Identificador único de la wallet */
  walletId: string;
  /** Saldo total en puntos SPIO */
  totalPoints: number;
  /** Puntos disponibles para canje */
  availablePoints: number;
  /** Puntos pendientes de acreditación */
  pendingPoints: number;
  /** Puntos canjeados históricamente */
  redeemedPoints: number;
  /** Equivalencia en MXN (tasa de conversión) */
  equivalentMxn: number;
  /** Tasa de conversión puntos -> MXN */
  conversionRate: number;
  /** Fecha de última actualización */
  lastUpdatedAt: string;
}

/**
 * Transacción de la billetera
 * Equivalente a WalletTransactionDto en C#
 */
export interface IWalletTransaction {
  /** Identificador único (Guid en C#) */
  id: string;
  /** Fecha y hora de la transacción (ISO 8601) */
  transactionDate: string;
  /** Monto de la transacción (positivo o negativo) */
  amount: number;
  /** Tipo de transacción */
  type: TransactionType;
  /** Categoría de la transacción */
  category: TransactionCategory;
  /** Descripción/concepto de la transacción */
  description: string;
  /** Descripción adicional o referencia */
  reference?: string;
  /** Estado de la transacción */
  status: TransactionStatus;
  /** Saldo resultante después de la transacción */
  balanceAfter: number;
  /** Icono sugerido para la UI */
  icon: string;
}

/**
 * Tipos de transacción
 */
export enum TransactionType {
  /** Ingreso de puntos */
  Credit = 'CREDIT',
  /** Egreso/canje de puntos */
  Debit = 'DEBIT',
}

/**
 * Categorías de transacción
 */
export enum TransactionCategory {
  /** Bono por rendimiento de combustible */
  FuelBonus = 'FUEL_BONUS',
  /** Bono por viajes completados */
  TripBonus = 'TRIP_BONUS',
  /** Bono por puntualidad */
  PunctualityBonus = 'PUNCTUALITY_BONUS',
  /** Bono por seguridad (sin incidentes) */
  SafetyBonus = 'SAFETY_BONUS',
  /** Canje por efectivo */
  CashRedemption = 'CASH_REDEMPTION',
  /** Canje por producto/servicio */
  ProductRedemption = 'PRODUCT_REDEMPTION',
  /** Bono referido */
  ReferralBonus = 'REFERRAL_BONUS',
  /** Bono especial/promoción */
  SpecialBonus = 'SPECIAL_BONUS',
  /** Ajuste administrativo */
  Adjustment = 'ADJUSTMENT',
  /** Logro desbloqueado */
  Achievement = 'ACHIEVEMENT',
}

/**
 * Estados de transacción
 */
export enum TransactionStatus {
  /** Completada */
  Completed = 'COMPLETED',
  /** Pendiente de procesamiento */
  Pending = 'PENDING',
  /** Cancelada */
  Cancelled = 'CANCELLED',
}

/**
 * Opción de canje disponible
 * Equivalente a RedemptionOptionDto en C#
 */
export interface IRedemptionOption {
  /** Identificador único */
  id: string;
  /** Nombre del producto/servicio */
  name: string;
  /** Descripción */
  description: string;
  /** Costo en puntos */
  pointsCost: number;
  /** Valor equivalente en MXN */
  valueMxn: number;
  /** Categoría del canje */
  category: RedemptionCategory;
  /** URL de imagen */
  imageUrl?: string;
  /** Indica si está disponible */
  isAvailable: boolean;
  /** Stock disponible (null = ilimitado) */
  stock?: number;
}

/**
 * Categorías de canje
 */
export enum RedemptionCategory {
  /** Efectivo/transferencia */
  Cash = 'CASH',
  /** Tarjeta de regalo */
  GiftCard = 'GIFT_CARD',
  /** Combustible */
  Fuel = 'FUEL',
  /** Servicios */
  Services = 'SERVICES',
  /** Productos */
  Products = 'PRODUCTS',
}

/**
 * Configuración de iconos por categoría
 */
export const TRANSACTION_ICONS: Record<TransactionCategory, string> = {
  [TransactionCategory.FuelBonus]: 'water-outline',
  [TransactionCategory.TripBonus]: 'navigate-outline',
  [TransactionCategory.PunctualityBonus]: 'time-outline',
  [TransactionCategory.SafetyBonus]: 'shield-checkmark-outline',
  [TransactionCategory.CashRedemption]: 'cash-outline',
  [TransactionCategory.ProductRedemption]: 'gift-outline',
  [TransactionCategory.ReferralBonus]: 'people-outline',
  [TransactionCategory.SpecialBonus]: 'star-outline',
  [TransactionCategory.Adjustment]: 'create-outline',
  [TransactionCategory.Achievement]: 'trophy-outline',
};

/**
 * Nombres de categoría para mostrar
 */
export const CATEGORY_DISPLAY_NAMES: Record<TransactionCategory, string> = {
  [TransactionCategory.FuelBonus]: 'Bono de Rendimiento',
  [TransactionCategory.TripBonus]: 'Bono de Viaje',
  [TransactionCategory.PunctualityBonus]: 'Bono de Puntualidad',
  [TransactionCategory.SafetyBonus]: 'Bono de Seguridad',
  [TransactionCategory.CashRedemption]: 'Canje a Efectivo',
  [TransactionCategory.ProductRedemption]: 'Canje de Producto',
  [TransactionCategory.ReferralBonus]: 'Bono por Referido',
  [TransactionCategory.SpecialBonus]: 'Bono Especial',
  [TransactionCategory.Adjustment]: 'Ajuste',
  [TransactionCategory.Achievement]: 'Logro Desbloqueado',
};

/**
 * Filtro de transacciones
 */
export interface ITransactionFilter {
  /** Tipo de transacción (null = todos) */
  type?: TransactionType | null;
  /** Categoría (null = todas) */
  category?: TransactionCategory | null;
  /** Fecha desde */
  dateFrom?: string;
  /** Fecha hasta */
  dateTo?: string;
  /** Página actual */
  page: number;
  /** Elementos por página */
  pageSize: number;
}

/**
 * Respuesta paginada de transacciones
 */
export interface ITransactionPagedResult {
  /** Lista de transacciones */
  items: IWalletTransaction[];
  /** Total de elementos */
  totalCount: number;
  /** Página actual */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Tiene página siguiente */
  hasNextPage: boolean;
  /** Tiene página anterior */
  hasPreviousPage: boolean;
}
