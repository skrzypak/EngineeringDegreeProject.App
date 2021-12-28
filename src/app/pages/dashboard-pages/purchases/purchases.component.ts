import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  navs = [
    {name: 'Statistics', routerLink: 'statistics'},
    {name: 'Documents', routerLink: 'documents'},
    {name: 'Suppliers', routerLink: 'suppliers'},
  ];

  active = 0;

  constructor(private router: Router) {
    let acv = localStorage.getItem('purchases-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  async ngOnInit(): Promise<void> {
    if(this.active >= 0) {
      await this.router.navigate([`purchases/${this.navs[this.active].routerLink}`])
    }
  }

  onUpdate(e: number) {
    localStorage.setItem('purchases-nav-active', e.toString());
  }

}
