@Component({
  template: `
  <mat-card>
    <mat-card-title>Календарь</mat-card-title>
    <div class="grid">
      <div class="apt" *ngFor="let a of apartments">
        <div class="title">{{a.name}}</div>
        <div class="lane">
          <div *ngFor="let b of a.bookings" class="booking"
               [style.left.%]="pos(b).left" [style.width.%]="pos(b).width"
               [matTooltip]="b.guestName + ' (' + (b.checkIn | date) + ' - ' + (b.checkOut | date) + ')'"
          ></div>
        </div>
      </div>
    </div>
  </mat-card>`,
  styles: [`
    .grid { display: grid; gap: 12px; }
    .apt { border: 1px solid #e0e0e0; border-radius: 6px; padding: 8px; }
    .title { font-weight: 600; margin-bottom: 6px; }
    .lane { position: relative; height: 24px; background: #fafafa; border-radius: 4px; }
    .booking { position: absolute; top: 2px; bottom: 2px; background:#90caf9; border-radius: 4px; }
  `]
})
export class CalendarPageComponent implements OnInit {
  apartments: any[] = [];
  start = startOfMonth(new Date());
  end = endOfMonth(new Date());
  constructor(private api: ApiService) {}
  ngOnInit(){
    this.api.getApartments().subscribe(list => {
      Promise.all(list.map(a => this.api.getApartment(a.id).toPromise()))
        .then(full => this.apartments = full);
    });
  }
  pos(b: any){
    const s = new Date(b.checkIn).getTime(), e = new Date(b.checkOut).getTime();
    const total = this.end.getTime() - this.start.getTime();
    const left = Math.max(0, (s - this.start.getTime()) / total * 100);
    const right = Math.min(100, (e - this.start.getTime()) / total * 100);
    return { left, width: Math.max(3, right - left) };
  }
}
