export interface Apartment {
  id: number;
  name: string;
  bookings: Booking[];
  items: Item[];
}
export interface Booking { id: number; tenantName: string; checkIn: string; checkOut: string; }
export interface Item { id: number; name: string; quantity: number; condition: string; }