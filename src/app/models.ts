export interface Apartment { id: number; name: string; address: string; }
export interface Booking {
  id?: number; apartmentId: number; guestName: string;
  checkIn: string; checkOut: string; status?: string; notes?: string;
}
export interface InventoryItem { id: number; name: string; category?: string; description?: string; }
export interface ApartmentInventory {
  id: number; apartmentId: number; inventoryItemId: number;
  quantity: number; condition?: string; notes?: string; item?: InventoryItem;
}
