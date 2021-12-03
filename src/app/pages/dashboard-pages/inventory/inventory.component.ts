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

  active = 0;

  constructor() {
    let acv = localStorage.getItem('inventory-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  ngOnInit(): void {
  }

  onUpdate(e: number) {
    localStorage.setItem('inventory-nav-active', e.toString());
  }

}
