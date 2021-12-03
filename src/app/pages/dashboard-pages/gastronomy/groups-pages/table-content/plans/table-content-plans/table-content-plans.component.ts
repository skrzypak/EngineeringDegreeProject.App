import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-content-plans',
  templateUrl: './table-content-plans.component.html',
  styleUrls: ['./table-content-plans.component.css']
})
export class TableContentPlansComponent implements OnInit {

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
    let startDate = (<HTMLInputElement>document.getElementById(`${item.id}_start_date`)).value;
    let endDate = (<HTMLInputElement>document.getElementById(`${item.id}_end_date`)).value;

    if((startDate === "" || endDate === "") || startDate > endDate) {
      return;
    }

    this.subscribeAction.emit({
      "id": `TMP_${Date.now()}`,
      "nutritionPlanId": item.id,
      "name": item.name,
      "code": item.code,
      "description": item.description,
      "startDate": startDate,
      "endDate": endDate
    });
  }
}
