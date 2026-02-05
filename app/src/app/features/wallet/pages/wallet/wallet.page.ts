import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonIcon,
  IonBadge,
  IonButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonChip,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRippleEffect,
  IonNote,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  walletOutline,
  cashOutline,
  trendingUpOutline,
  trendingDownOutline,
  timeOutline,
  chevronForwardOutline,
  filterOutline,
  arrowUpOutline,
  arrowDownOutline,
  waterOutline,
  navigateOutline,
  shieldCheckmarkOutline,
  trophyOutline,
  giftOutline,
  peopleOutline,
  starOutline,
  createOutline,
  swapHorizontalOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';

import { WalletMockService } from '../../../../core/services/wallet.mock.service';
import {
  IWalletSummary,
  IWalletTransaction,
  ITransactionFilter,
  TransactionType,
  CATEGORY_DISPLAY_NAMES,
} from '../../../../models/wallet.model';

/**
 * Página Wallet - SPIO
 * Billetera virtual estilo Fintech premium
 */
@Component({
  selector: 'app-wallet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonIcon,
    IonBadge,
    IonButton,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonText,
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonChip,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRippleEffect,
    IonNote,
  ],
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  private readonly walletService = inject(WalletMockService);
  private readonly modalCtrl = inject(ModalController);

  /** Estados */
  isLoading = signal<boolean>(true);
  isLoadingMore = signal<boolean>(false);
  showBalance = signal<boolean>(true);

  /** Datos */
  walletSummary = signal<IWalletSummary | null>(null);
  transactions = signal<IWalletTransaction[]>([]);
  
  /** Filtros */
  selectedFilter = signal<'all' | 'income' | 'expense'>('all');
  currentPage = signal<number>(1);
  hasMoreData = signal<boolean>(true);

  /** Computed: Saldo formateado */
  formattedBalance = computed(() => {
    const summary = this.walletSummary();
    if (!summary) return '0';
    return summary.availablePoints.toLocaleString('es-MX');
  });

  /** Computed: Equivalente en MXN */
  equivalentMxn = computed(() => {
    const summary = this.walletSummary();
    if (!summary) return '0.00';
    return summary.equivalentMxn.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  /** Computed: Transacciones filtradas */
  filteredTransactions = computed(() => {
    const txns = this.transactions();
    const filter = this.selectedFilter();

    if (filter === 'all') return txns;
    if (filter === 'income') return txns.filter(t => t.type === TransactionType.Credit);
    if (filter === 'expense') return txns.filter(t => t.type === TransactionType.Debit);
    return txns;
  });

  /** Mapeo de nombres de categoría */
  categoryNames = CATEGORY_DISPLAY_NAMES;

  constructor() {
    addIcons({
      walletOutline,
      cashOutline,
      trendingUpOutline,
      trendingDownOutline,
      timeOutline,
      chevronForwardOutline,
      filterOutline,
      arrowUpOutline,
      arrowDownOutline,
      waterOutline,
      navigateOutline,
      shieldCheckmarkOutline,
      trophyOutline,
      giftOutline,
      peopleOutline,
      starOutline,
      createOutline,
      swapHorizontalOutline,
      eyeOutline,
      eyeOffOutline,
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Carga inicial de datos
   */
  loadData(): void {
    this.isLoading.set(true);

    // Cargar resumen
    this.walletService.getWalletSummary().subscribe({
      next: (summary) => {
        this.walletSummary.set(summary);
      },
    });

    // Cargar transacciones
    this.loadTransactions(true);
  }

  /**
   * Carga transacciones
   */
  loadTransactions(reset = false): void {
    if (reset) {
      this.currentPage.set(1);
      this.transactions.set([]);
    }

    const filter: ITransactionFilter = {
      type: this.getTypeFilter(),
      page: this.currentPage(),
      pageSize: 10,
    };

    this.walletService.getTransactions(filter).subscribe({
      next: (result) => {
        if (reset) {
          this.transactions.set(result.items);
        } else {
          this.transactions.update(txns => [...txns, ...result.items]);
        }
        this.hasMoreData.set(result.hasNextPage);
        this.isLoading.set(false);
        this.isLoadingMore.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.isLoadingMore.set(false);
      },
    });
  }

  /**
   * Obtiene el filtro de tipo según selección
   */
  private getTypeFilter(): TransactionType | null {
    const filter = this.selectedFilter();
    if (filter === 'income') return TransactionType.Credit;
    if (filter === 'expense') return TransactionType.Debit;
    return null;
  }

  /**
   * Maneja el cambio de filtro
   */
  onFilterChange(event: CustomEvent): void {
    this.selectedFilter.set(event.detail.value);
    this.loadTransactions(true);
  }

  /**
   * Pull to refresh
   */
  handleRefresh(event: CustomEvent): void {
    this.loadData();
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 1000);
  }

  /**
   * Infinite scroll
   */
  loadMore(event: CustomEvent): void {
    if (!this.hasMoreData()) {
      (event.target as HTMLIonInfiniteScrollElement).complete();
      return;
    }

    this.isLoadingMore.set(true);
    this.currentPage.update(p => p + 1);
    this.loadTransactions(false);

    setTimeout(() => {
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 500);
  }

  /**
   * Toggle mostrar/ocultar saldo
   */
  toggleBalanceVisibility(): void {
    this.showBalance.update(v => !v);
  }

  /**
   * Navega a la pantalla de canje
   */
  goToRedeem(): void {
    // TODO: Implementar modal o página de canje
    console.log('Ir a canje');
  }

  /**
   * Formatea la fecha de transacción
   */
  formatTransactionDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
    });
  }

  /**
   * Verifica si es una transacción de ingreso
   */
  isIncome(transaction: IWalletTransaction): boolean {
    return transaction.type === TransactionType.Credit;
  }
}
