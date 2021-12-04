import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent implements OnInit {

  navs = [
    {name: 'Statistics', routerLink: 'statistics'},
    {name: 'Documents', routerLink: 'documents'},
    {name: 'Suppliers', routerLink: 'suppliers'},
  ];

  active = 0;

  constructor(private router: Router) {
    let acv = localStorage.getItem('invoicing-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  async ngOnInit(): Promise<void> {
    if(this.active > 0) {
      await this.router.navigate([`invoicing/${this.navs[this.active].routerLink}`])
    }
  }

  onUpdate(e: number) {
    localStorage.setItem('invoicing-nav-active', e.toString());
  }

}
