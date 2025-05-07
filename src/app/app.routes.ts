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
  },
  {
    path: 'budget-goal',
    canActivate:[authGuard],
    loadComponent: () => import('./budget-goal/budget-goal.page').then( m => m.BudgetGoalPage)
  },
  {
    path: 'budget',
    canActivate:[authGuard],
    loadComponent: () => import('./budget/budget.page').then( m => m.BudgetPage)
  },
  {
    path: 'account-list',
    canActivate:[authGuard],
    loadComponent: () => import('./account-list/account-list.page').then( m => m.AccountListPage)
  },
  {
    path: 'transaction-list',
    loadComponent: () => import('./transaction-list/transaction-list.page').then( m => m.TransactionListPage)
  },


];
