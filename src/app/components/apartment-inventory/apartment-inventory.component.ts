@Component({
  selector: 'app-apartment-inventory',
  templateUrl: './apartment-inventory.component.html'
})
export class ApartmentInventoryComponent {
  @Input() apartment!: any;
  items$ = this.api.getInventory();

  form = this.fb.group({
    inventoryItemId: [null, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    condition: ['good'],
    notes: ['']
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  link(){
    if (this.form.invalid) return;
    this.api.linkInventory(this.apartment.id, this.form.value).subscribe(() => {
      // reload apartment
      this.api.getApartment(this.apartment.id).subscribe(a => this.apartment = a);
      this.form.reset({ quantity: 1, condition: 'good' });
    });
  }
}
