import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonBadge,
  IonProgressBar,
  IonText,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonAvatar,
  IonChip,
  IonLabel,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  walletOutline,
  documentTextOutline,
  mapOutline,
  headsetOutline,
  speedometerOutline,
  waterOutline,
  navigateOutline,
  starOutline,
  trendingUpOutline,
  trendingDownOutline,
  notificationsOutline,
  trophyOutline,
  flameOutline,
  ribbonOutline,
  chevronForwardOutline,
  refreshOutline,
} from 'ionicons/icons';

import { DashboardMockService } from '../../../../core/services/dashboard.mock.service';
import { AuthMockService } from '../../../../core/services/auth.mock.service';
import {
  IDashboardStats,
  IGamificationSummary,
  IOperatorKpis,
  IKpiCardConfig,
  IQuickAction,
  DEFAULT_KPI_CARDS,
  DEFAULT_QUICK_ACTIONS,
} from '../../../../models/dashboard.model';
import {
  OperatorLevel,
  LEVEL_GRADIENT_CLASSES,
} from '../../../../models/auth.model';

/**
 * Página Dashboard - SPIO
 * Pantalla principal del operador con gamificación, KPIs y accesos rápidos
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DecimalPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonBadge,
    IonProgressBar,
    IonText,
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonChip,
    IonLabel,
    IonRippleEffect,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  /** Inyección de dependencias */
  private readonly router = inject(Router);
  private readonly dashboardService = inject(DashboardMockService);
  private readonly authService = inject(AuthMockService);

  /** Estado de carga */
  isLoading = signal<boolean>(true);

  /** Datos del dashboard */
  dashboardStats = signal<IDashboardStats | null>(null);

  /** Configuración de tarjetas KPI */
  kpiCards: IKpiCardConfig[] = DEFAULT_KPI_CARDS;

  /** Accesos rápidos */
  quickActions: IQuickAction[] = DEFAULT_QUICK_ACTIONS;

  /** Computed: Saludo personalizado */
  greeting = computed(() => this.dashboardService.getGreeting());

  /** Computed: Nombre del operador */
  operatorName = computed(() => this.dashboardService.operatorFirstName());

  /** Computed: Avatar del operador */
  operatorAvatar = computed(() => this.dashboardService.operatorAvatar());

  /** Computed: Gamificación */
  gamification = computed(() => this.dashboardStats()?.gamification);

  /** Computed: KPIs */
  kpis = computed(() => this.dashboardStats()?.kpis);

  /** Computed: Alertas no leídas */
  unreadAlerts = computed(() => {
    const alerts = this.dashboardStats()?.alerts ?? [];
    return alerts.filter(a => !a.isRead).length;
  });

  /** Computed: Clase de gradiente según nivel */
  levelGradientClass = computed(() => {
    const level = this.gamification()?.currentLevel ?? OperatorLevel.Gold;
    return LEVEL_GRADIENT_CLASSES[level];
  });

  constructor() {
    addIcons({
      walletOutline,
      documentTextOutline,
      mapOutline,
      headsetOutline,
      speedometerOutline,
      waterOutline,
      navigateOutline,
      starOutline,
      trendingUpOutline,
      trendingDownOutline,
      notificationsOutline,
      trophyOutline,
      flameOutline,
      ribbonOutline,
      chevronForwardOutline,
      refreshOutline,
    });
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Carga los datos del dashboard
   */
  loadDashboardData(): void {
    this.isLoading.set(true);

    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats.set(stats);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Refresca los datos (pull-to-refresh)
   */
  handleRefresh(event: CustomEvent): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats.set(stats);
        (event.target as HTMLIonRefresherElement).complete();
      },
      error: () => {
        (event.target as HTMLIonRefresherElement).complete();
      },
    });
  }

  /**
   * Navega a una ruta específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Obtiene el valor de un KPI específico
   */
  getKpiValue(kpiKey: keyof IOperatorKpis): number {
    const kpis = this.kpis();
    if (!kpis) return 0;
    return kpis[kpiKey]?.value ?? 0;
  }

  /**
   * Obtiene la unidad de un KPI
   */
  getKpiUnit(kpiKey: keyof IOperatorKpis): string {
    const kpis = this.kpis();
    if (!kpis) return '';
    return kpis[kpiKey]?.unit ?? '';
  }

  /**
   * Obtiene la variación de un KPI
   */
  getKpiVariation(kpiKey: keyof IOperatorKpis): number {
    const kpis = this.kpis();
    if (!kpis) return 0;
    return kpis[kpiKey]?.variation ?? 0;
  }

  /**
   * Verifica si la tendencia es positiva
   */
  isPositiveTrend(kpiKey: keyof IOperatorKpis): boolean {
    const kpis = this.kpis();
    if (!kpis) return true;
    return kpis[kpiKey]?.isPositiveTrend ?? true;
  }

  /**
   * Formatea el valor del KPI según el formato especificado
   */
  formatKpiValue(value: number, format: 'decimal' | 'integer' | 'percent'): string {
    switch (format) {
      case 'decimal':
        return value.toFixed(1);
      case 'percent':
        return `${value.toFixed(1)}%`;
      case 'integer':
      default:
        return value.toLocaleString('es-MX');
    }
  }

  /**
   * Abre la página de notificaciones
   */
  openNotifications(): void {
    this.router.navigate(['/tabs/notifications']);
  }

  /**
   * Navega a la página de logros/gamificación
   */
  viewAchievements(): void {
    // TODO: Implementar página de logros
    console.log('Ver logros');
  }
}
