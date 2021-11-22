import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastronomy',
  templateUrl: './gastronomy.component.html',
  styleUrls: ['./gastronomy.component.css']
})
export class GastronomyComponent implements OnInit {

  navs = [
    {name: 'Groups', routerLink: 'groups'},
    {name: 'Plans', routerLink: 'plans'},
    {name: 'Menus', routerLink: 'menus'},
    {name: 'Dishes', routerLink: 'dishes'},
    {name: 'Participants', routerLink: 'participants'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
