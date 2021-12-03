import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-content-menus',
  templateUrl: './table-content-menus.component.html',
  styleUrls: ['./table-content-menus.component.css']
})
export class TableContentMenusComponent implements OnInit {

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
    let value = parseInt((<HTMLInputElement>document.getElementById(item.id)).value);
    if(value > 0 && value <= 31) {
      this.subscribeAction.emit({
        code: item.code,
        description: item.description,
        id: `TMP_${Date.now()}`,
        menuId: item.id,
        name: item.name,
        order: value,
      });
    } else {
      console.log("No. out of range");
    }

  }

}

