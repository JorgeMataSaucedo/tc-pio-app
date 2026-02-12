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
        path: 'profile/personal',
        loadComponent: () =>
          import('./features/profile/pages/personal-info/personal-info.page').then(
            (m) => m.PersonalInfoPage
          ),
      },
      {
        path: 'profile/achievements',
        loadComponent: () =>
          import('./features/profile/pages/achievements/achievements.page').then(
            (m) => m.AchievementsPage
          ),
      },
      {
        path: 'profile/stats',
        loadComponent: () =>
          import('./features/profile/pages/statistics/statistics.page').then(
            (m) => m.StatisticsPage
          ),
      },
      {
        path: 'profile/security',
        loadComponent: () =>
          import('./features/profile/pages/security/security.page').then(
            (m) => m.SecurityPage
          ),
      },
      {
        path: 'profile/help',
        loadComponent: () =>
          import('./features/profile/pages/help/help.page').then(
            (m) => m.HelpPage
          ),
      },
      {
        path: 'profile/about',
        loadComponent: () =>
          import('./features/profile/pages/about/about.page').then(
            (m) => m.AboutPage
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
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/pages/notifications/notifications.page').then(
            (m) => m.NotificationsPage
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
