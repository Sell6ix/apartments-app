import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment, Booking, InventoryItem, ApartmentInventory } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getApartments() { return this.http.get<Apartment[]>(`${this.base}/apartments`); }
  getApartment(id: number) { return this.http.get<any>(`${this.base}/apartments/${id}`); }
  createApartment(payload: Partial<Apartment>) { return this.http.post<Apartment>(`${this.base}/apartments`, payload); }

  getBookings(apartmentId?: number) {
    let params = new HttpParams();
    if (apartmentId) params = params.set('apartmentId', apartmentId);
    return this.http.get<Booking[]>(`${this.base}/bookings`, { params });
  }
  createBooking(payload: Booking) { return this.http.post<Booking>(`${this.base}/bookings`, payload); }

  getInventory() { return this.http.get<InventoryItem[]>(`${this.base}/inventory`); }
  createInventory(payload: Partial<InventoryItem>) { return this.http.post<InventoryItem>(`${this.base}/inventory`, payload); }
  linkInventory(apartmentId: number, payload: Partial<ApartmentInventory>) {
    return this.http.post<ApartmentInventory>(`${this.base}/apartments/${apartmentId}/inventory`, payload);
  }
}
