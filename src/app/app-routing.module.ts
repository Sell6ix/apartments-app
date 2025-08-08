import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'apartments', pathMatch: 'full' },
  { path: 'apartments', component: ApartmentListComponent },
  { path: 'apartments/:id', component: ApartmentDetailComponent },
  { path: 'inventory', component: InventoryPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] }) export class AppRoutingModule {}