# 🚛 SPIO - Sistema de Gestión para Operadores

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Ionic](https://img.shields.io/badge/Ionic-7.8.0-blue.svg)
![Angular](https://img.shields.io/badge/Angular-17.3.0-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-orange.svg)

**Aplicación móvil híbrida premium para la gestión integral de operadores de tractocamiones**

*Transportes Cuauhtémoc*

[Características](#-características) •
[Instalación](#-instalación) •
[Documentación](#-documentación) •
[Arquitectura](#-arquitectura) •
[Roadmap](#-roadmap)

</div>

---

## 📱 Acerca del Proyecto

**SPIO** (Sistema de Gestión para Operadores) es una aplicación móvil enterprise diseñada para operadores de tractocamiones de **Transportes Cuauhtémoc**. Combina funcionalidades operativas críticas con una experiencia de usuario premium, gamificación y diseño fintech.

### 🎯 Objetivo Principal

Proporcionar una herramienta operativa con **experiencia de usuario (UX/UI) premium** que se sienta nativa, moderna y costosa, mejorando la productividad y motivación de los operadores.

---

## ✨ Características

### 🎮 Gamificación Completa
- Sistema de niveles: Rookie → Bronze → Silver → Gold → Platinum → Diamond
- Puntos SPIO acumulables por desempeño
- Rankings entre operadores
- Progress tracking visual
- Logros y badges

### 💰 Billetera Virtual (Wallet)
- Diseño tipo fintech
- Saldo disponible y puntos totales
- Historial de transacciones con infinite scroll
- Filtros por tipo (Ingresos/Egresos)
- Categorización de movimientos

### 📄 Gestión Documental
- Sistema de semáforo visual:
  - 🟢 Verde: Vigentes (>30 días)
  - 🟡 Naranja: Por vencer (<30 días)
  - 🔴 Rojo: Vencidos
- Upload de documentos
- Notificaciones de vencimiento
- Filtros por estado

### 📊 Dashboard con KPIs
- Tracto-horas operadas
- Consumo de combustible
- Kilómetros recorridos
- Entregas completadas
- Métricas en tiempo real
- Accesos rápidos

### 👤 Perfil del Operador
- Información personal extendida
- Estadísticas de gamificación
- Configuración de la app
- Gestión de sesión

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Framework Mobile** | Ionic | 7.8.0 |
| **Framework Frontend** | Angular | 17.3.0 |
| **Arquitectura** | Standalone Components | - |
| **Estado** | Angular Signals | - |
| **Estilos** | SCSS Modular | - |
| **Iconos** | Ionicons | 7.3.0 |
| **Backend** | .NET 8 WebAPI | *Pendiente* |

---

## 🚀 Instalación

### Requisitos Previos

- Node.js 18+
- npm 9+
- Ionic CLI
- Angular CLI

### Instalación del CLI

```bash
npm install -g @ionic/cli @angular/cli
```

### Clonar e Instalar

```bash
# Clonar repositorio
git clone https://github.com/MiguelMata-25/tc.pio.git
cd tc.pio/app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`

---

## 🔑 Credenciales de Demo

Para probar la aplicación, utiliza las siguientes credenciales:

| Campo | Valor |
|-------|-------|
| **Usuario** | `TC-2024-0142` |
| **Contraseña** | `Demo123!` |

---

## 📂 Estructura del Proyecto

```
tc.pio/
├── app/                          # Aplicación Ionic/Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/            # Servicios singleton
│   │   │   │   ├── guards/      # AuthGuard, NoAuthGuard
│   │   │   │   ├── interceptors/# Auth, Logging
│   │   │   │   └── services/    # Mock Services
│   │   │   ├── features/        # Módulos funcionales
│   │   │   │   ├── auth/        # Login
│   │   │   │   ├── dashboard/   # Dashboard + KPIs
│   │   │   │   ├── wallet/      # Billetera
│   │   │   │   ├── documents/   # Documentos
│   │   │   │   ├── profile/     # Perfil
│   │   │   │   └── tabs/        # Navegación
│   │   │   ├── models/          # Interfaces TypeScript
│   │   │   └── shared/          # Componentes reutilizables
│   │   ├── assets/              # Recursos estáticos
│   │   ├── environments/        # Configuración
│   │   └── theme/               # Variables SCSS
│   ├── angular.json
│   ├── ionic.config.json
│   └── package.json
├── ANALISIS_ARQUITECTURA.md     # Análisis técnico completo
└── README.md                     # Este archivo
```

---

## 🏗️ Arquitectura

### Patrón: Clean Architecture

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│   (Pages, Components, UI)               │
├─────────────────────────────────────────┤
│        APPLICATION LAYER                │
│   (Services, Guards, Interceptors)      │
├─────────────────────────────────────────┤
│          DOMAIN LAYER                   │
│   (Models, Interfaces, Enums)           │
├─────────────────────────────────────────┤
│       INFRASTRUCTURE LAYER              │
│   (Mock Services → API HTTP .NET)       │
└─────────────────────────────────────────┘
```

### Características Técnicas

- ✅ **Standalone Components** (Angular 17+)
- ✅ **Signals** para estado reactivo
- ✅ **Functional Guards/Interceptors**
- ✅ **Lazy Loading** de módulos
- ✅ **Typed Models** alineados con DTOs .NET
- ✅ **SCSS Modular** con design system
- ✅ **Animaciones premium** con keyframes
- ✅ **Mock Services** listos para swap a HTTP

---

## 🎨 Design System

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| **Rojo Institucional** | `#B71C1C` | Primary, Botones |
| **Rojo Oscuro** | `#7f0000` | Hover states |
| **Dorado** | `#FFB300` | Gamificación, Gold level |
| **Verde** | `#2E7D32` | Success, Ingresos |
| **Naranja** | `#F57C00` | Warning, Por vencer |
| **Rojo Alerta** | `#D32F2F` | Danger, Egresos |

### Tipografía

```scss
--ion-font-family: 'Segoe UI', -apple-system, 
                   BlinkMacSystemFont, 'Roboto', 
                   'Helvetica Neue', sans-serif;
```

### Espaciado

Escala de 4px: `4px`, `8px`, `16px`, `24px`, `32px`

---

## 📚 Documentación

### Documentos Disponibles

- [`ANALISIS_ARQUITECTURA.md`](./ANALISIS_ARQUITECTURA.md) - Análisis técnico completo (746 líneas)
- [`app/README.md`](./app/README.md) - Documentación específica de la app

### Recursos Externos

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.dev)
- [Ionicons](https://ionic.io/ionicons)

---

## 🧪 Testing

*Pendiente de implementación*

```bash
# Unit tests (Futuro)
npm test

# E2E tests (Futuro)
npm run e2e
```

---

## 📦 Build

### Desarrollo

```bash
npm start
# o
ionic serve
```

### Producción (Web)

```bash
npm run build
# Output: www/
```

### Producción (Móvil)

*Requiere Capacitor (pendiente)*

```bash
npx cap add ios
npx cap add android
npx cap sync
```

---

## 🗺️ Roadmap

### ✅ Fase 1: MVP (Completado)
- [x] Arquitectura base
- [x] Login con ReactiveForms
- [x] Dashboard con gamificación
- [x] Wallet fintech
- [x] Gestión documental
- [x] Perfil del operador
- [x] Design system SPIO

### 🔄 Fase 2: Backend (En Progreso)
- [ ] .NET 8 WebAPI
- [ ] Entity Framework Core
- [ ] JWT Authentication
- [ ] SQL Server Database
- [ ] DTOs matching con TypeScript

### 📅 Fase 3: Mobile Native (Planeado)
- [ ] Capacitor setup
- [ ] Build iOS/Android
- [ ] Push Notifications
- [ ] Camera plugin (documentos)
- [ ] Secure Storage
- [ ] Geolocalización

### 🎯 Fase 4: Producción (Futuro)
- [ ] Testing (Unit + E2E)
- [ ] CI/CD Pipeline
- [ ] Performance optimization
- [ ] Analytics
- [ ] Deploy a stores

---

## 🤝 Contribución

Este es un proyecto privado de **Transportes Cuauhtémoc**. 

Para reportar issues o sugerencias, contacta al equipo de desarrollo.

---

## 📄 Licencia

© 2026 Transportes Cuauhtémoc. Todos los derechos reservados.

Este software es propiedad de Transportes Cuauhtémoc y está protegido por leyes de derechos de autor. No se permite la distribución, modificación o uso fuera de la organización sin autorización explícita.

---

## 👥 Equipo

- **Arquitectura**: Senior Architect - TC Technology Team
- **UI/UX Design**: Product Design Team
- **Desarrollo**: Full Stack Development Team
- **QA**: Quality Assurance Team

---

## 📞 Contacto

Para más información sobre el proyecto:

- **Email**: desarrollo@transportescuauhtemoc.com
- **Documentación Interna**: [Confluence](https://tc-internal.atlassian.net)
- **Repository**: [GitHub](https://github.com/MiguelMata-25/tc.pio)

---

<div align="center">

### 🚛 Transportes Cuauhtémoc
### 💪 Moviendo México con Excelencia

**SPIO v1.0.0** | Powered by Ionic + Angular

</div>
