import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton } from '@ionic/angular/standalone';

/**
 * Componente reutilizable de estado vacío
 * Para mostrar cuando no hay datos
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  template: `
    <div class="empty-state" [class]="size">
      <div class="empty-icon">
        <ion-icon [name]="icon"></ion-icon>
      </div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-message" *ngIf="message">{{ message }}</p>
      <ion-button 
        *ngIf="actionText" 
        [fill]="actionFill"
        [color]="actionColor"
        class="empty-action"
        (click)="onAction()"
      >
        <ion-icon [name]="actionIcon" slot="start" *ngIf="actionIcon"></ion-icon>
        {{ actionText }}
      </ion-button>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spio-spacing-xl);
      text-align: center;

      &.small {
        padding: var(--spio-spacing-lg);
        
        .empty-icon ion-icon {
          font-size: 48px;
        }

        .empty-title {
          font-size: var(--spio-font-size-md);
        }
      }

      &.large {
        padding: var(--spio-spacing-xl) var(--spio-spacing-lg);
        min-height: 300px;
        
        .empty-icon ion-icon {
          font-size: 96px;
        }
      }
    }

    .empty-icon {
      margin-bottom: var(--spio-spacing-md);

      ion-icon {
        font-size: 72px;
        color: var(--spio-text-muted);
        opacity: 0.5;
      }
    }

    .empty-title {
      font-size: var(--spio-font-size-lg);
      font-weight: 600;
      color: var(--spio-text-primary);
      margin: 0 0 var(--spio-spacing-xs);
    }

    .empty-message {
      font-size: var(--spio-font-size-sm);
      color: var(--spio-text-secondary);
      margin: 0 0 var(--spio-spacing-md);
      max-width: 280px;
    }

    .empty-action {
      margin-top: var(--spio-spacing-sm);
    }
  `],
})
export class EmptyStateComponent {
  @Input() icon: string = 'folder-open-outline';
  @Input() title: string = 'Sin resultados';
  @Input() message?: string;
  @Input() actionText?: string;
  @Input() actionIcon?: string;
  @Input() actionFill: 'clear' | 'outline' | 'solid' = 'outline';
  @Input() actionColor: string = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() action?: () => void;

  onAction(): void {
    if (this.action) {
      this.action();
    }
  }
}
