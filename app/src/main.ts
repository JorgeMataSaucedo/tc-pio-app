import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor, loggingInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
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
