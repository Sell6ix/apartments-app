import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Apartment } from '../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({ selector: 'app-apartment-list',standalone: true,
  imports: [CommonModule, RouterModule],
templateUrl: './apartment-list.component.html', })
export class ApartmentListComponent implements OnInit {
  list: Apartment[] = [];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() { this.api.listApartments().subscribe(r => this.list = r); }
  open(id: number) { this.router.navigate(['/apartment', id]); }
}