import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
    let acv = localStorage.getItem('gastronomy-nav-active')
    if(acv != null) {
      this.active = parseInt(acv);
    } else {
      this.onUpdate(0);
    }
  }

  async ngOnInit(): Promise<void> {
    if(this.active >= 0) {
      await this.router.navigate([`gastronomy/${this.navs[this.active].routerLink}`])
    }
  }

  onUpdate(e: number) {
    localStorage.setItem('gastronomy-nav-active', e.toString());
  }
}
