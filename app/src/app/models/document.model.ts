/**
 * Modelos de Documentos - SPIO
 * Gestión Documental con sistema de semáforo
 * Alineados con DTOs esperados en .NET 8 WebAPI
 */

/**
 * Documento del operador
 * Equivalente a OperatorDocumentDto en C#
 */
export interface IOperatorDocument {
  /** Identificador único (Guid en C#) */
  id: string;
  /** Tipo de documento */
  documentType: DocumentType;
  /** Nombre del documento */
  name: string;
  /** Descripción adicional */
  description?: string;
  /** Número de documento/folio */
  documentNumber: string;
  /** Fecha de emisión (ISO 8601) */
  issuedDate: string;
  /** Fecha de vencimiento (ISO 8601) */
  expirationDate: string;
  /** Estado del documento */
  status: DocumentStatus;
  /** Días restantes para vencimiento */
  daysUntilExpiration: number;
  /** URL de la imagen/PDF del documento */
  fileUrl?: string;
  /** URL de la miniatura */
  thumbnailUrl?: string;
  /** Indica si requiere renovación */
  requiresRenewal: boolean;
  /** Notas adicionales */
  notes?: string;
  /** Fecha de última actualización */
  updatedAt: string;
  /** Entidad emisora */
  issuingAuthority?: string;
}

/**
 * Tipos de documento
 */
export enum DocumentType {
  /** Licencia Federal de Conductor */
  FederalLicense = 'FEDERAL_LICENSE',
  /** Licencia Estatal */
  StateLicense = 'STATE_LICENSE',
  /** Examen Médico */
  MedicalExam = 'MEDICAL_EXAM',
  /** Examen Psicométrico */
  PsychometricExam = 'PSYCHOMETRIC_EXAM',
  /** CURP */
  Curp = 'CURP',
  /** INE/IFE */
  Ine = 'INE',
  /** Comprobante de Domicilio */
  AddressProof = 'ADDRESS_PROOF',
  /** RFC */
  Rfc = 'RFC',
  /** Número de Seguro Social */
  Imss = 'IMSS',
  /** Acta de Nacimiento */
  BirthCertificate = 'BIRTH_CERTIFICATE',
  /** Carta de Antecedentes No Penales */
  CriminalRecord = 'CRIMINAL_RECORD',
  /** Certificado de Capacitación */
  TrainingCertificate = 'TRAINING_CERTIFICATE',
  /** Otro documento */
  Other = 'OTHER',
}

/**
 * Estados del documento (semáforo)
 */
export enum DocumentStatus {
  /** Vigente (verde) - Más de 30 días para vencer */
  Valid = 'VALID',
  /** Por vencer (amarillo) - Entre 1 y 30 días para vencer */
  ExpiringSoon = 'EXPIRING_SOON',
  /** Vencido (rojo) */
  Expired = 'EXPIRED',
  /** Pendiente de verificación */
  PendingVerification = 'PENDING_VERIFICATION',
  /** Rechazado */
  Rejected = 'REJECTED',
}

/**
 * Resumen de documentos del operador
 * Equivalente a DocumentSummaryDto en C#
 */
export interface IDocumentSummary {
  /** Total de documentos */
  totalDocuments: number;
  /** Documentos vigentes */
  validCount: number;
  /** Documentos por vencer */
  expiringSoonCount: number;
  /** Documentos vencidos */
  expiredCount: number;
  /** Documentos pendientes de verificación */
  pendingCount: number;
  /** Próximo documento a vencer */
  nextToExpire?: IOperatorDocument;
  /** Porcentaje de cumplimiento */
  compliancePercent: number;
}

/**
 * Nombres de tipos de documento para mostrar
 */
export const DOCUMENT_TYPE_NAMES: Record<DocumentType, string> = {
  [DocumentType.FederalLicense]: 'Licencia Federal',
  [DocumentType.StateLicense]: 'Licencia Estatal',
  [DocumentType.MedicalExam]: 'Examen Médico',
  [DocumentType.PsychometricExam]: 'Examen Psicométrico',
  [DocumentType.Curp]: 'CURP',
  [DocumentType.Ine]: 'INE/IFE',
  [DocumentType.AddressProof]: 'Comprobante de Domicilio',
  [DocumentType.Rfc]: 'RFC',
  [DocumentType.Imss]: 'IMSS',
  [DocumentType.BirthCertificate]: 'Acta de Nacimiento',
  [DocumentType.CriminalRecord]: 'Carta de No Antecedentes',
  [DocumentType.TrainingCertificate]: 'Certificado de Capacitación',
  [DocumentType.Other]: 'Otro',
};

/**
 * Iconos por tipo de documento
 */
export const DOCUMENT_TYPE_ICONS: Record<DocumentType, string> = {
  [DocumentType.FederalLicense]: 'car-outline',
  [DocumentType.StateLicense]: 'card-outline',
  [DocumentType.MedicalExam]: 'medkit-outline',
  [DocumentType.PsychometricExam]: 'brain-outline',
  [DocumentType.Curp]: 'document-text-outline',
  [DocumentType.Ine]: 'id-card-outline',
  [DocumentType.AddressProof]: 'home-outline',
  [DocumentType.Rfc]: 'receipt-outline',
  [DocumentType.Imss]: 'shield-outline',
  [DocumentType.BirthCertificate]: 'document-outline',
  [DocumentType.CriminalRecord]: 'checkmark-circle-outline',
  [DocumentType.TrainingCertificate]: 'school-outline',
  [DocumentType.Other]: 'folder-outline',
};

/**
 * Colores por estado (semáforo)
 */
export const DOCUMENT_STATUS_COLORS: Record<DocumentStatus, string> = {
  [DocumentStatus.Valid]: 'success',
  [DocumentStatus.ExpiringSoon]: 'warning',
  [DocumentStatus.Expired]: 'danger',
  [DocumentStatus.PendingVerification]: 'medium',
  [DocumentStatus.Rejected]: 'danger',
};

/**
 * Nombres de estado para mostrar
 */
export const DOCUMENT_STATUS_NAMES: Record<DocumentStatus, string> = {
  [DocumentStatus.Valid]: 'Vigente',
  [DocumentStatus.ExpiringSoon]: 'Por Vencer',
  [DocumentStatus.Expired]: 'Vencido',
  [DocumentStatus.PendingVerification]: 'En Verificación',
  [DocumentStatus.Rejected]: 'Rechazado',
};

/**
 * Filtro de segmento para documentos
 */
export type DocumentFilterSegment = 'all' | 'valid' | 'expiring' | 'expired';
