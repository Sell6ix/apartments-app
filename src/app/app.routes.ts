import { Routes } from '@angular/router';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';

export const routes: Routes = [
  { path: '', component: ApartmentListComponent },
  { path: 'apartment/:id', component: ApartmentDetailComponent }
];
