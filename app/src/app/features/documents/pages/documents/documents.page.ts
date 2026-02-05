import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonChip,
  IonFab,
  IonFabButton,
  IonProgressBar,
  IonRippleEffect,
  IonNote,
  ActionSheetController,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  addOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  warningOutline,
  timeOutline,
  calendarOutline,
  cloudUploadOutline,
  cameraOutline,
  imageOutline,
  chevronForwardOutline,
  shieldCheckmarkOutline,
  carOutline,
  cardOutline,
  medkitOutline,
  homeOutline,
  schoolOutline,
  documentOutline,
  idCardOutline,
  receiptOutline,
  folderOutline,
} from 'ionicons/icons';

import { DocumentMockService } from '../../../../core/services/document.mock.service';
import {
  IOperatorDocument,
  IDocumentSummary,
  DocumentStatus,
  DocumentFilterSegment,
  DOCUMENT_TYPE_NAMES,
  DOCUMENT_TYPE_ICONS,
  DOCUMENT_STATUS_COLORS,
  DOCUMENT_STATUS_NAMES,
} from '../../../../models/document.model';

/**
 * Página Documentos - SPIO
 * Gestión documental con sistema de semáforo
 */
@Component({
  selector: 'app-documents',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DatePipe,
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
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonText,
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonChip,
    IonFab,
    IonFabButton,
    IonProgressBar,
    IonRippleEffect,
    IonNote,
  ],
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  private readonly documentService = inject(DocumentMockService);
  private readonly actionSheetCtrl = inject(ActionSheetController);
  private readonly alertCtrl = inject(AlertController);

  /** Estados */
  isLoading = signal<boolean>(true);
  
  /** Datos */
  documentSummary = signal<IDocumentSummary | null>(null);
  documents = signal<IOperatorDocument[]>([]);
  
  /** Filtro actual */
  selectedFilter = signal<DocumentFilterSegment>('all');

  /** Computed: Documentos filtrados */
  filteredDocuments = computed(() => {
    const docs = this.documents();
    const filter = this.selectedFilter();

    switch (filter) {
      case 'valid':
        return docs.filter(d => d.status === DocumentStatus.Valid);
      case 'expiring':
        return docs.filter(d => d.status === DocumentStatus.ExpiringSoon);
      case 'expired':
        return docs.filter(d => 
          d.status === DocumentStatus.Expired || 
          d.status === DocumentStatus.Rejected
        );
      default:
        return docs;
    }
  });

  /** Computed: Progreso de cumplimiento */
  complianceProgress = computed(() => {
    const summary = this.documentSummary();
    return summary ? summary.compliancePercent / 100 : 0;
  });

  /** Mapeos */
  statusColors = DOCUMENT_STATUS_COLORS;
  statusNames = DOCUMENT_STATUS_NAMES;
  typeNames = DOCUMENT_TYPE_NAMES;
  typeIcons = DOCUMENT_TYPE_ICONS;

  constructor() {
    addIcons({
      documentTextOutline,
      addOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      warningOutline,
      timeOutline,
      calendarOutline,
      cloudUploadOutline,
      cameraOutline,
      imageOutline,
      chevronForwardOutline,
      shieldCheckmarkOutline,
      carOutline,
      cardOutline,
      medkitOutline,
      homeOutline,
      schoolOutline,
      documentOutline,
      idCardOutline,
      receiptOutline,
      folderOutline,
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
    this.documentService.getDocumentSummary().subscribe({
      next: (summary) => {
        this.documentSummary.set(summary);
      },
    });

    // Cargar documentos
    this.documentService.getDocuments().subscribe({
      next: (docs) => {
        this.documents.set(docs);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Maneja el cambio de filtro
   */
  onFilterChange(event: CustomEvent): void {
    this.selectedFilter.set(event.detail.value as DocumentFilterSegment);
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
   * Abre el action sheet para subir documento
   */
  async openUploadOptions(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Subir Documento',
      cssClass: 'spio-action-sheet',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera-outline',
          handler: () => {
            this.uploadDocument('camera');
          },
        },
        {
          text: 'Seleccionar de Galería',
          icon: 'image-outline',
          handler: () => {
            this.uploadDocument('gallery');
          },
        },
        {
          text: 'Seleccionar Archivo',
          icon: 'document-outline',
          handler: () => {
            this.uploadDocument('file');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  /**
   * Simula la subida de un documento
   */
  private async uploadDocument(source: 'camera' | 'gallery' | 'file'): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Función en Desarrollo',
      message: `La subida de documentos desde ${source === 'camera' ? 'cámara' : source === 'gallery' ? 'galería' : 'archivos'} estará disponible próximamente.`,
      buttons: ['OK'],
      cssClass: 'spio-alert',
    });

    await alert.present();
  }

  /**
   * Obtiene el icono del estado
   */
  getStatusIcon(status: DocumentStatus): string {
    switch (status) {
      case DocumentStatus.Valid:
        return 'checkmark-circle-outline';
      case DocumentStatus.ExpiringSoon:
        return 'warning-outline';
      case DocumentStatus.Expired:
      case DocumentStatus.Rejected:
        return 'alert-circle-outline';
      default:
        return 'time-outline';
    }
  }

  /**
   * Obtiene la clase CSS del borde según estado
   */
  getStatusBorderClass(status: DocumentStatus): string {
    switch (status) {
      case DocumentStatus.Valid:
        return 'status-ok';
      case DocumentStatus.ExpiringSoon:
        return 'status-warning';
      case DocumentStatus.Expired:
      case DocumentStatus.Rejected:
        return 'status-expired';
      default:
        return 'status-pending';
    }
  }

  /**
   * Formatea los días restantes
   */
  formatDaysRemaining(days: number): string {
    if (days < 0) {
      return `Venció hace ${Math.abs(days)} días`;
    } else if (days === 0) {
      return 'Vence hoy';
    } else if (days === 1) {
      return 'Vence mañana';
    } else if (days <= 30) {
      return `Vence en ${days} días`;
    } else {
      return `Vence en ${Math.floor(days / 30)} meses`;
    }
  }

  /**
   * Abre el detalle de un documento
   */
  openDocument(doc: IOperatorDocument): void {
    // TODO: Implementar modal de detalle
    console.log('Abrir documento:', doc.id);
  }
}
