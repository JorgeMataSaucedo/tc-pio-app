import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Tipos de tema disponibles
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Tema efectivo (sin auto)
 */
export type EffectiveTheme = 'light' | 'dark';

/**
 * Configuración de tema para UI
 */
export interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: string;
  description: string;
}

/**
 * Opciones disponibles para el selector de tema
 */
export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'auto',
    label: 'Sistema',
    icon: 'phone-portrait-outline',
    description: 'Sigue la configuración del dispositivo',
  },
  {
    value: 'light',
    label: 'Claro',
    icon: 'sunny-outline',
    description: 'Tema claro siempre activo',
  },
  {
    value: 'dark',
    label: 'Oscuro',
    icon: 'moon-outline',
    description: 'Tema oscuro siempre activo',
  },
];

/** Key para localStorage */
const THEME_STORAGE_KEY = 'spio_theme_preference';

/**
 * ThemeService - SPIO
 * Gestiona el tema de la aplicación (claro/oscuro/sistema)
 * Usa Angular Signals para reactividad
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** MediaQuery para detectar preferencia del sistema */
  private mediaQuery: MediaQueryList | null = null;

  /** Preferencia del usuario: 'light' | 'dark' | 'auto' */
  private readonly _userPreference = signal<ThemeMode>(this.loadSavedPreference());

  /** Preferencia del sistema operativo */
  private readonly _systemPreference = signal<EffectiveTheme>(this.getSystemPreference());

  /** Tema efectivo calculado */
  readonly effectiveTheme = computed<EffectiveTheme>(() => {
    const userPref = this._userPreference();
    if (userPref === 'auto') {
      return this._systemPreference();
    }
    return userPref;
  });

  /** Exposición de la preferencia del usuario (readonly) */
  readonly userPreference = this._userPreference.asReadonly();

  /** Computed: ¿Está en modo oscuro? */
  readonly isDarkMode = computed(() => this.effectiveTheme() === 'dark');

  constructor() {
    // Configurar listener del sistema
    this.setupSystemListener();

    // Effect para aplicar el tema cuando cambie
    effect(() => {
      const theme = this.effectiveTheme();
      this.applyTheme(theme);
    });
  }

  /**
   * Inicializa el servicio (llamar desde AppComponent)
   */
  initialize(): void {
    // El constructor ya hace todo, pero esto permite
    // una llamada explícita para claridad
    console.log('[ThemeService] Initialized with theme:', this.effectiveTheme());
  }

  /**
   * Cambia la preferencia del usuario
   */
  setThemePreference(mode: ThemeMode): void {
    this._userPreference.set(mode);
    this.savePreference(mode);
    console.log('[ThemeService] Theme preference changed to:', mode);
  }

  /**
   * Alterna entre claro y oscuro (ignora auto)
   */
  toggleTheme(): void {
    const current = this.effectiveTheme();
    const newTheme: ThemeMode = current === 'dark' ? 'light' : 'dark';
    this.setThemePreference(newTheme);
  }

  /**
   * Obtiene las opciones de tema para UI
   */
  getThemeOptions(): ThemeOption[] {
    return THEME_OPTIONS;
  }

  /**
   * Carga la preferencia guardada
   */
  private loadSavedPreference(): ThemeMode {
    if (!this.isBrowser) return 'auto';
    
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        return saved as ThemeMode;
      }
    } catch (e) {
      console.warn('[ThemeService] Error loading saved preference:', e);
    }
    
    return 'auto'; // Default
  }

  /**
   * Guarda la preferencia
   */
  private savePreference(mode: ThemeMode): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (e) {
      console.warn('[ThemeService] Error saving preference:', e);
    }
  }

  /**
   * Obtiene la preferencia del sistema
   */
  private getSystemPreference(): EffectiveTheme {
    if (!this.isBrowser) return 'light';
    
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  /**
   * Configura el listener para cambios del sistema
   */
  private setupSystemListener(): void {
    if (!this.isBrowser) return;
    
    try {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Listener para cambios en tiempo real
      const handler = (e: MediaQueryListEvent) => {
        this._systemPreference.set(e.matches ? 'dark' : 'light');
        console.log('[ThemeService] System preference changed to:', e.matches ? 'dark' : 'light');
      };
      
      // Usar addEventListener (moderno) con fallback
      if (this.mediaQuery.addEventListener) {
        this.mediaQuery.addEventListener('change', handler);
      } else {
        // Fallback para navegadores antiguos
        this.mediaQuery.addListener(handler);
      }
    } catch (e) {
      console.warn('[ThemeService] Error setting up system listener:', e);
    }
  }

  /**
   * Aplica el tema al DOM
   */
  private applyTheme(theme: EffectiveTheme): void {
    if (!this.isBrowser) return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('ion-palette-dark');
      this.updateMetaThemeColor('#0D0D0D');
    } else {
      root.classList.remove('ion-palette-dark');
      this.updateMetaThemeColor('#FFC107');
    }
  }

  /**
   * Actualiza el meta theme-color para la barra de estado del móvil
   */
  private updateMetaThemeColor(color: string): void {
    if (!this.isBrowser) return;
    
    try {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', color);
      }
      
      // También actualizar color-scheme
      const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
      if (metaColorScheme) {
        metaColorScheme.setAttribute('content', this.effectiveTheme());
      }
    } catch (e) {
      console.warn('[ThemeService] Error updating meta theme color:', e);
    }
  }
}
