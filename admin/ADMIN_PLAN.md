# 🏗️ TC Admin Panel — Plan de Implementación

## Contexto del Proyecto

**Transportes Cuauhtémoc (TC)** ya tiene una app móvil (`/app`) hecha con Ionic + Angular para los **operadores/transportistas**. Ahora se necesita un **panel de administración web** para que RH, gerentes y supervisores puedan gestionar operadores, unidades, reportes y configuraciones.

> **IMPORTANTE:** Este panel es 100% frontend con datos dummy/mock. El backend se conectará después. Toda la data viene de archivos JSON o services con datos hardcodeados.

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
| :--- | :--- | :--- |
| **Angular** | 18 (standalone components) | Framework SPA |
| **PrimeNG** | 17.x | Librería de componentes UI |
| **PrimeFlex** | 3.x | Sistema de grid y utilidades CSS |
| **PrimeIcons** | 7.x | Iconografía |
| **Chart.js** | 4.x | Gráficas (viene integrado con PrimeNG) |
| **Google Fonts (Inter)** | — | Tipografía principal |

### Tema Visual
- **Lara Dark Amber** (tema base de PrimeNG)
- Customizado con los colores corporativos de TC:
  - Primary: `#F5A623` (dorado/amber TC)
  - Surface: `#1a1a2e` (fondo oscuro profundo)
  - Card: `#16213e` (fondo tarjetas)
  - Accent: `#e94560` (alertas/danger)
  - Success: `#0f3460` → `#00b894`
- Tipografía: **Inter** (Google Fonts) — limpia, moderna, profesional

---

## Inicialización del Proyecto

```bash
# Desde la carpeta tc.pio-main/admin/
npx -y @angular/cli@18 new tc-admin --directory ./ --routing --style scss --standalone --skip-tests --ssr=false

# Instalar PrimeNG y dependencias
npm install primeng primeicons primeflex chart.js

# Configurar en angular.json → styles:
# - "node_modules/primeng/resources/themes/lara-dark-amber/theme.css"
# - "node_modules/primeng/resources/primeng.min.css"
# - "node_modules/primeicons/primeicons.css"
# - "node_modules/primeflex/primeflex.css"
```

---

## Estructura de Carpetas

```
admin/
├── src/
│   ├── app/
│   │   ├── core/                          # Servicios globales, guards, interceptors
│   │   │   ├── services/
│   │   │   │   ├── mock-data.service.ts   # Servicio central de datos dummy
│   │   │   │   ├── auth.service.ts        # Servicio de autenticación (mock)
│   │   │   │   └── notification.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── models/                    # Interfaces TypeScript
│   │   │   │   ├── operador.model.ts
│   │   │   │   ├── unidad.model.ts
│   │   │   │   ├── usuario.model.ts
│   │   │   │   ├── reporte.model.ts
│   │   │   │   └── dashboard.model.ts
│   │   │   └── mock/                      # Archivos JSON con datos dummy
│   │   │       ├── operadores.json
│   │   │       ├── unidades.json
│   │   │       ├── usuarios.json
│   │   │       └── reportes.json
│   │   │
│   │   ├── layout/                        # Componentes de layout
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   └── sidebar.component.scss
│   │   │   ├── topbar/
│   │   │   │   ├── topbar.component.ts
│   │   │   │   └── topbar.component.scss
│   │   │   └── layout.component.ts        # Wrapper con sidebar + topbar + router-outlet
│   │   │
│   │   ├── pages/                         # Páginas principales
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── operadores/
│   │   │   │   ├── operadores-list/       # Tabla con filtros
│   │   │   │   └── operador-detail/       # Detalle individual
│   │   │   ├── unidades/
│   │   │   │   ├── unidades-list/
│   │   │   │   └── unidad-detail/
│   │   │   ├── reportes/
│   │   │   ├── usuarios/
│   │   │   └── configuracion/
│   │   │
│   │   ├── shared/                        # Componentes reutilizables
│   │   │   ├── stat-card/                 # Tarjeta de KPI
│   │   │   ├── status-badge/              # Badge de estado (Activo, Inactivo, etc.)
│   │   │   └── data-table/               # Wrapper de p-table con configuración común
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   │
│   ├── assets/
│   │   └── images/
│   │       └── tc-logo-white.png
│   │
│   └── styles/
│       ├── _variables.scss                # Variables de color, spacing, etc.
│       ├── _theme-overrides.scss          # Overrides del tema PrimeNG
│       ├── _mixins.scss                   # Mixins útiles
│       └── styles.scss                    # Archivo principal
```

