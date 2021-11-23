import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-multi-select-search',
  templateUrl: './multi-select-search.component.html',
  styleUrls: ['./multi-select-search.component.css']
})
export class MultiSelectSearchComponent implements OnInit {

  //@Input() rxjs: Subject<any> = new Subject<any>();
  //@Input() keysDisplay: Map<any, any> = [];
  //@Input() searchable: Array<any> = [];

  rxjs: BehaviorSubject<any> = new BehaviorSubject<any>('');
  keysDisplay : Map<any, any> = new Map<any, any>();
  searchable = [];

  visible: boolean = true;

  example = [
    {
      "id": 0,
      "nip": "asdf",
      "companyName": "asdfasdf"
    },
    {
      "id": 1,
      "nip": "adf",
      "companyName": "adf"
    },
    {
      "id": 2,
      "nip": "qerw",
      "companyName": "qewr"
    },
    {
      "id": 3,
      "nip": "string",
      "companyName": "string"
    },
    {
      "id": 4,
      "nip": "string",
      "companyName": "string"
    }
  ]

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.keysDisplay.set('id', true);
    this.keysDisplay.set('nip', true);
    this.keysDisplay.set('companyName', 'Company name');
    await this.rxjs.next(this.example);
  }

  showSelected() {

  }

  showAvailables() {

  }

  close() {
    this.visible = false;
  }

  zero() {
    return 0
  }

  subscribeRenderer(e: any) {
    this.searchable = e;
  }
}
