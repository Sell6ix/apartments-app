import { Routes } from '@angular/router';
import { ApartmentsListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';

export const routes: Routes = [
  { path: '', component: ApartmentsListComponent },
  { path: 'apartment/:id', component: ApartmentDetailComponent }
];
