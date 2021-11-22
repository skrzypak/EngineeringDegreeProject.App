import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  navs = [
    {name: 'Warehouse', routerLink: 'warehouse'},
    {name: 'Products', routerLink: 'products'},
    {name: 'Categories', routerLink: 'categories'},
    {name: 'Allergens', routerLink: 'allergens'},
    {name: 'Statistics', routerLink: 'statistics'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
