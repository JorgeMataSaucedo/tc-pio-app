import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonIcon, IonRippleEffect } from '@ionic/angular/standalone';

/**
 * Componente reutilizable de tarjeta de estadística
 * Diseño premium para KPIs
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonIcon, IonRippleEffect],
  template: `
    <ion-card class="stat-card" [class.clickable]="clickable" button="true">
      <ion-card-content class="stat-content">
        <div class="stat-icon" [attr.data-color]="iconColor">
          <ion-icon [name]="icon"></ion-icon>
        </div>
        <div class="stat-value">
          {{ formattedValue }}
          <span class="stat-unit" *ngIf="unit">{{ unit }}</span>
        </div>
        <div class="stat-label">{{ label }}</div>
        <div 
          class="stat-trend" 
          *ngIf="trend !== undefined"
          [class.positive]="trend >= 0"
          [class.negative]="trend < 0"
        >
          <ion-icon [name]="trend >= 0 ? 'trending-up-outline' : 'trending-down-outline'"></ion-icon>
          <span>{{ trend > 0 ? '+' : '' }}{{ trend }}%</span>
        </div>
      </ion-card-content>
      <ion-ripple-effect *ngIf="clickable"></ion-ripple-effect>
    </ion-card>
  `,
  styles: [`
    .stat-card {
      margin: 0;
      border-radius: var(--spio-border-radius);
      box-shadow: var(--spio-shadow-sm);
      --background: #ffffff;
      position: relative;
      overflow: hidden;

      &.clickable {
        cursor: pointer;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;

        &:hover {
           transform: translateY(-5px) perspective(1000px) rotateX(2deg) rotateY(-2deg);
           box-shadow: var(--spio-shadow-lg);
           z-index: 10;
        }
      }
    }

    .stat-content {
      padding: var(--spio-spacing-md);
      text-align: center;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--spio-spacing-sm);

      ion-icon {
        font-size: 24px;
        color: #ffffff;
      }

      &[data-color="primary"] {
        background: linear-gradient(135deg, #EF5350, #B71C1C);
      }

      &[data-color="success"] {
        background: linear-gradient(135deg, #66BB6A, #2E7D32);
      }

      &[data-color="warning"] {
        background: linear-gradient(135deg, #FFCA28, #FF8F00);
      }

      &[data-color="tertiary"] {
        background: linear-gradient(135deg, #90A4AE, #546E7A);
      }
    }

    .stat-value {
      font-size: var(--spio-font-size-xl);
      font-weight: 700;
      color: var(--spio-text-primary);
      line-height: 1.2;
    }

    .stat-unit {
      font-size: var(--spio-font-size-sm);
      font-weight: 400;
      color: var(--spio-text-secondary);
      margin-left: 2px;
    }

    .stat-label {
      font-size: var(--spio-font-size-sm);
      color: var(--spio-text-secondary);
      margin-top: var(--spio-spacing-xs);
    }

    .stat-trend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      font-size: var(--spio-font-size-xs);
      font-weight: 500;
      margin-top: var(--spio-spacing-xs);

      ion-icon {
        font-size: 14px;
      }

      &.positive {
        color: var(--spio-status-ok);
      }

      &.negative {
        color: var(--spio-status-expired);
      }
    }
  `],
})
export class StatCardComponent {
  @Input() value: number = 0;
  @Input() label: string = '';
  @Input() icon: string = 'analytics-outline';
  @Input() iconColor: 'primary' | 'success' | 'warning' | 'tertiary' = 'primary';
  @Input() unit?: string;
  @Input() trend?: number;
  @Input() format: 'integer' | 'decimal' | 'percent' = 'integer';
  @Input() clickable: boolean = true;

  get formattedValue(): string {
    switch (this.format) {
      case 'decimal':
        return this.value.toFixed(1);
      case 'percent':
        return `${this.value.toFixed(1)}%`;
      default:
        return this.value.toLocaleString('es-MX');
    }
  }
}
