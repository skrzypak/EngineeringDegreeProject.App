import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-multi-select-search',
  templateUrl: './multi-select-search.component.html',
  styleUrls: ['./multi-select-search.component.css']
})
export class MultiSelectSearchComponent implements OnInit {

  @Input() btnSetup: Map<any, any> = new Map<any, any>();
  @Input() numberOfItemsObservable!: Observable<number>;
  @Output() rendererEmitter = new EventEmitter<Array<number>>();

  visible: boolean = false;

  constructor() {
  }

  change(key: string) {
    this.btnSetup.get(key).func();
  }

  close() {
    this.visible = false;
  }

  zero() {
    return 0
  }

  ngOnInit(): void {

  }

  subscribeRenderer(e: Array<number>) {
    this.rendererEmitter.emit(e);
  }

  show() {
    this.visible = true;
  }
}
