import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';

const routes: Routes = [ { path: '', component: ApartmentListComponent }, { path: 'apartment/:id', component: ApartmentDetailComponent } ];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] }) export class AppRoutingModule {}