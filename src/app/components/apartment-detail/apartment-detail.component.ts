import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Apartment, Booking, Item } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({ selector: 'app-apartment-detail', standalone: true,
imports: [CommonModule, RouterModule, ReactiveFormsModule, DatePipe], 
templateUrl: './apartment-detail.component.html',})
export class ApartmentDetailComponent implements OnInit {
  apt?: Apartment;
  showBooking = false;
  showItem = false;
  bookingForm: FormGroup;
  itemForm: FormGroup;
  editingBooking?: Booking;
  editingItem?: Item;

  constructor(private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({ tenantName: ['', Validators.required], checkIn: ['', Validators.required], checkOut: ['', Validators.required] });
    this.itemForm = this.fb.group({ name: ['', Validators.required], quantity: [1, Validators.required], condition: ['Хорошее', Validators.required] });
  }

  ngOnInit() { const id = Number(this.route.snapshot.paramMap.get('id')); this.load(id); }

  load(id: number) { this.api.getApartment(id).subscribe(a => this.apt = a); }
  back() { history.back(); }

  // Booking
  openBookingModal() { this.editingBooking = undefined; this.bookingForm.reset({ tenantName: '', checkIn: '', checkOut: '' }); this.showBooking = true; }
  editBooking(b: Booking) { this.editingBooking = b; this.bookingForm.setValue({ tenantName: b.tenantName, checkIn: b.checkIn.slice(0,10), checkOut: b.checkOut.slice(0,10) }); this.showBooking = true; }
  closeBookingModal() { this.showBooking = false; }
  saveBooking() {
    if (!this.apt) return;
    const val = this.bookingForm.value;
    if (this.editingBooking) {
      this.api.updateBooking(this.apt.id, this.editingBooking.id, val).subscribe(() => this.load(this.apt!.id));
    } else {
      this.api.addBooking(this.apt.id, val).subscribe(() => this.load(this.apt!.id));
    }
    this.closeBookingModal();
  }
  deleteBooking(b: Booking) { if (!this.apt) return; this.api.removeBooking(this.apt.id, b.id).subscribe(() => this.load(this.apt!.id)); }

  // Item
  openItemModal() { this.editingItem = undefined; this.itemForm.reset({ name: '', quantity: 1, condition: 'Хорошее' }); this.showItem = true; }
  editItem(it: Item) { this.editingItem = it; this.itemForm.setValue({ name: it.name, quantity: it.quantity, condition: it.condition }); this.showItem = true; }
  closeItemModal() { this.showItem = false; }
  saveItem() {
    if (!this.apt) return;
    const val = this.itemForm.value;
    if (this.editingItem) {
      this.api.updateItem(this.apt.id, this.editingItem.id, val).subscribe(() => this.load(this.apt!.id));
    } else {
      this.api.addItem(this.apt.id, val).subscribe(() => this.load(this.apt!.id));
    }
    this.closeItemModal();
  }
  deleteItem(it: Item) { if (!this.apt) return; this.api.removeItem(this.apt.id, it.id).subscribe(() => this.load(this.apt!.id)); }
}
