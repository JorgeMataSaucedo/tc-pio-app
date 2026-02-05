import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

import {
  IWalletSummary,
  IWalletTransaction,
  ITransactionFilter,
  ITransactionPagedResult,
  IRedemptionOption,
  TransactionType,
  TransactionCategory,
  TransactionStatus,
  RedemptionCategory,
  TRANSACTION_ICONS,
} from '../../models/wallet.model';

/**
 * Servicio Mock de Wallet
 * Simula las respuestas de una API .NET 8 WebAPI
 * Estilo Fintech premium
 */
@Injectable({
  providedIn: 'root',
})
export class WalletMockService {
  /** Signal para el resumen de wallet */
  private readonly _walletSummary = signal<IWalletSummary | null>(null);
  
  /** Computed: resumen reactivo */
  readonly walletSummary = computed(() => this._walletSummary());

  /** Tasa de conversión: 1 punto = 0.10 MXN */
  private readonly CONVERSION_RATE = 0.10;

  /**
   * Obtiene el resumen de la billetera
   */
  getWalletSummary(): Observable<IWalletSummary> {
    const summary: IWalletSummary = {
      walletId: 'wallet-001-jorge-ramirez',
      totalPoints: 15750,
      availablePoints: 8500,
      pendingPoints: 750,
      redeemedPoints: 6500,
      equivalentMxn: 8500 * this.CONVERSION_RATE,
      conversionRate: this.CONVERSION_RATE,
      lastUpdatedAt: new Date().toISOString(),
    };

    return new Observable<IWalletSummary>((observer) => {
      setTimeout(() => {
        this._walletSummary.set(summary);
        observer.next(summary);
        observer.complete();
      }, 100);
    });
  }

  /**
   * Obtiene el historial de transacciones paginado
   */
  getTransactions(filter: ITransactionFilter): Observable<ITransactionPagedResult> {
    const allTransactions = this.getMockTransactions();
    
    // Aplicar filtros
    let filtered = allTransactions;
    
    if (filter.type) {
      filtered = filtered.filter(t => t.type === filter.type);
    }
    
    if (filter.category) {
      filtered = filtered.filter(t => t.category === filter.category);
    }

    // Paginación
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / filter.pageSize);
    const startIndex = (filter.page - 1) * filter.pageSize;
    const items = filtered.slice(startIndex, startIndex + filter.pageSize);

    const result: ITransactionPagedResult = {
      items,
      totalCount,
      currentPage: filter.page,
      totalPages,
      hasNextPage: filter.page < totalPages,
      hasPreviousPage: filter.page > 1,
    };

