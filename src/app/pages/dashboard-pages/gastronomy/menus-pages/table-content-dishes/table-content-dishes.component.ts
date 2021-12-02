import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MealType} from "../../../../../enums/meal-type";

@Component({
  selector: 'app-table-content-dishes',
  templateUrl: './table-content-dishes.component.html',
  styleUrls: ['./table-content-dishes.component.css']
})
export class TableContentDishesComponent implements OnInit {

  mealType = MealType;

  @Input() headers = new Map<any, any>();
  @Input() display =  Array<any>();
  @Output() subscribeAction = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  zero() {
    return 0;
  }

  action(item: any) {
    let value = (<HTMLInputElement>document.getElementById(item.id)).value;

    this.subscribeAction.emit({
      meal: value,
      value: {
        "menuDishId": `TMP_${Date.now()}`,
        "dishId": item.id,
        "name": item.name,
        "description": item.description
      }
    });
  }

}
