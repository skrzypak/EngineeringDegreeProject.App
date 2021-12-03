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

  active = 0;

  constructor() {
    let acv = localStorage.getItem('gastronomy-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  ngOnInit(): void {
  }

  onUpdate(e: number) {
    localStorage.setItem('gastronomy-nav-active', e.toString());
  }
}
