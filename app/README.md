# SPIO - Sistema de Gestión para Operadores

**Transportes Cuauhtémoc**

Aplicación móvil híbrida premium para la gestión integral de operadores de tractocamiones. Incluye gamificación, billetera virtual, gestión documental y seguimiento de KPIs.

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | Ionic 7 + Angular 17 (Standalone Components) |
| **Backend** (Futuro) | .NET 8 WebAPI (C#) |
| **Estilos** | SCSS modular - Clean Enterprise UI |
| **Estado** | Angular Signals |
| **HTTP** | HttpClient con Interceptors |

## Características Premium

- **Gamificación completa** - Niveles, puntos, logros, rankings
- **Billetera virtual** - Estilo fintech con transacciones
- **Gestión documental** - Sistema de semáforo visual
- **KPIs en tiempo real** - Métricas operativas
- **Diseño responsive** - Optimizado para móvil y tablet
- **Animaciones fluidas** - Transiciones premium
- **Arquitectura enterprise** - Guards, interceptors, services

## Requisitos

- Node.js 18+
- npm 9+
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`

## Instalación

```bash
cd tc.pio
npm install
ionic serve
```

## Credenciales de Demostración

| Campo | Valor |
|-------|-------|
| **Usuario** | `TC-2024-0142` |
| **Contraseña** | `Demo123!` |

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios singleton, guards, interceptors
│   │   ├── guards/              # AuthGuard, NoAuthGuard
│   │   ├── interceptors/        # AuthInterceptor, LoggingInterceptor
│   │   └── services/            # Mock services (Auth, Dashboard, Wallet, etc.)
│   ├── features/                # Módulos por dominio (lazy-loaded)
│   │   ├── auth/                # Login
│   │   ├── dashboard/           # Pantalla principal con KPIs
│   │   ├── wallet/              # Billetera virtual fintech
│   │   ├── documents/           # Gestión documental
│   │   ├── profile/             # Perfil del operador
│   │   └── tabs/                # Navegación por tabs
│   ├── models/                  # Interfaces TypeScript (alineadas con DTOs .NET)
│   │   ├── auth.model.ts        # ILoginRequest, IAuthResponse, IOperatorProfile
│   │   ├── dashboard.model.ts   # IDashboardStats, IKpiValue
│   │   ├── wallet.model.ts      # IWalletTransaction, IWalletSummary
│   │   ├── document.model.ts    # IOperatorDocument, DocumentStatus
│   │   └── profile.model.ts     # IOperatorProfileExtended, IAchievement
│   └── shared/                  # Componentes reutilizables
│       ├── components/          # StatCard, EmptyState, LevelBadge
│       └── styles/              # Animaciones globales
├── assets/                      # Imágenes, iconos
├── environments/                # Configuración por ambiente
└── theme/                       # Variables SCSS (paleta corporativa)
```

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Rojo Institucional | `#B71C1C` | Primary, botones principales |
| Rojo Oscuro | `#7f0000` | Hover states, gradientes |
| Blanco | `#FFFFFF` | Fondos, textos en dark |
| Gris Oscuro | `#424242` | Textos principales |
| Gris Medio | `#9E9E9E` | Textos secundarios |
| Dorado | `#FFB300` | Gamificación, badges, nivel Gold |
| Verde | `#2E7D32` | Estados OK, ingresos, success |
| Naranja | `#F57C00` | Warning, documentos por vencer |
| Rojo Alerta | `#D32F2F` | Errores, egresos, vencidos |

## Módulos Implementados

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| **Login** | ✅ | Autenticación con ReactiveForms, validaciones, simulación 2s |
| **Dashboard** | ✅ | Hero Card gamificación, KPIs, accesos rápidos |
| **Wallet** | ✅ | Saldo, historial transacciones, filtros, infinite scroll |
| **Documentos** | ✅ | Semáforo de estados, filtros, FAB para subida |
| **Perfil** | ✅ | Info extendida, estadísticas, menú, logout |
| **Guards** | ✅ | AuthGuard, NoAuthGuard para protección de rutas |
| **Interceptors** | ✅ | JWT, manejo de errores 401/403, logging |

## Arquitectura

### Servicios Mock

Todos los servicios simulan respuestas de una API .NET real:

```typescript
// Ejemplo: WalletMockService
getWalletSummary(): Observable<IWalletSummary> { ... }
getTransactions(filter: ITransactionFilter): Observable<ITransactionPagedResult> { ... }
```

### Interfaces Tipo DTO

Alineadas con lo que esperaríamos de un backend .NET:

```typescript
export interface IWalletTransaction {
  id: string;              // Guid en C#
  transactionDate: string; // DateTime en C# (ISO 8601)
  amount: number;          // Decimal en C#
  type: TransactionType;   // Enum
  category: TransactionCategory;
  description: string;
  status: TransactionStatus;
}
```

### Angular Signals

Estado reactivo moderno:

```typescript
isLoading = signal<boolean>(true);
walletSummary = signal<IWalletSummary | null>(null);
formattedBalance = computed(() => this.walletSummary()?.availablePoints.toLocaleString());
```

## Scripts Disponibles

```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm run lint       # Linter
ionic serve        # Servidor Ionic con live reload
ionic build        # Build de Ionic
```

## Próximos Pasos

1. **Backend .NET 8** - Implementar WebAPI real
2. **Autenticación** - Integrar JWT/Azure AD
3. **Capacitor** - Compilar para iOS/Android
4. **Push Notifications** - Firebase Cloud Messaging
5. **Offline Support** - Service Workers
6. **i18n** - Soporte multi-idioma

## Assets Requeridos

Agregar en `src/assets/images/`:

- `logo-tc-white.png` - Logo en blanco (login)
- `bg-truck.jpg` - Fondo de tractocamión (login)
- `avatars/default-avatar.svg` - Avatar por defecto

---

**Versión**: 1.0.0  
**Autor**: Arquitectura Senior - Transportes Cuauhtémoc  
**Licencia**: © 2026 Transportes Cuauhtémoc. Todos los derechos reservados.
