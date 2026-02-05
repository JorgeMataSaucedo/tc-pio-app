import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonChip, IonLabel } from '@ionic/angular/standalone';
import { OperatorLevel, LEVEL_DISPLAY_NAMES, LEVEL_GRADIENT_CLASSES } from '../../../models/auth.model';

/**
 * Componente reutilizable de badge de nivel
 * Muestra el nivel de gamificación del operador
 */
@Component({
  selector: 'app-level-badge',
  standalone: true,
  imports: [CommonModule, IonIcon, IonChip, IonLabel],
  template: `
    <div class="level-badge" [ngClass]="gradientClass" [class]="size">
      <ion-icon [name]="icon"></ion-icon>
      <span class="level-name">{{ levelName }}</span>
    </div>
  `,
  styles: [`
    .level-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 20px;
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

      ion-icon {
        font-size: 18px;
      }

      &.small {
        padding: 4px 10px;
        font-size: 12px;

        ion-icon {
          font-size: 14px;
        }
      }

      &.large {
        padding: 8px 18px;
        font-size: 16px;

        ion-icon {
          font-size: 22px;
        }
      }

      // Gradientes
      &.gradient-gold {
        background: linear-gradient(135deg, #FFB300 0%, #FF8F00 100%);
      }

      &.gradient-silver {
        background: linear-gradient(135deg, #B0BEC5 0%, #78909C 100%);
      }

      &.gradient-bronze {
        background: linear-gradient(135deg, #A1887F 0%, #8D6E63 100%);
      }

      &.gradient-primary {
        background: linear-gradient(135deg, #EF5350 0%, #B71C1C 100%);
      }
    }
  `],
})
export class LevelBadgeComponent {
  @Input() level: OperatorLevel = OperatorLevel.Rookie;
  @Input() icon: string = 'ribbon-outline';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get levelName(): string {
    return LEVEL_DISPLAY_NAMES[this.level];
  }

  get gradientClass(): string {
    return LEVEL_GRADIENT_CLASSES[this.level];
  }
}
