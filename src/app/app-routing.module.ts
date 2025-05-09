import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimengTableComponent } from './primeng-table/primeng-table.component';

const routes: Routes = [
  { path: 'primeng-table', component: PrimengTableComponent },
  { path: '', redirectTo: '/primeng-table', pathMatch: 'full' }, // Optional: Redirect to primeng-table by default
  { path: '**', redirectTo: '/primeng-table' } // Optional: Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
