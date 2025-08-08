import { Component, OnInit } from "@angular/core";
import { Booking } from "../../models";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './apartment-detail.component.html'
})
export class ApartmentDetailComponent implements OnInit {
  apartment?: any;
  bookings: Booking[] = [];
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  get id(){ return Number(this.route.snapshot.paramMap.get('id')); }
  ngOnInit(){ 
    this.api.getApartment(this.id).subscribe(a => {
      this.apartment = a;
      this.bookings = a.bookings;
    });
  }
  onBookingCreated(b: Booking){ this.bookings = [...this.bookings, b].sort((x,y)=>x.checkIn.localeCompare(y.checkIn)); }
}
