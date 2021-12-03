import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-content-list',
  templateUrl: './table-content-list.component.html',
  styleUrls: ['./table-content-list.component.css']
})
export class TableContentListComponent implements OnInit {

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
    this.subscribeAction.emit(item.id);
  }
}