---

## Módulos y Páginas (Detalle)

### 1. 🔐 Login Page

Pantalla de login SIMPLE y elegante. No necesita funcionalidad real, solo navegar al dashboard.

**Componentes PrimeNG:** `InputText`, `Password`, `Button`, `Checkbox`

**Diseño:**
- Fondo oscuro con gradiente sutil
- Card centrada con logo de TC arriba
- Inputs de usuario y contraseña
- Botón "Iniciar Sesión" con color primary
- Checkbox "Recordarme"

**Mock:** Cualquier usuario/contraseña navega al dashboard.

---

### 2. 🏠 Dashboard

La página principal después del login. Resumen ejecutivo con KPIs y gráficas.

**Componentes PrimeNG:** `Card`, `Chart` (bar, doughnut, line), `Tag`, `Avatar`

**Layout (grid de 12 cols con PrimeFlex):**

```
┌────────────────────────────────────────────────────┐
│  KPI Card    │  KPI Card    │  KPI Card  │ KPI Card│
│  Operadores  │  Unidades    │  Entregas  │Incidentes│
│  Activos: 47 │  Activas: 32 │  Hoy: 128  │ Hoy: 3  │
├──────────────────────┬─────────────────────────────┤
│                      │                             │
│  Gráfica de Barras   │  Gráfica de Dona            │
│  Entregas x Semana   │  Estado de Unidades         │
│                      │                             │
├──────────────────────┴─────────────────────────────┤
│                                                    │
│  Tabla: Últimas 5 Actividades / Alertas Recientes  │
│                                                    │
└────────────────────────────────────────────────────┘
```

**KPIs (datos mock):**
- Operadores Activos: 47 (+3 vs mes anterior)
- Unidades en Ruta: 32 / 45 total
- Entregas Hoy: 128 (meta: 150)
- Incidentes Abiertos: 3

---

### 3. 👷 Operadores

La página más importante. Lista y detalle de operadores.

#### 3a. Lista de Operadores
**Componentes PrimeNG:** `Table` (p-table), `InputText`, `Dropdown`, `Tag`, `Button`, `Avatar`

**Features de la tabla:**
- Búsqueda global
- Filtros por columna (estado, tipo de licencia, base)
- Ordenamiento por cualquier columna
- Paginación (10, 25, 50 registros)
- Exportar a CSV/Excel
- Botón de "Ver Detalle" por fila

**Columnas:**
| # | Columna | Tipo |
|---|---------|------|
| 1 | Foto + Nombre | Avatar + texto |
| 2 | ID Empleado | texto |
| 3 | Tipo Licencia | Tag (Federal, Estatal) |
| 4 | Base | texto |
| 5 | Estatus | Tag (Activo ✅, Inactivo ❌, Vacaciones 🏖️) |
| 6 | Entregas (mes) | número |
| 7 | Calificación | estrellas o número |
| 8 | Acciones | Botones (ver, editar) |

**Datos mock:** 20-30 operadores con nombres mexicanos reales.

#### 3b. Detalle de Operador
**Componentes PrimeNG:** `TabView`, `Card`, `Timeline`, `Chart`, `Tag`, `Avatar`, `Fieldset`

**Tabs:**
1. **Información General** — Datos personales, foto, licencia, RFC, CURP
2. **Historial de Entregas** — Tabla con últimas 20 entregas
3. **Estadísticas** — Gráficas de rendimiento (entregas/mes, combustible, etc.)
4. **Incidentes** — Timeline con eventos reportados
5. **Documentos** — Lista de documentos del operador (licencia, INE, antidoping)

---

### 4. 🚛 Unidades

Gestión de la flota de tractocamiones.

#### 4a. Lista de Unidades
**Componentes PrimeNG:** `Table`, `Tag`, `Button`, `ProgressBar`

**Columnas:**
| # | Columna | Tipo |
|---|---------|------|
| 1 | # Económico | texto |
| 2 | Marca / Modelo | texto |
| 3 | Año | número |
| 4 | Placas | texto |
| 5 | Operador Asignado | texto + avatar |
| 6 | Estatus | Tag (En ruta, Disponible, Mantenimiento, Fuera de servicio) |
| 7 | Km Recorridos | número + progress bar |
| 8 | Próximo Servicio | fecha + badge si está próximo |

