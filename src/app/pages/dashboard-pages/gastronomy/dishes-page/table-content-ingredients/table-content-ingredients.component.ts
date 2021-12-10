import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UnitPackage} from "../../../../../classes/unit-package";

@Component({
  selector: 'app-table-content-ingredients',
  templateUrl: './table-content-ingredients.component.html',
  styleUrls: ['./table-content-ingredients.component.css']
})
export class TableContentIngredientsComponent implements OnInit {

  @Input() headers = new Map<any, any>();
  @Input() display = Array<any>();
  @Output() subscribeAction = new EventEmitter<any>()

  constructor() { }

  unitPackage: UnitPackage = new UnitPackage();

  ngOnInit(): void {
  }

  zero() {
    return 0;
  }

  action(item: any) {
    this.subscribeAction.emit(item.id);
  }
}
