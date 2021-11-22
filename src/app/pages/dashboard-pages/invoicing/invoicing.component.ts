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

  constructor() { }

  ngOnInit(): void {
  }

}
