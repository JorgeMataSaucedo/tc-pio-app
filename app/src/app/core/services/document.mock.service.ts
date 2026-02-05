import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

import {
  IOperatorDocument,
  IDocumentSummary,
  DocumentType,
  DocumentStatus,
  DOCUMENT_TYPE_NAMES,
  DOCUMENT_TYPE_ICONS,
  DocumentFilterSegment,
} from '../../models/document.model';

/**
 * Servicio Mock de Documentos
 * Simula las respuestas de una API .NET 8 WebAPI
 * Sistema de semáforo para estados
 */
@Injectable({
  providedIn: 'root',
})
export class DocumentMockService {
  /** Signal para el resumen de documentos */
  private readonly _documentSummary = signal<IDocumentSummary | null>(null);
  
  /** Computed: resumen reactivo */
  readonly documentSummary = computed(() => this._documentSummary());

  /**
   * Obtiene el resumen de documentos
   */
  getDocumentSummary(): Observable<IDocumentSummary> {
    const documents = this.getMockDocuments();
    
    const summary: IDocumentSummary = {
      totalDocuments: documents.length,
      validCount: documents.filter(d => d.status === DocumentStatus.Valid).length,
      expiringSoonCount: documents.filter(d => d.status === DocumentStatus.ExpiringSoon).length,
      expiredCount: documents.filter(d => d.status === DocumentStatus.Expired).length,
      pendingCount: documents.filter(d => d.status === DocumentStatus.PendingVerification).length,
      nextToExpire: documents
        .filter(d => d.status === DocumentStatus.ExpiringSoon)
        .sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration)[0],
      compliancePercent: Math.round(
        (documents.filter(d => d.status === DocumentStatus.Valid).length / documents.length) * 100
      ),
    };

