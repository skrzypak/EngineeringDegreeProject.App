import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-content-plan-details',
  templateUrl: './table-content-plan-details.component.html',
  styleUrls: ['./table-content-plan-details.component.css']
})
export class TableContentPlanDetailsComponent implements OnInit {

  @Input() headers = new Map<any, any>();
  @Input() display = Array<any>();
  @Output() subscribeAction = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  zero() {
    return 0;
  }

  action(item: any) {
    this.subscribeAction.emit(item.id);
  }

}
