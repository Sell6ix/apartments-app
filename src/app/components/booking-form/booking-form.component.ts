@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent {
  @Input() apartmentId!: number;
  @Output() created = new EventEmitter<Booking>();
  form = this.fb.group({
    guestName: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    notes: ['']
  });
  loading = false;
  error?: string;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  submit(){
    this.error = undefined;
    if (this.form.invalid) return;
    const { guestName, checkIn, checkOut, notes } = this.form.value;
    const payload: Booking = {
      apartmentId: this.apartmentId,
      guestName: guestName!,
      checkIn: new Date(checkIn!).toISOString(),
      checkOut: new Date(checkOut!).toISOString(),
      notes: notes || ''
    };
    if (new Date(payload.checkOut) <= new Date(payload.checkIn)){
      this.error = 'Дата выезда должна быть позже даты заезда'; return;
    }
    this.loading = true;
    this.api.createBooking(payload).subscribe({
      next: b => { this.created.emit(b); this.form.reset(); this.loading = false; },
      error: err => { this.error = err.error?.message || 'Ошибка'; this.loading = false; }
    });
  }
}
