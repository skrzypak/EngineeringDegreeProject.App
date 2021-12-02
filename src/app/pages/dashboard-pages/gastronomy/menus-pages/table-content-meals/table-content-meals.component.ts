import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MealType} from "../../../../../enums/meal-type";

@Component({
  selector: 'app-table-content-meals',
  templateUrl: './table-content-meals.component.html',
  styleUrls: ['./table-content-meals.component.css']
})
export class TableContentMealsComponent implements OnInit {

  mealType = MealType;

  navs = [
    {name: 'Breakfast', value: MealType.Breakfast},
    {name: 'First dish', value: MealType.FirstDish},
    {name: 'Main course', value: MealType.MainCourse},
    {name: 'Tea', value: MealType.Tea},
    {name: 'Supper', value: MealType.Supper},
  ];

  @Input() active: number = 0;
  @Input() headers = new Map<any, any>();
  @Input() display =  Array<any>();
  @Output() subscribeAction = new EventEmitter<any>()
  @Output() subscribeChangeMeal = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  zero() {
    return 0;
  }

  action(e: any) {
    this.subscribeAction.emit(e);
  }

  changeActiveTab(value: MealType) {
    this.active = value;
    this.subscribeChangeMeal.emit(value);
  }

  getActive() : MealType {
    return this.active;
  }

}
