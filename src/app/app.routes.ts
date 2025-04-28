import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate:[authGuard],
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'folder1',
    canActivate:[authGuard],
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'login',
    canActivate:[loginGuard],
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    canActivate:[loginGuard],
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },  {
    path: 'list-expenses',
    loadComponent: () => import('./list-expenses/list-expenses.page').then( m => m.ListExpensesPage)
  },



];
