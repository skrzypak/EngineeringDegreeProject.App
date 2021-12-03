import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent implements OnInit {

  navs = [
    {name: 'Documents', routerLink: 'documents'},
    {name: 'Suppliers', routerLink: 'suppliers'},
    {name: 'Statistics', routerLink: 'statistics'},
  ];

  active = 0;

  constructor() {
    let acv = localStorage.getItem('invoicing-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  ngOnInit(): void {
  }

  onUpdate(e: number) {
    localStorage.setItem('invoicing-nav-active', e.toString());
  }

}