    return new Observable<IDocumentSummary>((observer) => {
      setTimeout(() => {
        this._documentSummary.set(summary);
        observer.next(summary);
        observer.complete();
      }, 100);
    });
  }

  /**
   * Obtiene todos los documentos del operador
   */
  getDocuments(filter?: DocumentFilterSegment): Observable<IOperatorDocument[]> {
    let documents = this.getMockDocuments();

    if (filter && filter !== 'all') {
      switch (filter) {
        case 'valid':
          documents = documents.filter(d => d.status === DocumentStatus.Valid);
          break;
        case 'expiring':
          documents = documents.filter(d => d.status === DocumentStatus.ExpiringSoon);
          break;
        case 'expired':
          documents = documents.filter(
            d => d.status === DocumentStatus.Expired || d.status === DocumentStatus.Rejected
          );
          break;
      }
    }

    // Ordenar: vencidos primero, luego por vencer, luego vigentes
    documents.sort((a, b) => {
      const statusOrder = {
        [DocumentStatus.Expired]: 0,
        [DocumentStatus.Rejected]: 1,
        [DocumentStatus.ExpiringSoon]: 2,
        [DocumentStatus.PendingVerification]: 3,
        [DocumentStatus.Valid]: 4,
      };
      return statusOrder[a.status] - statusOrder[b.status] || a.daysUntilExpiration - b.daysUntilExpiration;
    });

    return of(documents).pipe(delay(100));
  }

  /**
   * Obtiene un documento por ID
   */
  getDocumentById(id: string): Observable<IOperatorDocument | null> {
    const document = this.getMockDocuments().find(d => d.id === id) || null;
    return of(document).pipe(delay(50));
  }

  /**
   * Simula la carga de un nuevo documento
   */
  uploadDocument(documentType: DocumentType, file: File): Observable<IOperatorDocument> {
    const newDocument: IOperatorDocument = {
      id: `doc-new-${Date.now()}`,
      documentType,
      name: DOCUMENT_TYPE_NAMES[documentType],
      documentNumber: 'PENDIENTE',
      issuedDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: DocumentStatus.PendingVerification,
      daysUntilExpiration: 365,
      requiresRenewal: false,
      updatedAt: new Date().toISOString(),
    };

    return of(newDocument).pipe(delay(2000));
  }

  /**
   * Genera documentos mock realistas
   */
  private getMockDocuments(): IOperatorDocument[] {
    const now = new Date();

    return [
      {
        id: 'doc-001',
        documentType: DocumentType.FederalLicense,
        name: DOCUMENT_TYPE_NAMES[DocumentType.FederalLicense],
        description: 'Licencia Federal de Conductor Tipo A',
        documentNumber: 'LFC-2024-847291',
        issuedDate: new Date(now.getTime() - 700 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.ExpiringSoon,
        daysUntilExpiration: 15,
        requiresRenewal: true,
        updatedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'SCT - Secretaría de Comunicaciones y Transportes',
      },
      {
        id: 'doc-002',
        documentType: DocumentType.MedicalExam,
        name: DOCUMENT_TYPE_NAMES[DocumentType.MedicalExam],
        description: 'Examen médico integral para operadores',
        documentNumber: 'EXM-2024-4521',
        issuedDate: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 185 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Valid,
        daysUntilExpiration: 185,
        requiresRenewal: false,
        updatedAt: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'Clínica de Salud Ocupacional',
      },
      {
        id: 'doc-003',
        documentType: DocumentType.PsychometricExam,
        name: DOCUMENT_TYPE_NAMES[DocumentType.PsychometricExam],
        description: 'Evaluación psicométrica para conductores',
        documentNumber: 'PSI-2024-1892',
        issuedDate: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 165 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Valid,
        daysUntilExpiration: 165,
        requiresRenewal: false,
        updatedAt: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'Centro de Evaluación Psicológica',
      },
      {
        id: 'doc-004',
        documentType: DocumentType.Ine,
        name: DOCUMENT_TYPE_NAMES[DocumentType.Ine],
        description: 'Identificación oficial vigente',
        documentNumber: 'IDMEX1234567890',
        issuedDate: new Date(now.getTime() - 1000 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 800 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Valid,
        daysUntilExpiration: 800,
        requiresRenewal: false,
        updatedAt: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'INE - Instituto Nacional Electoral',
      },
      {
        id: 'doc-005',
        documentType: DocumentType.Curp,
        name: DOCUMENT_TYPE_NAMES[DocumentType.Curp],
        description: 'Clave Única de Registro de Población',
        documentNumber: 'RAGJ850315HDFRRL09',
        issuedDate: new Date(now.getTime() - 2000 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 10000 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Valid,
        daysUntilExpiration: 10000,
        requiresRenewal: false,
        updatedAt: new Date(now.getTime() - 500 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'RENAPO',
      },
      {
        id: 'doc-006',
        documentType: DocumentType.CriminalRecord,
        name: DOCUMENT_TYPE_NAMES[DocumentType.CriminalRecord],
        description: 'Constancia de no antecedentes penales',
        documentNumber: 'CANP-2024-78421',
        issuedDate: new Date(now.getTime() - 400 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Expired,
        daysUntilExpiration: -35,
        requiresRenewal: true,
        updatedAt: new Date(now.getTime() - 400 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'Procuraduría General de Justicia',
        notes: 'Requiere renovación urgente',
      },
      {
        id: 'doc-007',
        documentType: DocumentType.TrainingCertificate,
        name: DOCUMENT_TYPE_NAMES[DocumentType.TrainingCertificate],
        description: 'Certificado de capacitación en manejo defensivo',
        documentNumber: 'CERT-MD-2024-421',
        issuedDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 275 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Valid,
        daysUntilExpiration: 275,
        requiresRenewal: false,
        updatedAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'Centro de Capacitación TC',
      },
      {
        id: 'doc-008',
        documentType: DocumentType.Rfc,
        name: DOCUMENT_TYPE_NAMES[DocumentType.Rfc],
        description: 'Registro Federal de Contribuyentes',
        documentNumber: 'RAGJ850315HD8',
        issuedDate: new Date(now.getTime() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 10000 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.Valid,
        daysUntilExpiration: 10000,
        requiresRenewal: false,
        updatedAt: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'SAT - Servicio de Administración Tributaria',
      },
      {
        id: 'doc-009',
        documentType: DocumentType.StateLicense,
        name: DOCUMENT_TYPE_NAMES[DocumentType.StateLicense],
        description: 'Licencia de conducir estatal',
        documentNumber: 'NL-2024-782451',
        issuedDate: new Date(now.getTime() - 500 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        status: DocumentStatus.ExpiringSoon,
        daysUntilExpiration: 25,
        requiresRenewal: true,
        updatedAt: new Date(now.getTime() - 500 * 24 * 60 * 60 * 1000).toISOString(),
        issuingAuthority: 'Gobierno del Estado de Nuevo León',
      },
    ];
  }

  /**
   * Obtiene el icono para un tipo de documento
   */
  getDocumentIcon(type: DocumentType): string {
    return DOCUMENT_TYPE_ICONS[type] || 'document-outline';
  }

  /**
   * Calcula los días restantes para vencimiento
   */
  calculateDaysRemaining(expirationDate: string): number {
    const expDate = new Date(expirationDate);
    const now = new Date();
    const diffTime = expDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
