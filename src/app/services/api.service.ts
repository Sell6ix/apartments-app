import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apartment, Booking, Item } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl + '/apartments';
  constructor(private http: HttpClient) {}

  listApartments(): Observable<Apartment[]> { return this.http.get<Apartment[]>(this.base); }
  getApartment(id: number): Observable<Apartment> { return this.http.get<Apartment>(`${this.base}/${id}`); }

  addBooking(apartmentId: number, booking: Partial<Booking>) { return this.http.post<Booking>(`${this.base}/${apartmentId}/bookings`, booking); }
  updateBooking(apartmentId: number, bookingId: number, booking: Partial<Booking>) { return this.http.put(`${this.base}/${apartmentId}/bookings/${bookingId}`, booking); }
  removeBooking(apartmentId: number, bookingId: number) { return this.http.delete(`${this.base}/${apartmentId}/bookings/${bookingId}`); }

  addItem(apartmentId: number, item: Partial<Item>) { return this.http.post<Item>(`${this.base}/${apartmentId}/items`, item); }
  updateItem(apartmentId: number, itemId: number, item: Partial<Item>) { return this.http.put(`${this.base}/${apartmentId}/items/${itemId}`, item); }
  removeItem(apartmentId: number, itemId: number) { return this.http.delete(`${this.base}/${apartmentId}/items/${itemId}`); }
}
