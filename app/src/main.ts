import { enableProdMode, importProvidersFrom, isDevMode, LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor, loggingInterceptor } from './app/core/interceptors/auth.interceptor';

// Registrar locale español México
registerLocaleData(localeEsMx, 'es-MX');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimations(),
    provideIonicAngular({
      mode: 'md', // Material Design para consistencia cross-platform
      animated: true,
    }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        ...(isDevMode() ? [loggingInterceptor] : []),
      ])
    ),
  ],
}).catch((err) => console.error(err));
