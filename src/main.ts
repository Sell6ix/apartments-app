import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';
import { ApartmentsListComponent } from './app/components/apartment-list/apartment-list.component';

bootstrapApplication(ApartmentsListComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom( MatCardModule,
      MatTabsModule,
      MatListModule,
      BrowserAnimationsModule,)
  ]
}).catch(err => console.error(err));
