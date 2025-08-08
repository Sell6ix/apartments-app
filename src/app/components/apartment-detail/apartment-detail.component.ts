import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Booking } from "../../models";

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';

// child components
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { ApartmentInventoryComponent } from '../apartment-inventory/apartment-inventory.component';

@Component({
  selector: 'app-apartment-detail',
  standalone: true,
  templateUrl: './apartment-detail.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    BookingFormComponent,
    ApartmentInventoryComponent
  ],
  providers: [DatePipe]
})
export class ApartmentDetailComponent implements OnInit {
  apartment?: any;
  bookings: Booking[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  get id() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.api.getApartment(this.id).subscribe(a => {
      this.apartment = a;
      this.bookings = a.bookings;
    });
  }

  onBookingCreated(b: Booking) {
    this.bookings = [...this.bookings, b].sort((x, y) => x.checkIn.localeCompare(y.checkIn));
  }
}
