import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [noAuthGuard],
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./features/tabs/tabs.page').then((m) => m.TabsPage),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        path: 'wallet',
        loadComponent: () =>
          import('./features/wallet/pages/wallet/wallet.page').then(
            (m) => m.WalletPage
          ),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./features/documents/pages/documents/documents.page').then(
            (m) => m.DocumentsPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
