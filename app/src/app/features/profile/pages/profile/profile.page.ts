import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonButton,
  IonAvatar,
  IonText,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonChip,
  IonProgressBar,
  IonRippleEffect,
  IonNote,
  AlertController,
  LoadingController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  trophyOutline,
  statsChartOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  chevronForwardOutline,
  ribbonOutline,
  flameOutline,
  starOutline,
  medalOutline,
  calendarOutline,
  briefcaseOutline,
  callOutline,
  mailOutline,
  locationOutline,
  settingsOutline,
  createOutline,
  cameraOutline,
} from 'ionicons/icons';

import { ProfileMockService } from '../../../../core/services/profile.mock.service';
import { AuthMockService } from '../../../../core/services/auth.mock.service';
import {
  IOperatorProfileExtended,
  IProfileMenuOption,
  RARITY_COLORS,
} from '../../../../models/profile.model';
import {
  OperatorLevel,
  LEVEL_DISPLAY_NAMES,
  LEVEL_GRADIENT_CLASSES,
} from '../../../../models/auth.model';

/**
 * Página Perfil - SPIO
 * Información completa del operador con logout
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonBadge,
    IonButton,
    IonAvatar,
    IonText,
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonChip,
    IonProgressBar,
    IonRippleEffect,
    IonNote,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private readonly router = inject(Router);
  private readonly profileService = inject(ProfileMockService);
  private readonly authService = inject(AuthMockService);
  private readonly alertCtrl = inject(AlertController);
  private readonly loadingCtrl = inject(LoadingController);

  /** Estados */
  isLoading = signal<boolean>(true);
  
  /** Datos */
  profile = signal<IOperatorProfileExtended | null>(null);
  menuOptions = signal<IProfileMenuOption[]>([]);

  /** Computed: Información básica */
  basicInfo = computed(() => this.profile()?.basic);
  
  /** Computed: Información de empleo */
  employmentInfo = computed(() => this.profile()?.employment);
  
  /** Computed: Gamificación */
  gamificationStats = computed(() => this.profile()?.gamification);

  /** Computed: Clase de gradiente según nivel */
  levelGradientClass = computed(() => {
    const level = this.gamificationStats()?.currentLevel ?? OperatorLevel.Gold;
    return LEVEL_GRADIENT_CLASSES[level];
  });

  /** Computed: Progreso de logros */
  achievementProgress = computed(() => {
    const stats = this.gamificationStats();
    if (!stats) return 0;
    return stats.achievementsUnlocked / stats.totalAchievements;
  });

  constructor() {
    addIcons({
      personOutline,
      trophyOutline,
      statsChartOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      helpCircleOutline,
      informationCircleOutline,
      logOutOutline,
      chevronForwardOutline,
      ribbonOutline,
      flameOutline,
      starOutline,
      medalOutline,
      calendarOutline,
      briefcaseOutline,
      callOutline,
      mailOutline,
      locationOutline,
      settingsOutline,
      createOutline,
      cameraOutline,
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
    this.menuOptions.set(this.profileService.getMenuOptions());

    this.profileService.getExtendedProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
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
   * Maneja la acción del menú
   */
  handleMenuAction(option: IProfileMenuOption): void {
    if (option.action === 'logout') {
      this.confirmLogout();
    } else if (option.route) {
      this.router.navigate([option.route]);
    }
  }

  /**
   * Confirma el cierre de sesión
   */
  async confirmLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar tu sesión?',
      cssClass: 'spio-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          role: 'destructive',
          handler: () => {
            this.performLogout();
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Ejecuta el cierre de sesión
   */
  private async performLogout(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Cerrando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    this.authService.logout().subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: () => {
        loading.dismiss();
      },
    });
  }

  /**
   * Abre la edición de foto de perfil
   */
  async editProfilePhoto(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar Foto',
      message: 'Esta función estará disponible próximamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  /**
   * Formatea el número con separadores
   */
  formatNumber(value: number): string {
    return value.toLocaleString('es-MX');
  }
}