**Datos mock:** 15-20 unidades.

#### 4b. Detalle de Unidad
- Info general (marca, modelo, año, placas, VIN)
- Historial de mantenimiento (Timeline)
- Operadores que la han usado
- Estadísticas de uso (km/mes, consumo combustible)

---

### 5. 📊 Reportes

Página con múltiples gráficas y tablas resumen.

**Componentes PrimeNG:** `Chart`, `Calendar` (rango de fechas), `Dropdown`, `Card`, `Table`

**Secciones:**
1. **Filtros** — Rango de fechas, base, operador específico
2. **Entregas** — Gráfica de línea (entregas por día/semana/mes)
3. **Combustible** — Gráfica de barras (consumo por unidad)
4. **Incidentes** — Gráfica de dona (tipos de incidente) + tabla detalle
5. **Ranking** — Top 10 operadores por rendimiento

---

### 6. 👥 Usuarios del Sistema

Gestión de usuarios que acceden al panel admin.

**Componentes PrimeNG:** `Table`, `Dialog`, `Dropdown`, `InputText`, `Tag`

**Columnas:** Nombre, Email, Rol (Admin, RH, Gerente, Supervisor), Último acceso, Estatus
**Acciones:** Crear, editar, desactivar usuario (todo mock, solo visual)

---

### 7. ⚙️ Configuración

Ajustes generales del sistema.

**Componentes PrimeNG:** `TabView`, `InputText`, `InputSwitch`, `Dropdown`, `Button`

**Tabs:**
1. **General** — Nombre empresa, logo, dirección
2. **Notificaciones** — Toggles para activar/desactivar alertas
3. **Roles y Permisos** — Tabla de permisos por rol
4. **Bases** — CRUD de bases/sucursales

---

## Layout Principal

### Sidebar (Fijo, lado izquierdo, ~260px)

```
┌──────────────────┐
│   🚛 TC ADMIN    │  ← Logo + nombre
│                  │
│  🏠 Dashboard    │
│  👷 Operadores   │
│  🚛 Unidades     │
│  📊 Reportes     │
│  👥 Usuarios     │
│  ⚙️ Config       │
│                  │
│                  │
│                  │
│  ─────────────── │
│  👤 Jorge Mata   │  ← Usuario logueado
│     Administrador│
│  🚪 Cerrar Sesión│
└──────────────────┘
```

**Estilo:**
- Fondo: `#0f0f23` (más oscuro que el contenido)
- Items con hover: fondo semi-transparente + borde izquierdo color primary
- Item activo: fondo primary/10 + borde izquierdo primary sólido
- Transición suave al hacer hover
- Colapsable (solo iconos) en pantallas medianas

### Topbar (Header superior)

```
┌─────────────────────────────────────────────────────────┐
│  ≡  │  Dashboard          │  🔔 3  │  👤 Jorge Mata ▼  │
└─────────────────────────────────────────────────────────┘
```

- Hamburger menu (toggle sidebar)
- Breadcrumb o título de página actual
- Notificaciones (badge con contador)
- Avatar + nombre + dropdown (Perfil, Cerrar sesión)

---

## Datos Mock — Estructura de Modelos

```typescript
// operador.model.ts
export interface Operador {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  foto: string;           // URL placeholder
  idEmpleado: string;     // "TC-001"
  rfc: string;
  curp: string;
  tipoLicencia: 'Federal' | 'Estatal';
  numeroLicencia: string;
  vigenciaLicencia: Date;
  base: string;           // "Monterrey", "CDMX", "Guadalajara"
  estatus: 'Activo' | 'Inactivo' | 'Vacaciones' | 'Incapacidad';
  fechaIngreso: Date;
  telefono: string;
  email: string;
  entregasMes: number;
  calificacion: number;   // 1-5
  unidadAsignada?: string; // # económico
}

// unidad.model.ts
export interface Unidad {
  id: number;
  numeroEconomico: string; // "U-045"
  marca: string;           // "Kenworth", "Freightliner", "International"
  modelo: string;          // "T680", "Cascadia"
  anio: number;
  placas: string;
  vin: string;
  estatus: 'En ruta' | 'Disponible' | 'Mantenimiento' | 'Fuera de servicio';
  kmRecorridos: number;
  proximoServicioKm: number;
  operadorAsignado?: Operador;
  base: string;
}

// usuario.model.ts
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'Administrador' | 'RH' | 'Gerente' | 'Supervisor';
  estatus: 'Activo' | 'Inactivo';
  ultimoAcceso: Date;
  foto: string;
}
```

