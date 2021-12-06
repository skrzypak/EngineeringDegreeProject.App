import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  navs = [
    {name: 'Warehouse', routerLink: 'warehouse'},
    {name: 'Statistics', routerLink: 'statistics'},
    {name: 'Products', routerLink: 'products'},
    {name: 'Categories', routerLink: 'categories'},
    {name: 'Allergens', routerLink: 'allergens'},
  ];

  active = 0;

  constructor(private router: Router) {
    let acv = localStorage.getItem('inventory-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  async ngOnInit(): Promise<void> {
    if(this.active >= 0) {
      await this.router.navigate([`inventory/${this.navs[this.active].routerLink}`])
    }
  }

  onUpdate(e: number) {
    localStorage.setItem('inventory-nav-active', e.toString());
  }

}
