import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UnitPackage} from "../../../../../classes/unit-package";

@Component({
  selector: 'app-table-content-products',
  templateUrl: './table-content-products.component.html',
  styleUrls: ['./table-content-products.component.css']
})
export class TableContentProductsComponent implements OnInit {

  @Input() headers = new Map<any, any>();
  @Input() display =  Array<any>();
  @Output() subscribeAction = new EventEmitter<any>()

  unitPackage: UnitPackage = new UnitPackage();

  constructor() { }

  ngOnInit(): void {
  }

  zero() {
    return 0;
  }

  action(item: any) {
    let value = (<HTMLInputElement>document.getElementById(item.id)).value;
    let ingredient = {
        "id": `TMP_${Date.now()}`,
        "productId": item.id,
        "name": item.name,
        "code": item.code,
        "valueOfUse": value
    }
    this.subscribeAction.emit(ingredient);
  }
}