    return of(result).pipe(delay(100));
  }

  /**
   * Obtiene opciones de canje disponibles
   */
  getRedemptionOptions(): Observable<IRedemptionOption[]> {
    const options: IRedemptionOption[] = [
      {
        id: 'redeem-001',
        name: 'Transferencia Bancaria',
        description: 'Recibe el equivalente en tu cuenta bancaria',
        pointsCost: 1000,
        valueMxn: 100,
        category: RedemptionCategory.Cash,
        isAvailable: true,
      },
      {
        id: 'redeem-002',
        name: 'Tarjeta Amazon $500',
        description: 'Gift card para compras en Amazon México',
        pointsCost: 5000,
        valueMxn: 500,
        category: RedemptionCategory.GiftCard,
        isAvailable: true,
        stock: 15,
      },
      {
        id: 'redeem-003',
        name: 'Vales de Gasolina',
        description: '500 pesos en vales de combustible',
        pointsCost: 4500,
        valueMxn: 500,
        category: RedemptionCategory.Fuel,
        isAvailable: true,
      },
      {
        id: 'redeem-004',
        name: 'Día de Descanso Extra',
        description: 'Un día adicional de descanso pagado',
        pointsCost: 10000,
        valueMxn: 0,
        category: RedemptionCategory.Services,
        isAvailable: true,
        stock: 5,
      },
    ];

    return of(options).pipe(delay(100));
  }

  /**
   * Solicita un canje de puntos
   */
  requestRedemption(optionId: string, points: number): Observable<boolean> {
    // Simular proceso de canje
    console.log(`Solicitud de canje: ${optionId} por ${points} puntos`);
    return of(true).pipe(delay(1500));
  }

  /**
   * Genera transacciones mock realistas
   */
  private getMockTransactions(): IWalletTransaction[] {
    const now = new Date();
    let balance = 8500;

    const transactions: IWalletTransaction[] = [
      {
        id: 'txn-001',
        transactionDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 500,
        type: TransactionType.Credit,
        category: TransactionCategory.FuelBonus,
        description: 'Bono de Rendimiento',
        reference: 'Rendimiento 3.4 km/L - Ruta MTY-GDL',
        status: TransactionStatus.Completed,
        balanceAfter: balance,
        icon: TRANSACTION_ICONS[TransactionCategory.FuelBonus],
      },
      {
        id: 'txn-002',
        transactionDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 350,
        type: TransactionType.Credit,
        category: TransactionCategory.TripBonus,
        description: 'Bono por Viaje Completado',
        reference: 'Viaje #VJ-2024-1847 completado',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500,
        icon: TRANSACTION_ICONS[TransactionCategory.TripBonus],
      },
      {
        id: 'txn-003',
        transactionDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        amount: -2000,
        type: TransactionType.Debit,
        category: TransactionCategory.CashRedemption,
        description: 'Canje a Efectivo',
        reference: 'Transferencia a cuenta *4532',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350,
        icon: TRANSACTION_ICONS[TransactionCategory.CashRedemption],
      },
      {
        id: 'txn-004',
        transactionDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 200,
        type: TransactionType.Credit,
        category: TransactionCategory.PunctualityBonus,
        description: 'Bono de Puntualidad',
        reference: '100% entregas a tiempo - Semana 4',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000,
        icon: TRANSACTION_ICONS[TransactionCategory.PunctualityBonus],
      },
      {
        id: 'txn-005',
        transactionDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 1000,
        type: TransactionType.Credit,
        category: TransactionCategory.SafetyBonus,
        description: 'Bono de Seguridad',
        reference: '30 días sin incidentes',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000 - 200,
        icon: TRANSACTION_ICONS[TransactionCategory.SafetyBonus],
      },
      {
        id: 'txn-006',
        transactionDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 750,
        type: TransactionType.Credit,
        category: TransactionCategory.Achievement,
        description: 'Logro Desbloqueado',
        reference: '¡Piloto Veterano! - 50,000 km recorridos',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000 - 200 - 1000,
        icon: TRANSACTION_ICONS[TransactionCategory.Achievement],
      },
      {
        id: 'txn-007',
        transactionDate: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 300,
        type: TransactionType.Credit,
        category: TransactionCategory.TripBonus,
        description: 'Bono por Viaje Completado',
        reference: 'Viaje #VJ-2024-1798 completado',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000 - 200 - 1000 - 750,
        icon: TRANSACTION_ICONS[TransactionCategory.TripBonus],
      },
      {
        id: 'txn-008',
        transactionDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        amount: -1500,
        type: TransactionType.Debit,
        category: TransactionCategory.ProductRedemption,
        description: 'Canje de Producto',
        reference: 'Tarjeta Amazon $150',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000 - 200 - 1000 - 750 - 300,
        icon: TRANSACTION_ICONS[TransactionCategory.ProductRedemption],
      },
      {
        id: 'txn-009',
        transactionDate: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 450,
        type: TransactionType.Credit,
        category: TransactionCategory.FuelBonus,
        description: 'Bono de Rendimiento',
        reference: 'Rendimiento 3.2 km/L - Ruta CDMX-QRO',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000 - 200 - 1000 - 750 - 300 + 1500,
        icon: TRANSACTION_ICONS[TransactionCategory.FuelBonus],
      },
      {
        id: 'txn-010',
        transactionDate: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 500,
        type: TransactionType.Credit,
        category: TransactionCategory.SpecialBonus,
        description: 'Bono Especial',
        reference: 'Programa Operador Estrella - Febrero',
        status: TransactionStatus.Completed,
        balanceAfter: balance - 500 - 350 + 2000 - 200 - 1000 - 750 - 300 + 1500 - 450,
        icon: TRANSACTION_ICONS[TransactionCategory.SpecialBonus],
      },
      {
        id: 'txn-011',
        transactionDate: new Date(now.getTime() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 250,
        type: TransactionType.Credit,
        category: TransactionCategory.TripBonus,
        description: 'Bono por Viaje',
        reference: 'Viaje #VJ-2024-1892 - En proceso',
        status: TransactionStatus.Pending,
        balanceAfter: balance,
        icon: TRANSACTION_ICONS[TransactionCategory.TripBonus],
      },
    ];

    // Ordenar por fecha descendente
    return transactions.sort(
      (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
    );
  }

  /**
   * Formatea puntos con separador de miles
   */
  formatPoints(points: number): string {
    return points.toLocaleString('es-MX');
  }

  /**
   * Convierte puntos a MXN
   */
  pointsToMxn(points: number): number {
    return points * this.CONVERSION_RATE;
  }
}
