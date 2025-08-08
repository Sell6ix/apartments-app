import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Apartment } from '../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({ selector: 'app-apartment-list',
  imports: [CommonModule, RouterModule],
templateUrl: './apartment-list.component.html', })
export class ApartmentsListComponent implements OnInit {
  apartments: Apartment[] = [];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(){ this.api.getApartments().subscribe(a => this.apartments = a); }
  open(a: Apartment){ this.router.navigate(['/apartments', a.id]); }
}