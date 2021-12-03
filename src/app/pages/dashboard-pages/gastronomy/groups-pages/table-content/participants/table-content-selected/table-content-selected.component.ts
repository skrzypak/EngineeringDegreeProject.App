import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-content-selected',
  templateUrl: './table-content-selected.component.html',
  styleUrls: ['./table-content-selected.component.css']
})
export class TableContentSelectedComponent implements OnInit {

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
    this.subscribeAction.emit(item);
  }
}