---

## Rutas

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '',
    component: LayoutComponent,  // sidebar + topbar + router-outlet
    // canActivate: [authGuard],  // descomentar cuando haya auth real
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.page') },
      { path: 'operadores', loadComponent: () => import('./pages/operadores/operadores-list/operadores-list.page') },
      { path: 'operadores/:id', loadComponent: () => import('./pages/operadores/operador-detail/operador-detail.page') },
      { path: 'unidades', loadComponent: () => import('./pages/unidades/unidades-list/unidades-list.page') },
      { path: 'unidades/:id', loadComponent: () => import('./pages/unidades/unidad-detail/unidad-detail.page') },
      { path: 'reportes', loadComponent: () => import('./pages/reportes/reportes.page') },
      { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios.page') },
      { path: 'configuracion', loadComponent: () => import('./pages/configuracion/configuracion.page') },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
```

---

## Variables SCSS Globales

```scss
// _variables.scss
$tc-primary: #F5A623;
$tc-primary-dark: #d4901e;
$tc-primary-light: #f7bc5e;

$bg-body: #0a0a1a;
$bg-sidebar: #0f0f23;
$bg-surface: #1a1a2e;
$bg-card: #16213e;
$bg-card-hover: #1a2745;

$text-primary: #e8e8e8;
$text-secondary: #a0a0b8;
$text-muted: #6c6c85;

$success: #00b894;
$warning: #fdcb6e;
$danger: #e94560;
$info: #74b9ff;

$border-radius: 12px;
$border-radius-sm: 8px;
$shadow-card: 0 4px 24px rgba(0, 0, 0, 0.3);

$sidebar-width: 260px;
$sidebar-collapsed: 70px;
$topbar-height: 64px;

$font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## Orden de Implementación Recomendado

Construir en este orden para que cada paso tenga sentido visual:

### Fase 1: Fundación (30 min)
1. Crear proyecto Angular 18
2. Instalar PrimeNG, PrimeFlex, PrimeIcons
3. Configurar tema Lara Dark Amber en `angular.json`
4. Crear `_variables.scss` y `_theme-overrides.scss`
5. Agregar Google Fonts Inter

### Fase 2: Layout (1 hr)
6. Crear `LayoutComponent` (sidebar + topbar + router-outlet)
7. Crear `SidebarComponent` con menú de navegación
8. Crear `TopbarComponent` con breadcrumb y user menu
9. Configurar rutas base en `app.routes.ts`
10. Login page simple

### Fase 3: Dashboard (1 hr)
11. Crear `MockDataService` con datos dummy
12. Crear `StatCardComponent` reutilizable
13. Implementar Dashboard con KPIs y gráficas
14. Tabla de actividad reciente

### Fase 4: Operadores (1.5 hrs)
15. Lista de operadores con `p-table` (filtros, búsqueda, paginación)
16. Detalle de operador con tabs
17. Mock data de 25 operadores

### Fase 5: Unidades (1 hr)
18. Lista de unidades con `p-table`
19. Detalle de unidad
20. Mock data de 15 unidades

### Fase 6: Reportes y Resto (1 hr)
21. Página de reportes con gráficas
22. Gestión de usuarios
23. Configuración
24. Pulir animaciones y transiciones

---

## Tips para que quede Premium

1. **Spacing generoso** — No aprietes los elementos. Usa `padding: 24px` en cards, `gap: 20px` en grids
2. **Border radius suave** — `12px` para cards, `8px` para inputs, `20px` para badges
3. **Sombras sutiles** — `box-shadow: 0 4px 24px rgba(0,0,0,0.3)` en cards oscuras
4. **Transiciones en TODO** — `transition: all 0.2s ease` en hover states
5. **Colores con opacidad** — Usa `rgba($tc-primary, 0.1)` para fondos hover, no colores sólidos
6. **Tipografía con jerarquía** — Títulos `font-weight: 700`, subtítulos `600`, body `400`
7. **Iconos con fondo** — Los iconos de KPIs van dentro de un círculo con fondo semi-transparente
8. **Empty states bonitos** — Si una tabla no tiene datos, muestra un ícono + mensaje amigable
9. **Micro-animaciones** — Cards que hacen `scale(1.02)` al hover, badges que pulsan
10. **Consistencia** — Mismos colores, mismos border-radius, mismos paddings EN TODAS las páginas
