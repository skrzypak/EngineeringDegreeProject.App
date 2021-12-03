import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-module-navigation',
  templateUrl: './module-navigation.component.html',
  styleUrls: ['./module-navigation.component.css']
})
export class ModuleNavigationComponent implements OnInit {

  @Input() active: number = 0;
  @Input() navs: any;
  @Output() update = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  changeActiveTab(inx: number) {
    this.active = inx;
    this.update.emit(inx);
  }
}
