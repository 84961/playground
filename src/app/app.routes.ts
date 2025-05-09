import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
      path: 'primeng-table', 
      loadComponent: () => import('./primeng-table/primeng-table.component').then(m => m.PrimengTableComponent),
      title: 'PrimeNG Table Demo'
    },
    { path: '', redirectTo: 'primeng-table', pathMatch: 'full' },
    { path: '**', redirectTo: 'primeng-table' } // Handle unknown routes
  ];